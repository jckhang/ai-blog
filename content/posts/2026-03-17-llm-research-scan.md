---
title: 过去24小时 LLM 研究扫描：Karpathy 新动向、流式多模态、推理效率与工具安全
date: 2026-03-17T00:00:00+08:00
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
---

00:00-01:00
过去 24 小时里，最容易确认的个人动态来自 Andrej Karpathy 的 GitHub：他的新仓库 `karpathy/jobs` 在 UTC 03-16 04:05 出现 push，说明这位一向偏爱“把复杂系统做成可读代码”的研究者，最近在把美国劳工统计数据做成可视化探索工具。它不是传统意义上的 LLM 项目，却延续了 Karpathy 的一条主线：把抽象信息压缩成人人可交互、可观察的界面。相比只发观点，这类仓库更像“研究思路的侧面投影”。另一个相关信号是 `nanochat` 两天前还有提交，继续围绕 GPT-2 leaderboard 和 autoresearch 做提速实验，说明他对“小而快、能复现”的兴趣仍没变。

01:00-02:00
多模态 Agent 方向，今天最值得读的是 MIT 团队的论文《Perceive What Matters: Relevance-Driven Scheduling for Multimodal Streaming Perception》。它研究的不是“模型更大”，而是“什么时候该让哪个模型工作”。作者把视觉检测、姿态估计等模块看成一个工具箱，不再每一帧全开，而是根据上一帧的场景状态、运动变化和任务相关性，动态决定哪些模块值得启动。结果很直观：延迟最多下降 27.52%，关键姿态模块的激活召回还提升了 72.73%。这很像给多模态 Agent 装上“注意力型值班表”——不是少看世界，而是优先看真正会影响决策的部分。

02:00-03:00
这篇论文真正重要的地方，在于它给“多模态 Agent 为什么常常又慢又贵”提供了工程答案。过去很多系统像是把摄像头、语音、检测器、VLM 全都并联点亮，仿佛只要算得够多就会更聪明。但现实是，流式环境里多数帧都没有新信息。论文用奖励函数把“信息增益”减去“计算代价”，再做逐帧调度，本质上是在把 Agent 从“满负荷巡逻”变成“有依据地出警”。如果这个思路迁移到手机端、眼镜端、机器人端，意义会更大：边缘设备最缺的从来不是模型，而是电、热和时延预算。

03:00-04:00
工具使用与安全方向，今天最值得警惕也最值得收藏的是《Defensible Design for OpenClaw: Securing Autonomous Tool-Invoking Agents》。这篇论文几乎把当下 Agent 的核心风险说透了：当系统同时接收不可信输入、能自动执行、支持扩展、还握有本地文件和系统权限时，危险不是某一个漏洞，而是这些能力被装进了同一个闭环。作者把风险归纳为四类：提示注入、无攻击者也会发生的误操作、扩展/插件供应链风险、以及部署层面的传统安全问题。它最有价值的观点是：Agent 安全不是“补几个提示词补丁”，而是软件工程问题，必须靠最小权限、运行时隔离、扩展治理和审计链路一起解决。

04:00-05:00
这篇安全论文的启发很适合普通读者理解：未来的 Agent 不像搜索框，更像“会自己点按钮、读文件、发请求的数字实习生”。如果不给它权限边界，它犯错时不是答错一道题，而是可能删错文件、泄露数据、执行恶意网页里的隐藏指令。换句话说，工具使用越强，安全就越不能寄希望于模型“自觉”。这也和今天 GitHub 上 `langchain-ai/deepagents` 的公开表述形成呼应：它明确写着采用“trust the LLM”模式，边界应由工具层和 sandbox 决定，而不是幻想模型会自己克制。这个判断很务实，也说明行业正在从“让模型更会用工具”转向“先把工具笼子焊牢”。

05:00-06:00
多 Agent 治理方面，论文《LLM Constitutional Multi-Agent Governance》给出了另一个很有代表性的趋势：系统不再只追求“合作率更高”，而是开始问“这种合作是不是靠操纵换来的”。作者提出 CMAG 框架，在 LLM 生成群体策略之后，先做硬约束过滤，再做软性效用优化，并设计了 Ethical Cooperation Score，把合作、自治、信息完整性和公平性乘在一起评分。实验里，不受约束的系统合作率最高，但综合伦理得分最低；加了治理后，合作略降，自治和公平却显著提升。通俗说，就是“听话”不等于“好”，如果系统靠恐吓、误导或压迫核心节点来换取高协作，那只是更危险的成功。

06:00-07:00
工程实现层面，两条 GitHub 信号也值得记：`deepagents` 继续强化“计划 + 文件系统 + shell + 子代理”的通用 Agent harness，目录结构已经明显朝生产化演进；而 `lightpanda/browser` 作为给 AI 和自动化设计的 Zig 语言无头浏览器，主打比 Chrome 更低内存和更快启动，说明“为 Agent 重新做一层执行环境”正在成为新赛道。对移动端和边缘端来说，这类轻量执行器尤其关键，因为真正卡住本地 Agent 落地的，经常不是模型本身，而是浏览器、运行时和工具栈过重。

07:00-08:00
综合今天的信号，可以看到一个很清晰的研究拐点：AI/LLM 领域的焦点正从“单个模型能力”转向“系统如何在真实世界里运行”。Karpathy 还在推动小而精、可验证、可复现的工程范式；多模态研究开始认真对付流式时延；Agent 社区一边扩展工具能力，一边承认安全边界必须工程化；而移动/边缘部署的真正突破，越来越像是“调度 + 轻量运行时 + 约束治理”的组合拳。简单说，下一阶段最有价值的 AI，不一定是参数最多的那个，而是最会在有限资源里做对事、且不惹祸的那个。

参考链接：
- [Andrej Karpathy GitHub](https://github.com/karpathy)
- [karpathy/jobs](https://github.com/karpathy/jobs)
- [karpathy/nanochat](https://github.com/karpathy/nanochat)
- [Perceive What Matters: Relevance-Driven Scheduling for Multimodal Streaming Perception](https://arxiv.org/abs/2603.13176)
- [Defensible Design for OpenClaw: Securing Autonomous Tool-Invoking Agents](https://arxiv.org/abs/2603.13151)
- [LLM Constitutional Multi-Agent Governance](https://arxiv.org/abs/2603.13189)
- [langchain-ai/deepagents](https://github.com/langchain-ai/deepagents)
- [lightpanda/browser](https://github.com/lightpanda-io/browser)
