---
id: 20260219-rss-lilian_weng-XXX-reward-hacking-in-reinforcement-learning
title: Reward Hacking in Reinforcement Learning
created: 2026-02-19
tags: ["rss", "engineering", "auto-import"]
source: "Lilian Weng's Blog"
source_url: "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/"
source_type: "article"
content_length: 1065
quality_score: 0.70
---

# Reward Hacking in Reinforcement Learning

## 原文概览

- **来源**: Lilian Weng's Blog
- **发布时间**: Thu, 28 Nov 2024 00:00:00 +0000
- **原文链接**: https://lilianweng.github.io/posts/2024-11-28-reward-hacking/
- **抓取时间**: 2026-02-19T20:08:30.097Z

## 核心内容

Reward hacking occurs when a [reinforcement learning (RL)]((https://lilianweng.github.io/posts/2018-02-19-rl-overview/)) agent [exploits](https://lilianweng.github.io/posts/2018-01-23-multi-armed-bandit/#exploitation-vs-exploration) flaws or ambiguities in the reward function to achieve high rewards, without genuinely learning or completing the intended task. Reward hacking exists because RL environments are often imperfect, and it is fundamentally challenging to accurately specify a reward function.

With the rise of [language models](https://lilianweng.github.io/posts/2019-01-31-lm/) generalizing to a broad spectrum of tasks and RLHF becomes a de facto method for alignment training, reward hacking in RL training of language models has become a critical practical challenge. Instances where the model learns to modify unit tests to pass coding tasks, or where responses contain biases that mimic a user&rsquo;s preference, are pretty concerning and are likely one of the major blockers for real-world deployment of more autonomous use cases of AI models.

## 关键观点

<!-- TODO: 人工或LLM提取3-5个关键观点 -->

## 相关链接

- [[TODO-添加相关ZK卡片]]

---
*RSS 自动抓取 - 抓取时间: 2026-02-19T20:08:30.097Z*