---
title: "Weight space Detection of Backdoors in LoRA Adapters"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15195"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Weight space Detection of Backdoors in LoRA Adapters

> arXiv:2602.15195v2 Announce Type: replace-cross 
Abstract: LoRA adapters let users fine-tune large language models (LLMs) efficiently. However, LoRA adapters are shared through open repositories like Hugging Face Hub \citep{huggingface_hub_docs}, making them vulnerable to backdoor attacks. Current detection methods require running the model with test input data -- making them impractical for screening thousands of adapters where the trigger for backdoor behavior is unknown. We detect poisoned adapters by analyzing their weight matrices directly, without running the model -- making our method data-agnostic. Our method extracts simple statistics -- how concentrated the singular values are, their entropy, and the distribution shape -- and flags adapters that deviate from normal patterns. We evaluate the method on 500 LoRA adapters -- 400 clean, and 100 poisoned for Llama-3.2-3B on instruction and reasoning datasets: Alpaca, Dolly, GSM8K, ARC-Challenge, SQuADv2, NaturalQuestions, HumanEval, and GLUE dataset. We achieve 97\% detection accuracy with less than 2\% false positives.

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
