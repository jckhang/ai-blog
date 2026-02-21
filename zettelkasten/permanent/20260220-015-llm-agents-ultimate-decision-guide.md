---
id: 20260220-015-llm-agents-ultimate-decision-guide
title: LLM Agents终极决策指南（1页参考手册）
created: 2026-02-20
tags: ["agent", "decision-guide", "reference", "best-practices", "quick-start"]
source: "Synthesis of 14 Agent-related Permanent Notes"
source_type: "meta-reference"
content_length: 2000
quality_score: 0.95
related_notes: ["20260220-002-llm-powered-autonomous-agents", "20260220-006-llm-agent-architecture-deep-dive", "20260220-013-llm-agent-architecture-comprehensive-framework", "20260220-009-step3-vl-10b-architecture-deep-dive", "20260220-011-edgeNav-qe-mobile-ai-optimization", "20260220-012-a2h-agent-to-human-protocol-deep-dive", "20260220-014-large-transformer-inference-optimization-techniques"]
---

# LLM Agents终极决策指南（1页参考手册）

> **用途**: 开发手机Agent时的快速决策参考
> **格式**: 决策树 + 配置清单 + 陷阱警告
> **目标**: 减少设计时间，避免常见错误

---

## 🚦 **快速决策树**

### **Q1: 任务复杂度是什么？**

```
简单任务 (<5步) ──→ Zero-Shot + 无Memory
    │
    └─ 需要实时信息? ──→ 添加Tool Use (search/API)
          │
          └─ 需要多步推理? ──→ Chain-of-Thought
                │
                └─ 有多个工具可选? ──→ ReAct (推理+行动循环)
                      │
                      └─ 分支探索? ──→ Tree of Thoughts (最多3分支)
```

**关键**: 从简开始，复杂度递增。不要一上来就用ToT。

---

### **Q2: 需要人类介入吗？**

**场景判断**:

| 场景 | A2H需求 | 建议 |
|------|---------|------|
| 手机操作（微信、输入） | 仅当失败>2次 | ✅ 简化A2H |
| 支付/删除/安装 | 高风险操作 | ✅ A2H PERMISSION (同步阻塞) |
| 需要专家知识 | 偶尔求助 | ✅ A2H CLARIFICATION |
| 日常任务 | 几乎不需要 | ❌ 禁用A2H |

**简化A2H实现** (手机端):
```python
if action in ["delete", "payment", "install"]:
    trigger_human("PERMISSION", blocking=True)
elif failures > 2:
    trigger_human("CLARIFICATION", blocking=False)
else:
    continue_auto()
```

---

### **Q3: 模型大小与部署？**

**设备匹配矩阵**:

| 设备 | 可用内存 | 推荐模型 | 优化方案 |
|------|---------|---------|---------|
| **旗舰手机** (Snapdragon 8 Gen 2) | 4-6GB | 4B-8B | 4-bit量化 + GQA + Early Exit |
| **中端手机** | 2-3GB | 2B-4B | 4-bit + GQA |
| **服务器** | 80GB+ | 70B+ | 混合精度(Mixed-Precision) |
| **云端推理** | 无限制 | 任意 | 无需量化，专注延迟优化 |

**关键公式**:
```
模型内存 = 参数量 × 字节精度 + KV Cache
例如: 10B模型
  - FP16: 20GB
  - 4-bit: 5GB
  - 加上KV cache (16k tokens): ~0.5GB
  → 总5.5GB (仅旗舰机能跑)
```

---

### **Q4: 需要哪种优化？**

**目标驱动选择**:

| 目标 | 首选技术 | 次选 | 避免 |
|------|---------|------|------|
| **降低内存** | 4-bit量化 (GPTQ/AWQ) | 8-bit (LLM.int8) | FP16 |
| **降低延迟** | Early Exit | Grouped Query | 剪枝 |
| **保持精度** | QLoRA微调 | Knowledge Distillation | 纯PTQ |
| **简化实现** | 现成库 (bitsandbytes) | 手动混精度 | 自研kernel |

**推荐组合** (手机Agent):
```
基础: 4-bit量化 (GPTQ)
+ Early Exit (置信度>0.9)
+ Grouped Query Attention (如果模型支持)
= <4GB, <500ms, >90% accuracy
```

---

## 📋 **配置清单（按场景）**

### **场景1: 手机GUI Agent**

**架构**:
```
Perception: PE-lang (1.8B, 4-bit) ← 手机多帧截图
Planner: Qwen3-4B (4-bit) ← 推理动作序列
Memory: ChromaDB (on-device) ← 用户偏好
Tools: tap, swipe, type, wait
Human: 简化A2H (仅PERMISSION)
```

**超参数**:
```yaml
model: Qwen3-4B
quantization: 4-bit (GPTQ)
max_context: 32768
early_exit: True
exit_threshold: 0.92  # 置信度>92%时早退
max_steps: 10
tool_timeout: 5000ms
human_intervention_rate: 0.2  # <20%任务需要人工
```

**预期性能**:
- 内存: ~3.5GB
- 延迟: 简单界面 300ms, 复杂界面 800ms
- 准确率: ScreenSpot-V2 >85%

---

### **场景2: 企业审批Agent（A2H）**

**Human Card示例**:
```json
{
  "id": "human://eason.manager",
  "profile": {
    "name": "Eason",
    "role": "Manager",
    "dept": "Intelligent Agents"
  },
  "capabilities": ["payment_approval", "strategy", "emergency"],
  "endpoints": {
    "feishu": "webhook_url_encrypted"
  },
  "availability": {
    "status": "AVAILABLE",
    "working_hours": "09:00-18:00"
  }
}
```

**触发规则**:
```python
TRIGGERS = {
    "payment": {"threshold": 0, "action": "PERMISSION", "blocking": True},
    "config_change": {"threshold": 0, "action": "PERMISSION", "blocking": True},
    "ambiguity": {"threshold": 0.8, "action": "CLARIFICATION", "blocking": False},
    "failure": {"threshold": 2, "action": "SOLICITATION", "blocking": False}
}
```

**通信模式**:
- PERMISSION → 同步阻塞（等待按钮点击）
- NOTIFICATION → 异步（发送消息后继续）
- CLARIFICATION → 异步（暂停当前线程，不阻塞主agent）

---

### **场景3: 长期会话Agent**

**记忆层级**:
```
短期记忆 (Context): 最近10轮对话 (4k tokens)
  ↓ 每N轮提取摘要
长期记忆 (Vector): 用户偏好、历史任务
  ↑ 相关检索，注入上下文
情境记忆 (SQLite): 最近100个任务
  ↑ 按时间过滤
```

**记忆写入时机**:
- 每个子目标完成 → 写episodic
- 工具调用 → 写experience (state, action, reward)
- 人类反馈 → 写key learnings
- 任务结束 → 生成summary并写入vector

**压缩策略** (每100条):
- 计算重要性评分（访问频率、任务相关性）
- 聚类相似记忆，生成聚合摘要
- 删除低质量记忆（quality<0.3）

---

## ⚠️ **架构反模式（必须避免）**

### ❌ **陷阱1: 无限递归的Planning**

**现象**: 生成子目标 → 为子目标生成子子目标 → 无限

**防护措施**:
```python
MAX_DEPTH = 5
def decompose(goal, depth=0):
    if depth >= MAX_DEPTH:
        return "Cannot decompose further, please clarify"
    # ... 正常分解
```

---

### ❌ **陷阱2: Memory污染**

**现象**: 错误记忆长期存在，导致后续错误决策

**防护**:
- 每条记忆标记质量分（0-1）
- 定期rejudge（每新增100条触发）
- 自动删除: quality<0.3 且创建>30天
- 写入前校验: 工具执行失败时，不写入成功记忆

---

### ❌ **陷阱3: Tool误用**

**现象**: 调用不存在工具、参数越界、重复调用

**防护**:
```python
class SafeToolRegistry:
    def validate(self, tool_name, params):
        schema = self.get_schema(tool_name)
        # 1. 检查参数类型
        # 2. 检查范围 (如x∈[0,1920])
        # 3. 检查依赖 (如必须先login再tap)
        return valid, error_msg
    
    def execute(self, tool_name, params):
        valid, msg = self.validate(tool_name, params)
        if not valid:
            return {"error": msg, "skip_learning": True}
        # ... 执行
```

---

### ❌ **陷阱4: A2H滥用**

**现象**: Agent每分钟请求审批，人类无法工作

**防护**:
- 阈值提高: confidence<0.8才触发，不是<0.95
- 白名单: 低风险操作不触发（查看、输入文本）
- 聚合: 5分钟内同类请求合并
- 冷却: 同一用户1小时内最多5次请求

---

## 🎯 **性能评估指标**

### **系统级KPI**

| 指标 | 目标值 | 测量方法 | 警告阈值 |
|------|--------|---------|---------|
| **任务成功率** | >85% | 100个任务统计 | <70% |
| **平均轮次** | <最优×1.5 | 记录总action数 | >2×最优 |
| **人类干预率** | <20% | (干预任务/总任务) | >30% |
| **端侧延迟** | <500ms | 从thought到action | >1s |
| **记忆检索准确率** | >90% | P@5 | <80% |

### **组件级KPI**

| 组件 | 指标 | 目标 |
|------|------|------|
| Planning | 计划合理性（专家评分） | >80% |
| Memory | 检索相关性（人工评估） | >90% |
| Tool Use | 调用成功率 | >95% |
| A2H | 请求必要性（避免滥用） | >70% |

---

## 🔧 **快速启动模板**

### **手机Agent基础实现（50行代码）**

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import chromadb

# 1. 加载量化模型
model = AutoModelForCausalLM.from_pretrained(
    "Qwen3-4B",
    quantization_config={"bits": 4, "group_size": 128},
    device_map="auto"
)

# 2. 添加LoRA适配器（手机任务微调）
model = PeftModel.from_pretrained(model, "phone-agent-lora")

# 3. 记忆库
memory = chromadb.Client().create_collection("agent_memory")

# 4. ReAct循环
def act(obs, max_steps=10):
    for step in range(max_steps):
        # 检索相关记忆
        relevant = memory.query(obs, n_results=3)
        prompt = build_prompt(obs, relevant)
        
        # LLM生成
        thought, action = model.generate(prompt)
        
        # 执行
        result = execute_action(action)
        
        # 检查是否完成
        if is_done(result):
            memory.add(obs, thought, action, result)
            return result
        
        # 检查是否需要人类
        if need_human(result):
            human_input = ask_human(action)
            obs = human_input
        else:
            obs = result
    
    return "Timeout"

# 5. 启动
result = act("打开微信并发送'你好'到文件传输助手")
```

---

## 📊 **技术选型对照表**

| 需求 | 推荐方案 | 替代方案 | 避免 |
|------|---------|---------|------|
| **模型** | Qwen3-4B / Step3-10B | Llama3-8B | 私有闭源模型 |
| **量化** | GPTQ/AWQ (4-bit) | Bitsandbytes (8-bit) | 无量化 |
| **记忆** | ChromaDB（轻量） | Pinecone（云端） | 纯上下文 |
| **ReAct框架** | 自实现（简单） | LangChain（复杂） | AutoGPT（不成熟） |
| **部署** | ONNX Runtime（移动） | TorchScript | 原始PyTorch |

---

## 💡 **核心经验法则**

### **1. 简单性优先**
- 从Zero-Shot开始，80%任务不需要复杂Planning
- 先实现ReAct循环，再考虑ToT
- 避免过度工程化（YAGNI原则）

### **2. 数据质量 > 模型大小**
- 10B好模型 + 高质量SFT > 70B普通模型
- 收集1000个高质量轨迹 > 收集10k个噪声数据

### **3. 量化是现代AI的必选项**
- 4-bit是手机端底线（即使牺牲1-2%精度）
- Early Exit对GUI任务特别有效（简单界面多）
- 混合精度是最佳折中

### **4. A2H不是银弹**
- 只用在高风险/高价值场景
- 异步模式为主，减少阻塞
- 设计良好的Human Card（标签准确）

### **5. 评估驱动迭代**
- 建立benchmark（ScreenSpot-V2）
- 每次改动测量3个指标（准确率、延迟、内存）
- 不要优化不存在的问题

---

## 🔗 **相关笔记导航**

| 主题 | 笔记ID | 质量 |
|------|--------|------|
| 基础理论 (Planning/Memory/Tool) | 002 | 0.85 |
| 系统架构全景 | 006 | 0.90 |
| 综合框架 | 013 | 0.93 |
| STEP3-VL技术细节 | 009 | 0.92 |
| EdgeNav-QE (移动端优化) | 011 | 0.89 |
| A2H协议 | 012 | 0.91 |
| Transformer推理优化 | 014 | 0.94 |
| **本笔记 (决策指南)** | **015** | **0.95** |

---

## 🎓 **终极建议（给E老师）**

1. **架构**: 采用 **Perception (PE-lang) + Planning (Qwen) + Tools (ReAct) + A2H (简化)**
2. **优化**: **4-bit + Early Exit + GQA** 三件套
3. **训练**: **SFT 9:1 → SFT 1:1 → RL 200轮**（RLVR为主）
4. **评估**: **ScreenSpot-V2** 为核心benchmark
5. **部署**: **旗舰手机端先跑通，再下放中端**

---

**使用方法**: 
1. 遇到设计决策 → 查本笔记对应章节
2. 实现代码 → 参考"快速启动模板"
3. 遇到问题 → 检查"架构反模式"
4. 评估效果 → 对照"性能评估指标"

**更新频率**: 随新笔记创建而更新（保持1页终极参考）

---

*Created: 2026-02-20 16:25 | Quality: 0.95 | This is the DECISION GUIDE - keep it updated!*
