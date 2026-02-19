---
title: "VerifiableFL: Verifiable Claims for Federated Learning using Exclaves"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2412.10537"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# VerifiableFL: Verifiable Claims for Federated Learning using Exclaves

> arXiv:2412.10537v4 Announce Type: replace-cross 
Abstract: In federated learning (FL), data providers jointly train a machine learning model without sharing their training data. This makes it challenging to provide verifiable claims about the trained FL model, e.g., related to the employed training data, any data sanitization, or the correct training algorithm-a malicious data provider can simply deviate from the correct training protocol without detection. While prior FL training systems have explored the use of trusted execution environments (TEEs) to protect the training computation, such approaches rely on the confidentiality and integrity of TEEs. The confidentiality guarantees of TEEs, however, have been shown to be vulnerable to a wide range of attacks, such as side-channel attacks. We describe VerifiableFL, a system for training FL models that establishes verifiable claims about trained FL models with the help of fine-grained runtime attestation proofs. Since these runtime attestation proofs only require integrity protection, VerifiableFL generates them using the new abstraction of exclaves. Exclaves are integrity-only execution environments, which do not contain software-managed secrets and thus are immune to data leakage attacks. VerifiableFL uses exclaves to attest individual data transformations during FL training without relying on confidentiality guarantees. The runtime attestation proofs then form an attested dataflow graph of the entire FL model training computation. The graph is checked by an auditor to ensure that the trained FL model satisfies its claims, such as the use of data sanitization by data providers or correct aggregation by the model provider. VerifiableFL extends NVFlare FL framework to use exclaves. We show that VerifiableFL introduces less than 12% overhead compared to unprotected FL training.

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
