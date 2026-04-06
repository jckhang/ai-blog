---
title: "Enhancing Policy Learning with World-Action Model"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2603.28955"
date: 2026-04-01T04:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Enhancing Policy Learning with World-Action Model

> arXiv:2603.28955v1 Announce Type: new 
Abstract: This paper presents the World-Action Model (WAM), an action-regularized world model that jointly reasons over future visual observations and the actions that drive state transitions. Unlike conventional world models trained solely via image prediction, WAM incorporates an inverse dynamics objective into DreamerV2 that predicts actions from latent state transitions, encouraging the learned representations to capture action-relevant structure critical for downstream control. We evaluate WAM on enhancing policy learning across eight manipulation tasks from the CALVIN benchmark. We first pretrain a diffusion policy via behavioral cloning on world model latents, then refine it with model-based PPO inside the frozen world model. Without modifying the policy architecture or training procedure, WAM improves average behavioral cloning success from 59.4% to 71.2% over DreamerV2 and DiWA baselines. After PPO fine-tuning, WAM achieves 92.8% average success versus 79.8% for the baseline, with two tasks reaching 100%, using 8.7x fewer training steps.

## Full Content

arXiv:2603.28955v1 Announce Type: new 
Abstract: This paper presents the World-Action Model (WAM), an action-regularized world model that jointly reasons over future visual observations and the actions that drive state transitions. Unlike conventional world models trained solely via image prediction, WAM incorporates an inverse dynamics objective into DreamerV2 that predicts actions from latent state transitions, encouraging the learned representations to capture action-relevant structure critical for downstream control. We evaluate WAM on enhancing policy learning across eight manipulation tasks from the CALVIN benchmark. We first pretrain a diffusion policy via behavioral cloning on world model latents, then refine it with model-based PPO inside the frozen world model. Without modifying the policy architecture or training procedure, WAM improves average behavioral cloning success from 59.4% to 71.2% over DreamerV2 and DiWA baselines. After PPO fine-tuning, WAM achieves 92.8% average success versus 79.8% for the baseline, with two tasks reaching 100%, using 8.7x fewer training steps.

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接 [[...]]
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
