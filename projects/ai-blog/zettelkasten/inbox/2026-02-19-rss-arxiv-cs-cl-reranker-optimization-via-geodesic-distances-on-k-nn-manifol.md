---
title: "Reranker Optimization via Geodesic Distances on k-NN Manifolds"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15860"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Reranker Optimization via Geodesic Distances on k-NN Manifolds

> arXiv:2602.15860v1 Announce Type: new 
Abstract: Current neural reranking approaches for retrieval-augmented generation (RAG) rely on cross-encoders or large language models (LLMs), requiring substantial computational resources and exhibiting latencies of 3-5 seconds per query. We propose Maniscope, a geometric reranking method that computes geodesic distances on k-nearest neighbor (k-NN) manifolds constructed over retrieved document candidates. This approach combines global cosine similarity with local manifold geometry to capture semantic structure that flat Euclidean metrics miss. Evaluating on eight BEIR benchmark datasets (1,233 queries), Maniscope outperforms HNSW graph-based baseline on the three hardest datasets (NFCorpus: +7.0%, TREC-COVID: +1.6%, AorB: +2.8% NDCG@3) while being 3.2x faster (4.7 ms vs 14.8 ms average). Compared to cross-encoder rerankers, Maniscope achieves within 2% accuracy at 10-45x lower latency. On TREC-COVID, LLM-Reranker provides only +0.5% NDCG@3 improvement over Maniscope at 840x higher latency, positioning Maniscope as a practical alternative for real-time RAG deployment. The method requires O(N D + M^2 D + M k log k) complexity where M << N , enabling sub-10 ms latency. We plan to release Maniscope as open-source software.

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
