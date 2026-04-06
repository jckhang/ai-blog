---
title: "TED: Training-Free Experience Distillation for Multimodal Reasoning"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2603.26778"
date: 2026-04-01T04:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# TED: Training-Free Experience Distillation for Multimodal Reasoning

> arXiv:2603.26778v1 Announce Type: new 
Abstract: Knowledge distillation is typically realized by transferring a teacher model's knowledge into a student's parameters through supervised or reinforcement-based optimization. While effective, such approaches require repeated parameter updates and large-scale training data, limiting their applicability in resource-constrained environments. In this work, we propose TED, a training-free, context-based distillation framework that shifts the update target of distillation from model parameters to an in-context experience injected into the student's prompt. For each input, the student generates multiple reasoning trajectories, while a teacher independently produces its own solution. The teacher then compares the student trajectories with its reasoning and the ground-truth answer, extracting generalized experiences that capture effective reasoning patterns. These experiences are continuously refined and updated over time. A key challenge of context-based distillation is unbounded experience growth and noise accumulation. TED addresses this with an experience compression mechanism that tracks usage statistics and selectively merges, rewrites, or removes low-utility experiences. Experiments on multimodal reasoning benchmarks MathVision and VisualPuzzles show that TED consistently improves performance. On MathVision, TED raises the performance of Qwen3-VL-8B from 0.627 to 0.702, and on VisualPuzzles from 0.517 to 0.561 with just 100 training samples. Under this low-data, no-update setting, TED achieves performance competitive with fully trained parameter-based distillation while reducing training cost by over 5x, demonstrating that meaningful knowledge transfer can be achieved through contextual experience.

## Full Content

arXiv:2603.26778v1 Announce Type: new 
Abstract: Knowledge distillation is typically realized by transferring a teacher model's knowledge into a student's parameters through supervised or reinforcement-based optimization. While effective, such approaches require repeated parameter updates and large-scale training data, limiting their applicability in resource-constrained environments. In this work, we propose TED, a training-free, context-based distillation framework that shifts the update target of distillation from model parameters to an in-context experience injected into the student's prompt. For each input, the student generates multiple reasoning trajectories, while a teacher independently produces its own solution. The teacher then compares the student trajectories with its reasoning and the ground-truth answer, extracting generalized experiences that capture effective reasoning patterns. These experiences are continuously refined and updated over time. A key challenge of context-based distillation is unbounded experience growth and noise accumulation. TED addresses this with an experience compression mechanism that tracks usage statistics and selectively merges, rewrites, or removes low-utility experiences. Experiments on multimodal reasoning benchmarks MathVision and VisualPuzzles show that TED consistently improves performance. On MathVision, TED raises the performance of Qwen3-VL-8B from 0.627 to 0.702, and on VisualPuzzles from 0.517 to 0.561 with just 100 training samples. Under this low-data, no-update setting, TED achieves performance competitive with fully trained parameter-based distillation while reducing training cost by over 5x, demonstrating that meaningful knowledge transfer can be achieved through contextual experience.

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接 [[...]]
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
