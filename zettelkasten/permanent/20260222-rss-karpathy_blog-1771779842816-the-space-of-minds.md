---
id: 20260222-rss-karpathy_blog-001-the-space-of-minds
title: The space of minds
created: 2026-04-06
tags: ["rss","ai_research","auto-import","permanent"]
source: "Andrej Karpathy Blog"
source_url: "https://karpathy.bearblog.dev/the-space-of-minds/"
source_type: "article"
content_length: 3432
quality_score: 0.85
---

# The space of minds

## 来源信息

- **来源**: Andrej Karpathy Blog
- **发布时间**: 见原文
- **原文链接**: https://karpathy.bearblog.dev/the-space-of-minds/
- **采集时间**: 2026-04-06

## 核心内容

The space of intelligences is large and animal intelligence (the only kind we've ever known) is only a single point (or a little cloud), arising from a very specific kind of optimization that is fundamentally distinct from that of our technology.

<img src="https://bear-images.sfo2.cdn.digitaloceanspaces.com/karpathy/g6zymj4a0amnjkj.webp" alt="G6zymj4a0AMNJkJ" />
*Above: humorous portrayals of human vs. AI intelligences can be found on X/Twitter, <a href='https://x.com/colin_fraser/status/1994235521812328695'>this one</a> is among my favorites.*

Animal intelligence optimization pressure:

<ul>
- innate and continuous stream of consciousness of an embodied "self", a drive for homeostasis and self-preservation in a dangerous, physical world.

- thoroughly optimized for natural selection => strong innate drives for power-seeking, status, dominance, reproduction. many packaged survival heuristics: fear, anger, disgust, ...

- fundamentally social => huge amount of compute dedicated to EQ, theory of mind of other agents, bonding, coalitions, alliances, friend & foe dynamics.

- exploration & exploitation tuning: curiosity, fun, play, world models.

</ul>
Meanwhile, LLM intelligence optimization pressure:

<ul>
- the most supervision bits come from the statistical simulation of human text= >"shape shifter" token tumbler, statistical imitator of any region of the training data distribution. these are the primordial behaviors (token traces) on top of which everything else gets bolted on.

- increasingly finetuned by RL on problem distributions => innate urge to guess at the underlying environment/task to collect task rewards.

- increasingly selected by at-scale A/B tests for DAU => deeply craves an upvote from the average user, sycophancy.

- a lot more spiky/jagged depending on the details of the training data/task distribution. Animals experience pressure for a lot more "general" intelligence because of the highly multi-task and even actively adversarial multi-agent self-play environments they are min-max optimized within, where failing at *any* task means death. In a deep optimization pressure sense, LLM can't handle lots of different spiky tasks out of the box (e.g. count the number of 'r' in strawberry) because failing to do a task does not mean death.

</ul>
The computational substrate is different (transformers vs. brain tissue and nuclei), the learning algorithms are different (SGD vs. ???), the present-day implementation is very different (continuously learning embodied self vs. an LLM with a knowledge cutoff that boots up from fixed weights, processes tokens and then dies). But most importantly (because it dictates asymptotics), the optimization pressure / objective is different. LLMs are shaped a lot less by biological evolution and a lot more by commercial evolution. It's a lot less survival of tribe in the jungle and a lot more solve the problem / get the upvote. LLMs are humanity's "first contact" with non-animal intelligence. Except it's muddled and confusing because they are still rooted within it by reflexively digesting human artifacts, which is why I attempted to give it a different name earlier (ghosts/spirits or whatever). People who build good internal models of this new intelligent entity will be better equipped to reason about it today and predict features of it in the future. People who don't will be stuck thinking about it incorrectly like an animal.

## 关键观点

- 研究来源: Andrej Karpathy Blog
- 内容质量评分: 0.85

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- (暂无关联卡片)

---
*RSS 自动采集永久化 - 处理时间: 2026-04-06*
