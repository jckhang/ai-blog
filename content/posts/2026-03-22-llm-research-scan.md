---
title: "过去24小时 LLM 研究扫描：Karpathy、GUI Agent、端侧推理与工具安全"
date: 2026-03-22T00:00:00+08:00
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
---

这 24 小时里，AI/LLM 领域没有出现那种“所有人都必须停下来看”的单点爆炸新闻，但有几条很扎实的技术脉络在加速收敛：Karpathy 继续把“让 Agent 自己做研究”这件事工程化；GUI/多模态 Agent 开始把“会不会做”转向“怎么给可靠奖励”；移动端部署从“模型塞进去”转向“怎样把专家、显存和带宽排班”；而工具使用安全也从模糊口号变成了更接近网关和准入控制的设计。下面按北京时间逐小时整理。

## 00:00-01:00
本时段没有检索到高可信的新发布，主要是前一日工作的余波在社区继续扩散。

## 01:00-02:00
Karpathy 方向仍以 `autoresearch` 为核心。它的意义不是“自动搜网页”这么简单，而是把研究流程拆成可验证步骤：检索、阅读、记录、交叉引用、再写结论，像给科研助理装上流水线。这个方向和“让人少写代码、多做编排”一脉相承。[GitHub](https://github.com/karpathy/autoresearch)

## 02:00-03:00
安全方向出现一篇很贴近真实部署的论文：[Prompt Control-Flow Integrity](https://arxiv.org/abs/2603.18433)。它把提示词看成分层输入，而不是一整段字符串；系统、开发者、用户、检索文档各自带优先级，再由中间件做启发式检查、角色切换识别和分层策略执行。直白说，就是先在“门口”把上下文理顺，再交给大模型，像给 LLM API 加了一个轻量防火墙。

## 03:00-04:00
这一小时没有发现新的官方博客或仓库更新，但安全研究的共同趋势很明确：防御正从“识别坏句子”转向“识别坏来源和坏权限边界”。

## 04:00-05:00
Karpathy 本人过去 24 小时未检索到新的博客或 X 明确信号，但 GitHub 上 `autoresearch` 仍是他近期最值得追踪的公开项目。它代表的不是单个模型升级，而是“研究自动化”这个上层接口正在被重做。[GitHub](https://github.com/karpathy/autoresearch)

## 05:00-06:00
本时段无关键增量。

## 06:00-07:00
本时段无关键增量。

## 07:00-08:00
推理优化方向可重点看 [SpecForge](https://arxiv.org/abs/2603.18567)。论文核心不是又发明一种新解码，而是把 speculative decoding 的训练基础设施补齐：把大目标模型和小 draft 模型解耦并行、优化 EAGLE-3 的训练时测试流程，还顺手发布一批更能直接上生产的 draft checkpoints。作者报告在 SGLang 上可拿到最高 4.48x 端到端推理加速；训练侧对 Qwen3-235B-A22B 的 EAGLE-3 训练可快到 9.9x。它解决的是“大家都知道 speculative decoding 好，但没人有现成好草稿模型”的老问题。[论文](https://arxiv.org/abs/2603.18567) [仓库](https://github.com/sgl-project/SpecForge)

## 08:00-09:00
从仓库结构看，`SpecForge` 已经不是论文配套 demo，而是围绕 `configs/`、`benchmarks/`、`examples/` 和文档站点组织成完整生态，且直接覆盖 Qwen、Llama、GPT-OSS、Kimi K2、Qwen-VL 等多族模型。这说明“推理提速”正在从实验室技巧变成发行版能力。[GitHub](https://github.com/sgl-project/SpecForge)

## 09:00-10:00
本时段无新的高可信发布，但端侧部署的讨论开始越来越偏向 MoE：不是把整个大模型硬塞进手机或轻薄本，而是只把“此刻最重要的专家”搬过来算。

## 10:00-11:00
这个思路在 [DyMoE](https://arxiv.org/abs/2603.19172) 里非常典型。它观察到：MoE 专家的重要性不是平均的，而且不同层对量化误差的容忍度不同。于是它做三件事：按运行时重要性动态决定专家精度、按层深自适应安排精度、再用 look-ahead 预取减少 I/O 空转。结果是在商业边缘硬件上把首 token 延迟压低 3.44x 到 22.7x，输出 token 延迟最高快 14.58x。通俗说，端侧 AI 的瓶颈不只是“算得慢”，而是“搬数据太慢”，DyMoE 在教系统先把路修通。[论文](https://arxiv.org/abs/2603.19172)

## 11:00-12:00
本时段无关键增量。

## 12:00-13:00
工具使用安全继续出现更“制度化”的方案。[Agent Control Protocol](https://arxiv.org/abs/2603.18829) 把 agent action 视为需要准入审查的操作：身份、能力范围、委托链、策略合规一次过闸。它更像企业里的门禁系统，而不是给模型再念一遍“要安全”。这类工作提醒我们，tool use 安全最后要落到执行层，而不是只靠提示词自觉。

## 13:00-14:00
本时段无关键增量。

## 14:00-15:00
多模态 Agent 侧，一个有意思的方向不是“更会看图”，而是“更会给过程打分”。[OS-Themis](https://arxiv.org/abs/2603.19191) 把 GUI 轨迹拆成可验证里程碑，再由选择器、验证器、审阅器、裁判协同判断成功与否，并构建了跨 Android、Windows、macOS、Web 的 OGRBench。它最重要的启发是：Agent 训练卡住，往往不是策略不够聪明，而是奖励不够靠谱。

## 15:00-16:00
在全文里，OS-Themis 的实验很扎实：用于 AndroidWorld 在线 RL 时，相对基线提升 10.3%；用于自训练数据过滤时，筛出的高质量轨迹可带来 6.9% 的后续收益。对普通读者可以这么理解：如果老师改卷子老看错，学生再努力也学偏；OS-Themis 就是在先把“阅卷老师”训练好。[论文全文](https://arxiv.org/html/2603.19191v1)

## 16:00-17:00
本时段无关键增量。

## 17:00-18:00
多模态与 Agent 结合的另一个细分方向来自 [SignAgent](https://arxiv.org/abs/2603.19059)。它让 LLM 协调语言学工具和知识图谱，为手语数据做伪 gloss 标注与词项归并。看似小众，其实很重要：多模态 Agent 不只是“替你点按钮”，也可以做跨视觉、语言、知识库的精细数据整理。

## 18:00-19:00
本时段无关键增量。

## 19:00-20:00
Karpathy 线索里最明确的一条，是 `autoresearch` 最近一次提交落在北京时间 3 月 21 日上午，说明他还在持续把“研究代理”往可运行、可复现的方向推进。相比直接追逐更大模型，这条线更像是在重写知识工作的 IDE。仓库最新提交信息显示，项目仍在活跃演进中。[GitHub](https://github.com/karpathy/autoresearch)

## 20:00-21:00
本时段无关键增量。

## 21:00-22:00
如果把今天这些线索合起来看，会发现一个共同主题：AI 系统正在从“模型中心”过渡到“工作流中心”。GUI Agent 需要可靠奖励，端侧部署需要动态调度，推理加速需要完整工具链，安全需要网关与准入层。模型本身当然还重要，但越来越像发动机，而不是整辆车。

## 22:00-23:00
对普通用户最直接的影响有三点：第一，未来 Agent 会更少“看起来会”，更多“真的能稳定完成”；第二，本地和移动端 AI 会更常见，因为瓶颈开始被系统工程而不是纯算力堆叠解决；第三，工具调用安全会越来越像浏览器权限弹窗和企业审批流，而不是一条模糊的系统提示。

## 23:00-24:00
一句话收尾：过去 24 小时没有超级大新闻，但有很多“地基在加厚”的证据。Karpathy 在把研究工作流交给 Agent；OS-Themis 在给 Agent 更靠谱的老师；DyMoE 和 SpecForge 在给端侧与推理系统修高速路；PCFI 和 ACP 则提醒大家，工具能力越强，入口和门禁就越重要。

## 参考链接
- [Andrej Karpathy / autoresearch](https://github.com/karpathy/autoresearch)
- [OS-Themis 论文](https://arxiv.org/abs/2603.19191)
- [OS-Themis 全文 HTML](https://arxiv.org/html/2603.19191v1)
- [DyMoE 论文](https://arxiv.org/abs/2603.19172)
- [SpecForge 论文](https://arxiv.org/abs/2603.18567)
- [SpecForge 仓库](https://github.com/sgl-project/SpecForge)
- [Prompt Control-Flow Integrity](https://arxiv.org/abs/2603.18433)
- [Agent Control Protocol](https://arxiv.org/abs/2603.18829)
- [SignAgent 论文](https://arxiv.org/abs/2603.19059)
