---
title: "SNAP-UQ: Self-supervised Next-Activation Prediction for Single-Pass Uncertainty in TinyML"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2508.12907"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# SNAP-UQ: Self-supervised Next-Activation Prediction for Single-Pass Uncertainty in TinyML

> arXiv:2508.12907v4 Announce Type: replace-cross 
Abstract: Reliable uncertainty estimation is a key missing piece for on-device monitoring in TinyML: microcontrollers must detect failures, distribution shift, or accuracy drops under strict flash/latency budgets, yet common uncertainty approaches (deep ensembles, MC dropout, early exits, temporal buffering) typically require multiple passes, extra branches, or state that is impractical on milliwatt hardware. This paper proposes a novel and practical method, SNAP-UQ, for single-pass, label-free uncertainty estimation based on depth-wise next-activation prediction. SNAP-UQ taps a small set of backbone layers and uses tiny int8 heads to predict the mean and scale of the next activation from a low-rank projection of the previous one; the resulting standardized prediction error forms a depth-wise surprisal signal that is aggregated and mapped through a lightweight monotone calibrator into an actionable uncertainty score. The design introduces no temporal buffers or auxiliary exits and preserves state-free inference, while increasing deployment footprint by only a few tens of kilobytes. Across vision and audio backbones, SNAP-UQ reduces flash and latency relative to early-exit and deep-ensemble baselines (typically $\sim$40--60% smaller and $\sim$25--35% faster), with several competing methods at similar accuracy often exceeding MCU memory limits. On corrupted streams, it improves accuracy-drop event detection by multiple AUPRC points and maintains strong failure detection (AUROC $\approx 0.9$) in a single forward pass. By grounding uncertainty in layer-to-layer dynamics rather than solely in output confidence, SNAP-UQ offers a novel, resource-efficient basis for robust TinyML monitoring. Our code is available at: https://github.com/Ism-ail11/SNAP-UQ

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
