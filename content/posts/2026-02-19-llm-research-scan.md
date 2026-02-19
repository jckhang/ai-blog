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

### 🔍 Latest Activity (January-February 2026)

Andrej Karpathy's most recent public commentary was on **January 26, 2026**, where he discussed a "phase shift in software engineering," highlighting improvements in **Anthropic's Claude Code** and **OpenAI's Codex**. He has continued to advocate for AI agents transforming software development, emphasizing how agents make dependencies increasingly optional through tools like DeepWiki MCP and GitHub CLI.

### 📦 Active GitHub Repositories (as of Feb 2026)

Karpathy maintains several influential educational repositories:

| Repository | Stars (approx.) | Description |
|------------|-----------------|-------------|
| **nanoGPT** | 53.4k | Minimal GPT training/finetuning |
| **nanochat** | 43.6k | "The best ChatGPT that $100 can buy" |
| **llm.c** | 28.9k | LLM training in raw C/CUDA |
| **llama2.c** | 19.2k | Inference Llama 2 in pure C |
| **micrograd** | 14.7k | Tiny autograd engine + neural net library |
| **makemore** | (unlisted) | Character-level language modeling tutorial |

These projects represent Karpathy's philosophy: **from first principles to production relevance**. Each successive repository builds on lessons learned, moving from micrograd's educational autograd to nanochat's practical LLM system.

### 📚 microGPT: Educational Minimalism

The **microGPT** project (~243 lines of pure Python, zero dependencies) demonstrates a complete GPT training pipeline:

- Character-level tokenizer
- Transformer architecture ( GPT-2 style )
- Adam optimizer
- Training on baby names dataset
- Full inference/generation

This represents the "atomic" understanding of transformers—what truly matters versus what is optimization. It's part of Karpathy's ongoing mission to democratize LLM knowledge.

---

## 🚀 Major Model Release: GLM-5 (Feb 12, 2026)

ZHIPU AI released **GLM-5**, a 744-billion-parameter mixture-of-experts model, on February 12, 2026. This represents a significant scaling leap:

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

Anthropic released **Claude Sonnet 4.6** on February 17, 2026, with dramatic improvements in computer use capabilities:

### ✨ What's New

- **1M token context window** (test版)
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

**GitHub**: `github.com/atomix-ai/atomix` (verify latest repo)

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

## 🏗️ Agent Framework: Agno — The Programming Language for Agentic Software

### 🌟 Why Agno Is Different

Agno isn't just another framework—it's a **complete programming language** for agentic systems, treating agents as first-class citizens with native primitives.

### 🏗️ Architecture

| Layer | Components |
|-------|------------|
| **SDK** | Agents, teams, workflows, memory, knowledge, tools, guardrails, approval flows |
| **Engine** | Model calls, tool execution, context management, runtime checks |
| **AgentOS** | Streaming APIs, authentication, isolation, approval enforcement, scheduler, observability |

### 🚀 Production Features

- 50+ built-in APIs
- Per-user session isolation
- Stateless, horizontally scalable runtime
- Approval enforcement at runtime
- Background execution & scheduler
- Full auditability & observability
- Runs in your cloud (data sovereignty)

### 💻 Example: Gcode Agent

```python
from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from agno.tools.coding import CodingTools
from agno.learn import LearningMachine

gcode = Agent(
    name="Gcode",
    model=OpenAIResponses(id="gpt-5.2"),
    tools=[CodingTools(base_dir=workspace, all=True), ReasoningTools()],
    learning=LearningMachine(mode=LearningMode.AGENTIC),
    enable_agentic_memory=True,
    add_history_to_context=True,
    num_history_runs=10,
)
```

**Star count**: ~15k ⭐ (rapidly growing in 2026)

**GitHub**: `github.com/agno-agi/agno`

---

## ⚙️ Inference Optimization Trends

### 🏎️ Speculative Decoding Advances

**Concept**: Small draft model proposes multiple tokens; large target model verifies in parallel.

**Recent Innovations**:
- **Sparrow** (2602.15318): Text-anchored window attention + visual-semantic glimpsing for video LLMs—**2.82×** speedup even with 25k visual tokens
- **GLM-5 MTP**: Multi-Token Prediction with parameter sharing across 3 layers boosts acceptance rates without linearly scaling memory
- **Real-world pipelines**: Kernel fusion + INT4 QAT + KV-cache management

**Limitation**: Prefill phase remains a bottleneck (speculative decoding only accelerates decoding latency).

---

### 🔤 Latent Chain-of-Thought (Latent CoT)

**Paradigm Shift**: Models reason in continuous latent space rather than verbalized natural language.

**Trade-offs**:
- ✅ **30-70% token savings** → lower cost, faster inference
- ✅ Smaller models can handle complex tasks
- ❌ Complete transparency loss—no audit trail
- ❌ Compliance risks in regulated industries (finance, medicine)
- ❌ "Overthinking" can harm performance on simple tasks (17.2% accuracy drop in some tests)

**When to Use**: High-volume production where reasoning steps aren't needed for compliance/explainability.

---

## 📱 Mobile AI Deployment: ExecuTorch Framework

### 💡 What Is ExecuTorch?

Meta's **ExecuTorch** enables on-device AI deployment for PyTorch models on mobile, embedded, and edge devices.

### 🎯 Key Benefits

- **Reduced latency** — inference on device vs. cloud round-trip
- **Privacy** — data stays local
- **Bandwidth savings** — no continuous cloud dependency
- **Real-time decision-making** — offline-capable

### 🔧 Technical Approach

ExecuTorch converts PyTorch models to a portable intermediate representation (.pte files) optimized for mobile hardware:

- Quantization support (INT8, INT4)
- Hardware-specific backends (Qualcomm, ARM, Apple Neural Engine)
- Memory-efficient execution
- Cross-platform (iOS, Android)

**Status**: Actively developed, production-ready for many mobile use cases.

---

### ⚡ Model Sizes for Mobile (2026 Landscape)

| Model | Parameters | Mobile Viability |
|-------|------------|------------------|
| Qwen3-0.6B | 0.6B | Ultra-fast, privacy-focused |
| MobileLLM variants | ~1-2B | CPU-optimized, deep-thin architecture |
| Llama 3.1 8B Instruct | 8B | Flagship phones, 4-bit quantized |
| GLM-4-9B-0414 | 9B | High-end devices, heavy workloads |

**Key Technique**: 4-bit quantization → **4× memory reduction**, ~2-3 tok/s speedup.

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

**Recent Defense**: ToolShield (mentioned in literature) uses:
- Self-exploration: agent generates tool test cases
- Executes tests to observe effects
- Distills safety experiences
- Claims ~30% ASR reduction

**Verification Needed**: Community hasn't widely validated tool-specific safety benchmarks yet.

---

## 📈 Market & Ecosystem Signals

### 🤝 OpenEnv Framework (Meta + Hugging Face)

OpenEnv provides standardized evaluation environments for AI agents, moving beyond game-like benchmarks to **real production constraints**.

**Calendar Gym** (from Turing Enterprises) exemplifies this shift:

**Challenges**:
- Cross-user ACLs
- Limited visibility into other users' calendars
- Multi-step workflows with correct operation ordering
- Handling failures, errors, missing permissions

**Findings**:
1. Multi-step reasoning is the primary bottleneck
2. Ambiguity (natural language vs. explicit IDs) reduces success from 90% → 40%
3. Tool parameter errors and operation sequencing errors are dominant failure modes

**Takeaway**: Agent evaluation must test real-world messiness, not just capability.

---

### 🔧 GitHub Copilot SDK v0.1.23 (Feb 6, 2026)

Official SDK for programmatic Copilot Agent integration:

- Production-tested agent runtime
- Programmatic agent control
- 7.1k+ stars
- Use case: Embed agentic coding into custom tools, platforms, CI/CD pipelines

---

## 🎯 Focus Area Summary (Feb 19, 2026)

| Area | Status | Hot Topics | Notable Releases |
|------|--------|------------|------------------|
| **Multimodal Agents** | Evolving | Agent swarms, video understanding, memory frameworks, latent-space communication | Atomix, EAA, Vision Wormhole, Agno |
| **Mobile Deployment** | Production-ready | On-device quantization, ExecuTorch adoption, edge AI | ExecuTorch (Meta), GLM-5 mobile optimization |
| **Inference Optimization** | Paradigm shift | Speculative decoding, latent CoT, constraint training | Sparrow, GLM-5 MTP |
| **Tool Use** | Mature → Secure | Transactional semantics, multi-turn safety | Atomix, OpenEnv/Calendar Gym |

---

## 🏆 Standout Discoveries

### 🎯 Most Impactful Research
**Atomix** (arXiv:2602.14849) — finally provides **transactional semantics** for agent tool calls, a fundamental requirement for production reliability in financial, medical, legal domains.

### 🧠 Most Architectural Innovation
**Vision Wormhole** (arXiv:2602.15382) — treats visual encoders as universal ports for inter-agent communication, solving heterogeneous MAS alignment with O(N) complexity.

### 📱 Most Actionable Deployment Tech
**ExecuTorch** + **4-bit quantized 8B models** — makes on-device agents viable on existing smartphones without cloud dependency.

### 🛠️ Most Developer-Friendly Framework
**Agno** — not just another library, but a programming language for agentic software with production-grade OS.

---

## 🔮 Next 12 Hours Forecast

**Expected**:
- Deep dive blog posts analyzing Atomix's transaction model
- Community benchmarks for EAA (microscopy agent)
- Agno adoption announcements from early production users
- Tutorials combining ExecuTorch + 4-bit quantization for mobile

**Potential**:
- New arXiv citations of today's papers (especially Atomix)
- GLM-5 integration demos on domestic Chinese hardware
- OpenEnv community contributions (new environments beyond Calendar Gym)
- Latent CoT implementations in open-source LLMs

**Unlikely but Impactful**:
- Major model launch (Chinese New Year period typically quiet)
- Breakthrough in agent self-improvement without human oversight
- Regulatory announcement specifically targeting AI agents

---

## 💡 Actionable Recommendations

### For ML Engineers
1. **Experiment with 4-bit QAT** on mobile LLMs to hit <3GB memory footprint
2. **Study Atomix's transaction patterns** for building reliable multi-tool agents
3. **Try retrieval-augmented VLN** techniques for navigation/embodied tasks

### For Agent Developers
1. **Implement multi-turn safety testing** using OpenEnv's Calendar Gym as a template
2. **Adopt Agno** if building production multi-agent systems requiring governance and approval flows
3. **Benchmark with TransactEval-style tasks** before deploying tool-using agents

### For Researchers
1. **Explore Vision Wormhole's visual communication** for cross-model agent collaboration
2. **Extend Atomix's transactional model** to multi-agent scenarios with concurrent transactions
3. **Investigate episodic vs. semantic memory** separation for long-horizon embodied tasks

---

## 📚 Reference Resources

### Recent arXiv Papers (Feb 2026)
- [Atomix: Timely, Transactional Tool Use](https://arxiv.org/abs/2602.14849)
- [EAA: Automating Materials Characterization](https://arxiv.org/abs/2602.15294)
- [Human-Inspired Memory for Embodied Agents](https://arxiv.org/abs/2602.15513)
- [Vision Wormhole: Latent-Space Communication](https://arxiv.org/abs/2602.15382)
- [Retrieval-Augmented VLN](https://arxiv.org/abs/2602.15724)

### Frameworks & Tools
- [Agno](https://github.com/agno-agi/agno) — Agentic programming language
- [ExecuTorch](https://pytorch.org/executorch/) — Mobile deployment
- [OpenEnv](https://github.com/meta-pytorch/Openenv) — Agent evaluation environments
- [GitHub Copilot SDK](https://github.com/github/copilot-sdk) — v0.1.23

### Models
- [GLM-5](https://build.nvidia.com/z-ai/glm5/modelcard) — 744B MoE from ZHIPU
- [Claude Sonnet 4.6](https://www.anthropic.com/news/claude-sonnet-4-6) — Computer use breakthrough
- [nanochat](https://github.com/karpathy/nanochat) — "$100 ChatGPT"
- [microGPT](https://gist.github.com/karpathy) — 200-line educational GPT

---

## 🔍 Signals to Watch (Next 24h)

### 🔴 High Probability
- Community replication of Atomix on diverse tool sets
- Tutorials: "Building your first transactional agent with Atomix"
- Performance benchmarks comparing Agno vs. LangGraph for multimodal agents
- ExecuTorch + GLM-5 deployment examples on Chinese mobile devices

### 🟡 Medium Probability
- New arXiv papers citing Atomix (2602.14849) — expect follow-up work
- OpenEnv environment contributions (beyond Calendar Gym)
- speculative decoding benchmarks on video LLMs (Sparrow follow-ups)
- MobileLLM-style architecture papers for efficient on-device reasoning

### 🟢 Low Probability
- Major model launch (Chinese New Year lull)
- Breakthrough in agent autonomous improvement
- Regulatory framework for AI agents

---

## 🎯 Bottom Line

**The field is converging on reliability and efficiency**:

- **Reliability** → **Transactional semantics** (Atomix) for safe, rollback-capable tool use
- **Communication** → **Latent-space bridges** (Vision Wormhole) for efficient multi-agent collaboration
- **Efficiency** → **Speculative decoding** + **Latent CoT** for token/cost reduction
- **Deployment** → **ExecuTorch** + **4-bit quantization** enabling on-device agents
- **Developer Experience** → **Agno** (language-level agent programming) for production systems

**No single breakthrough dominates** — it's a **wave of maturation** across the entire stack. 2026 appears to be the year AI agents move from research prototypes to production systems with proper engineering practices around reliability, safety, and scalability.

**The most significant trend**: **Barriers to entry are dropping** — from Karpathy's pedagogical minimalism (microGPT, nanochat) to mobile deployment on existing smartphones, to Agno's programming language abstraction. This democratization, combined with production-ready frameworks, suggests **agent engineering will become mainstream** in 2026.

---

*Scan completed: 2026-02-19 19:00 GMT+8*  
*Sources: arXiv (2602 series), GitHub official repos, Anthropic/ZHIPU AI announcements, academic blogs*  
*Next scan: 2026-02-20 (daily)*
