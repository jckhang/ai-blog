---
id: 20260220-rss-arxiv_cs-001-gpu-accelerated-algorithms-for-graph-vector-search
title: GPU-Accelerated Algorithms for Graph Vector Search: Taxonomy, Empirical Study, and Research Directions
created: 2026-02-20
tags: ["rss","ai_research","auto-import","permanent"]
source: "arXiv.org > Computer Science"
source_url: "https://arxiv.org/abs/2602.16719"
source_type: "article"
content_length: 1507
quality_score: 0.70
---

# GPU-Accelerated Algorithms for Graph Vector Search: Taxonomy, Empirical Study, and Research Directions

## 来源信息

- **来源**: arXiv.org > Computer Science
- **发布时间**: 见原文
- **原文链接**: https://arxiv.org/abs/2602.16719
- **采集时间**: 2026-02-20

## 核心内容

arXiv:2602.16719v1 Announce Type: new 
Abstract: Approximate Nearest Neighbor Search (ANNS) underpins many large-scale data mining and machine learning applications, with efficient retrieval increasingly hinging on GPU acceleration as dataset sizes grow. Although graph-based approaches represent the state of the art in approximate nearest neighbor search, there is a lack of systematic understanding regarding their optimization for modern GPU architectures and their end-to-end effectiveness in practical scenarios. In this work, we present a comprehensive survey and experimental study of GPU-accelerated graph-based vector search algorithms. We establish a detailed taxonomy of GPU optimization strategies and clarify the mapping between algorithmic tasks and hardware execution units within GPUs. Through a thorough evaluation of six leading algorithms on eight large-scale benchmark datasets, we assess both graph index construction and query search performance. Our analysis reveals that distance computation remains the primary computational bottleneck, while data transfer between the host CPU and GPU emerges as the dominant factor influencing real-world latency at large scale. We also highlight key trade-offs in scalability and memory usage across different system designs. Our findings offer clear guidelines for designing scalable and robust GPU-powered approximate nearest neighbor search systems, and provide a comprehensive benchmark for the knowledge discovery and data mining community.

## 关键观点

- GPU加速算法在大规模图向量检索中显著提升性能
- 核心主题涉及GPU-Accelerated和Algorithms
- 研究来源: arXiv.org > Computer Science
- 内容质量评分: 0.70

## 深度思考

- GPU加速在大规模图检索中的实际加速比是多少？
- 算法优化与硬件特性的协同设计原则是什么？
- 内存带宽成为瓶颈时如何进一步优化？
- 这些算法在边缘设备上的可行性如何？

## 相关链接

- (暂无更多关联卡片)

