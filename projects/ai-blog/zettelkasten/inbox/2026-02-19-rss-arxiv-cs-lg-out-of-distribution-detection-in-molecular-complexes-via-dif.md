---
title: "Out-of-Distribution Detection in Molecular Complexes via Diffusion Models for Irregular Graphs"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2512.18454"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Out-of-Distribution Detection in Molecular Complexes via Diffusion Models for Irregular Graphs

> arXiv:2512.18454v2 Announce Type: replace 
Abstract: Predictive machine learning models generally excel on in-distribution data, but their performance degrades on out-of-distribution (OOD) inputs. Reliable deployment therefore requires robust OOD detection, yet this is particularly challenging for irregular 3D graphs that combine continuous geometry with categorical identities and are unordered by construction. Here, we present a probabilistic OOD detection framework for complex 3D graph data built on a diffusion model that learns a density of the training distribution in a fully unsupervised manner. A key ingredient we introduce is a unified continuous diffusion over both 3D coordinates and discrete features: categorical identities are embedded in a continuous space and trained with cross-entropy, while the corresponding diffusion score is obtained analytically via posterior-mean interpolation from predicted class probabilities. This yields a single self-consistent probability-flow ODE (PF-ODE) that produces per-sample log-likelihoods, providing a principled typicality score for distribution shift. We validate the approach on protein-ligand complexes and construct strict OOD datasets by withholding entire protein families from training. PF-ODE likelihoods identify held-out families as OOD and correlate strongly with prediction errors of an independent binding-affinity model (GEMS), enabling a priori reliability estimates on new complexes. Beyond scalar likelihoods, we show that multi-scale PF-ODE trajectory statistics - including path tortuosity, flow stiffness, and vector-field instability - provide complementary OOD information. Modeling the joint distribution of these trajectory features yields a practical, high-sensitivity detector that improves separation over likelihood-only baselines, offering a label-free OOD quantification workflow for geometric deep learning.

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
