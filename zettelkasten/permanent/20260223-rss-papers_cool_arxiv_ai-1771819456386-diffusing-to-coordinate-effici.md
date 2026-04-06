---
id: 20260223-rss-papers_cool_arxiv_ai-001-diffusing-to-coordinate-efficient-online-multi-age
title: Diffusing to Coordinate: Efficient Online Multi-Agent Diffusion Policies
created: 2026-04-06
tags: ["rss","ai_research","auto-import","permanent"]
source: "Papers.cool - arXiv AI"
source_url: "https://papers.cool/arxiv/2602.18291"
source_type: "article"
content_length: 1476
quality_score: 0.70
---

# Diffusing to Coordinate: Efficient Online Multi-Agent Diffusion Policies

## 来源信息

- **来源**: Papers.cool - arXiv AI
- **发布时间**: 见原文
- **原文链接**: https://papers.cool/arxiv/2602.18291
- **采集时间**: 2026-04-06

## 核心内容

Online Multi-Agent Reinforcement Learning (MARL) is a prominent framework for efficient agent coordination. Crucially, enhancing policy expressiveness is pivotal for achieving superior performance. Diffusion-based generative models are well-positioned to meet this demand, having demonstrated remarkable expressiveness and multimodal representation in image generation and offline settings. Yet, their potential in online MARL remains largely under-explored. A major obstacle is that the intractable likelihoods of diffusion models impede entropy-based exploration and coordination. To tackle this challenge, we propose among the first \underline{O}nline off-policy \underline{MA}RL framework using \underline{D}iffusion policies (\textbf{OMAD}) to orchestrate coordination. Our key innovation is a relaxed policy objective that maximizes scaled joint entropy, facilitating effective exploration without relying on tractable likelihood. Complementing this, within the centralized training with decentralized execution (CTDE) paradigm, we employ a joint distributional value function to optimize decentralized diffusion policies. It leverages tractable entropy-augmented targets to guide the simultaneous updates of diffusion policies, thereby ensuring stable coordination. Extensive evaluations on MPE and MAMuJoCo establish our method as the new state-of-the-art across $10$ diverse tasks, demonstrating a remarkable $2.5\times$ to $5\times$ improvement in sample efficiency.

## 关键观点

- 智能体(Agent)系统能够自主执行复杂任务，如SQL探索、CAN总线分析
- 本文提出了新的方法或框架，针对现有技术的局限性进行改进
- 通过实验验证了方法的有效性，在特定数据集上取得较好结果

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- (暂无关联卡片)

---
*RSS 自动采集永久化 - 处理时间: 2026-04-06*
