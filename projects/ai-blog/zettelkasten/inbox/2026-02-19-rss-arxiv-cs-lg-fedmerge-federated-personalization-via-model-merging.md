---
title: "FedMerge: Federated Personalization via Model Merging"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2504.06768"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# FedMerge: Federated Personalization via Model Merging

> arXiv:2504.06768v3 Announce Type: replace 
Abstract: One global model in federated learning (FL) might not be sufficient to serve many clients with non-IID tasks and distributions. While there has been advances in FL to train multiple global models for better personalization, they only provide limited choices to clients so local finetuning is still indispensable. In this paper, we propose a novel ``FedMerge'' approach that can create a personalized model per client by simply merging multiple global models with automatically optimized and customized weights. In FedMerge, a few global models can serve many non-IID clients, even without further local finetuning. We formulate this problem as a joint optimization of global models and the merging weights for each client. Unlike existing FL approaches where the server broadcasts one or multiple global models to all clients, the server only needs to send a customized, merged model to each client. Moreover, instead of periodically interrupting the local training and re-initializing it to a global model, the merged model aligns better with each client's task and data distribution, smoothening the local-global gap between consecutive rounds caused by client drift. We evaluate FedMerge on three different non-IID settings applied to different domains with diverse tasks and data types, in which FedMerge consistently outperforms existing FL approaches, including clustering-based and mixture-of-experts (MoE) based methods.

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
