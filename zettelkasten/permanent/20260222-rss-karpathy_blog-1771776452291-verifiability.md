---
id: 20260222-rss-karpathy_blog-001-verifiability
title: Verifiability
created: 2026-04-06
tags: ["rss","ai_research","auto-import","permanent"]
source: "Andrej Karpathy Blog"
source_url: "https://karpathy.bearblog.dev/verifiability/"
source_type: "article"
content_length: 2470
quality_score: 0.80
---

# Verifiability

## 来源信息

- **来源**: Andrej Karpathy Blog
- **发布时间**: 见原文
- **原文链接**: https://karpathy.bearblog.dev/verifiability/
- **采集时间**: 2026-04-06

## 核心内容

AI has been compared to various historical precedents: electricity, industrial revolution, etc., I think the strongest analogy is that of AI as a new computing paradigm because both are fundamentally about the automation of digital information processing.

If you were to forecast the impact of computing on the job market in ~1980s, the most predictive feature of a task/job you'd look at is **specifiability**, i.e. are you just mechanically transforming information according to rote, easy to specify algorithm (examples being typing, bookkeeping, human calculators, etc.)? Back then, this was the class of programs that the computing capability of that era allowed us to write (by hand, manually). I call hand-written programs "Software 1.0".

With AI now, we are able to write new programs that we could never hope to write by hand before. We do it by specifying objectives (e.g. classification accuracy, reward functions), and we search the program space via gradient descent to find neural networks that work well against that objective. This is my <a href='https://karpathy.medium.com/software-2-0-a64152b37c35'>Software 2.0 blog post</a> from a while ago. In this new programming paradigm then, the new most predictive feature to look at is **verifiability**. If a task/job is verifiable, then it is optimizable directly or via reinforcement learning, and a neural net can be trained to work extremely well. It's about to what extent an AI can "practice" something. The environment has to be:

<ul>
- resettable (you can start a new attempt),

- efficient (a lot attempts can be made) and

- rewardable (there is some automated process to reward any specific attempt that was made).

</ul>
The more a task/job is verifiable, the more amenable it is to automation in the new programming paradigm. If it is not verifiable, it has to fall out from neural net magic of generalization fingers crossed, or via weaker means like imitation. This is what's driving the "jagged" frontier of progress in LLMs. Tasks that are verifiable progress rapidly, including possibly beyond the ability of top experts (e.g. math, code, amount of time spent watching videos, anything that looks like puzzles with correct answers), while many others lag by comparison (creative, strategic, tasks that combine real-world knowledge, state, context and common sense).

<ul>
- Software 1.0 easily automates what you can specify.

- Software 2.0 easily automates what you can verify.

</ul>

## 关键观点

- 核心主题涉及Verifiability
- 研究来源: Andrej Karpathy Blog
- 内容质量评分: 0.80

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- (暂无关联卡片)

---
*RSS 自动采集永久化 - 处理时间: 2026-04-06*
