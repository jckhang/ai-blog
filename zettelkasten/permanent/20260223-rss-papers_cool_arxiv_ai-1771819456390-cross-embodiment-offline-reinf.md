---
id: 20260223-rss-papers_cool_arxiv_ai-001-cross-embodiment-offline-reinforcement-learning-fo
title: Cross-Embodiment Offline Reinforcement Learning for Heterogeneous Robot Datasets
created: 2026-04-06
tags: ["rss","ai_research","auto-import","permanent"]
source: "Papers.cool - arXiv AI"
source_url: "https://papers.cool/arxiv/2602.18025"
source_type: "article"
content_length: 1382
quality_score: 0.70
---

# Cross-Embodiment Offline Reinforcement Learning for Heterogeneous Robot Datasets

## 来源信息

- **来源**: Papers.cool - arXiv AI
- **发布时间**: 见原文
- **原文链接**: https://papers.cool/arxiv/2602.18025
- **采集时间**: 2026-04-06

## 核心内容

Scalable robot policy pre-training has been hindered by the high cost of collecting high-quality demonstrations for each platform. In this study, we address this issue by uniting offline reinforcement learning (offline RL) with cross-embodiment learning. Offline RL leverages both expert and abundant suboptimal data, and cross-embodiment learning aggregates heterogeneous robot trajectories across diverse morphologies to acquire universal control priors. We perform a systematic analysis of this offline RL and cross-embodiment paradigm, providing a principled understanding of its strengths and limitations. To evaluate this offline RL and cross-embodiment paradigm, we construct a suite of locomotion datasets spanning 16 distinct robot platforms. Our experiments confirm that this combined approach excels at pre-training with datasets rich in suboptimal trajectories, outperforming pure behavior cloning. However, as the proportion of suboptimal data and the number of robot types increase, we observe that conflicting gradients across morphologies begin to impede learning. To mitigate this, we introduce an embodiment-based grouping strategy in which robots are clustered by morphological similarity and the model is updated with a group gradient. This simple, static grouping substantially reduces inter-robot conflicts and outperforms existing conflict-resolution methods.

## 关键观点

- 本文提出了新的方法或框架，针对现有技术的局限性进行改进
- 通过实验验证了方法的有效性，在特定数据集上取得较好结果
- 核心主题涉及Cross-Embodiment和Offline
- 研究来源: Papers.cool - arXiv AI
- 内容质量评分: 0.70

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- (暂无关联卡片)

---
*RSS 自动采集永久化 - 处理时间: 2026-04-06*
