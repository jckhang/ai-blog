---
title: "Training-Free Adaptation of Diffusion Models via Doob's $h$-Transform"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16198"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Training-Free Adaptation of Diffusion Models via Doob's $h$-Transform

> arXiv:2602.16198v1 Announce Type: new 
Abstract: Adaptation methods have been a workhorse for unlocking the transformative power of pre-trained diffusion models in diverse applications. Existing approaches often abstract adaptation objectives as a reward function and steer diffusion models to generate high-reward samples. However, these approaches can incur high computational overhead due to additional training, or rely on stringent assumptions on the reward such as differentiability. Moreover, despite their empirical success, theoretical justification and guarantees are seldom established. In this paper, we propose DOIT (Doob-Oriented Inference-time Transformation), a training-free and computationally efficient adaptation method that applies to generic, non-differentiable rewards. The key framework underlying our method is a measure transport formulation that seeks to transport the pre-trained generative distribution to a high-reward target distribution. We leverage Doob's $h$-transform to realize this transport, which induces a dynamic correction to the diffusion sampling process and enables efficient simulation-based computation without modifying the pre-trained model. Theoretically, we establish a high probability convergence guarantee to the target high-reward distribution via characterizing the approximation error in the dynamic Doob's correction. Empirically, on D4RL offline RL benchmarks, our method consistently outperforms state-of-the-art baselines while preserving sampling efficiency.

## Full Content

⚠️ 内容抓取延迟到分析阶段。使用 web_fetch(url) 或 Jina AI 补充。

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
