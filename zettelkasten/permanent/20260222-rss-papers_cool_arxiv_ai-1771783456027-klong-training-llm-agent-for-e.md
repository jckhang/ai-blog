---
id: 20260222-rss-papers_cool_arxiv_ai-001-klong-training-llm-agent-for-extremely-long-horizo
title: KLong: Training LLM Agent for Extremely Long-horizon Tasks
created: 2026-04-06
tags: ["rss","ai_research","auto-import","permanent"]
source: "Papers.cool - arXiv AI"
source_url: "https://papers.cool/arxiv/2602.17547"
source_type: "article"
content_length: 1299
quality_score: 0.70
---

# KLong: Training LLM Agent for Extremely Long-horizon Tasks

## 来源信息

- **来源**: Papers.cool - arXiv AI
- **发布时间**: 见原文
- **原文链接**: https://papers.cool/arxiv/2602.17547
- **采集时间**: 2026-04-06

## 核心内容

This paper introduces KLong, an open-source LLM agent trained to solve extremely long-horizon tasks. The principle is to first cold-start the model via trajectory-splitting SFT, then scale it via progressive RL training. Specifically, we first activate basic agentic abilities of a base model with a comprehensive SFT recipe. Then, we introduce Research-Factory, an automated pipeline that generates high-quality training data by collecting research papers and constructing evaluation rubrics. Using this pipeline, we build thousands of long-horizon trajectories distilled from Claude 4.5 Sonnet (Thinking). To train with these extremely long trajectories, we propose a new trajectory-splitting SFT, which preserves early context, progressively truncates later context, and maintains overlap between sub-trajectories. In addition, to further improve long-horizon task-solving capability, we propose a novel progressive RL, which schedules training into multiple stages with progressively extended timeouts. Experiments demonstrate the superiority and generalization of KLong, as shown in Figure 1. Notably, our proposed KLong (106B) surpasses Kimi K2 Thinking (1T) by 11.28% on PaperBench, and the performance improvement generalizes to other coding benchmarks like SWE-bench Verified and MLE-bench.

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
