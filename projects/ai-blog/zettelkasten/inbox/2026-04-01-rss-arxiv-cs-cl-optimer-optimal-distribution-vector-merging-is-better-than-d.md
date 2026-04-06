---
title: "OptiMer: Optimal Distribution Vector Merging Is Better than Data Mixing for Continual Pre-Training"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2603.28858"
date: 2026-04-01T04:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# OptiMer: Optimal Distribution Vector Merging Is Better than Data Mixing for Continual Pre-Training

> arXiv:2603.28858v1 Announce Type: new 
Abstract: Continual pre-training is widely used to adapt LLMs to target languages and domains, yet the mixture ratio of training data remains a sensitive hyperparameter that is expensive to tune: they must be fixed before training begins, and a suboptimal choice can waste weeks of compute. In this work, we propose OptiMer, which decouples ratio selection from training: we train one CPT model per dataset, extract each model's distribution vector, which represents the parameter shift induced by that dataset, and search for optimal composition weights post-hoc via Bayesian optimization. Experiments on Gemma 3 27B across languages (Japanese, Chinese) and domains (Math, Code) show that OptiMer consistently outperforms data mixture and model averaging baselines with 15-35 times lower search cost. Key findings reveal that 1) the optimized weights can be interpreted as data mixture ratios, and retraining with these ratios improves data mixture CPT, and 2) the same vector pool can be re-optimized for a given objective without any retraining, producing target-tailored models on demand. Our work establishes that data mixture ratio selection, traditionally a pre-training decision, can be reformulated as a post-hoc optimization over distribution vectors, offering a more flexible paradigm for continual pre-training.

## Full Content

arXiv:2603.28858v1 Announce Type: new 
Abstract: Continual pre-training is widely used to adapt LLMs to target languages and domains, yet the mixture ratio of training data remains a sensitive hyperparameter that is expensive to tune: they must be fixed before training begins, and a suboptimal choice can waste weeks of compute. In this work, we propose OptiMer, which decouples ratio selection from training: we train one CPT model per dataset, extract each model's distribution vector, which represents the parameter shift induced by that dataset, and search for optimal composition weights post-hoc via Bayesian optimization. Experiments on Gemma 3 27B across languages (Japanese, Chinese) and domains (Math, Code) show that OptiMer consistently outperforms data mixture and model averaging baselines with 15-35 times lower search cost. Key findings reveal that 1) the optimized weights can be interpreted as data mixture ratios, and retraining with these ratios improves data mixture CPT, and 2) the same vector pool can be re-optimized for a given objective without any retraining, producing target-tailored models on demand. Our work establishes that data mixture ratio selection, traditionally a pre-training decision, can be reformulated as a post-hoc optimization over distribution vectors, offering a more flexible paradigm for continual pre-training.

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接 [[...]]
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
