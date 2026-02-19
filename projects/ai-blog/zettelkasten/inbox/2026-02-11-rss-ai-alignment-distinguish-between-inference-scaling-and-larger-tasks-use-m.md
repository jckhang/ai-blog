---
title: "Distinguish between inference scaling and ""larger tasks use more compute"""
source: "ai-alignment RSS"
url: "https://www.alignmentforum.org/posts/rRbDNQLfihiHbXytf/distinguish-between-inference-scaling-and-larger-tasks-use"
date: 2026-02-11T18:37:13.000Z
tags: [rss, ai-alignment]
status: pending-analysis
---

# Distinguish between inference scaling and "larger tasks use more compute"

> Published on February 11, 2026 6:37 PM GMT<br/><br/><p>As many have observed, since <a href="https://openai.com/index/learning-to-reason-with-llms/">reasoning models first came out</a>, the amount of compute LLMs use to complete tasks has increased greatly. This trend is often called inference scaling and there is an open question of how much of recent AI progress <a href="https://www.tobyord.com/writing/mostly-inference-scaling">is driven by inference scaling versus by other capability improvements</a>. Whether inference compute is driving most recent AI progress matters because you can only scale up inference so far before costs are too high for AI to be useful (while training compute can be amortized over usage).</p>
<p>However, it's important to distinguish between two reasons inference cost is going up:</p>
<ol>
<li>LLMs are completing larger tasks that would have taken a human longer (and thus would have cost more to get a human to complete)</li>
<li>LLMs are using more compute as a fraction of the human cost for a given task</li>
</ol>
<p>To understand this, it's helpful to think about the Pareto frontier of budget versus time-horizon. I'll denominate this in <a href="https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/">50% reliability time-horizon</a>.<span data-footnote-reference="" data-footnote-index="1" data-footnote-id="-3HmDE73CFjdKXi7Kt-1" role="doc-noteref" id="fnref-3HmDE73CFjdKXi7Kt-1" class="footnote-reference">
      <sup><a href="#fn-3HmDE73CFjdKXi7Kt-1" class="">[1]</a></sup>
    </span>  Here is some <strong>fake</strong> data to illustrate what I expect this roughly looks like for recent progress:<span data-footnote-reference="" data-footnote-index="2" data-footnote-id="-3HmDE73CFjdKXi7Kt-2" role="doc-noteref" id="fnref-3HmDE73CFjdKXi7Kt-2" class="footnote-reference">
      <sup><a href="#fn-3HmDE73CFjdKXi7Kt-2" class="">[2]</a></sup>
    </span></p>
<p><img src="https://res.cloudinary.com/lesswrong-2-0/image/upload/f_auto,q_auto/v1/mirroredImages/rRbDNQLfihiHbXytf/n60lbpsntk2u743accw4" alt=""></p>
<p>For the notion of time horizon I'm using (see earlier footnote), the (unassisted) human frontier is (definitionally) a straight line going all the way up to very long tasks.<span data-footnote-reference="" data-footnote-index="3" data-footnote-id="-3HmDE73CFjdKXi7Kt-3" role="doc-noteref" id="fnref-3HmDE73CFjdKXi7Kt-3" class="footnote-reference">
      <sup><a href="#fn-3HmDE73CFjdKXi7Kt-3" class="">[3]</a></sup>
    </span>
(Further, there is a 1:1 slope in a log-log plot: a 2x increase in cost lets you complete 2x longer task. In the non-log-log version, the slope is the human hourly rate.)
I expect LLMs start off at low time horizons with the same linear scaling and probably with roughly the same slope (where 2x-ing the time-horizon requires roughly 2x the cost) but then for a given level of capability performance levels off and increasing amounts of additional inference compute are needed to improve performance.<span data-footnote-reference="" data-footnote-index="4" data-footnote-id="-3HmDE73CFjdKXi7Kt-4" role="doc-noteref" id="fnref-3HmDE73CFjdKXi7Kt-4" class="footnote-reference">
      <sup><a href="#fn-3HmDE73CFjdKXi7Kt-4" class="">[4]</a></sup>
    </span>
More capable AIs move the Pareto frontier a bit to the left (higher efficiency) and extend the linear regime further such that you can reach higher time horizons before returns level off.</p>
<p>In this linear regime, AIs are basically using more compute to complete longer/bigger tasks with similar scaling to humans.
Thus, the cost as a fraction of human cost is remaining constant.
I think this isn't best understood as "inference scaling", rather it just corresponds to bigger tasks taking more work/tokens!<span data-footnote-reference="" data-footnote-index="5" data-footnote-id="-3HmDE73CFjdKXi7Kt-5" role="doc-noteref" id="fnref-3HmDE73CFjdKXi7Kt-5" class="footnote-reference">
      <sup><a href="#fn-3HmDE73CFjdKXi7Kt-5" class="">[5]</a></sup>
    </span>
Ultimately, what we cared about when tracking whether performance is coming from inference scaling is whether the performance gain is due to a one-time gain of going close to (or even above) human cost or whether the gain could be repeated without big increases in cost.</p>
<p>We can see this clearly by showing cost as a fraction of human cost (using my fake data from earlier):<span data-footnote-reference="" data-footnote-index="6" data-footnote-id="-3HmDE73CFjdKXi7Kt-6" role="doc-noteref" id="fnref-3HmDE73CFjdKXi7Kt-6" class="footnote-reference">
      <sup><a href="#fn-3HmDE73CFjdKXi7Kt-6" class="">[6]</a></sup>
    </span></p>
<p><img src="https://res.cloudinary.com/lesswrong-2-0/image/upload/f_auto,q_auto/v1/mirroredImages/rRbDNQLfihiHbXytf/dlws3ckvztzki7ngjvox" alt=""></p>
<p>When looking at Pareto frontiers using fraction of human cost as the x-axis, I think it's natural to not think of mostly vertical translations as being inference scaling: instead we should think of this as just completing larger tasks with the same level of effort/efficiency.
Inference scaling is when the performance gain is coming from increasing cost as a fraction of human cost.
(Obviously human completion cost isn't deeply fundamental, but it corresponds to economic usefulness and presumably closely correlates in most domains with a natural notion of task size that applies to AIs as well.)
Then, if a new model release shifts up the performance at the same (low) fraction of human cost (corresponding to the vertical scaling regime of the prior Pareto frontier), that gain isn't coming from inference scaling: further scaling like this wouldn't be bringing us closer to AI labor being less cost-effective than human labor (contra <a href="https://www.tobyord.com/writing/how-well-does-rl-scale">Toby Ord</a>).</p>
<p>For reference, here are these same arrows on the original plot:</p>
<p><img src="https://res.cloudinary.com/lesswrong-2-0/image/upload/f_auto,q_auto/v1/mirroredImages/rRbDNQLfihiHbXytf/vjzhmychfupklegmwgi8" alt=""></p>
<p>What would count as a new model release mostly helping via unlocking better inference scaling? It might look something like this:</p>
<p><img src="https://res.cloudinary.com/lesswrong-2-0/image/upload/f_auto,q_auto/v1/mirroredImages/rRbDNQLfihiHbXytf/dr8uymy55qz3ndq5rzfj" alt=""></p>
<p>I currently suspect that over 2025, the Pareto frontier mostly shifted like was illustrated in the prior plots rather than like this (though some shifts like this occurred, e.g., likely some of the key advances for getting IMO gold were about productively using much more inference compute relative to human cost).</p>
<ol data-footnote-section="" role="doc-endnotes" class="footnote-section footnotes"><li data-footnote-item="" data-footnote-index="1" data-footnote-id="-3HmDE73CFjdKXi7Kt-1" id="fn-3HmDE73CFjdKXi7Kt-1" role="doc-endnote" class="footnote-item"><p>To make some aspects of this graph cleaner, I'll say the time horizon of a given task is the amount of time such that if we randomly sample a human from our reference group of humans they have a 50% chance of completing the task. <a href="#fnref-3HmDE73CFjdKXi7Kt-1" class="footnote-backref">↩︎</a></p>
</li>
<li data-footnote-item="" data-footnote-index="2" data-footnote-id="-3HmDE73CFjdKXi7Kt-2" id="fn-3HmDE73CFjdKXi7Kt-2" role="doc-endnote" class="footnote-item"><p>I'm assuming a maximum budget or an average cost for tasks with that exact time horizon rather than an average cost over the task suite (as this would depend on the number of tasks with shorter versus longer time horizons). <a href="#fnref-3HmDE73CFjdKXi7Kt-2" class="footnote-backref">↩︎</a></p>
</li>
<li data-footnote-item="" data-footnote-index="3" data-footnote-id="-3HmDE73CFjdKXi7Kt-3" id="fn-3HmDE73CFjdKXi7Kt-3" role="doc-endnote" class="footnote-item"><p>This is simplifying a bit, e.g. assuming only a single human can be used, but you get the idea. <a href="#fnref-3HmDE73CFjdKXi7Kt-3" class="footnote-backref">↩︎</a></p>
</li>
<li data-footnote-item="" data-footnote-index="4" data-footnote-id="-3HmDE73CFjdKXi7Kt-4" id="fn-3HmDE73CFjdKXi7Kt-4" role="doc-endnote" class="footnote-item"><p>Depending on the task distribution, this may asymptote at a particular time horizon or continue increasing just with much worse returns to further compute (e.g. for Lean proofs or easy-to-check software optimization tasks, you can keep adding more compute, but the returns might get very poor with an exponential disadvantage relative to humans). In some domains (particularly easy-to-check domains), I expect there is a large regime where the returns are substantially worse than 1-to-1 but still significant (e.g., every 8x increase in inference compute yields a 2x time horizon increase). <a href="#fnref-3HmDE73CFjdKXi7Kt-4" class="footnote-backref">↩︎</a></p>
</li>
<li data-footnote-item="" data-footnote-index="5" data-footnote-id="-3HmDE73CFjdKXi7Kt-5" id="fn-3HmDE73CFjdKXi7Kt-5" role="doc-endnote" class="footnote-item"><p>In some cases, it might be effectively impossible to greatly reduce the number of tokens (e.g. for a software project, you can't do better than outputting a concise version of the code in one shot) while in others you could in principle get down to a single token (e.g., solving a math problem with a numerical answer), but regardless, we'd still expect a roughly linear relationship between time horizon and inference compute. <a href="#fnref-3HmDE73CFjdKXi7Kt-5" class="footnote-backref">↩︎</a></p>
</li>
<li data-footnote-item="" data-footnote-index="6" data-footnote-id="-3HmDE73CFjdKXi7Kt-6" id="fn-3HmDE73CFjdKXi7Kt-6" role="doc-endnote" class="footnote-item"><p>I've supposed that AIs sometimes have a slight polynomial advantage/disadvantage such that the slope on the log-log plot isn't exactly 1 as this is what you'd realistically expect. <a href="#fnref-3HmDE73CFjdKXi7Kt-6" class="footnote-backref">↩︎</a></p>
</li>
</ol>
<br/><br/><a href="https://www.alignmentforum.org/posts/rRbDNQLfihiHbXytf/distinguish-between-inference-scaling-and-larger-tasks-use#comments">Discuss</a>

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
