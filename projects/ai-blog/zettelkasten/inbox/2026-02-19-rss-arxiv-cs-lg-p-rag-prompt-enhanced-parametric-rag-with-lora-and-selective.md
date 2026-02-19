---
title: "P-RAG: Prompt-Enhanced Parametric RAG with LoRA and Selective CoT for Biomedical and Multi-Hop QA"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.15874"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# P-RAG: Prompt-Enhanced Parametric RAG with LoRA and Selective CoT for Biomedical and Multi-Hop QA

> arXiv:2602.15874v1 Announce Type: cross 
Abstract: Large Language Models (LLMs) demonstrate remarkable capabilities but remain limited by their reliance on static training data. Retrieval-Augmented Generation (RAG) addresses this constraint by retrieving external knowledge during inference, though it still depends heavily on knowledge base quality. To explore potential improvements, we evaluated three RAG variants-Standard RAG, DA-RAG, and our proposed Prompt-Enhanced Parametric RAG (P-RAG), a hybrid architecture that integrates parametric knowledge within the LLM and retrieved evidence, guided by Chain-of-Thought (CoT) prompting and Low-Rank Adaptation (LoRA) fine-tuning-on both general and biomedical datasets. Using LLaMA-3.2-1B-Instruct fine-tuned via LoRA, we evaluate on PubMedQA and 2WikiMultihopQA. P-RAG outperforms Standard RAG on PubMedQA by 10.47 percentage points in F1 (93.33% vs. 82.86%; 12.64% relative). On 2WikiMultihopQA, P-RAG nearly doubles the overall score vs. Standard RAG (33.44% vs. 17.83%) and achieves 44.03% on the Compare subset (with 42.74% Bridge, 21.84% Inference, 8.60% Compose). CoT prompting substantially improves multi-hop reasoning but yields mixed results for simpler, single-hop queries. These findings underscore P-RAG's potential for accurate, scalable, and contextually adaptive biomedical question answering. Our contributions include: (1) LoRA-based fine-tuning of LLaMA-3.2-1B-Instruct for biomedical QA, (2) introduction of P-RAG with Chain-of-Thought prompting, and (3) state-of-the-art results on PubMedQA and 2WikiMultihopQA.

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
