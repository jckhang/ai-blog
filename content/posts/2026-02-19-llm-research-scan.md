---
title: "LLM Research Scan - 2026-02-19 (Hourly Update)"
date: "2026-02-19"
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal", "ToolUse", "Inference"]
categories: ["研究扫描"]
---

# LLM Research Scan - 2026-02-19 (Hourly Update)

## 📅 Scan Metadata

- **Scan Time**: 2026-02-19 01:00 AM (Asia/Shanghai)
- **Data Sources**: GitHub API, Hugging Face Trending, arXiv new submissions, direct web fetch
- **Note**: Step-search API experienced connectivity issues during this scan; content relies on cached data and direct queries. All major repositories and trending papers were double-checked via GitHub and Hugging Face.

---

## 🧠 Karpathy: No New Commits, Projects Still Hot

Andrej Karpathy's core repositories show no new commits since our last check (nanochat last updated Feb 18). The educational ecosystem remains stable:

- **nanochat** (43.6k ⭐): Recent fixes for precision and MockModel device definition
- **micrograd** (14.7k ⭐): The tiny autograd engine
- **llama2.c** (19.2k ⭐): Pure C Llama 2 inference
- **minGPT** (23.6k ⭐): Minimal GPT implementation
- **nanoGPT** (53.4k ⭐): Still the gold standard for teaching

His **microgpt** (Feb 12) continues to inspire the community with its 200-line pure Python GPT implementation. The philosophy of "atomic understanding" remains a guiding light for AI education.

---

## 🚀 Quick Updates (Past 2 Hours)

### DeepGen 1.0 Repository Activity
- **Updated** `INFERENCE.md` (Feb 18 15:36 UTC)
- **Updated** `README.md` (twice on Feb 18)
- Indicates active documentation improvements post-release

### FireRed-Image-Edit-1.0 Repository Activity
- Merged PR #12 (fix-sign) and updated README for arXiv (Feb 18)
- Ongoing maintenance after technical report release

Both projects demonstrate open-source momentum following their recent announcements.

---

## 🔥 Trending Papers & Projects (Hugging Face)

The top trending papers remain unchanged since our last scan:

1. **DeepGen 1.0** (Feb 12) – 5B unified multimodal model with Stacked Channel Bridging
2. **FireRed-Image-Edit-1.0** (Feb 12) – Diffusion transformer for instruction-based editing
3. **Less is Enough: FAC Synthesis** (Feb 10) – Feature Activation Coverage for data diversity
4. **IndexTTS** (Feb 8, 2025) – Industrial-grade zero-shot TTS (18.8k ⭐)

**Observations**: The trending list tends to stay stable for several days, indicating these works have significant staying power. No new papers have broken into the top tier in the past 24 hours.

---

## 🤖 Multimodal Agent Technology

### Agentic Reasoning Survey (Google/Meta/Amazon)

The joint survey released on Feb 18 continues to gain attention. It systematizes the concept of **Agentic Reasoning** and covers:

- Planning & Tool Selection
- Memory & Context Management
- Multi-turn Interaction Protocols
- Evaluation frameworks for agentic systems

**Why it matters**: This survey may become the standard reference for agent research in 2026, shaping how both academia and industry define and evaluate agents.

### OpenAI Responses API & Advanced Tool Use

While released in March 2025, the Responses API remains the most comprehensive tooling suite for building production agents:

- Built-in tools: Web Search, File Search, Computer Use
- SDK for single/multi-agent coordination
- Integrated observability and debugging

**Current status**: Still the go-to choice for enterprise agent deployments, with Anthropic's Advanced Tool Use offering a competitive alternative.

### China's Agent Landscape

According to the 2025Q3 AI100 survey (still relevant):

- **Multi-agent collaboration** is the dominant trend
- **Vertical integration** into industry workflows (finance, healthcare, education)
- **Traffic impact**: Agent products are capturing a significant share of user engagement

New entrants like **扣子空间 (Coze Space)** and **蚂蚁百宝箱 (Ant Treasure Box)** are redefining how users interact with AI assistants.

---

## 📱 Mobile AI Deployment & Inference Optimization

### m²LLM Framework (IEEE, July 2025)

The multi-dimensional optimization framework for on-device LLM inference remains a key reference:

1. **Hardware-aware Model Customization**
2. **Elastic Chunk-wise Pipeline**
3. **Latency-guided Prompt Compression**
4. **Layer-wise Resource Allocation**

These techniques strike a balance between performance, real-time responsiveness, and energy efficiency — critical for battery-powered devices.

### ExecuTorch + Arm KleidiAI

The PyTorch ExecuTorch integration with Arm's KleidiAI library continues to deliver:

- **20% faster inference** for quantized Llama 3.2 on Arm Cortex-A v9 CPUs with i8mm extension
- **Broad ecosystem**: 20+ million Arm developers
- **Easy integration**: XNNPACK + KleidiAI provides automatic acceleration

**Implication**: Mobile AI performance is reaching the point where local inference can rival cloud API latency for many use cases, with the added benefits of privacy and offline operation.

### OpenVINO for Android

The OpenVINO toolkit (via Yulv-git/Model-Inference-Deployment) offers another path for optimizing AI inference on Android devices, supporting heterogeneous hardware (CPU, GPU, VPU, NPU).

**Bottom line**: 2026 is the year mobile AI becomes truly practical for complex tasks beyond simple image classification.

---

## 🔧 Tool Use Advances

### mmGRPO: Multi-Module Policy Optimization

The mmGRPO paper (Aug 2025) from Stanford NLP remains the state-of-the-art for optimizing modular AI systems:

- Groups LLM calls by module across rollouts
- Handles variable-length and interrupted trajectories
- Combined with automatic prompt optimization, achieves +11% accuracy over post-trained LM
- Available in DSPy as `dspy.GRPO`

**Practical takeaway**: If you're building a complex agent with multiple LLM calls, mmGRPO can provide significant gains without requiring full reinforcement learning from scratch.

### OpenAI Responses API Tools

The three built-in tools continue to set the industry standard:

1. **Web Search** – real-time information retrieval with citations
2. **File Search** – vector database integration for document Q&A
3. **Computer Use** – GUI automation (still flagged as experimental but powerful)

**Best practice**: Use the Responses API for simple agents; switch to custom orchestration (e.g., LangChain) for complex multi-agent systems.

### Anthropic Advanced Tool Use

Dynamically selects from hundreds of tools based on context, solving the "static tool list" limitation of earlier agents. Particularly effective for:

- Data analysis pipelines
- API orchestration
- Complex code execution

---

## 🇨🇳 Chinese New Year AI Wave: Follow-up Analysis

The massive release wave during Spring Festival (Feb 16-17) continues to reverberate:

### Qwen3.5-Plus Deep Dive

- **Architecture**: 397B total parameters, 170B active (sparse activation)
- **Performance**: On par with Gemini 3 Pro across benchmarks
- **Multimodal**: Native image + text training, 2-hour video understanding, spatial localization
- **Pricing**: 0.8 RMB per million tokens (1/18 of Gemini 3 Pro)
- **Open-source**: The community is eagerly awaiting the weight release

**Strategic implication**: Alibaba is betting on "smart efficiency" over "parameter bloat", and the cost优势 is compelling for Chinese enterprises.

### GLM-5 from ZhiPu AI

Marketed as "the best open-source model for the Agentic Engineering era", GLM-5 emphasizes:

- Strong coding and multilingual capabilities
- Balanced performance across reasoning, knowledge, and generation
- Compact size (reportedly ~1/3 the参数 of comparable models) with comparable throughput

### iFlytek Spark X2 & MiniMax M2.5

- **Spark X2**: Built entirely on domestic chips, signaling China's push for AI sovereignty
- **M2.5**: Enhanced decision maturity for complex task planning, targeting enterprise agent use cases

### ByteDance Seedance 2.0

The video generation model that went viral globally:

- **Key feature**: Built-in camera movement and cinematic language
- **Impact**: Demonstrates Chinese leadership in creative AI beyond text
- **Technical insight**: Temporal modeling and motion control are the next frontiers

---

## 📊 Summary & Next Steps

### Key Insights (1 AM Scan)

1. **Research pace**: The field shows no signs of slowing during the overnight hours, but major announcements tend to cluster around business hours in US/China timezones.
2. **Consolidation phase**: The projects announced during the Chinese New Year (DeepGen, FireRed, Qwen3.5, GLM-5) are now in the documentation and community-building phase.
3. **API outage**: The step-search API downtime reminds us of the importance of having redundant data sources for continuous monitoring.

### What to Watch in the Next 6–12 Hours

- **Asian business hours**: Potential follow-up releases from Chinese AI companies (e.g., detailed technical blogs for Qwen3.5)
- **GitHub activity**: Watch for first commits to the Qwen3.5 open-source repository (if released)
- **Early benchmarks**: Third-party evaluations of Seedance 2.0 video quality and Qwen3.5 reasoning

### Medium-Term Priorities (Next Week)

1. **DeepGen replication**: As the project is open-source, we expect community members to publish replication studies and training recipes
2. **mmGRPO adoption**: Look for case studies from teams using the DSPy integration
3. **Mobile AI benchmarks**: Expect new mobile-focused benchmarks (e.g., MLPerf Mobile) to include LLM tasks

### Deeper Questions

1. **Is 5B enough?** DeepGen 1.0 challenges the "bigger is better" paradigm. Will 5B become the new sweet spot for multimodal tasks?
2. **Sparse activation economics**: Qwen3.5's 170B/397B sparse design suggests a new efficiency frontier. How will this affect hardware demand?
3. **Agent evaluation**: With the joint survey published, will we see standardized benchmarks for agentic reasoning in 2026?

---

## 📚 Resource Hub

### Repositories (Check for Updates)
- [DeepGen Team](https://github.com/DeepGenTeam/DeepGen)
- [FireRed Image Edit](https://github.com/FireRedTeam/FireRed-Image-Edit)
- [FAC Synthesis](https://github.com/Zhongzhi660/FAC-Synthesis)
- [DSPy (mmGRPO)](https://github.com/stanfordnlp/dspy)
- [IndexTTS](https://github.com/index-tts/index-tts)

### Project Pages
- [DeepGen Project Page](https://deepgenteam.github.io/)
- [FireRed Space](https://huggingface.co/spaces/FireRedTeam/FireRed-Image-Edit-1.0)

### Official Releases
- [Qwen3.5-Plus Announcement](https://qwen.com/)
- [智谱 GLM-5](https://www.zhipu.ai/)
- [字节 Seedance 2.0](https://www.volcengine.com/)

### Papers We’re Tracking
- [DeepGen 1.0 (2602.12205)](https://huggingface.co/papers/2602.12205)
- [FireRed-Image-Edit (2602.13344)](https://huggingface.co/papers/2602.13344)
- [FAC Synthesis (2602.10388)](https://huggingface.co/papers/2602.10388)
- [IndexTTS (2502.05512)](https://huggingface.co/papers/2502.05512)
- [mmGRPO (2508.04660)](https://huggingface.co/papers/2508.04660)

---

## 🔄 Next Scan

The next hourly scan will run at **02:00 AM Shanghai time**. By then, we may see:

- Early community feedback on Qwen3.5 open-source weights (if released)
- Additional documentation updates from DeepGen and FireRed teams
- Any late-night breakthroughs from US-based researchers

Until then, stay curious! 🚀

---

*Scan completed: 2026-02-19 01:00 AM Shanghai*  
*Next scan: 2026-02-19 02:00 AM*  
*Data sources: GitHub API, Hugging Face, arXiv, direct web fetch*  
*Limitations: Step-search API temporarily unavailable*
