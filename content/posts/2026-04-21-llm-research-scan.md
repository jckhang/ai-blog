---
title: "过去24小时 AI/LLM 研究扫描：推理栈继续提速，Agent 开始补安全课"
date: 2026-04-21T00:00:00+08:00
draft: false
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
---

过去 24 小时，AI 圈没有一颗“核弹级”新模型落地，但工程层的推进非常扎实：推理框架在继续榨干硬件，多模态与移动端路线更像产品而不是 demo，Agent 生态则明显把注意力从“会不会调用工具”转向“调用后能不能被约束”。

## 00:00-08:00

Andrej Karpathy 这段时间公开面相对安静。我检查了 GitHub 与公开网页检索，过去 24 小时里没有看到他新的博客或 X 动态；`karpathy/nanochat` 最近一次可见提交仍停留在 `2026-04-14`。这不是坏消息，反而说明今天的主旋律不是个人观点爆发，而是基础设施团队持续打磨。与此同时，`openai/openai-agents-python` 的仓库结构仍把 `tools`、`guardrails`、`sessions`、`tracing` 放在最核心的位置，说明 Agent SDK 已经把“工具治理”当成一等公民。

## 08:00-12:00

推理优化这半天最密集的是 `vllm`。仓库在 24 小时内连续落了多条和 FP8、ROCm、speculative decoding 相关的提交，包括 `5955626`、`3a30eaa`、`fb5635d`、`7243e02`。把这些名字翻成大白话，就是：同一份模型服务栈，正在同时优化更轻的量化路径、更快的 MLA/注意力内核、以及 AMD 平台上的投机解码配合。这种更新不只意味着“跑分更高”，更意味着推理框架开始认真处理异构硬件现实：以后团队不一定非得围着单一 GPU 平台转。

## 12:00-16:00

本地与端侧这边，`llama.cpp` 和 `ExecuTorch` 是今天最有代表性的两条线。`llama.cpp` 在过去 24 小时内出现 `a6cc43c`，继续更新 `ggml-webgpu` 的矩阵向量乘实现；它 README 里同时保留 Android、GGUF、multimodal、WebGPU 几条路线，说明它仍是“哪里都能跑一点”的最强民间基座。`executorch` 虽然今天公开提交不多，但主仓结构已经很清楚：`backends`、`kernels`、`runtime`、`extension` 并列，README 直接把 iOS、Android、XNNPACK、QNN、多模态 runner 摆在首页。这条路线的意义在于，移动部署不再只是“把小模型塞进手机”，而是把导出、量化、后端选择、运行时接口做成一整条流水线。

## 16:00-20:00

多模态 Agent 这边，我重点补读了论文《OpenMobile》。它最有价值的地方不是又报了一个更高分，而是把“开源移动 Agent 为什么总落后闭源系统”拆开讲清楚：真正稀缺的不是模型权重，而是高质量任务指令和轨迹数据。作者把方案分成两步：先探索 App，建立“全局环境记忆”；再在 rollout 时让 learner 和 expert 交替接管，专门收集错误恢复轨迹。结果是开源数据训练出的模型在 AndroidWorld 达到 51.7% 和 64.7%。这给行业的启发很直接：未来手机 Agent 的护城河，越来越像“数据生产系统”而不是“单次模型训练”。

## 20:00-24:00

工具使用与安全，是今天最值得深挖的一条暗线。我全文读了《Symbolic Guardrails for Domain-Specific Agents》。这篇论文最硬的结论有两个：一是他们检查 80 个 Agent 安全基准后发现，85% 根本没有把策略写清楚；二是在那些真正写清楚规则的场景里，74% 的要求可以用符号化 guardrails 强制执行。意思很简单：很多人以为 Agent 安全要靠“更聪明的模型”，但作者证明了，很多高风险动作其实更适合交给显式规则、权限边界和流程检查。它和 `openai-agents-python` 的 guardrails、sessions、tracing 放在一起看，会发现 2026 年的 Agent 工程正在补同一门课：不是更会做事，而是更可控地做事。

## 来源汇总

- [openai-agents-python README](https://github.com/openai/openai-agents-python/blob/main/README.md)
- [vLLM 仓库](https://github.com/vllm-project/vllm)
- [llama.cpp README](https://github.com/ggml-org/llama.cpp/blob/master/README.md)
- [ExecuTorch README](https://github.com/pytorch/executorch/blob/main/README.md)
- [OpenMobile 论文 HTML](https://arxiv.org/html/2604.15093v1)
- [Symbolic Guardrails 论文 HTML](https://arxiv.org/html/2604.15579v1)
- [karpathy/nanochat](https://github.com/karpathy/nanochat)
