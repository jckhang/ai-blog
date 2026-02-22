---
id: 20260220-rss-arxiv_cs-001-guided-exploration-of-sequential-rules
title: Guided Exploration of Sequential Rules
created: 2026-02-20
tags: ["rss","ai_research","auto-import","permanent"]
source: "arXiv.org > Computer Science"
source_url: "https://arxiv.org/abs/2602.16717"
source_type: "article"
content_length: 1727
quality_score: 0.70
---

# Guided Exploration of Sequential Rules

## 来源信息

- **来源**: arXiv.org > Computer Science
- **发布时间**: 见原文
- **原文链接**: https://arxiv.org/abs/2602.16717
- **采集时间**: 2026-02-20

## 核心内容

arXiv:2602.16717v1 Announce Type: new 
Abstract: In pattern mining, sequential rules provide a formal framework to capture the temporal relationships and inferential dependencies between items. However, the discovery process is computationally intensive. To obtain mining results efficiently and flexibly, many methods have been proposed that rely on specific evaluation metrics (i.e., ensuring results meet minimum threshold requirements). A key issue with these methods, however, is that they generate many sequential rules that are irrelevant to users. Such rules not only incur additional computational overhead but also complicate downstream analysis. In this paper, we investigate how to efficiently discover user-centric sequential rules. The original database is first processed to determine whether a target query rule is present. To prune unpromising items and avoid unnecessary expansions, we design tight and generalizable upper bounds. We introduce a novel method for efficiently generating target sequential rules using the proposed techniques and pruning strategies. In addition, we propose the corresponding mining algorithms for two common evaluation metrics: frequency and utility. We also design two rule similarity metrics to help discover the most relevant sequential rules. Extensive experiments demonstrate that our algorithms outperform state-of-the-art approaches in terms of runtime and memory usage, while discovering a concise set of sequential rules under flexible similarity settings. Targeted sequential rule search can handle sequence data with personalized features and achieve pattern discovery. The proposed solution addresses several challenges and can be applied to two common mining tasks.

## 关键观点

- 序列规则挖掘和引导探索用于时间序列数据分析
- 本文提出了新的方法或框架，针对现有技术的局限性进行改进
- 通过实验验证了方法的有效性，在特定数据集上取得较好结果

## 深度思考

- 序贯规则挖掘在电商推荐系统中的实际效果如何？
- 引导策略如何平衡exploitation和exploration？
- 规则数量爆炸问题如何控制？
- 实时更新规则库的计算成本是否可接受？

## 相关链接

- [[017-深度研究工具链]]

