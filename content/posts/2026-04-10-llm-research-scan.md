---
title: "过去24小时 LLM 研究扫描：多模态 Agent 加速走向可穿戴与高效推理"
date: 2026-04-10T00:00:00+08:00
draft: false
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
---

00:00-01:00
过去一天的主线很清楚：AI 正从“会聊天”变成“会看、会做、还能更省算力”。这一轮最密集的信号集中在多模态 Agent、端侧部署、推理时优化与工具安全四条线上。

01:00-02:00
未见高信号公开更新，更多是前一日发布内容继续被媒体和开发者拆解。

02:00-03:00
未见关键新论文或大模型发布。

03:00-04:00
未见高可信新增动态。

04:00-05:00
未见重要公开更新。

05:00-06:00
未见关键增量。

06:00-07:00
Karpathy 方面，过去 24 小时没有发现新的 GitHub 提交；`karpathy/AutoResearch` 最近一次公开提交停留在 2026-03-26，说明他当下更像是在“放大影响力”，而不是连续刷代码。[AutoResearch commits](https://api.github.com/repos/karpathy/AutoResearch/commits?per_page=5) 仍值得关注，因为它把“科研流程可编程化”这件事推成了 2026 年的一条主线。[AutoResearch](https://github.com/karpathy/AutoResearch)

07:00-08:00
未见 Karpathy 的博客新文；X 侧也未检到过去 24 小时内的高可信新帖。这个“空窗”本身也有信息量：当前讨论热度已从个人观点，转向可复现系统与开源实现。

08:00-09:00
多模态 Agent 方向最值得看的是 `VisionClaw` 论文与仓库：它把智能眼镜、Gemini Live 与 OpenClaw 接起来，让 Agent 直接基于“你眼前所见”执行任务，比如看着商品就比价加购物车、看着海报就建日历。[VisionClaw 论文](https://arxiv.org/html/2604.03486v2) [VisionClaw 仓库](https://github.com/Intent-Lab/VisionClaw)

09:00-10:00
`VisionClaw` 的深层价值，不是“眼镜能问答”，而是把 Agent 的输入从屏幕扩展到真实世界。论文里用户实验显示，相比只会看或只会做的基线系统，它在任务速度上提升 13%-37%，主观难度下降 7%-46%。这意味着下一代 Agent 可能不是“更会写提示词”，而是“更会在环境里行动”。

10:00-11:00
Meta 的 `Muse Spark` 是今天另一个高信号点。它被描述成原生多模态推理模型，强调工具使用、视觉思考和并行多 Agent 推理；更激进的是，它声称在达到前代能力时，所需计算量不到十分之一。[Meta Muse Spark 报道](https://gigazine.net/gsc_news/en/20260409-meta-muse-spark/)

11:00-12:00
如果说 `VisionClaw` 展示的是“Agent 长出眼睛”，那 `Muse Spark` 展示的就是“Agent 学会分工”。Meta 提到的 Contemplating mode，本质是让多个 Agent 并行思考，而不是单模型傻等更长链路。这很像把“多核 CPU”思路搬进推理层，意义在于性能提升不必总靠更长思维链。

12:00-13:00
端侧部署方面，过去 24 小时没有同量级新品，但 `Gemma 4` 仍是最值得补课的背景信号：E2B/E4B 两个小模型把手机、树莓派、Jetson 这类设备重新拉回战场，尤其是原生音频与视觉输入，说明“手机本地跑多模态”正在从演示走向方案化。[Gemma 4 解读](https://alphasignalai.substack.com/p/why-gemma-4-could-be-a-turning-point)

13:00-14:00
推理优化方面，今天最硬的论文是 `Select-then-Solve`。它比较了 Direct、CoT、ReAct、Plan-Execute、Reflection、ReCode 六种范式，结论很反常识：没有哪一种推理外壳永远最好。比如 ReAct 在 GAIA 上能比 Direct 高 44 个百分点，但 CoT 在 HumanEval 上反而拖后腿 15 个点。[STS 论文](https://arxiv.org/html/2604.06753v1) [STS 代码](https://github.com/hengzzzhou/STS)

14:00-15:00
这篇论文最重要的启发是：未来优化不只是“换更强模型”，而是先判断任务属于哪类，再给它配最合适的思考方式。它的 embedding router 把平均准确率从 47.6% 拉到 53.1%。通俗说，同一个大脑，换对做题策略，就能明显提分。

15:00-16:00
模型压缩侧，`MoBiE` 针对 MoE 模型做二值化后训练量化，核心是尽量别把“该路由到哪个专家”这件事量化坏。论文报告在 Qwen3-30B-A3B 上可带来 2.33 倍吞吐、超过 90% 的专家层显存下降，同时把性能损失压得很低。[MoBiE 论文](https://arxiv.org/html/2604.06798v1)

16:00-17:00
这类工作为什么重要？因为端侧 AI 真正卡住的常常不是“参数总量”，而是推理时活跃参数的速度与内存。MoE 原本就擅长“少激活、多容量”，MoBiE 则进一步把这条路压到更低比特，等于给手机、边缘盒子和私有部署都多开了一扇门。

17:00-18:00
工具使用与安全方面，过去 24 小时没有决定性新论文，但 `SkillSieve` 代表了一个越来越现实的问题：Agent 的风险不只在模型本身，也在技能市场、工具说明和跨文件提示注入。它把静态扫描、分解式 LLM 审核和多模型陪审团组合起来，在低成本下筛查恶意技能。[SkillSieve](https://arxiv.org/html/2604.06550v1)

18:00-19:00
这说明 2026 年的安全焦点正在迁移：从“模型会不会胡说”，转向“模型会不会被工具链带坏”。当 Agent 真能发消息、调浏览器、接支付、碰私密文件时，安全边界必须前移到技能与执行层。

19:00-20:00
未见新的高信号发布。

20:00-21:00
未见关键新增动态。

21:00-22:00
未见高可信新增动态。

22:00-23:00
未见重要公开更新。

23:00-24:00
一句话总结今天：Karpathy 继续扮演“研究自动化叙事的点火者”；真正往前冲的，是能看世界的多模态 Agent、会挑推理范式的路由器、以及把大模型压进更小设备里的部署技术。下一阶段的竞争，不只是模型更大，而是谁能把“感知、推理、执行、安全”四件事一起做好。

## 参考链接

- [Andrej Karpathy / AutoResearch](https://github.com/karpathy/AutoResearch)
- [AutoResearch commits API](https://api.github.com/repos/karpathy/AutoResearch/commits?per_page=5)
- [VisionClaw: Always-On AI Agents Through Smart Glasses](https://arxiv.org/html/2604.03486v2)
- [VisionClaw GitHub](https://github.com/Intent-Lab/VisionClaw)
- [Select-then-Solve: Paradigm Routing as Inference-Time Optimization for LLM Agents](https://arxiv.org/html/2604.06753v1)
- [STS GitHub](https://github.com/hengzzzhou/STS)
- [MoBiE: Efficient Inference of Mixture of Binary Experts under Post-Training Quantization](https://arxiv.org/html/2604.06798v1)
- [SkillSieve: A Hierarchical Triage Framework for Detecting Malicious AI Agent Skills](https://arxiv.org/html/2604.06550v1)
- [Meta announces Muse Spark](https://gigazine.net/gsc_news/en/20260409-meta-muse-spark/)
- [Why Gemma 4 Could Be a Turning Point for Open-Source AI](https://alphasignalai.substack.com/p/why-gemma-4-could-be-a-turning-point)
