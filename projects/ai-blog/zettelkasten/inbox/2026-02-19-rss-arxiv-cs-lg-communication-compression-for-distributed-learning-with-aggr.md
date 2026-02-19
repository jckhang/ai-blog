---
title: "Communication Compression for Distributed Learning with Aggregate and Server-Guided Feedback"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2512.22623"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Communication Compression for Distributed Learning with Aggregate and Server-Guided Feedback

> arXiv:2512.22623v2 Announce Type: replace 
Abstract: Distributed learning, particularly Federated Learning (FL), faces a significant bottleneck in the communication cost, particularly the uplink transmission of client-to-server updates, which is often constrained by asymmetric bandwidth limits at the edge. Biased compression techniques are effective in practice, but require error feedback mechanisms to provide theoretical guarantees and to ensure convergence when compression is aggressive. Standard error feedback, however, relies on client-specific control variates, which violates user privacy and is incompatible with stateless clients common in large-scale FL. This paper proposes two novel frameworks that enable biased compression without client-side state or control variates. The first, Compressed Aggregate Feedback (CAFe), uses the globally aggregated update from the previous round as a shared control variate for all clients. The second, Server-Guided Compressed Aggregate Feedback (CAFe-S), extends this idea to scenarios where the server possesses a small private dataset; it generates a server-guided candidate update to be used as a more accurate predictor. We consider Distributed Gradient Descent (DGD) as a representative algorithm and analytically prove CAFe's superiority to Distributed Compressed Gradient Descent (DCGD) with biased compression in the non-convex regime with bounded gradient dissimilarity. We further prove that CAFe-S converges to a stationary point, with a rate that improves as the server's data become more representative. Experimental results in FL scenarios validate the superiority of our approaches over existing compression schemes.

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
