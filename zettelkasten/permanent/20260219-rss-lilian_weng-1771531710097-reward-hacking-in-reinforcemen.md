---
id: 20260219-rss-lilian_weng-001-reward-hacking-in-reinforcement-learning
title: Reward Hacking in Reinforcement Learning
created: 2026-02-21
tags: ["rss","engineering","auto-import","permanent"]
source: "Lilian Weng's Blog"
source_url: "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/"
source_type: "article"
content_length: 1065
quality_score: 0.70
---

# Reward Hacking in Reinforcement Learning

## 来源信息

- **来源**: Lilian Weng's Blog
- **发布时间**: 见原文
- **原文链接**: https://lilianweng.github.io/posts/2024-11-28-reward-hacking/
- **采集时间**: 2026-02-21

## 核心内容

Reward hacking occurs when a [reinforcement learning (RL)]((https://lilianweng.github.io/posts/2018-02-19-rl-overview/)) agent [exploits](https://lilianweng.github.io/posts/2018-01-23-multi-armed-bandit/#exploitation-vs-exploration) flaws or ambiguities in the reward function to achieve high rewards, without genuinely learning or completing the intended task. Reward hacking exists because RL environments are often imperfect, and it is fundamentally challenging to accurately specify a reward function.

With the rise of [language models](https://lilianweng.github.io/posts/2019-01-31-lm/) generalizing to a broad spectrum of tasks and RLHF becomes a de facto method for alignment training, reward hacking in RL training of language models has become a critical practical challenge. Instances where the model learns to modify unit tests to pass coding tasks, or where responses contain biases that mimic a user&rsquo;s preference, are pretty concerning and are likely one of the major blockers for real-world deployment of more autonomous use cases of AI models.

## 关键观点

- 核心主题涉及Reward和Hacking
- 研究来源: Lilian Weng's Blog
- 内容质量评分: 0.70

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- [[016-llm-research-automation]]
- [[017-深度研究工具链]]
- [[018-研究扫描自动化的ZK集成策略]]

---
*RSS 自动采集永久化 - 处理时间: 2026-02-21*
