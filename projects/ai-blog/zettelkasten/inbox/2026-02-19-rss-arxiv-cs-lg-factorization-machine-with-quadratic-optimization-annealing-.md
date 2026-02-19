---
title: "Factorization Machine with Quadratic-Optimization Annealing for RNA Inverse Folding and Evaluation of Binary-Integer Encoding and Nucleotide Assignment"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16643"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Factorization Machine with Quadratic-Optimization Annealing for RNA Inverse Folding and Evaluation of Binary-Integer Encoding and Nucleotide Assignment

> arXiv:2602.16643v1 Announce Type: new 
Abstract: The RNA inverse folding problem aims to identify nucleotide sequences that preferentially adopt a given target secondary structure. While various heuristic and machine learning-based approaches have been proposed, many require a large number of sequence evaluations, which limits their applicability when experimental validation is costly. We propose a method to solve the problem using a factorization machine with quadratic-optimization annealing (FMQA). FMQA is a discrete black-box optimization method reported to obtain high-quality solutions with a limited number of evaluations. Applying FMQA to the problem requires converting nucleotides into binary variables. However, the influence of integer-to-nucleotide assignments and binary-integer encoding on the performance of FMQA has not been thoroughly investigated, even though such choices determine the structure of the surrogate model and the search landscape, and thus can directly affect solution quality. Therefore, this study aims both to establish a novel FMQA framework for RNA inverse folding and to analyze the effects of these assignments and encoding methods. We evaluated all 24 possible assignments of the four nucleotides to the ordered integers (0-3), in combination with four binary-integer encoding methods. Our results demonstrated that one-hot and domain-wall encodings outperform binary and unary encodings in terms of the normalized ensemble defect value. In domain-wall encoding, nucleotides assigned to the boundary integers (0 and 3) appeared with higher frequency. In the RNA inverse folding problem, assigning guanine and cytosine to these boundary integers promoted their enrichment in stem regions, which led to more thermodynamically stable secondary structures than those obtained with one-hot encoding.

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
