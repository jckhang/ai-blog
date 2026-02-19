---
title: "Pretraining Language Models for Diachronic Linguistic Change Discovery"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2504.05523"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Pretraining Language Models for Diachronic Linguistic Change Discovery

> arXiv:2504.05523v3 Announce Type: replace 
Abstract: Large language models (LLMs) have shown potential as tools for scientific discovery. This has engendered growing interest in their use in humanistic disciplines, such as historical linguistics and literary studies. These fields often construct arguments on the basis of delineations like genre, or more inflexibly, time period. Although efforts have been made to restrict inference to specific domains via fine-tuning or model editing, we posit that the only true guarantee is domain-restricted pretraining -- typically, a data- and compute-expensive proposition.
  We show that efficient pretraining techniques can produce useful models over corpora too large for easy manual inspection but too small for "typical" LLM approaches. We employ a novel date-attribution pipeline in order to obtain a temporally-segmented dataset of five 10-million-word slices. We train two corresponding five-model batteries over these corpus segments, efficient pretraining and Llama3-8B parameter efficiently finetuned.
  We find that the pretrained models are faster to train than the finetuned baselines and that they better respect the historical divisions of our corpus. Emphasizing speed and precision over a-historical comprehensiveness enables a number of novel approaches to hypothesis discovery and testing in our target fields. Taking up diachronic linguistics as a testbed, we show that our method enables the detection of a diverse set of phenomena, including en masse lexical change, non-lexical (grammatical and morphological) change, and word sense introduction/obsolescence. We provide a ready-to-use pipeline that allows extension of our approach to other target fields with only minimal adaptation.

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
