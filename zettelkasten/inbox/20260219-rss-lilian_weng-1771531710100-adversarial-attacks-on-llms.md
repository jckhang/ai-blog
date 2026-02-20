---
id: 20260219-rss-lilian_weng-XXX-adversarial-attacks-on-llms
title: Adversarial Attacks on LLMs
created: 2026-02-19
tags: ["rss", "engineering", "auto-import"]
source: "Lilian Weng's Blog"
source_url: "https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/"
source_type: "article"
content_length: 985
quality_score: 0.60
---

# Adversarial Attacks on LLMs

## 原文概览

- **来源**: Lilian Weng's Blog
- **发布时间**: Wed, 25 Oct 2023 00:00:00 +0000
- **原文链接**: https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/
- **抓取时间**: 2026-02-19T20:08:30.100Z

## 核心内容

The use of large language models in the real world has strongly accelerated by the launch of ChatGPT. We (including my team at OpenAI, shoutout to them) have invested a lot of effort to build default safe behavior into the model during the alignment process (e.g. via [RLHF](https://openai.com/research/learning-to-summarize-with-human-feedback)). However, adversarial attacks or jailbreak prompts could potentially trigger the model to output something undesired.

A large body of ground work on adversarial attacks is on images, and differently it operates in the continuous, high-dimensional space. Attacks for discrete data like text have been considered to be a lot more challenging, due to lack of direct gradient signals. My past post on [Controllable Text Generation](https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/) is quite relevant to this topic, as attacking LLMs is essentially to control the model to output a certain type of (unsafe) content.

## 关键观点

<!-- TODO: 人工或LLM提取3-5个关键观点 -->

## 相关链接

- [[TODO-添加相关ZK卡片]]

---
*RSS 自动抓取 - 抓取时间: 2026-02-19T20:08:30.100Z*