---
title: "过去24小时 LLM 研究扫描：Karpathy 凌晨更新 nanochat，长程多模态搜索开始学会把图片放到‘外脑’，安全从拒答转向看不见的世界状态"
date: 2026-04-16T00:00:00+08:00
draft: false
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
---

00:00-01:00
先说总判断：这 24 小时最强的信号不是“又来了个更大的模型”，而是 Agent 系统开始认真补三块短板：长程多模态记忆、低成本推理、以及“看不见但会犯错”的安全边界。

01:00-02:00
Karpathy 这条线今天最可靠的源头仍是 GitHub。公开事件流显示，他在北京时间 `2026-04-15 02:33` 左右向 `karpathy/nanochat` 合入新提交；我又直接浅克隆了仓库看 README 和最近 commit，确认它仍围绕同一个目标打磨：把训练、评估、推理、聊天 UI 压进一套极薄代码壳里，用单一旋钮 `--depth` 控复杂度，把“训练出 GPT-2 级能力”的时间继续往下压。过去一天没查到他博客新文，X 侧也没有比 GitHub 更硬的新公开信号。[Karpathy Events](https://api.github.com/users/karpathy/events/public) [nanochat](https://github.com/karpathy/nanochat)

02:00-03:00
这件事为什么值得写？因为 `nanochat` 代表一种很 Karpathy 的研究哲学：别先堆平台，先把实验闭环做到最短。仓库首页还直接挂着 `Time-to-GPT-2` 排行榜，意思很直白：研究不是只看论文里那张最漂亮的图，而是看你改一行训练配方后，明天能不能立刻复现、度量、再优化。

03:00-04:00
多模态 Agent 方面，今天最值得全文读的是《Towards Long-horizon Agentic Multimodal Search》。我先读了 arXiv HTML 全文，再把 PDF 下载到本地确认元数据。它解决的是一个很现实的问题：搜索型多模态 Agent 一旦跑到几十轮，上下文会被图片和截图撑爆。作者给出的办法很像“把图片搬去外脑”：把视觉内容存进文件系统，只在上下文里保留轻量 UID，需要时再用 `fetch-image` 拉回来细看。这样既没丢图，又不会把 prompt 撑成麻袋。论文声称可把搜索链拉到 100 turn，并在长程多模态检索基准上拿到开源 SOTA；我也浅克隆了 `RUCAIBox/LMM-Searcher`，方向和论文描述一致。[论文 HTML](https://arxiv.org/html/2604.12890) [论文 PDF](https://arxiv.org/pdf/2604.12890.pdf) [LMM-Searcher](https://github.com/RUCAIBox/LMM-Searcher)

04:00-05:00
翻成人话，这篇论文的重要性不在“多一个工具”，而在“把感知和思考拆开”。模型脑子里只记“那张关键图在哪”，而不是永远背着整本相册走路。这很像人类做研究：先记书架索引，需要时再翻原页。

05:00-06:00
协议层也有个有意思的小趋势：`A Multimodal A2A Protocol Extension` 不是在训练更大的模型，而是在问“多个 Agent 之间传消息时，为什么总把图片和语音先压成文字？”作者提出 `MMA2A`，让 A2A 网络按原生模态路由；实验里，原生多模态路由比“全先转文字”高出约 20 个百分点，但代价是时延约 1.8 倍。这个结论很朴素也很重要：多智能体系统里，路由协议不是水管，它本身就在决定智能上限。[论文 HTML](https://arxiv.org/html/2604.12213v1)

06:00-07:00
推理优化方面，我今天读得最深的是《Latent-Condensed Transformer for Efficient Long Context Modeling》。它瞄准两个老大难：长上下文时 KV cache 越堆越大，注意力计算越算越慢。作者提出 `LCA`，直接在 MLA 的潜空间里把旧上下文“压成代表点”，语义部分做聚合、位置信息保留锚点。论文给出的结果很硬：在 128K 上下文下，最高 `2.5x` 预填充提速、`90%` KV cache 缩减，而且不需要额外参数。对普通读者来说，这意味着未来长文档和长对话，不一定非要靠更贵显存去硬扛。[论文 HTML](https://arxiv.org/html/2604.12452v1)

07:00-08:00
如果把这条线和工程仓库对照着看，会更清楚。今天我浅克隆了 `TurboQuant`，README 已经不是概念文档，而是大量围绕 KV cache 压缩、WHT、QJL、Flash Attention 精度修复的实战笔记；同时 vLLM 文档里也已经把 `TurboQuant` 作为正式量化路径公开出来。它说明推理优化正在从“论文里的点子”往“服务框架里的开关”迁移，这对边缘设备和移动端尤其关键，因为手机最缺的不是聪明，而是内存和功耗预算。[TurboQuant README](https://github.com/AmesianX/TurboQuant) [vLLM TurboQuant Docs](https://docs.vllm.ai/en/latest/api/vllm/model_executor/layers/quantization/turboquant/)

08:00-09:00
移动端这条线，过去一天我没有查到一个像“重大发布”那样新的独立项目，这一点要老实说。但从信号组合看，方向很明确：一边是 `nanochat` 明写支持 CPU / MPS 路径，另一边是 KV 压缩和长上下文压缩越来越落到真实实现里。也就是说，手机端 AI 这两年真正的突破，可能不是突然冒出一个魔法 App，而是底层内存账本终于开始算得过来。

09:00-10:00
安全方向今天最值得全文读的是《Policy-Invisible Violations in LLM-Based Agents》。它点破了一个很容易被忽略的问题：Agent 完全可能既听话、也没被攻击、动作语法也对，但仍然违规，因为关键政策信息根本没出现在它看得见的上下文里。作者把这类错误叫 `policy-invisible violations`，并给出 `PhantomPolicy` 基准和 `Sentinel` 框架：把每次 Agent 动作看成对组织知识图谱的一次“假想改写”，再去验证是否触犯结构化规则。论文报告的准确率从内容过滤式基线的 `68.8%` 拉到 `93.0%`。这很像告诉大家：别只问模型“你愿不愿意做坏事”，要问系统“你有没有给它看见决定对错的世界状态”。[论文 HTML](https://arxiv.org/html/2604.12177v1) [论文 PDF](https://arxiv.org/pdf/2604.12177.pdf)

10:00-11:00
如果把这篇安全论文和昨天流行的 benchmark 审计文章放一起看，会得到同一个结论：Agent 安全和能力，越来越不是提示词问题，而是系统建模问题。你不给模型看权限图、对象属性、会话历史，它就可能在“看上去很合理”的情况下稳定犯错。

11:00-12:00
把今天所有线索拧成一句话：Karpathy 在把实验回路磨短；长程多模态 Agent 在学会把图像放到“外脑”；推理优化在把 KV cache 和长上下文从硬瓶颈改成可压缩对象；安全研究则开始要求 Agent 不只会拒答，而要真正理解它所处的组织世界。下一阶段最值钱的能力，恐怕不再是“单次回答更像人”，而是“整个系统更像一个不会忘事、不会乱拿文件、还省电的靠谱同事”。
