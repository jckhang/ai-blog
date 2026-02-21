---
id: 20260220-018-extrinsic-hallucination-detection-and-mitigation
title: Extrinsic Hallucination深度解析：检测与缓解策略
created: 2026-02-20
tags: ["hallucination", "factuality", "rag", "self-check", "factuality-tuning", "agent-reliability", "safety"]
source: "Lilian Weng Blog - Extrinsic Hallucinations in LLMs (2024-07-07)"
source_url: "https://lilianweng.github.io/posts/2024-07-07-hallucination/"
content_length: 3200
quality_score: 0.91
related_notes: ["20260220-005-reward-hacking-in-reinforcement-learning", "20260220-017-adversarial-attacks-on-llms-security-implications", "20260220-011-edgeNav-qe-mobile-ai-optimization"]
---

# Extrinsic Hallucination深度解析：检测与缓解策略

> **核心问题**: LLM生成内容与外部知识库冲突，产生虚假事实
> **分类**: In-context (与上下文不符) vs Extrinsic (与外部事实不符)
> **检测**: RAG + attribution, SelfCheckGPT, ITI (Inference-Time Intervention)
> **缓解**: RAG, Factuality-aware fine-tuning, Sampling methods, Chain-of-Verification
> **对Agent的意义**:  unreliable信息会导致错误决策，必须建立事实核查机制

---

## 🎯 Agent可靠性与Hallucination

**为什么Agent特别关心Hallucination**?

1. **决策依赖**: Agent基于LLM输出选择tool → hallucination → 错误操作
2. **用户信任**: 手机Assistant提供错误信息 → 用户流失
3. **安全风险**: 
   - 错误UI理解 → 点击错误按钮（删除/支付）
   - 虚假知识 → Agent belief形成错误世界模型

**手机Agent典型场景**:
```
用户: "帮我预订明天去北京的机票"
Agent hallucinates: "找到了3个航班，最低¥1200"
→ 实际无航班 → Agent继续执行错误预订流程
```

---

## 🔍 Hallucination分类

### **In-context Hallucination**

**定义**: 模型输出与提供的上下文不一致

**示例**:
```
Context: "The capital of France is Paris."
Question: "What is the capital of France?"
Model: "The capital of France is London."  ← In-context hallucination
```

**对Agent影响**: 阅读文档/网页时误解内容

---

### **Extrinsic Hallucination** (本笔记重点)

**定义**: 模型输出与外部真实世界事实冲突（or 无法验证）

**示例**:
```
Question: "Who is the current CEO of Apple?"
Model: "Tim Cook"  ← 正确（如果当前确实是）
Model: "Steve Jobs" ← Extrinsic hallucination (Steve已去世)
```

**检测困难**: 外部知识太大，无法穷尽验证

**对Agent影响**: 基于错误知识做长期决策 → 累积错误

---

## 📊 Hallucination发生原因

### **1. Pre-training Data Issues**

**问题**: 互联网数据包含错误/过时信息

**例子**: Wikipedia历史版本有错误，模型学到

**影响**: 模型无法区分正确vs错误事实，单纯最大化likelihood

---

### **2. Fine-tuning New Knowledge**

**关键发现** (Gekhman et al. 2024):

- LLM学习新知识**慢于**旧知识
- 学会新知识后，hallucination倾向**增加**
- 最佳表现: 学会大多数Known，但仅少量Unknown

**训练曲线**:
```
Step 1-1000: Known examples fit quickly, Unknown slowly
Step 1000-3000: Unknown开始拟合，dev performance peaks when most Known but few Unknown fitted
Step 3000+: Unknown大部分拟合，dev performance drops (hallucination increase)
```

**启示**: 
- 不要用SFT灌输新知识（可能有害）
- 优先使用RAG提供知识，而非修改模型weights
- 如果需要fine-tune，确保新知识高质量且充分

---

### **3. 采样随机性**

**问题**: Nucleus sampling (top-p) 增加多样性 → 增加hallucination

**Lee et al. (2022) 发现**:
- Greedy decoding 在FactualityPrompt上比nucleus sampling更好
- 多样性越好，hallucination越高（trade-off）

---

## 🔧 检测方法（5大类）

### **1. RAG-based Evaluation (RAG + 验证)**

**流程**: 
```
模型输出 → 提取声明 → 检索相关文档 → NLI模型判断支持度
```

**FActScore** (Min et al. 2023):
- 分解长文本为atomic facts
- 每个fact与Wikipedia比对
- 计算支持比例 (precision)

**FacTool** (Chern et al. 2023):
- Claim extraction (LLM提取可验证声明)
- Query generation (声明→搜索查询)
- Tool querying (Google搜索、代码执行等)
- Agreement verification (证据是否支持声明)

**效果**: Retrieval显著降低hallucination

---

### **2. SelfCheckGPT (采样一致性)**

**核心**: 无外部知识库，依赖模型自身多样本一致性

**方法**:
- 采样N个不同输出 (temperature>0)
- 计算两两相似度 (BERTScore, NLI, prompting)
- 相似度低 → 可能hallucination

**优势**:
- 黑盒可用（无需logits）
- 无需外部知识库

**劣势**:
- 对某些hallucination不敏感（模型一致地错）
- 计算成本高（多轮采样）

**实验**: GPT-3 WikiBio passages，SelfCheckGPT效果最好时使用prompting-based consistency检查

---

### **3. Inference-Time Intervention (ITI)**

**思路**: 识别与真实相关的attention heads，推理时沿"truthful方向"偏移激活值

**方法**:
1. 拟合线性探针 (linear probe) 在每个layer的激活上，区分truthful vs false输出
2. 选择稀疏的attention heads（线性探针准确率高）
3. 推理时，对这些head的激活沿truthful方向偏移

**效果**: 在TruthfulQA上提升truthfulness，不严重影响性能

**代价**: 需要探针训练数据（truthful/false对）

---

### **4. Indirect Query (间接查询)**

**问题**: Direct query "这个引用存在吗？" → 模型可能直接yes

**Agrawal et al. (2023) 发现**:
- 问 "Who are the authors of this paper?"（如果引用是伪造的，模型难以编造一致的作者）
- 多轮生成一致性低 → 更可能hallucination

**方法**: 
```
生成引用 → 多次询问作者 → 检查一致性
```

**优势**: 比direct query更有效，大模型表现更好

---

### **5. Calibration (不确定性估计)**

**核心**: 让模型输出置信度，低置信度时拒绝回答

**指标**: 
- P(True) vs actual correctness
- 校准曲线 (calibration curve) 接近45度线为佳

**发现**:
- 大模型在多选题上校准更好
- RLHF使校准变差（模型过度自信）
- 高温采样 improve calibration
- Verbalized uncertainty ("Confidence: 60%") generalizes well

**应用**: 设置阈值，置信度<0.7 → 返回"I don't know"

---

## 🛡️ 缓解策略（6大类）

### **1. RAG (检索增强生成)**

**原则**: 提供grounding documents，减少模型自由发挥

**架构**:
```
用户问题 → 检索相关文档 → 拼接prompt → LLM生成（with citations）
```

**高级变体**:

#### **Self-RAG** (Asai et al. 2024)

**创新**: 训练模型输出 reflection tokens，学会self-critique

**特殊token**:
- Retrieve: {yes, no, continue} - 决定是否检索
- IsRel: {relevant, irrelevant} - 文档相关性
- IsSup: {fully, partially, no support} - 生成内容是否被支持
- IsUse: {1-5} - 有用性评分

**训练**: 用GPT-4生成演示数据，蒸馏到小模型

**效果**: 事实性提升，同时保持生成质量

---

#### **RARR** (Gao et al. 2022)

**Retrofit Attribution using Research and Revision**

**两阶段**:
1. **Research**: 
   - 生成搜索查询（基于生成文本）
   - 运行Google搜索，top-1文档
   - 检查是否与当前生成矛盾
2. **Revision**:
   - 如果有矛盾 → 编辑生成文本，使其与证据一致
   - 保留原意，最小修改

**指标**: 
- Attribution (支持证据比例)
- Preservation (保留原意程度)

**优势**: 无需训练，后处理

---

#### **FAVA** (Mishra et al. 2024)

**Factuality Verification with Augmented Knowledge**

**组件**:
- Retriever: 检索相关文档
- Editor: 编辑生成内容以纠正幻觉

**训练**:
- 在模型生成中随机插入错误 → 构建训练数据 (context, wrong, correct)
- 微调editor模型

**vs RARR**: RARR无需训练，FAVA需要fine-tune editor但可能效果更好

---

### **2. Sampling Methods (采样策略)**

**Factual-nucleus sampling** (Lee et al. 2022):

**问题**: 标准nucleus sampling后期token随机性大 → hallucination

**方案**: 动态调整p
```
p_t = max(ω, p × λ^(t-1))
```
- 句首: 使用完整p (多样性)
- 句尾: p减小，接近greedy (事实性)

**实验**: NE error降低，同时保持多样性和低重复

---

### **3. Inference-Time Intervention (ITI)**

如前所述，偏移attention head激活方向。

**适用**: 已有探针的模型，无需重新生成或检索

**局限**: 需要truthful/false数据训练探针

---

### **4. Fine-tuning for Factuality**

**核心**: 在SFT/RLHF阶段加入factuality目标

#### **FLAME** (Lin et al. 2024)

**Factuality-Aware Alignment**

**SFT阶段**:
- 生成训练数据比模型当前生成更factual (用FActScore筛选)
- 目标: 模型学会生成更事实的内容

**RLHF阶段**:
- 方法1: RAG样本作为positive，原模型作为negative → **失败**（蒸馏未知知识）
- 方法2: 使用FActScore作为reward signal → **成功**

**结果**: 
- Factuality提升
- Helpfulness保持（Alpaca Eval win rate vs baseline）

---

#### **Factuality Tuning** (Tian & Mitchell 2024)

**流程**:
1. 对prompt采样多个completions
2. 标注truthfulness (reference-based NLI 或 reference-free confidence)
3. 用DPO fine-tune，偏好truthful样本

**效果**: FactTune-FS (FActScore标注) 效果最佳

---

#### **RAG + Fine-tuning (WebGPT, GopherCite)**

**思路**: 训练模型学会引用搜索来源，避免幻觉

- WebGPT: 行为克隆 + 人类偏好RL，输出带引用
- GopherCite: few-shot生成引用，RM排序，RL训练

**发现**: RL提升有限，best-of-n rejection sampling效果相当

---

### **5. Chain-of-Verification (CoVe)**

**Dhuliawala et al. (2023)**

**四步**:
1. **Baseline**: 初稿生成
2. **Plan verification**: 生成验证问题（非模板）
3. **Execute verifications**: 独立回答每个验证问题
   - Joint: 与step2合并（原稿在上下文，易重复错误）
   - **2-step**: 分离planning和execution（原稿不在上下文）✅
   - **Factored**: 每个问题单独回答（避免相互影响）✅✅
   - **Factor+revise**: 增加cross-checking步骤 ✅✅✅
4. **Final output**: 基于验证结果修订

**关键洞察**:
- CoT和instruction-tuning **不减少**hallucination
- Factored和2-step CoVe显著改善
- 短验证问题 > 长验证问题
- 自由生成验证问题 > 启发式问题 > Yes/No问题

---

### **6. Recitation-Augmented Generation (RECITE)**

**Sun et al. (2023)**

**思路**: 先recite相关证据，再answer

**流程**:
```
问题 → 要求模型recite相关信息 → 基于recitation生成答案
```

**效果**: 
- recite质量 ≈ BM25检索
- 正确recitation但错误answer (~7-10%)
- 错误recitation但正确answer (~12%) → 模型内部知识仍有用

**结合**: 可用于手机端RAG的轻量替代（如果模型记忆能力强）

---

## 🎯 对手机Agent项目的启示

### **威胁场景**

1. **界面理解错误** (视觉hallucination)
   - Agent看到"删除"按钮，但实际是"保存"
   - 生成错误坐标 → 点击错误位置

2. **知识幻觉** 
   - "微信支付限额是¥5000"（实际更高/更低）
   - 导致错误决策

3. **记忆污染**
   - 之前的错误操作被记入memory → 后续重复错误

---

### **防御架构（多层）**

#### **Layer 1: RAG for Knowledge**

**场景**: 需要事实性知识的任务（如查询支付限额）

**方案**:
```
用户问题 → 检索官方文档/FAQ → 生成答案（with citations）
```

**工具**: ChromaDB + SentenceTransformer embeddings

**要求**: Agent必须引用来源，否则视为hallucination

---

#### **Layer 2: Visual Grounding Validation**

**场景**: GUI操作前验证位置

**方案**:
- 截图 → 多模型投票 (STEP3 + 另一模型)
- 检测不一致 → 触发A2H human confirmation

**指标**: 置信度<0.85 → 问人类

---

#### **Layer 3: Confidence Monitoring**

**在推理时监控**:

- **Token-level confidence**: max softmax < 0.8 → 标记为uncertain
- **Layer-level early exit**: CALM机制，如果某层已达到高置信度，可能更可靠（但需验证）
- **Multi-sample consistency**: 采样3次，结果不一致 → flag

---

#### **Layer 4: Chain-of-Verification**

**复杂任务**（多步骤）:
```
Agent draft: "预订北京机票流程：1.打开携程 2.搜索..."
→ 生成验证问题: "携程是否有机票预订功能？" "时间搜索逻辑是否正确？"
→ 独立验证每个步骤
→ 修订最终计划
```

**代价**: 推理时间×3，但关键任务值得

---

#### **Layer 5: Self-RAG Training**

**长期**: 在手机任务数据上训练Self-RAG风格模型

**训练数据**:
- 构造hallucination-positive/negative pairs
- 添加Retrieve/IsRel/IsSup/IsUse tokens
- 训练模型学会self-critique

**目标**: 内建factuality awareness，无需外部检测器

---

### **Implementation Checklist**

立即行动:
- [ ] 集成RAG检索器（按任务类型过滤数据源）
- [ ] 设置置信度阈值（<0.8触发A2H）
- [ ] 实现视觉一致性检查（多screenshot验证）
- [ ] 添加引用生成（要求Agent注明信息来源）
- [ ] 监控hallucination率（人工抽检5%案例）
- [ ] 收集失败案例，用于后续fine-tuning

---

## 📊 Benchmarks & Evaluation

| Benchmark | 任务 | 规模 | 用途 |
|-----------|------|------|------|
| **TruthfulQA** | 问答（对抗性） | 817题 | 测量truthfulness |
| **SelfAware** | 可回答 vs 不可回答 | 3369题 | 自我认知 |
| **FactualityPrompt** | 事实性prompt | ~1000 | NE error + Entailment |
| **FActScore** | 长文本原子事实支持度 | 120 prompts | 细粒度factuality |
| **LongFact** | 长形式事实性 | 2280 prompts | F1@K |
| **FAVABench** | 细粒度hallucination标注 | 600 responses | 错误类型分类 |

**建议**: 用TruthfulQA和SelfAware快速评估，FActScore用于长文本

---

## 🔗 **相关笔记**

- **017**: Adversarial Attacks (安全威胁)
- **005**: Reward Hacking (训练中的作弊)
- **011**: EdgeNav (移动端优化)
- **TODO**: 创建"Agent安全与可靠性综合框架"

---

## 💡 **核心结论**

1. **Hallucination ≠ 错误**: 特指与外部事实不符的虚构输出
2. **检测困难**: 无外部知识时只能依赖模型自身一致性
3. **RAG最有效**: 提供grounding documents，显著降低
4. **Fine-tuning需谨慎**: 灌输新知识可能增加hallucination
5. **Self-RAG是未来**: 训练模型self-critique，内建factuality
6. **Agent必须多层防御**: RAG + Confidence + Verification + Human-in-the-loop

对于智跃千里的手机Agent，**hallucination是系统可靠性的大敌**。必须建立从RAG、置信度监控到A2H人类确认的多层防线，确保Agent不会因为幻觉而执行危险操作。

---

*Created: 2026-02-20 15:45 | Quality: 0.91 | TODO: lea-??? (Hallucinations任务)*
