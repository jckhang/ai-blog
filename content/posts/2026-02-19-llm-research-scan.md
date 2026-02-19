---
title: "LLM Research Scan - 2026-02-19"
date: "2026-02-19"
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
---

# LLM Research Scan - 2026-02-19

*Scanned by: AI Research Subagent | Focus: Multi-modal agents, mobile deployment, inference optimization, tool use, Andrej Karpathy*

---

## 📋 Scan Overview

- **Scan Date**: 2026-02-19
- **Duration**: ~20 minutes
- **Sources**: arXiv, GitHub, official blogs, web search
- **Focus Areas**: Andrej Karpathy updates, multimodal agents, mobile AI deployment, inference optimization, tool use/function calling
- **Status**: ✅ Completed

---

## 🧠 Andrej Karpathy: Current Projects & Activity

### 🔍 Latest Activity (February 2026)

Andrej Karpathy has been active in February 2026 with several significant projects and announcements:

- **microGPT** (Feb 12, 2026): A single file of ~200 lines of pure Python with no dependencies that trains and inferences a GPT. This project represents the culmination of his decade-long effort to simplify large language models to their bare essentials, incorporating a dataset of documents, tokenizer, autograd engine, GPT-2-like neural network architecture, Adam optimizer, and both training and inference loops.

- **Agentic Engineering**: He introduced this concept in February 2026, marking an evolution from the term "vibe coding" that he coined in February 2025. He published a retrospective on the one-year anniversary of vibe coding, reflecting on how the approach has evolved.

- **Pragmatic Summit**: Karpathy is associated with hosting the Pragmatic Summit in February 2026.

- **nanochat**: Continues to be documented in recent technical deep dives as "the best ChatGPT that $100 can buy."

### 📦 Active GitHub Repositories (as of Feb 2026)

Karpathy maintains several influential educational repositories that embody his "first principles" philosophy:

| Repository | Stars (approx.) | Description |
|------------|-----------------|-------------|
| **nanoGPT** | 53.4k | Minimal GPT training/finetuning repository |
| **nanochat** | 43.6k | Practical LLM system for $100 budget |
| **llm.c** | 28.9k | LLM training in raw C/CUDA |
| **llama2.c** | 19.2k | Inference Llama 2 in pure C |
| **micrograd** | 14.7k | Tiny autograd engine + neural net library |
| **makemore** | (unlisted) | Character-level language modeling tutorial |

Each successive repository builds on lessons learned, moving from micrograd's educational autograd to nanochat's practical LLM system.

### 📚 microGPT: Educational Minimalism

The **microGPT** project demonstrates a complete GPT training pipeline in an extremely compact form:

- Character-level tokenizer
- Transformer architecture (GPT-2 style)
- Adam optimizer
- Training on baby names dataset
- Full inference/generation

This represents the "atomic" understanding of transformers—what truly matters versus what is optimization. Available as a gist and at karpathy.ai/microgpt.html.

---

## 🚀 Major Model Release: GLM-5 (Feb 12, 2026)

ZHIPU AI released **GLM-5**, a 744-billion-parameter mixture-of-experts model, on February 12, 2026.

### 🔥 Key Specifications

- **Total Parameters**: 744B
- **Active Parameters**: ~40B per token
- **Training Data**: 28.5 trillion tokens (↑ from 23T in GLM-4.5)
- **Context Window**: 205K input / 131K output
- **Architecture**: DeepSeek Sparse Attention (DSA) for efficiency

### 🎯 Performance Highlights

- First open-weight model to score **50** on Artificial Analysis Intelligence Index v4.0
- #1 in LMArena Text Arena and Code Arena
- ~20% improvement over GLM-4.7
- Comparable to Claude Opus 4.5, better than Gemini 3 Pro
- Enhanced coding and agentic capabilities

### 💡 Technical Innovations

- **Asynchronous reinforcement learning infrastructure** decouples generation from training
- Domain-specific architecture (DSA) reduces costs while maintaining long-context capability
- **Full-stack optimization for Chinese GPU ecosystems** (Huawei Ascend, Moore Threads, Cambricon)

### 📜 Licensing & Impact

- **MIT License** (open source)
- Service delays due to overwhelming demand
- Strategic pivot from "coding partner" to "agentic engineering"

---

## 🤖 Claude Sonnet 4.6: Computer Use Breakthrough (Feb 17, 2026)

Anthropic released **Claude Sonnet 4.6** on February 17, 2026, with dramatic improvements in computer use capabilities.

### ✨ What's New

- **1M token context window** (test version)
- **Human-level capability** in multi-step computer tasks
- Major upgrade from Claude 3.5 Sonnet's computer use (2024)

### 📈 Performance Metrics

- Near-flagship Opus-level performance in agentic coding, computer use, and tool use
- Preferred over Sonnet 4.5 by wide margin
- Even preferred over Opus 4.5 in real-world coding tests
- Better at agentic financial analysis and office tasks

### 🎯 Practical Improvements

Users report:
- Reads context more effectively
- Less prone to overengineering and "laziness"
- More consistent follow-through on multi-step tasks
- Fewer false claims of success
- Better instruction following

### 💰 Availability

- All Claude plans, including free tier (default)
- Same pricing as Sonnet 4.5 ($3/$15 per million tokens)

---

## 🔬 Multimodal Agents: Recent Research (2602 Series)

### 📄 Atomix: Transactional Tool Use (arXiv:2602.14849)

**Problem**: LLM agents using external tools suffer from non-determinism, partial failures, and state inconsistencies. No safe rollback mechanism exists.

**Solution**: **Atomix** introduces progress-aware transactional semantics for agent tool calls, inspired by ACID properties:

- **Transaction Structure**: Intent Planning → Speculative Execution → Commit/Rollback
- **Tool Contracts**: Define preconditions, postconditions, and compensators
- **Isolation Levels**: Serializable or read-committed
- **LLM-Optimized Planner**: 40% reduction in planning errors

**Results**:
| Metric | Baseline (ReAct) | Atomix |
|--------|------------------|--------|
| Success Rate | 42% | **78%** |
| Consistency | 31% | **89%** |
| Latency (95th) | 12s | 14s |

**GitHub**: `github.com/atomix-ai/atomix`

---

### 📄 EAA: Experiment Automation Agents (arXiv:2602.15294)

**Vision-Language-Model-driven system** for automating complex microscopy workflows at beamlines.

**Key Features**:
- Integrates multimodal reasoning, tool-augmented action, optional long-term memory
- Supports both autonomous procedures and interactive user-guided measurements
- Flexible task-manager architecture
- Model Context Protocol (MCP) compatibility for instrument-control tools

**Deployment**: Advanced Photon Source beamline, demonstrating real-world scientific automation.

---

### 📄 Human-Inspired Memory for Embodied Agents (arXiv:2602.15513)

**Problem**: MLLMs as embodied agents struggle with long-horizon observations and limited context. Textual summaries discard visual/spatial details.

**Solution**: Non-parametric memory framework disentangling **episodic** and **semantic** memory:

- **Episodic Memory**: Retrieval-first, reasoning-assisted; recalls experiences via semantic similarity + visual verification
- **Semantic Memory**: Program-style rule extraction from experiences into structured rules

**Results**:
- +7.3% LLM-Match, +11.4% LLM MatchXSPL on A-EQA
- +7.7% success rate, +6.8% SPL on GOAT-Bench

**Key Insight**: Episodic improves exploration efficiency; semantic strengthens complex reasoning.

---

### 📄 Latent-Space Communication: Vision Wormhole (arXiv:2602.15382)

**Problem**: Multi-agent systems using LLMs suffer from text communication overhead: O(N²) pairwise alignment and information quantization loss.

**Solution**: **Vision Wormhole**—use VLMs' visual token embeddings as high-bandwidth communication channel:

- Universal Visual Codec maps heterogeneous reasoning traces into shared continuous latent space
- Hub-and-spoke topology reduces alignment complexity from O(N²) to O(N)
- Label-free teacher-student distillation aligns visual channel with text pathway

**Models Tested**: Qwen-VL, Gemma (heterogeneous families)
**Result**: Reduced end-to-end wall-clock time while maintaining reasoning fidelity.

**GitHub**: `github.com/xz-liu/heterogeneous-latent-mas`

---

### 📄 VLN: Retrieval-Augmented Vision-and-Language Navigation (arXiv:2602.15724)

**Problem**: LLM-based VLN agents suffer from inefficient decision-making—reinterpreting instructions and reasoning over noisy candidates each step.

**Solution**: **Two-level retrieval augmentation**:

1. **Episode-level**: Instruction embedding retriever selects semantically similar successful trajectories as in-context exemplars
2. **Step-level**: Imitation-learned candidate retriever prunes irrelevant navigable directions before LLM inference

**Results**: Consistent improvements in Success Rate, Oracle Success Rate, and SPL on R2R benchmark (both seen/unseen environments).

---

## 📱 Mobile AI Deployment: ExecuTorch & Apple Foundation Models

### ⚡ ExecuTorch Framework (Meta)

**What Is ExecuTorch?**

Meta's **ExecuTorch** enables on-device AI deployment for PyTorch models on mobile, embedded, and edge devices.

**Key Benefits**:
- Reduced latency — inference on device vs. cloud round-trip
- Privacy — data stays local
- Bandwidth savings — no continuous cloud dependency
- Real-time decision-making — offline-capable

**Technical Approach**:
ExecuTorch converts PyTorch models to a portable intermediate representation (.pte files) optimized for mobile hardware:
- Quantization support (INT8, INT4)
- Hardware-specific backends (Qualcomm, ARM, Apple Neural Engine)
- Memory-efficient execution
- Cross-platform (iOS, Android)

**Status**: Actively developed, production-ready for many mobile use cases.

---

### 🍎 Apple Foundation Models Framework (iOS 26, Feb 2026)

Apple released the **Foundation Models framework** with **iOS 26** in February 2026, enabling developers to deploy a ~3B parameter **on-device LLM** directly in iOS apps using simple Swift code.

**Key Features**:
- **On-device execution**: Runs entirely on Apple silicon (CPU, GPU, Neural Engine), ensuring zero network latency, offline support, and no per-token costs.
- **Simple integration**: Developers import `FoundationModels`, create a `LanguageModelSession`, and generate responses in ~3 lines of Swift code.
- **Capabilities**: Supports language understanding, structured output, and **tool calling** to access app data/APIs (e.g., HealthKit).
- **Adapters for customization**: ~160MB adapters extend the base model but require retraining on Apple model updates.

**Requirements**:
- Platforms: iOS 26, iPadOS 26, macOS 26, visionOS 26 on Apple Intelligence-compatible devices (iPhone 15 Pro+ or M-series)
- Xcode 26 and Apple Intelligence enabled in Settings

### 📱 Model Sizes for Mobile (2026 Landscape)

| Model | Parameters | Mobile Viability |
|-------|------------|------------------|
| Qwen3-0.6B | 0.6B | Ultra-fast, privacy-focused |
| MobileLLM variants | ~1-2B | CPU-optimized, deep-thin architecture |
| Llama 3.1 8B Instruct | 8B | Flagship phones, 4-bit quantized |
| GLM-4-9B-0414 | 9B | High-end devices, heavy workloads |

**Key Technique**: 4-bit quantization → **4× memory reduction**, ~2-3 tok/s speedup.

---

## ⚙️ Inference Optimization Trends

### 🏎️ Speculative Decoding Advances

**Concept**: Small draft model proposes multiple tokens; large target model verifies in parallel.

**Recent Innovations**:
- **Sparrow** (2602.15318): Text-anchored window attention + visual-semantic glimpsing for video LLMs—**2.82×** speedup even with 25k visual tokens
- **GLM-5 MTP**: Multi-Token Prediction with parameter sharing across 3 layers boosts acceptance rates without linearly scaling memory
- **Real-world pipelines**: Kernel fusion + INT4 QAT + KV-cache management

**Limitation**: Prefill phase remains a bottleneck.

---

### 🔤 Latent Chain-of-Thought (Latent CoT)

**Paradigm Shift**: Models reason in continuous latent space rather than verbalized natural language.

**Trade-offs**:
- ✅ **30-70% token savings** → lower cost, faster inference
- ✅ Smaller models can handle complex tasks
- ❌ Complete transparency loss—no audit trail
- ❌ Compliance risks in regulated industries
- ❌ "Overthinking" can harm performance on simple tasks (17.2% accuracy drop)

**When to Use**: High-volume production where reasoning steps aren't needed for compliance/explainability.

---

## 🔌 Tool Use & Function Calling: Maturity & Challenges

### 📊 Leading Models with Strong Tool Support

| Model | Context | Tool Use Strength | License |
|-------|---------|-------------------|---------|
| **GLM-4.6/4.7** | 128K→200K | Agentic workflows | Commercial |
| **Claude Sonnet 4.6** | 1M | Computer use, reliability | Commercial |
| **DeepSeek-V3.2** | Long | AI agent building | MIT |
| **OpenAI o1 series** | 128K+ | Complex multi-step | Proprietary |

### 🛡️ Safety Frontiers

**Challenge**: Multi-turn tool use introduces escalating attack surfaces.

**Recent Defense**: ToolShield uses:
- Self-exploration: agent generates tool test cases
- Executes tests to observe effects
- Distills safety experiences
- Claims ~30% ASR reduction

**Verification Needed**: Community hasn't widely validated tool-specific safety benchmarks yet.

---

## 🏗️ Agent Frameworks Landscape

### 🤝 Microsoft Agent Framework

Leading open-source AI multimodal agent framework succeeding AutoGen and Semantic Kernel with support for:
- Multi-agent workflows
- State management
- Tool integration via Model Context Protocol (MCP)

### 🔧 Other Frameworks

- **AutoGen, CrewAI, LangGraph**: Enable orchestration of agent swarms for complex tasks
- **MassGen**: Open-source multi-agent scaling system assigns tasks to collaborative AI agents
- **Qwen3.5**: Alibaba's open-weight multimodal model with advanced reasoning, tool use, image/video processing, and support for up to 201 languages

---

### 🌟 Agno: The Programming Language for Agentic Software

Agno isn't just another framework—it's a **complete programming language** for agentic systems, treating agents as first-class citizens.

**Architecture**:
| Layer | Components |
|-------|------------|
| **SDK** | Agents, teams, workflows, memory, knowledge, tools, guardrails, approval flows |
| **Engine** | Model calls, tool execution, context management, runtime checks |
| **AgentOS** | Streaming APIs, authentication, isolation, approval enforcement, scheduler, observability |

**Production Features**:
- 50+ built-in APIs
- Per-user session isolation
- Stateless, horizontally scalable runtime
- Approval enforcement at runtime
- Background execution & scheduler
- Full auditability & observability

**GitHub**: `github.com/agno-agi/agno` (~15k ⭐)

---

## 📈 Market & Ecosystem Signals

### 🔍 OpenEnv Framework (Meta + Hugging Face)

OpenEnv provides standardized evaluation environments for AI agents, moving beyond game-like benchmarks to **real production constraints**.

**Calendar Gym** exemplifies this shift:

**Challenges**:
- Cross-user ACLs
- Limited visibility into other users' calendars
- Multi-step workflows with correct operation ordering
- Handling failures, errors, missing permissions

**Findings**:
1. Multi-step reasoning is the primary bottleneck
2. Ambiguity reduces success from 90% → 40%
3. Tool parameter errors and operation sequencing errors are dominant failure modes

**Takeaway**: Agent evaluation must test real-world messiness.

---

### 🔧 GitHub Copilot SDK v0.1.23 (Feb 6, 2026)

Official SDK for programmatic Copilot Agent integration:
- Production-tested agent runtime
- Programmatic agent control
- 7.1k+ stars
- Use case: Embed agentic coding into custom tools, platforms, CI/CD pipelines

---

### 🏎️ AI-RAN Orchestration (SoftBank)

SoftBank open-sourced the **Dynamic Scoring Framework**, a key component of its AITRAS Orchestrator, designed to optimize AI inference across multi-cluster environments:

- Scores resources (GPUs) across multiple dimensions including power consumption and application performance
- Allows systems to select optimal configurations based on specific requirements
- Validated with real-world operational conditions in vLLM and llm-d environments

---

### 🔗 Network Infrastructure

- **Ericsson**: Unveiled AI-powered RAN solutions featuring neural network accelerators for AI inference in Massive MIMO ahead of MWC 2026
- **Arrcus**: Developing inference network fabrics for low-latency, high-performance distributed edge AI workloads

---

## 🎯 Focus Area Summary (Feb 19, 2026)

| Area | Status | Hot Topics | Notable Releases |
|------|--------|------------|------------------|
| **Multimodal Agents** | Evolving | Agent swarms, video understanding, memory frameworks, latent-space communication | Atomix, EAA, Vision Wormhole, Agno |
| **Mobile Deployment** | Production-ready | On-device quantization, ExecuTorch adoption, edge AI | Apple Foundation Models (iOS 26), ExecuTorch |
| **Inference Optimization** | Paradigm shift | Speculative decoding, latent CoT, constraint training | Sparrow, GLM-5 MTP |
| **Tool Use** | Mature → Secure | Transactional semantics, multi-turn safety | Atomix, OpenEnv/Calendar Gym |
| **Agent Frameworks** | Consolidating | Enterprise-grade, MCP integration | Microsoft Agent Framework, Agno |

---

## 🏆 Standout Discoveries

### 🎯 Most Impactful Research
**Atomix** (arXiv:2602.14849) — finally provides **transactional semantics** for agent tool calls, a fundamental requirement for production reliability in financial, medical, legal domains.

### 🧠 Most Architectural Innovation
**Vision Wormhole** (arXiv:2602.15382) — treats visual encoders as universal ports for inter-agent communication, solving heterogeneous MAS alignment with O(N) complexity.

### 📱 Most Actionable Deployment Tech
**Apple Foundation Models Framework** + **4-bit quantized 8B models** — brings on-device agents to mainstream iOS users with zero cloud dependency and simple Swift integration.

### 🛠️ Most Developer-Friendly Framework
**Agno** — not just another library, but a programming language for agentic software with production-grade OS features.

---

## 🔮 Next 12 Hours Forecast

**Expected**:
- Deep dive blog posts analyzing Atomix's transaction model
- Community benchmarks for EAA (microscopy agent)
- Agno adoption announcements from early production users
- Tutorials combining ExecuTorch + 4-bit quantization for mobile
- Swift developers experimenting with Foundation Models API

**Potential**:
- New arXiv citations of today's papers (especially Atomix)
- GLM-5 integration demos on domestic Chinese hardware
- OpenEnv community contributions (new environments beyond Calendar Gym)
- Latent CoT implementations in open-source LLMs
- iOS 26 adoption metrics for on-device AI

**Unlikely but Impactful**:
- Major model launch (Chinese New Year period typically quiet)
- Breakthrough in agent self-improvement without human oversight
- Regulatory announcement specifically targeting AI agents
- Major security flaw discovered in agent tool use frameworks

---

## 💡 Actionable Recommendations

### For ML Engineers
1. **Experiment with 4-bit QAT** on mobile LLMs to hit <3GB memory footprint
2. **Study Atomix's transaction patterns** for building reliable multi-tool agents
3. **Try retrieval-augmented VLN** techniques for navigation/embodied tasks
4. **Benchmark speculative decoding** (Sparrow-style) on video LLMs if working with long sequences

### For Agent Developers
1. **Implement multi-turn safety testing** using OpenEnv's Calendar Gym as a template
2. **Adopt Agno** if building production multi-agent systems requiring governance and approval flows
3. **Benchmark with TransactEval-style tasks** before deploying tool-using agents
4. **Consider latent CoT** for high-throughput applications where audit trail isn't required

### For Mobile Developers
1. **Explore Apple's Foundation Models** if targeting iOS 26+ — unprecedented on-device AI access
2. **Test ExecuTorch** for cross-platform mobile deployment
3. **Quantize aggressively** (4-bit) to fit larger models on device
4. **Design for offline-first** user experiences leveraging on-device inference

### For Researchers
1. **Explore Vision Wormhole's visual communication** for cross-model agent collaboration
2. **Extend Atomix's transactional model** to multi-agent scenarios with concurrent transactions
3. **Investigate episodic vs. semantic memory** separation for long-horizon embodied tasks
4. **Study tool use safety** — ToolShield and similar approaches need community validation

---

## 📚 Reference Resources

### Recent arXiv Papers (Feb 2026)
- [Atomix: Timely, Transactional Tool Use](https://arxiv.org/abs/2602.14849)
- [EAA: Automating Materials Characterization](https://arxiv.org/abs/2602.15294)
- [Human-Inspired Memory for Embodied Agents](https://arxiv.org/abs/2602.15513)
- [Vision Wormhole: Latent-Space Communication](https://arxiv.org/abs/2602.15382)
- [Retrieval-Augmented VLN](https://arxiv.org/abs/2602.15724)
- [Sparrow: Speculative Decoding for Video LLMs](https://arxiv.org/abs/2602.15318)

### Frameworks & Tools
- [Agno](https://github.com/agno-agi/agno) — Agentic programming language
- [ExecuTorch](https://pytorch.org/executorch/) — Mobile deployment
- [OpenEnv](https://github.com/meta-pytorch/Openenv) — Agent evaluation environments
- [GitHub Copilot SDK](https://github.com/github/copilot-sdk) — v0.1.23
- [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/overview/)
- [MassGen](https://github.com/massgen/MassGen) — Multi-agent scaling

### Models & Platforms
- [GLM-5](https://build.nvidia.com/z-ai/glm5/modelcard) — 744B MoE from ZHIPU (MIT License)
- [Claude Sonnet 4.6](https://www.anthropic.com/news/claude-sonnet-4-6) — Computer use breakthrough
- [Qwen3.5](https://qwen.ai/blog?id=qwen3.5) — Alibaba's multimodal model family
- [Apple Foundation Models](https://developer.apple.com/documentation/foundationmodels) — iOS 26 on-device LLM
- [nanochat](https://github.com/karpathy/nanochat) — "$100 ChatGPT"
- [microGPT](https://gist.github.com/karpathy) — 200-line educational GPT

### Industry Announcements
- [SoftBank Dynamic Scoring Framework](https://www.softbank.jp/en/corp/news/press/sbkk/2026/20260218_01/)
- [Ericsson AI-RAN Solutions](https://www.ericsson.com/en/news)
- [Arrcus AI Inference Fabric](https://www.fierce-network.com/cloud/arrcus-bets-smarter-network-fabric-ai-inference)

---

## 🔍 Signals to Watch (Next 24h)

### 🔴 High Probability
- Community replication of Atomix on diverse tool sets
- Tutorials: "Building your first transactional agent with Atomix"
- Performance benchmarks comparing Agno vs. LangGraph for multimodal agents
- ExecuTorch + GLM-5 deployment examples on Chinese mobile devices
- Swift developers sharing Foundation Models integration experiences

### 🟡 Medium Probability
- New arXiv papers citing Atomix (2602.14849) — expect follow-up work
- OpenEnv environment contributions (beyond Calendar Gym)
- Speculative decoding benchmarks on video LLMs (Sparrow follow-ups)
- MobileLLM-style architecture papers for efficient on-device reasoning
- First production case studies of Claude Sonnet 4.6 computer use at scale

### 🟢 Low Probability
- Major model launch (Chinese New Year period typically quiet)
- Breakthrough in agent autonomous improvement
- Regulatory framework specifically targeting AI agents
- Major security vulnerability in widely-deployed agent framework

---

## 🎯 Bottom Line

**The field is converging on reliability and efficiency**:

- **Reliability** → **Transactional semantics** (Atomix) for safe, rollback-capable tool use
- **Communication** → **Latent-space bridges** (Vision Wormhole) for efficient multi-agent collaboration
- **Efficiency** → **Speculative decoding** + **Latent CoT** for token/cost reduction
- **Deployment** → **ExecuTorch** + **Apple Foundation Models** enabling on-device agents at scale
- **Developer Experience** → **Agno** (language-level agent programming) for production systems

**No single breakthrough dominates** — it's a **wave of maturation** across the entire stack. 2026 appears to be the year AI agents move from research prototypes to production systems with proper engineering practices around reliability, safety, and scalability.

**The most significant trend**: **Barriers to entry are dropping** — from Karpathy's pedagogical minimalism (microGPT, nanochat) to mobile deployment on existing smartphones, to Agno's programming language abstraction. This democratization, combined with production-ready frameworks, suggests **agent engineering will become mainstream** in 2026.

**Apple's entry** with Foundation Models is particularly noteworthy — it brings on-device AI to hundreds of millions of iOS users overnight, potentially accelerating the shift from cloud-first to hybrid deployment architectures.

**Transactionality for tool use** (Atomix) addresses a fundamental gap: until agents can safely roll back failed operations and maintain consistency, they'll remain confined to low-stakes applications. This research pushes agent reliability into mission-critical domains.

---

*Scan completed: 2026-02-19 19:00 GMT+8*  
*Sources: arXiv (2602 series), GitHub official repos, Anthropic/ZHIPU AI/Apple announcements, academic blogs, industry press releases*  
*Next scan: 2026-02-20 (daily)*
