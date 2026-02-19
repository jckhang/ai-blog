---
title: "DistributedEstimator: Distributed Training of Quantum Neural Networks via Circuit Cutting"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16233"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# DistributedEstimator: Distributed Training of Quantum Neural Networks via Circuit Cutting

> arXiv:2602.16233v1 Announce Type: cross 
Abstract: Circuit cutting decomposes a large quantum circuit into a collection of smaller subcircuits. The outputs of these subcircuits are then classically reconstructed to recover the original expectation values. While prior work characterises cutting overhead largely in terms of subcircuit counts and sampling complexity, its end-to-end impact on iterative, estimator-driven training pipelines remains insufficiently measured from a systems perspective. In this paper, we propose a cut-aware estimator execution pipeline that treats circuit cutting as a staged distributed workload and instruments each estimator query into partitioning, subexperiment generation, parallel execution, and classical reconstruction phases. Using logged runtime traces and learning outcomes on two binary classification workloads (Iris and MNIST), we quantify cutting overheads, scaling limits, and sensitivity to injected stragglers, and we evaluate whether accuracy and robustness are preserved under matched training budgets. Our measurements show that cutting introduces substantial end-to-end overheads that grow with the number of cuts, and that reconstruction constitutes a dominant fraction of per-query time, bounding achievable speed-up under increased parallelism. Despite these systems costs, test accuracy and robustness are preserved in the measured regimes, with configuration-dependent improvements observed in some cut settings. These results indicate that practical scaling of circuit cutting for learning workloads hinges on reducing and overlapping reconstruction and on scheduling policies that account for barrier-dominated critical paths.

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
