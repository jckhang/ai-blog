---
id: 20260220-004-a2h-agent-to-human-protocol
title: A2H: Agent-to-Human Protocol for AI Agent
created: 2026-02-20
tags: ["a2h", "agent-protocol", "human-agent-interaction", "multi-agent", "communication"]
source: "arXiv.org > Computer Science"
source_url: "https://arxiv.org/abs/2602.15831"
source_type: "paper"
content_length: 1323
quality_score: 0.70
related_notes: ["20260220-002-llm-powered-autonomous-agents", "20260219-rss-misc-a2h-agent-to-human-protocol-for-ai-agent"]
---

# A2H: Agent-to-Human Protocol for AI Agent

> 论文: arXiv:2602.15831v1 (2026-02-19)

## 问题陈述

现有agent协议聚焦于**agent-to-agent交互**，人类只是外部观察者，而非agent系统的集成参与者。根本原因是缺乏标准化机制，使得agents能够跨异构消息平台发现、定位并与人类交互。

## 核心贡献

提出 **A2H (Agent-to-Human) Protocol**，将人类注册为agent系统内的可解析实体。

### 1. Human Card（人类卡片）
- 通过可解析域名注册人类身份
- 使agents能够发现和寻址人类
- 包含: 身份信息、首选通信渠道、时区、能力声明

### 2. Formal Communication Schema
定义**何时、为何、如何**agent联系人类:

```yaml
Contact Conditions:
  - when: 需要人类决策/确认
  - why: 任务无法自动完成
  - how: 选择最合适的通信媒介（消息、邮件、电话）
```

### 3. Unified Messaging Abstraction
- 标准化异构通信媒介（微信、邮件、Slack等）
- 将复杂JSON输出转换为人类友好格式
- 处理消息格式转换、错误重试、确认回执

## 系统架构

```
Agent System
    ↓ (discover)
Human Registry (DNS-based)
    ↓ (resolve)
Human Card → Communication Schema → Messaging Adapter → Human Device
```

## 应用场景

1. **人类作为agent系统的外部工具**
   - 需要人工确认高风险操作（如支付、删除）
   - 处理agent无法解决的异常情况

2. **混合agent团队**
   - 多个agent协作，人类作为"supervisor"或"specialist"
   - 人类可以临时加入讨论，提供专家意见

3. **持续学习**
   - human feedback直接回传给agent，改善模型（RLHF扩展）

## 与现有工作对比

| 协议 | 目标 | 人类角色 | 通信标准化 |
|------|------|---------|-----------|
| A2A (Agent-to-Agent) | agent协作 | 无 | ✅ |
| A2H (本文) | agent→human | 集成参与者 | ✅ |
| H2H (Human-to-Human) | 人类协作 | 主体 | ✅ |
| H2A (Human-to-Agent) | 人类指令 | 控制者 | ⚠️ 非标准化 |

## 实现考虑

### 安全性
- 身份验证: Human Card需数字签名（防止伪造）
- 权限控制: 定义agent可联系的人类类型（如"仅技术支持团队"）
- 速率限制: 防止agent骚扰人类

### 隐私
- 人类可设置"勿扰"模式
- 通信内容加密（端到端）
- 可选择性地向agent暴露信息（最小权限原则）

### 可扩展性
- 支持新的通信媒介只需实现Adapter接口
- Human Card可扩展（添加自定义字段）
- 向后兼容（旧版agent可忽略新字段）

## 研究问题

- [ ] Human Card的管理机制（谁可以注册？如何验证？）
- [ ] 动态更新: 人类联系方式变更时，如何同步给所有agent？
- [ ] 多人类协调: 多个agent同时联系同一人类时如何管理？
- [ ] 成本优化: 何时调用人工？如何最小化人工介入次数？
- [ ] 评估指标: A2H协议有效性的量化标准（响应时间、任务完成率）

## 与Lilian Weng Agent框架的联系

本文的A2H协议可以视为 **Tool use** 的一种特殊形式:

- Human作为"外部API"
- Communication Schema定义tool spec
- Messaging Abstraction是tool调用实现

可参考 [[20260220-002-llm-powered-autonomous-agents]] 的Tool use章节。

## 实践步骤

1. **设计Human Card schema** (JSON Schema或Protobuf)
2. **实现DNS注册服务** (如 `human.example.com` → JSON Card)
3. **开发Messaging Adapters** (微信、邮件、Slack等)
4. **集成到agent框架** (如AutoGPT, LangChain)
5. **测试**: 模拟多agent场景，评估human-agent交互质量

---

*Created: 2026-02-20 09:10 | From inbox: 20260219-rss-arxiv_cs-1771531680261-a2h-agent-to-human-protocol-for-ai-agent.md*
