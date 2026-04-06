---
title: "Known Intents, New Combinations: Clause-Factorized Decoding for Compositional Multi-Intent Detection"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2603.28929"
date: 2026-04-01T04:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Known Intents, New Combinations: Clause-Factorized Decoding for Compositional Multi-Intent Detection

> arXiv:2603.28929v1 Announce Type: new 
Abstract: Multi-intent detection papers usually ask whether a model can recover multiple intents from one utterance. We ask a harder and, for deployment, more useful question: can it recover new combinations of familiar intents? Existing benchmarks only weakly test this, because train and test often share the same broad co-occurrence patterns. We introduce CoMIX-Shift, a controlled benchmark built to stress compositional generalization in multi-intent detection through held-out intent pairs, discourse-pattern shift, longer and noisier wrappers, held-out clause templates, and zero-shot triples. We also present ClauseCompose, a lightweight decoder trained only on singleton intents, and compare it to whole-utterance baselines including a fine-tuned tiny BERT model. Across three random seeds, ClauseCompose reaches 95.7 exact match on unseen intent pairs, 93.9 on discourse-shifted pairs, 62.5 on longer/noisier pairs, 49.8 on held-out templates, and 91.1 on unseen triples. WholeMultiLabel reaches 81.4, 55.7, 18.8, 15.5, and 0.0; the BERT baseline reaches 91.5, 77.6, 48.9, 11.0, and 0.0. We also add a 240-example manually authored SNIPS-style compositional set with five held-out pairs; there, ClauseCompose reaches 97.5 exact match on unseen pairs and 86.7 under connector shift, compared with 41.3 and 10.4 for WholeMultiLabel. The results suggest that multi-intent detection needs more compositional evaluation, and that simple factorization goes surprisingly far once evaluation asks for it.

## Full Content

arXiv:2603.28929v1 Announce Type: new 
Abstract: Multi-intent detection papers usually ask whether a model can recover multiple intents from one utterance. We ask a harder and, for deployment, more useful question: can it recover new combinations of familiar intents? Existing benchmarks only weakly test this, because train and test often share the same broad co-occurrence patterns. We introduce CoMIX-Shift, a controlled benchmark built to stress compositional generalization in multi-intent detection through held-out intent pairs, discourse-pattern shift, longer and noisier wrappers, held-out clause templates, and zero-shot triples. We also present ClauseCompose, a lightweight decoder trained only on singleton intents, and compare it to whole-utterance baselines including a fine-tuned tiny BERT model. Across three random seeds, ClauseCompose reaches 95.7 exact match on unseen intent pairs, 93.9 on discourse-shifted pairs, 62.5 on longer/noisier pairs, 49.8 on held-out templates, and 91.1 on unseen triples. WholeMultiLabel reaches 81.4, 55.7, 18.8, 15.5, and 0.0; the BERT baseline reaches 91.5, 77.6, 48.9, 11.0, and 0.0. We also add a 240-example manually authored SNIPS-style compositional set with five held-out pairs; there, ClauseCompose reaches 97.5 exact match on unseen pairs and 86.7 under connector shift, compared with 41.3 and 10.4 for WholeMultiLabel. The results suggest that multi-intent detection needs more compositional evaluation, and that simple factorization goes surprisingly far once evaluation asks for it.

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接 [[...]]
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
