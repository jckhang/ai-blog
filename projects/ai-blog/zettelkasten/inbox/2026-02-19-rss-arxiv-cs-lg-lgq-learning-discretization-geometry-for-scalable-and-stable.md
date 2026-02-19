---
title: "LGQ: Learning Discretization Geometry for Scalable and Stable Image Tokenization"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16086"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# LGQ: Learning Discretization Geometry for Scalable and Stable Image Tokenization

> arXiv:2602.16086v1 Announce Type: cross 
Abstract: Discrete image tokenization is a key bottleneck for scalable visual generation: a tokenizer must remain compact for efficient latent-space priors while preserving semantic structure and using discrete capacity effectively. Existing quantizers face a trade-off: vector-quantized tokenizers learn flexible geometries but often suffer from biased straight-through optimization, codebook under-utilization, and representation collapse at large vocabularies. Structured scalar or implicit tokenizers ensure stable, near-complete utilization by design, yet rely on fixed discretization geometries that may allocate capacity inefficiently under heterogeneous latent statistics.
  We introduce Learnable Geometric Quantization (LGQ), a discrete image tokenizer that learns discretization geometry end-to-end. LGQ replaces hard nearest-neighbor lookup with temperature-controlled soft assignments, enabling fully differentiable training while recovering hard assignments at inference. The assignments correspond to posterior responsibilities of an isotropic Gaussian mixture and minimize a variational free-energy objective, provably converging to nearest-neighbor quantization in the low-temperature limit. LGQ combines a token-level peakedness regularizer with a global usage regularizer to encourage confident yet balanced code utilization without imposing rigid grids.
  Under a controlled VQGAN-style backbone on ImageNet across multiple vocabulary sizes, LGQ achieves stable optimization and balanced utilization. At 16K codebook size, LGQ improves rFID by 11.88% over FSQ while using 49.96% fewer active codes, and improves rFID by 6.06% over SimVQ with 49.45% lower effective representation rate, achieving comparable fidelity with substantially fewer active entries. Our GitHub repository is available at: https://github.com/KurbanIntelligenceLab/LGQ

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
