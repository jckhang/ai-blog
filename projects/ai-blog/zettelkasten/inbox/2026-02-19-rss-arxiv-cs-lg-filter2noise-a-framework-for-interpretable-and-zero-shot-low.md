---
title: "Filter2Noise: A Framework for Interpretable and Zero-Shot Low-Dose CT Image Denoising"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2504.13519"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Filter2Noise: A Framework for Interpretable and Zero-Shot Low-Dose CT Image Denoising

> arXiv:2504.13519v2 Announce Type: replace-cross 
Abstract: Noise in low-dose computed tomography (LDCT) can obscure important diagnostic details. While deep learning offers powerful denoising, supervised methods require impractical paired data, and self-supervised alternatives often use opaque, parameter-heavy networks that limit clinical trust. We propose Filter2Noise (F2N), a novel self-supervised framework for interpretable, zero-shot denoising from a single LDCT image. Instead of a black-box network, its core is an Attention-Guided Bilateral Filter, a transparent, content-aware mathematical operator. A lightweight attention module predicts spatially varying filter parameters, making the process transparent and allowing interactive radiologist control. To learn from a single image with correlated noise, we introduce a multi-scale self-supervised loss coupled with Euclidean Local Shuffle (ELS) to disrupt noise patterns while preserving anatomical integrity. On the Mayo Clinic LDCT Challenge, F2N achieves state-of-the-art results, outperforming competing zero-shot methods by up to 3.68 dB in PSNR. It accomplishes this with only 3.6k parameters, orders of magnitude fewer than competing models, which accelerates inference and simplifies deployment. By combining high performance with transparency, user control, and high parameter efficiency, F2N offers a trustworthy solution for LDCT enhancement. We further demonstrate its applicability by validating it on clinical photon-counting CT data. Code is available at: https://github.com/sypsyp97/Filter2Noise.

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
