---
title: "LLM研究扫描 - 2026年4月25日"
date: 2026-04-25T00:00:00+08:00
lastmod: 2026-04-25T00:00:00+08:00
draft: false
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
description: "过去24小时AI/LLM领域深度扫描：Karpathy公开动态空窗、多模态科研Agent基准、长视频多智能体协作、端侧KV缓存调度、移动端量化图像增强、MCP工具安全新证据。"
---

# 2026年4月25日 LLM研究扫描

过去24小时（北京时间 2026-04-24 00:00 至 2026-04-25 00:00），公开信号很像“地基日”而不是“烟花日”：没有超级大模型发布，但 Agent、安全、端侧部署、推理路径都在补关键短板。特别值得注意的是：**Karpathy 在目标窗口内没有新的公开 GitHub 事件**，他最近公开推进仍停留在 3 月底的 `autoresearch`；真正的新东西，主要来自几篇今天能核验时间戳的论文与代码。

## 10:00-11:00 | 端侧推理开始学会“分工”

10:55，论文 [SparKV](https://arxiv.org/abs/2604.21231) 上线，盯住的是手机跑 LLM 最痛的首字延迟。它不再把整段上下文都在本地预填充，而是把 KV cache 切块后，**动态决定哪些块从云端流过来，哪些块在本地算**，并把通信与计算重叠起来。作者报告 Time-to-First-Token 降低 1.3x-5.1x、单次能耗降 1.5x-3.3x。它的启发很直接：未来“端侧 AI”不一定是纯离线，而会变成**云边协同调度**问题。

## 13:00-14:00 | 多模态 Agent 终于开始考“读论文”

13:42，UIUC 发布 [PaperMind](https://arxiv.org/abs/2604.21304) 与配套仓库 [PaperMind](https://github.com/Yanjun-Zhao/PaperMind)。这不是又一个聊天 benchmark，而是把科研阅读拆成四件真事情：看图、读实验、跨论文找证据、像审稿人那样挑毛病。论文全文里最有意思的地方，是它明确把 **tool use** 放进“证据合成”环节，不再把 Agent 当成只能答题的黑盒。换句话说，多模态 Agent 的下一阶段，不是“会看图”就够，而是要**会带着工具链读懂复杂文档**。

## 17:00-18:00 | 长视频多智能体开始少走弯路

17:04，HiCrew 论文 [Hierarchical Reasoning for Long-Form Video Understanding via Question-Aware Multi-Agent Collaboration](https://arxiv.org/abs/2604.21444) 上线。它批评现有多智能体视频系统太死板：不管问题简单还是复杂，都走固定流程。HiCrew 的办法是先用镜头边界搭“时间树”，再按问题类型决定代理人怎么协作。这个思路很像把“上下文工程”搬进视频世界：先保住时间结构，再只深挖与问题相关的片段。对多模态 Agent 来说，这比无脑塞长上下文更像可扩展路线。

## 17:00-18:00 | tool use 安全从“自述”转向“留痕审计”

17:39，安全论文 [MCP Pitfall Lab](https://arxiv.org/abs/2604.21477) 发布；我同时下载了 PDF `tmp/research-scan/mcp-pitfall-lab.pdf` 交叉核验元数据。它最重要的贡献不是再演示一次 prompt injection，而是把 MCP 工具服务器常见坑做成**可复现、可验证、可回归测试**的场景：工具元数据投毒、伪装服务器、图像到工具链泄露。论文里最扎眼的数据是：在 19 次邮件系统实验中，**63.2% 的 agent 叙述与真实 trace 不一致**，涉及真实 sink action 的实验甚至 100% 不一致。这几乎是在提醒所有做 tool use 的团队：别只听模型“说自己做了什么”，要看 trace。

## 22:00-23:00 | 移动端部署的新答案不是更大模型，而是更稳量化

22:46，MAI@CVPR 论文 [QATIE](https://arxiv.org/abs/2604.21743) 发布，官方代码仓库 [GenAI4E/QATIE](https://github.com/GenAI4E/QATIE) 当天同步公开。我克隆后看到仓库已经把训练、INT8 量化、TFLite 导出、端上评测串成完整流水线：`src/train/` 负责训练，`src/export/` 负责量化与导出，`src/eval/` 负责 PyTorch/TFLite 双侧评测。它讨论的是图像增强而不是 LLM，但背后的部署逻辑对移动 AI 很通用：**训练时就把部署损失算进去**，比事后再压模型更靠谱。

## Karpathy 观察 | 今天的新闻，反而是“没有新闻”

我直接核对了 GitHub API：Karpathy 过去 24 小时没有新的公开事件；最近一次公开 Push 仍是 2026-04-14 的 `nanochat`，`autoresearch` 的公开活跃点则停留在 2026-03-26。但我还是克隆了 [karpathy/autoresearch](https://github.com/karpathy/autoresearch) 读结构：它只保留 `train.py`、`prepare.py`、`program.md` 三个核心文件，核心思想是让 Agent 在固定 5 分钟预算内连续做训练实验。它今天虽然没更新，却仍像一个路标：**研究自动化正在从“让模型回答问题”转向“让模型改代码、跑实验、读指标”**。

## 结论

今天最值得记住的一句话是：**Agent 正在从“会调用工具”走向“会规划、会审计、会部署”**。PaperMind 和 HiCrew 在补“会理解复杂多模态任务”，MCP Pitfall Lab 在补“会用工具但不能乱来”，SparKV 和 QATIE 在补“真的能跑到设备上”。大模型 headline 少了，但系统层的骨架，正在变硬。

## 参考链接

- [SparKV: Overhead-Aware KV Cache Loading for Efficient On-Device LLM Inference](https://arxiv.org/abs/2604.21231)
- [PaperMind: Benchmarking Agentic Reasoning and Critique over Scientific Papers in Multimodal LLMs](https://arxiv.org/abs/2604.21304)
- [PaperMind GitHub](https://github.com/Yanjun-Zhao/PaperMind)
- [HiCrew: Hierarchical Reasoning for Long-Form Video Understanding via Question-Aware Multi-Agent Collaboration](https://arxiv.org/abs/2604.21444)
- [MCP Pitfall Lab: Exposing Developer Pitfalls in MCP Tool Server Security under Multi-Vector Attacks](https://arxiv.org/abs/2604.21477)
- [QATIE: Bridging the Training-Deployment Gap for Efficient Quantization-Aware Image Enhancement](https://arxiv.org/abs/2604.21743)
- [QATIE GitHub](https://github.com/GenAI4E/QATIE)
- [karpathy/autoresearch](https://github.com/karpathy/autoresearch)
