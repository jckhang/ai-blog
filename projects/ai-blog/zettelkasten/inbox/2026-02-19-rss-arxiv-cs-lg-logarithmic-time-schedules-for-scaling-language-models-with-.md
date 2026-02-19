---
title: "Logarithmic-time Schedules for Scaling Language Models with Momentum"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.05298"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Logarithmic-time Schedules for Scaling Language Models with Momentum

> arXiv:2602.05298v2 Announce Type: replace-cross 
Abstract: In practice, the hyperparameters $(\beta_1, \beta_2)$ and weight-decay $\lambda$ in AdamW are typically kept at fixed values. Is there any reason to do otherwise? We show that for large-scale language model training, the answer is yes: by exploiting the power-law structure of language data, one can design time-varying schedules for $(\beta_1, \beta_2, \lambda)$ that deliver substantial performance gains.
  We study logarithmic-time scheduling, in which the optimizer's gradient memory horizon grows with training time. Although naive variants of this are unstable, we show that suitable damping mechanisms restore stability while preserving the benefits of longer memory. Based on this, we present ADANA, an AdamW-like optimizer that couples log-time schedules with explicit damping to balance stability and performance. We empirically evaluate ADANA across transformer scalings (45M to 2.6B parameters), comparing against AdamW, Muon, and AdEMAMix.
  When properly tuned, ADANA achieves up to 40% compute efficiency relative to a tuned AdamW, with gains that persist--and even improve--as model scale increases. We further show that similar benefits arise when applying logarithmic-time scheduling to AdEMAMix, and that logarithmic-time weight-decay alone can yield significant improvements. Finally, we present variants of ADANA that mitigate potential failure modes and improve robustness.

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
