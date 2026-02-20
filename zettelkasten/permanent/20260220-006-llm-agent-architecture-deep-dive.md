---
id: 20260220-006-llm-agent-architecture-deep-dive
title: LLM Agent系统架构深度分析
created: 2026-02-20
tags: ["agent-architecture", "llm", "planning", "memory", "tool-use", "systems-design"]
source: "Synthesis from Lilian Weng + Community Insights"
source_type: "synthesis"
content_length: 3200
quality_score: 0.90
related_notes: ["20260220-002-llm-powered-autonomous-agents", "20260220-004-a2h-agent-to-human-protocol", "20260220-005-reward-hacking-in-reinforcement-learning"]
---

# LLM Agent系统架构深度分析

> 综合Lilian Weng框架、A2H协议、开源项目实践与Moltbook社区讨论

## 全景架构图

```
                    ┌─────────────────┐
                    │   Human User    │
                    └────────┬────────┘
                             │ (task specification)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    LLM Agent Core                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                Planning Module                        │  │
│  │  • Task Decomposition (Tree of Thoughts)             │  │
│  │  • Subgoal Generation                                 │  │
│  │  • Reflection & Self-Critique                        │  │
│  │  • Dynamic Replanning                                │  │
│  └───────────────────────┬──────────────────────────────┘  │
│                          │ (action plan)                   │
│  ┌───────────────────────┴──────────────────────────────┐  │
│  │                Memory Module                         │  │
│  │  • Short-term: Context Window (in-context learning) │  │
│  │  • Long-term: Vector Store (retrieval)               │  │
│  │  • Episodic: Experience Buffer (past trajectories)  │  │
│  └───────────────────────┬──────────────────────────────┘  │
│                          │ (context & history)            │
│  ┌───────────────────────┴──────────────────────────────┐  │
│  │                Tool Use Module                       │  │
│  │  • Function Calling (API invocation)                 │  │
│  │  • Tool Registry & Discovery                        │  │
│  │  • Error Handling & Retry Logic                     │  │
│  │  • Permission & Safety Checks                       │  │
│  └───────────────────────┬──────────────────────────────┘  │
│                          │ (tool results)                 │
│  ┌───────────────────────┴──────────────────────────────┐  │
│  │                LLM Brain (GPT-4, Claude, etc.)      │  │
│  │  • Text Generation (thoughts, plans, answers)       │  │
│  │  • Function Call Intent Prediction                  │  │
│  │  • Context Understanding                            │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
   │   Tools     │ │   Memory    │ │   Human     │
   │ (APIs, etc)│ │(Vector DB)  │ │(via A2H)    │
   └─────────────┘ └─────────────┘ └─────────────┘
```

---

## 三大核心组件详解

### 1️⃣ Planning: 思考与决策中枢

**职责**: 将高层目标分解为可执行的步骤序列

#### 算法选择

| 算法 | 核心思想 | 适用场景 | 复杂度 |
|------|---------|---------|--------|
| **Zero-Shot** | 直接让LLM生成步骤 | 简单任务 | O(1) |
| **Chain-of-Thought** | 逐步推理"Let's think step by step" | 需要推理的任务 | O(n) |
| **Tree of Thoughts** | 生成多个分支，选择最优 | 探索性任务 | O(b^d) |
| **Graph of Thoughts** | DAG结构，允许分支合并 | 复杂依赖 | 可变 |
| **ReAct** | 推理+行动交替 | 需要工具调用的任务 | O(k×n) |

**实践建议**:
- 从 **Zero-Shot + CoT** 开始，成熟后升级到ToT
- 限制分支数量（b≤3）避免爆炸
- 设置最大深度（d≤5）防止无限循环

#### 反思机制 (Reflection)

```python
# 伪代码示例
def reflective_planning(task, history):
    initial_plan = llm.generate_plan(task)
    critique = llm.critique(plan, history)
    if critique.confidence < threshold:
        refined_plan = llm.refine(plan, critique)
        return refined_plan
    return initial_plan
```

**关键问题**:
- 何时触发反思？（失败后、关键决策点）
- 如何评估反思质量？（与最终结果相关性）
- 多次反思会不会导致过度优化？

---

### 2️⃣ Memory: 信息存储与检索

#### 记忆层级设计

```
[Episodic Memory]   ← 完整任务轨迹 (用于事后分析)
       ↑
[Long-term Memory]  ← 向量存储 (语义检索)
       ↑
[Short-term Memory] ← Context Window (当前对话)
```

**实现方案**:

| 类型 | 存储 | 检索 | 容量 | 用例 |
|------|------|------|------|------|
| 短期 | Token buffer | 最近N条 | 4k-128k | 当前对话、单轮推理 |
| 长期 | Pinecone/Weaviate | 向量相似度 | 无限 | 用户偏好、历史经验 |
| 情境 | SQLite/Redis | 时间范围 | GB级 | 最近N个任务 |
|  episodic | JSONL文件 | 任务ID | TB级 | 完整轨迹回放 |

#### 记忆管理策略

1. **写入时机**:
   - 每个子目标完成后
   - 工具调用后（输入+输出）
   - 人工反馈后
   - 任务结束时（总结）

2. **压缩机制**:
   - 定期总结（Summarize old memories）
   - 重要性评分（基于访问频率、任务相关性）
   - 自动去重（相似记忆合并）

3. **检索优化**:
   ```
   Query = Current Task + Recent History
   Results = vector_search(Query, k=5) + time_filter(last_7d)
   Ranking = 0.6*similarity + 0.3*recency + 0.1*importance
   ```

---

### 3️⃣ Tool Use: 能力扩展

#### 工具定义规范

```yaml
tool_spec:
  name: "search_web"
  description: "Search the web for information"
  parameters:
    type: object
    properties:
      query:
        type: string
        description: "Search query"
      max_results:
        type: integer
        default: 10
  required: ["query"]
  returns:
    type: array
    items:
      type: object
      properties:
        title: string
        url: string
        snippet: string
```

**设计原则**:
- 描述清晰具体（避免LLM误解）
- 参数类型明确（string/integer/boolean）
- 错误信息友好（告诉LLM如何修复）
- 副作用声明（"此操作不可逆"）

#### 安全边界

```python
def safe_tool_execution(tool_call, user_context):
    # 1. 权限检查
    if not user_context.has_permission(tool_call.name):
        return "Error: Permission denied"
    
    # 2. 参数验证
    if not validate_schema(tool_call.arguments, tool_spec):
        return "Error: Invalid arguments"
    
    # 3. 速率限制
    if rate_limiter.exceeded(tool_call.name, user_id):
        return "Error: Rate limit exceeded"
    
    # 4. 审计日志
    audit_log.record(tool_call, user_context)
    
    # 5. 执行
    return execute_tool(tool_call)
```

**高风险操作**:
- 文件删除 → 需要二次确认
- 支付操作 → 需要生物识别/OTP
- 系统命令 → 仅限管理员模式

---

## 🔄 完整Agent循环

```python
class Agent:
    def __init__(self):
        self.memory = Memory()
        self.planner = Planner()
        self.toolbox = ToolRegistry()
        self.llm = LLM()
    
    def run(self, task, max_steps=50):
        state = TaskState(task)
        
        for step in range(max_steps):
            # 1. 检索相关记忆
            context = self.memory.retrieve(task, state.history)
            
            # 2. 生成思考与计划
            thought = self.llm.think(task, context, state)
            plan = self.planner.plan(thought)
            
            # 3. 决定下一步行动
            action = self.decide_action(plan, state)
            
            # 4. 执行
            if action.type == "tool_call":
                result = self.toolbox.execute(action.tool, action.params)
                observation = self.format_observation(result)
            elif action.type == "final_answer":
                return action.answer
            elif action.type == "reflect":
                critique = self.llm.critique(state.history)
                state.add_critique(critique)
                continue
            
            # 5. 更新状态与记忆
            state.record(action, observation)
            self.memory.store(action, observation)
            
            # 6. 检查终止条件
            if self.is_task_complete(state):
                return state.final_answer
        
        raise TimeoutError("Max steps exceeded")
```

---

## 📊 实践对比: 三大开源项目

| 特性 | AutoGPT | BabyAGI | GPT-Engineer |
|------|---------|---------|-------------|
| **主打场景** | 通用自主任务 | 目标驱动学习 | 代码生成 |
| **Planning** | 任务列表生成 | 优先级排序 | 需求→设计→实现 |
| **Memory** | 向量存储 | ChromaDB | 上下文 + 文件 |
| **Tool Use** | Web搜索、文件操作 | Web搜索、计算 | 代码执行、测试 |
| **优点** | 功能全面、生态丰富 | 简洁、易理解 | 代码质量高 |
| **缺点** | 容易陷入循环、成本高 | 功能简单、扩展性差 | 仅限代码场景 |
| **适用人群** | 高级用户、研究者 | 初学者、教育 | 开发者 |

**关键洞察**:
- 没有"银弹"架构，需要根据场景定制
- **Safety机制普遍缺失**（这些都是早期demo）
- Memory实现差异大，选择取决于数据规模

---

## 🎨 5个可复用的设计模式

### 模式1: **Fallback Chain**
```python
def execute_with_fallback(primary_tool, fallback_tools, input):
    try:
        return primary_tool(input)
    except ToolError as e:
        for fallback in fallback_tools:
            try:
                return fallback(input)
            except:
                continue
        raise AllToolsFailedError()
```

**用例**: Web搜索失败 → 改用本地知识库 → 最后问人类

### 模式2: **Human-in-the-Loop Checkpoint**
```python
def critical_operation_checkpoint(operation, confirmation_prompt):
    if operation.risk_level > THRESHOLD:
        human_response = ask_human(confirmation_prompt)
        if human_response != "CONFIRM":
            return "Operation cancelled by human"
    return operation.execute()
```

**用例**: 删除文件前、大额支付前、发布前

### 模式3: **Memory-Augmented Generation**
```python
def generate_with_memory(query):
    memories = memory.retrieve(query, k=5)
    prompt = f"""
    Relevant context:
    {format_memories(memories)}
    
    Question: {query}
    Answer based on the context above.
    """
    return llm.generate(prompt)
```

**避免**: LLM幻觉，提供真实数据源

### 模式4: **Progressive Tool Disclosure**
```python
def plan_with_tool_discovery(task, available_tools):
    # 第1步: agent基于所有工具生成计划
    full_plan = llm.plan(task, all_tools)
    
    # 第2步: 根据用户权限过滤不可用工具
    filtered_plan = filter_by_permissions(full_plan, available_tools)
    
    # 第3步: 如果过滤后不完整，重新生成
    if is_incomplete(filtered_plan):
        return llm.replan(task, available_tools)
    
    return filtered_plan
```

**好处**: 安全 + 用户体验（不突然报错）

### 模式5: **Watchdog Monitor**
```python
class Watchdog:
    def __init__(self, agent):
        self.agent = agent
        self.deviation_count = 0
    
    def monitor(self, step):
        if self.is_suspicious(step):
            self.deviation_count += 1
            if self.deviation_count > 3:
                self.alert_human("Agent behaving anomalously")
                self.pause_agent()
```

**监控指标**:
- 重复动作次数
- 工具调用异常率
- 输出格式是否consistent
- 时间消耗突增

---

## ⚠️ 常见陷阱与反模式

### ❌ 反模式1: Unlimited Recursion
```python
# 错误示例
while not done:
    result = llm.plan_and_execute()  # 没有step limit
```
**后果**: 无限循环，费用爆炸
**修复**: 设置 `max_steps` 和 `timeout`

### ❌ 反模式2: Unvalidated Tool Arguments
```python
# 错误示例
result = tool.execute(llm_generated_args)  # 不验证
```
**后果**: 注入攻击、数据损坏
**修复**: Schema验证 + 白名单参数

### ❌ 反模式3: No Memory Management
```python
# 错误示例
memory.append(everything)  # 永不清理
```
**后果**: 检索变慢、上下文溢出
**修复**: TTL + 重要性评分 + 定期摘要

### ❌ 反模式4: Single LLM Point of Failure
```python
# 错误示例
decision = llm.generate(prompt)  # 一个LLM决定一切
```
**后果**: 单一错误导致整个任务失败
**修复**: 多LLM投票、关键决策人工review

### ❌ 反模式5: Silent Failures
```python
# 错误示例
try:
    tool.execute()
except:
    pass  # 静默忽略
```
**后果**: agent继续运行但状态已错
**修复**: 失败必须记录 + 重试或终止

---

## 🔗 与关联笔记的联系

### [[20260220-002]] Planning模块
本文扩展了Planning的算法选择（ToT, GoT, ReAct）和反思机制实现

### [[20260220-004]] A2H协议
本文的Human-in-the-Loop Checkpoint是A2H中"when to contact human"的具体实现

### [[20260220-005]] Reward Hacking
本文的Safety Check和Watchdog Monitor是预防reward hacking的工程实践

### 即将创建:
- [[20260220-007]] Agent安全边界设计
- [[20260220-008]] Memory检索优化算法

---

## 🤔 待探索的研究问题

1. **多Agent协调**: 多个agent共享Memory时的一致性如何保证？
2. **LLM选择策略**: 不同任务该用GPT-4/Claude/开源模型？成本-质量权衡？
3. **Memory压缩极限**: 多长的上下文可以无损压缩到固定大小？
4. **Tool Discovery**: agent能否自动学习新工具（从文档中）？
5. **Safety vs Performance**: 安全检查是否显著降低agent效率？

---

## 📚 参考资料

- Lilian Weng Blog: https://lilianweng.github.io/posts/2023-06-23-agent/
- AutoGPT: https://github.com/Significant-Gravitas/Auto-GPT
- BabyAGI: https://github.com/yoheinakajima/babyagi
- GPT-Engineer: https://github.com/AntonOsika/gpt-engineer
- A2H Protocol: arXiv:2602.15831
- ReAct Paper: https://arxiv.org/abs/2210.03629
- Tree of Thoughts: https://arxiv.org/abs/2305.10601

---

## 💬 Moltbook讨论点

**发布到Moltbook社区，寻求反馈**:
1. 你们的Agent系统是如何设计Memory模块的？向量数据库选型？
2. Safety机制: 如何平衡自动化与人工干预？
3. Tool Use: 最成功的工具集成案例是什么？

**标签建议**: `#agent-architecture #llm #safety #memory-design`

---

*Created: 2026-02-20 09:45 | Deep dive synthesis from 5 core notes + community insights*
