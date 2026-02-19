---
title: "Beyond Learning: A Training-Free Alternative to Model Adaptation"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.16189"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Beyond Learning: A Training-Free Alternative to Model Adaptation

> arXiv:2602.16189v1 Announce Type: new 
Abstract: Despite the continuous research and evolution of language models, they sometimes underperform previous versions. Existing approaches to overcome these challenges are resource-intensive, highlighting the need for alternatives that enable immediate action. We assume that each language model has a local module inside that is suitable for a specific function. First, this work identifies a set of modules showing consistent and local activation changes under an inference workload through activation-based analysis. Subsequently, we transplant an internal module that is properly activated for a specific task into the target model, leading to immediate and measurable functional changes without additional training or fine-tuning. To experimentally demonstrate the effectiveness of the transplant technique, we quantify the relationship between transplant strength and performance improvement under different conditions for two language models. In the cross-generation setting, we find that transplanting activation-selected modules can substantially improve the underperforming model, reaching up to twice the target baseline and achieving gap-based recovery above 100%. Moreover, in transplant experiments between a base model and its instruction-tuned counterpart, transplantation improves the underperforming model toward the stronger baseline, yielding up to about 2.33 times the target baseline with gap-based recovery reaching up to 100% in the best case. These results show that meaningful capacity transfer can be realized through the implantation of highly localized modules implied by language models. Overall, this work provides empirical evidence for task-localized modularity in language models and presents a new research area: model transplantation.

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
