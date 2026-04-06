---
id: 20260223-rss-papers_cool_arxiv_ai-001-somtime-the-world-ain-t-fair-violating-fairness-us
title: SOMtime the World Ain$'$t Fair: Violating Fairness Using Self-Organizing Maps
created: 2026-04-06
tags: ["rss","ai_research","auto-import","permanent"]
source: "Papers.cool - arXiv AI"
source_url: "https://papers.cool/arxiv/2602.18201"
source_type: "article"
content_length: 1347
quality_score: 0.70
---

# SOMtime the World Ain$'$t Fair: Violating Fairness Using Self-Organizing Maps

## 来源信息

- **来源**: Papers.cool - arXiv AI
- **发布时间**: 见原文
- **原文链接**: https://papers.cool/arxiv/2602.18201
- **采集时间**: 2026-04-06

## 核心内容

Unsupervised representations are widely assumed to be neutral with respect to sensitive attributes when those attributes are withheld from training. We show that this assumption is false. Using SOMtime, a topology-preserving representation method based on high-capacity Self-Organizing Maps, we demonstrate that sensitive attributes such as age and income emerge as dominant latent axes in purely unsupervised embeddings, even when explicitly excluded from the input. On two large-scale real-world datasets (the World Values Survey across five countries and the Census-Income dataset), SOMtime recovers monotonic orderings aligned with withheld sensitive attributes, achieving Spearman correlations of up to 0.85, whereas PCA and UMAP typically remain below 0.23 (with a single exception reaching 0.31), and against t-SNE and autoencoders which achieve at most 0.34. Furthermore, unsupervised segmentation of SOMtime embeddings produces demographically skewed clusters, demonstrating downstream fairness risks without any supervised task. These findings establish that \textit{fairness through unawareness} fails at the representation level for ordinal sensitive attributes and that fairness auditing must extend to unsupervised components of machine learning pipelines. We have made the code available at~ https://github.com/JosephBingham/SOMtime

## 关键观点

- 通过实验验证了方法的有效性，在特定数据集上取得较好结果
- 核心主题涉及SOMtime和Ain$'$t
- 研究来源: Papers.cool - arXiv AI
- 内容质量评分: 0.70

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- (暂无关联卡片)

---
*RSS 自动采集永久化 - 处理时间: 2026-04-06*
