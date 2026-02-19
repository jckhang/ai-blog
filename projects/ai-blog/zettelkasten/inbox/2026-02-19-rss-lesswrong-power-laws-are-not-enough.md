---
title: "Power Laws Are Not Enough"
source: "lesswrong RSS"
url: "https://www.lesswrong.com/posts/5x54xhX3K2TNY2L3T/power-laws-are-not-enough"
date: 2026-02-19T04:31:48.000Z
tags: [rss, lesswrong]
status: pending-analysis
---

# Power Laws Are Not Enough

> Published on February 19, 2026 4:31 AM GMT<br/><br/><p>This is a linkpost for work done as part of MATS 9.0 under the mentorship of Richard Ngo.</p>
<p>Loss scaling laws are among the most important empirical findings in deep learning.  This post synthesises evidence that, though important in practice, loss-scaling per se is a straightforward consequence of very low-order properties of natural data.  The covariance spectrum of natural data generally follows a power-law decay - the marginal value of representing the next feature decays only gradually, rather than falling off a cliff after representing a small handful of the most important features (as tends to be the case for image compression).  But we can generate trivial synthetic data which has this property and train random feature models which exhibit loss-scaling.</p>
<p>This is not to say scaling laws have not 'worked' - whatever GPT-2 had, adding OOMs gave GPT-3 more of it.  Scaling laws are a necessary but not sufficient part of this story.  I want to convince you that the mystery of 'the miracle of deep learning' abides.</p>
<br/><br/><a href="https://www.lesswrong.com/posts/5x54xhX3K2TNY2L3T/power-laws-are-not-enough#comments">Discuss</a>

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
