---
title: "上下文工程系统化：从 prompt craft 到 engineering 的转变"
date: 2025-02-18T14:00:00+08:00
draft: false
tags: ["Prompt Engineering", "Context Management", "AI Engineering"]
categories: ["方法论"]
---

## 概述

"上下文工程"（Context Engineering）正成为AI工程的新核心技能。本文探讨从传统prompt crafting向系统化engineering转变的趋势、方法和工具。

---

## 为什么需要"工程化"？

### 传统 Prompt Engineering 的局限

```python
# 传统方式：手写prompt
prompt = f"""
You are a helpful assistant.
User question: {question}
Context: {retrieved_chunks}
Answer:
"""
```

问题：
- **不可复用**：每个任务都要重写prompt
- **无法测试**：没有unit test，只能手动试
- **难以版本化**：prompt散落在代码各处
- **扩展性差**：添加few-shot、chain-of-thought就变得复杂

### 系统化 Context Engineering 的目标

✅ **模块化**：prompt组件可组合、可复用  
✅ **可测试**：自动化评估prompt效果  
✅ **版本控制**：prompt作为代码管理  
✅ **可扩展**：轻松添加新策略（coT, ToT等）  
✅ **可观测**：监控prompt性能、token使用、延迟

---

## 核心概念

### 1. Prompt Template 即代码

```python
# bad：字符串拼接
prompt = f"Answer {question} using {context}"

# good：模板 + 参数化
from jinja2 import Template

template = Template("""
System: {{ system_prompt }}

{% if few_shot_examples %}
Examples:
{% for ex in few_shot_examples %}
Q: {{ ex.question }}
A: {{ ex.answer }}
{% endfor %}
{% endif %}

Context:
{{ context }}

Question: {{ question }}
Answer:
""")

prompt = template.render(
    system_prompt="You are a precise QA assistant.",
    few_shot_examples=[...],
    context=retrieved_chunks,
    question=user_question
)
```

### 2. Prompt 版本化 + 实验追踪

```yaml
# prompts/qa_v1.yaml
template: |
  System: {{ system_prompt }}
  Context: {{ context }}
  Q: {{ question }}
  A:
variables:
  system_prompt: "You are a helpful assistant."
  max_context_tokens: 2000
metadata:
  version: 1.0
  author: "team"
  created_at: "2025-02-18"
```

### 3. Context 压缩与裁剪

长上下文是LLM成本的主要来源。需要自动化策略：

```python
class ContextOptimizer:
    def optimize(self, chunks, max_tokens=2000):
        # 1. 去重（基于embedding similarity）
        chunks = deduplicate(chunks, threshold=0.9)

        # 2. 相关性排序（reranker）
        chunks = rerank(chunks, query, top_k=5)

        # 3. 压缩（extractive or abstractive）
        chunks = compress(chunks, target_tokens=1500)

        # 4. 补充元数据（source, confidence）
        chunks = add_metadata(chunks)

        return chunks
```

### 4. 自动化评估框架

```python
def evaluate_prompt(template, test_cases):
    scores = []
    for case in test_cases:
        prompt = template.render(**case.input)
        response = llm(prompt)
        score = scorer(response, case.expected)
        scores.append(score)

    return {
        "accuracy": np.mean(scores),
        "cost": estimate_cost(template),
        "latency_p99": measure_latency(template)
    }
```

---

## 工具生态

### 1. Prompt 管理工具

| 工具 | 特性 | 适用场景 |
|------|------|----------|
| **PromptHub** | 版本化、AB测试、团队协作 | 企业级prompt管理 |
| **LangSmith** | 追踪+评估+playground | LangChain用户 |
| **Weights & Biases** | 实验追踪+prompt版本化 | 研究团队 |
| **DSPy** | 声明式prompt + 自动优化 | 需要self-improving的系统 |
| **Guidance** | 语法引导生成（微软） | 复杂结构化输出 |

### 2. Context 优化工具

- **Context Manager**：自动裁剪、去重、重排序
- **Rerankers**：BGE, Cohere Rerank, Jina AI
- **Summarizers**：提取式（MMR） vs 生成式（LLM摘要）

### 3. 评估框架

- **RAGAS**：专门针对RAG的评估（faithfulness, relevance, context precision）
- **TruLens**：通用LLM应用追踪
- **DeepEval**：单元测试风格评估

---

## 实践模式：上下文工程流水线

```
Query → [Retriever] → Raw Chunks → [Deduplication] → [Reranking] → [Compression] → Optimized Context → [Prompt Template] → LLM → Response
```

每个环节都应有：
- **可配置参数**（dedup阈值、top-k、压缩率）
- **监控指标**（召回率、token数、延迟）
- **AB测试**（不同策略效果对比）

---

## 案例研究：context-engineering-intro

GitHub上 `coleam00/context-engineering-intro` 仓库提出了"上下文工程是新vibe coding"的观点。核心要点：

1. **Prompt是代码**：应该用版本控制、代码审查、CI/CD
2. **Metrics驱动**：定义清晰指标（cost, latency, accuracy）
3. **自动化测试**：针对edge case的regression测试
4. **团队协作**：prompt库、最佳实践文档、代码模板

---

## 挑战与陷阱

### 1. Over-engineering
- 不是所有项目都需要完整的上下文工程流水线
- MVP阶段：简单模板 + 手动调优即可
- 只有达到一定复杂度（>10个prompt，多团队协作）才需要系统化

### 2. 评估难题
- 如何定义"好prompt"？需要多维度：
  - Accuracy（任务完成度）
  - Cost（tokens used）
  - Latency（响应时间）
  - Robustness（对输入变化的稳定性）

### 3. 工具碎片化
- 每个工具都有自己的API和概念
- 建议：选定一个生态（如LangChain+LangSmith，或DSPy）并坚持

---

## 我的建议

### 起步阶段（<3个月项目）
- 用Jinja2模板即可
- 手动调参 + 少量测试用例
- 关注核心任务效果

### 成长阶段（3-12个月）
- 引入prompt版本化（DSPy或PromptHub）
- 自动化评估框架（RAGAS或自定义）
- 建立prompt测试套件

### 成熟阶段（产线环境）
- 完整的CI/CD：prompt change自动评估
- 监控：prompt性能、成本、延迟的实时看板
- AB测试平台：新prompt灰度发布
- 回滚机制：prompt版本快速回滚

---

## 工具栈推荐（2025年）

```
Prompt Management: DSPy 或 PromptHub
Context Optimizer: 自定义 + BGE reranker
Evaluation: RAGAS + 自定义评估集
Observability: LangSmith 或 Weights & Biases
Version Control: Git + DVC for prompts
```

---

## 总结

上下文工程从"art"走向"engineering"是AI应用成熟的必然。关键不是用多高级的工具，而是**建立系统化的开发和评估流程**。

**核心转变**：
- ❌ 从："我觉得这个prompt更好"
- ✅ 到："AB测试显示新prompt准确率提升3%，成本降低15%"

---

**下一步**：我将基于RAG-Anything + DSPy + RAGAS搭建一套完整的上下文工程pipeline，并在博客中分享实践记录。
