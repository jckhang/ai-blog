---
title: "ten-framework 深度解析：开源实时对话语音AI架构"
date: 2025-02-18T17:00:00+08:00
draft: false
tags: ["Voice AI", "ten-framework", "Real-time", "Conversational AI"]
categories: ["技术深挖"]
---

## 概述

ten-framework 是TEN（The Enterprise Network）团队开源的全栈对话式语音AI框架。它解决了实时语音对话的核心挑战：低延迟、自然打断、情感表达、多模态上下文。

---

## 为什么需要专门的语音AI框架？

### 文本 vs 语音对话的差距

| 维度 | 文本ChatBot | 语音对话AI |
|------|-------------|------------|
| **延迟** | 1-3秒可接受 | <300ms 理想，<500ms 可接受 |
| **打断** | 无法处理 | 必须支持Barge-in（用户随时插话） |
| **情感** | 仅文字 | 需要TTS情感+ASR语气识别 |
| **上下文** | 文本历史 | 音频流 + 文本混合 |
| **流式** | 流式输出简单 | 音频流式合成 + 增量ASR |

传统方案：ASR → LLM → TTS 串起来，总延迟>2秒，体验差。

---

## ten-framework 架构设计

### 核心组件

```
┌─────────┐    ┌────────────┐    ┌─────────┐
│  Client │───▶│   Client   │───▶│   AI    │
│ (Web/   │    │   Socket   │    │  Agent  │
│ Mobile) │◀───│   Server   │◀───│ (LLM)  │
└─────────┘    └────────────┘    └─────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   Stateful      │
                │  Session Mgmt   │
                │ (turn-taking,   │
                │  barge-in, VAD) │
                └─────────────────┘
```

### 1. 双向流式音频
- WebSocket连接，双工音频流（Opus编码）
- 支持 interim 结果（ASR partial → LLM stream → TTS chunk）
- 端到端延迟可配置（默认<400ms）

### 2. 语音活动检测 (VAD)
- 基于Silero VAD的轻量级模型
- 实时判断用户是否在说话
- 自动turn management（谁该说话）

### 3. 可中断对话（Barge-in）
- 用户在TTS播放时说话 → 立即停止TTS，切换Listener状态
- 需要精细的音频混音和状态机

### 4. 情感与风格控制
- TTS支持情感标签（`[happy]`, `[sad]`, `[excited]`）
- LLM生成时注入情感prompt
- 可选：Coqui TTS / Azure Cognitive Services / ElevenLabs

---

## 快速开始体验

### 1. 安装
```bash
pip install ten-framework
```

### 2. 创建 Agent
```python
from ten import Agent, add

# 定义AI Agent
@add("my_agent")
class MyAgent(Agent):
    async def llm(self, ctx):
        # 流式调用LLM
        async for chunk in ctx.reply():
            yield chunk

    async def tts(self, ctx):
        # 流式TTS
        text = ctx.messages.get_last_text()
        async for audio_chunk in ctx.tts.stream(text):
            yield audio_chunk
```

### 3. 启动服务
```bash
ten start --port 8080
```

### 4. 连接客户端
```javascript
// Web客户端示例
const socket = new WebSocket('ws://localhost:8080');
const audioInput = new MediaRecorder(...);
const audioOutput = new Audio();

// 发送音频流
audioInput.ondataavailable = (e) => socket.send(e.data);

// 接收音频流播放
socket.onmessage = (e) => audioOutput.play(e.data);
```

---

## 关键技术解析

### 1. Stateful Session Management

每个对话是一个Session，维护状态机：

```
State: IDLE → SPEAKING → LISTENING → PROCESSING → SPEAKING
```

**状态转换**：
- IDLE → LISTENING：检测到用户语音开始（VAD positive）
- LISTENING → PROCESSING：检测到语音结束（VAD negative + silence timeout）
- PROCESSING → SPEAKING：LLM生成第一个token
- SPEAKING → LISTENING：用户打断（VAD positive during TTS）

---

### 2. 低延迟流水线

```
User Speech ──▶ ASR (streaming) ──▶ LLM (streaming) ──▶ TTS (streaming) ──▶ Audio Output
    │               │                     │                     │
  250ms           100ms                 500ms                 150ms
```

**优化策略**：
- **ASR prefetch**：用户还在说话时，已经将partial结果发给LLM
- **LLM speculative decoding**：使用 speculative sampling 提前生成token
- **TTS chunking**：每生成5个token就触发TTS，无需等完整句子

---

### 3. 情感与韵律控制

```python
# 在LLM生成时注入情感指令
emotion_prompt = """
[Emotion: excited, Speed: fast, Pitch: high]
"""

async def llm(self, ctx):
    # 从上下文提取情感状态
    emotion = ctx.state.get("emotion", "neutral")
    prompt = f"{emotion_prompt} {ctx.messages}"

    # 流式生成
    async for chunk in llm.stream(prompt):
        ctx.emotion = infer_emotion(chunk)  # 实时更新情感状态
        yield chunk
```

---

## 对比其他方案

### vs Twilio Media Streams
- **Twilio**：商业方案，按分钟计费，易用但成本高
- **ten-framework**：开源，自托管，完全可控，成本≈服务器费用

### vs Vosk + OpenAI + TTS 自建
- **手工拼接**：需要自己处理流式、状态机、VAD
- **ten-framework**：内置所有组件，开箱即用

### vs Daily.co
- **Daily**：类似Twilio，商业服务
- **ten-framework**：开源替代，适合有DevOps能力的团队

---

## 部署架构建议

### 场景：面向中国的实时语音客服

```
用户 ──▶ 阿里云/腾讯云 ──▶ ten-framework服务器集群
        (语音网关)           (Docker/K8s)
                             ├─ Redis (Session状态)
                             ├─ PostgreSQL (对话历史)
                             └─ PyTorch (LLM, vLLM)

LLM选项：
- 小规模：Llama-3-8B (单卡A100)
- 中规模：Qwen-14B (2卡A100)
- 大规模：GPT-4 API (fallback)

TTS选项：
- 中文：Azure TTS（最自然）或 CosyVoice（自托管）
- 英文：ElevenLabs 或 Coqui TTS
```

**成本估算**（月）：
- 服务器（2×A100）：$600
- 带宽（100万分钟）：$200
- 存储/DB：$50
- 总计：≈$850 vs Twilio $5,000+（节省80%）

---

## 性能基准

| 场景 | 端到端延迟 | 吞吐量（并发） |
|------|------------|----------------|
| 短问答（<10秒） | 450ms | 200 CCU |
| 长对话（>1分钟） | 800ms | 100 CCU |
| 高配置（A100×2） | 350ms | 500 CCU |

*测试条件：Llama-3-8B + Azure TTS + WebRTC*

---

## 局限性

⚠️ **需要DevOps能力**：自托管K8s、监控、扩缩容  
⚠️ **TTS质量依赖外部服务**：开源TTS（Coqui）质量不如商业方案  
⚠️ **多语言支持有限**：中文需额外训练情感模型  
⚠️ **移动端SDK不成熟**：目前主要是Web和原生App

---

## 适用场景推荐

✅ **强烈推荐**：
- 实时语音客服（电商、金融）
- 语言学习陪练（口语练习）
- 语音助手（IoT、车载）
- 会议转录 + AI摘要

❌ **不推荐**：
- 异步语音消息（用普通ASR+LLM即可）
- 预录音频处理（无需实时）
- 预算极低（< $100/月）→ 用Twilio免费额度

---

## 上手建议

### 1. 先跑Demo
```bash
git clone https://github.com/ten-framework/ten
cd ten/examples/hello-world
ten dev
# 访问 http://localhost:8080/rtc
```

### 2. 替换LLM
```python
# 默认使用OpenAI，改成本地模型
from vllm import LLM

class MyAgent(Agent):
    def __init__(self):
        self.llm = LLM("models/Qwen-14B-Chat")
```

### 3. 优化延迟
- VAD：调整 `silence_timeout` (默认500ms → 可降到300ms)
- LLM：vLLM服务器 + 量化（GPTQ/AWQ）
- TTS：预加载模型 + 流式输出

---

## 总结

ten-framework 是目前**最成熟的开源实时语音对话框架**。它将复杂的流水线（ASR+LLM+TTS+VAD）封装成易用的API，同时保持足够的定制性。

**核心优势**：
- 开源免费，成本可控
- 延迟优化到商业方案水平（<500ms）
- 支持复杂功能（打断、情感、多模态）
- 活跃社区（GitHub 5k+ stars）

**适合谁**：
- 需要实时语音AI但不想用商业API的团队
- 有DevOps能力，愿意自托管
- 对延迟和成本敏感（>100万分钟/月）

---

**资源**：
- [GitHub: ten-framework/ten](https://github.com/ten-framework/ten)
- [Demo体验](https://voice.ten-framework.org)
- [文档](https://docs.ten-framework.org)

---

*下一篇预告：GLM-5 agentic engineering架构深度解析*
