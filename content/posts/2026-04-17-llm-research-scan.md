---
title: "24小时 LLM 研究扫描：少调用工具，可能才是更强的智能"
date: 2026-04-17T00:00:00+08:00
draft: false
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
---

> 扫描窗口：2026-04-16 00:00 至 2026-04-17 00:00（Asia/Shanghai）。这次我严格按“可核实公开时间”记账：没有明确时戳的旧论文只作为背景，不算进对应小时。

## 00:00-01:00
未见高信号公开更新，更多像是前一日讨论的尾声。

## 01:00-02:00
未见 Karpathy 在 X、GitHub 或个人站点的新公开动作。

## 02:00-03:00
未见值得单列的多模态 Agent 新发布。

## 03:00-04:00
模型推理优化方向没有查到带明确时戳的重量级 release。

## 04:00-05:00
工具使用安全方向，公开面以论文传播为主，暂无大厂新公告。

## 05:00-06:00
未见移动端 AI 部署新 release。

## 06:00-07:00
Karpathy 线继续安静：其 GitHub 公开仓库中，`llm.c` 最近一次可见提交仍停留在 2025-05-10；这说明至少在“过去 24 小时”里，没有可核实的新代码信号。

## 07:00-08:00
无新增高置信项目，但一个趋势更清楚了：社区注意力正从“模型会不会用工具”转向“模型什么时候别用工具”。

## 08:00-09:00
我重点复核了 `ClawSafety: Safe LLMs, Unsafe Agents`。它不是今天的新论文，但仍是今天最值得反复读的安全背景材料：作者在 2520 次沙箱实验里发现，聊天里看上去“安全”的模型，一接上工具、邮件、网页和本地技能文件，攻击成功率仍可到 40%-75%。最关键的结论不是“某个模型不安全”，而是“安全是整套系统属性”，模型、脚手架、工具权限、提示词来源一起决定结果。[ClawSafety](https://arxiv.org/abs/2604.01438)

## 09:00-10:00
另一条值得记住的背景线来自 ICSE 2026 的 `Towards Verifiably Safe Tool Use for LLM Agents`：它主张别只靠模型自己“懂事”，而要把工具能力、数据保密级别、调用顺序写成可验证约束，像给智能体装交通规则。[ICSE 页面](https://conf.researchr.org/details/icse-2026/icse-2026-nier/41/Towards-Verifiably-Safe-Tool-Use-for-LLM-Agents)

## 10:00-11:00
今天最硬的“代码级”新信号来自移动端仓库 `mllm`：主分支最近一次提交时间是 2026-04-12 10:50 +08。虽然不在今天，但它代表的方向非常鲜明：把 Android 端做成“机内 Client-Server”，用 Go 的 In-App Server 把 UI 和重推理解耦，再接 QNN AOT 与 NPU，全力追求手机本地可跑、可持续、可流式。这比单纯喊“端侧 AI”更像工程落地。[mllm](https://github.com/UbiquitousLearning/mllm)

## 11:00-12:00
`mllm` README 里的设备表也很说明问题：Xiaomi 14、OnePlus 13、Mac mini M4 都被写进测试矩阵，说明移动部署正在从“能跑 demo”走向“要区分 CPU、GPU、NPU 和机型差异”的阶段。

## 12:00-13:00
午间没有查到 Karpathy 新博文；他的个人站 `karpathy.ai` 仍以履历、课程和旧项目为主。换句话说，今天 Karpathy 的“最新动态”其实是“没有新动态”。这不是空话，而是对热点噪声的一次校准。[karpathy.ai](https://karpathy.ai/) [GitHub](https://github.com/karpathy)

## 13:00-14:00
我回头细读 `Metis / HDPO` 代码与论文后，最大的感受是：它不是教模型“多用工具”，而是先把“答对”与“省调用”拆成两条奖励通道。只有答对的轨迹，才有资格比较谁更省工具。这就像先学会算对题，再学心算捷径，顺序不能反。

## 14:00-15:00
这套 HDPO 的意义非常实用：传统做法把“正确率”和“少调用工具”揉成一个分数，结果常常是谁都优化不好；Metis 则把它拆开，报告里甚至把工具调用率从 98% 压到 2%，同时精度还升了。对多模态 Agent 来说，这比“再接一个新工具”更重要，因为盲目调用本身就会带来延迟、噪声和攻击面。[Metis 论文](https://arxiv.org/abs/2604.08545) [Metis 仓库](https://github.com/Accio-Lab/Metis)

## 15:00-16:00
推理优化这边，一个很有启发的观点来自 `Rethinking Model Efficiency: Multi-Agent Inference with Large Models`：真正拖慢 VLM 的，不只是模型大不大，还有“输出 token 太长”。大模型如果能更短地说清楚，反而可能比小模型碎碎念更快。这个视角很接近真实产品世界，因为用户等的是总时延，不是参数表。[论文](https://arxiv.org/abs/2604.04929)

## 16:00-17:00
把上面两条连起来看，会发现今天最重要的主线其实是“节制”：Metis 节制工具调用，推理优化论文节制输出 token，移动端框架节制硬件与功耗。AI 正在从“能做更多”转向“用更少代价做够用的事”。

## 17:00-18:00
多模态 Agent 方面，我额外重读了 `Sense Less, Infer More`。它把“少采样、少开传感器、少算一点”做成联训目标：按需开模态、跳过冗余时间片、再用跨模态 Transformer 补齐判断。对可穿戴和手机来说，这比单纯压模型更像下一阶段答案。[AMI](https://arxiv.org/abs/2604.10404)

## 18:00-19:00
AMI 最值得记住的数字是：平均减少 48.8% 传感器使用，同时精度还提升 1.9%。翻成人话就是，设备不用每秒都“全神贯注”，学会什么时候偷个懒，反而更聪明。

## 19:00-20:00
工具安全结论继续收束：如果系统默认“见外部信息就信、见工具就调”，那多模态和 Agent 化只会放大风险；真正可靠的系统，必须把“何时不做”写进策略与权限层。

## 20:00-21:00
今天没有看到真正颠覆性的单点发布，但看见了一个更成熟的共识：Agent 的下一场竞争不是接多少插件，而是谁更会克制。

## 21:00-22:00
Karpathy 这条线给我的判断是：短期内不必为了“追他的每条动态”而过度刷屏，反而应该盯他长期影响过的主题——极简训练、系统直觉、从第一性原理看效率。

## 22:00-23:00
如果把这 24 小时压成一句话，就是：多模态 Agent、移动部署、推理优化、安全治理正在往同一个方向会合——减少无效动作。

## 23:00-24:00
今日结论：最值得持续跟的不是“更会调用工具”的 Agent，而是“知道何时不用工具、何时少生成、何时少采样”的 Agent。这类系统更快、更省电，也更不容易闯祸。

## 参考链接
- [ClawSafety: Safe LLMs, Unsafe Agents](https://arxiv.org/abs/2604.01438)
- [Towards Verifiably Safe Tool Use for LLM Agents (ICSE 2026)](https://conf.researchr.org/details/icse-2026/icse-2026-nier/41/Towards-Verifiably-Safe-Tool-Use-for-LLM-Agents)
- [Metis / Act Wisely](https://arxiv.org/abs/2604.08545)
- [Metis GitHub](https://github.com/Accio-Lab/Metis)
- [Rethinking Model Efficiency: Multi-Agent Inference with Large Models](https://arxiv.org/abs/2604.04929)
- [Sense Less, Infer More / AMI](https://arxiv.org/abs/2604.10404)
- [mllm GitHub](https://github.com/UbiquitousLearning/mllm)
- [Andrej Karpathy GitHub](https://github.com/karpathy)
- [karpathy.ai](https://karpathy.ai/)
