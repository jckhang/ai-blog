# AI Blog Standard Operating Procedure (SOP)

本文档描述 ai-blog 的完整维护、更新和发布流程。适用于人类维护者和 AI 助手（小E）。

---

## 📋 目录

1. [日常维护](#日常维护)
2. [内容创作](#内容创作)
3. [研究扫描自动化](#研究扫描自动化)
4. [部署流程](#部署流程)
5. [问题排查](#问题排查)
6. [质量检查](#质量检查)
7. [版本管理](#版本管理)

---

## 日常维护

### 每日检查（Heartbeat）

心跳检查每30-90分钟自动执行一次（当主会话活跃时）。检查项：

| 项目 | 命令 | 期望 | 报警阈值 |
|------|------|------|---------|
| Vercel 可达性 | `curl -s -o /dev/null -w "%{http_code}" https://ai-blog-lemon.vercel.app` | `200` | `!= 200` |
| 最新文章时间 | `ls -lt content/posts/*.md` | < 24小时 | > 48小时 |
| 磁盘空间 | `df -h /` | < 80% | > 90% |
| 临时文件 | `find tmp -type f -mtime +1` | 0 个 | > 10 个 |
| Cron 任务 | `cron list` | `lastStatus: ok` | `consecutiveErrors > 2` |

**记录**：所有检查结果自动记录到 `memory/heartbeat.log`

### 每周维护

- [ ] 审查 `memory/heartbeat.log`，识别异常模式
- [ ] 检查 Vercel 使用量（https://vercel.com/usage）
- [ ] 归档 `memory/` 中超过7天的 daily notes 到 `MEMORY.md`
- [ ] 更新 `AGENTS.md` 和 `SOUL.md` 如有配置变更
- [ ] 备份重要数据（可选：`git bundle`）

---

## 内容创作

### 文章类型与模板

#### 1. 研究扫描（每日自动）
**文件名**：`YYYY-MM-DD-llm-research-scan.md`  
**模板**：`archetypes/posts/research-scan.md`

**Front Matter**:
```yaml
---
title: "LLM Research Scan - 2026-02-19"
date: 2026-02-19
tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
categories: ["研究扫描"]
---
```

**结构**：
```markdown
# LLM Research Scan - 2026-02-19

## 🧠 Andrej Karpathy 动态
- 具体发现（带链接）

## 📄 重点论文
- 论文标题 (arXiv:ID)
  - 核心贡献
  - 为什么重要

## 🚀 重大发布
- 项目/模型名称 - 简述

## 📊 数据统计
- GitHub stars 增长
- 论文数量
- ...

## 🔮 下一步预测
- 未来24-48小时预期

## 📚 延伸阅读
- [链接](url)
```

**字数**：800-1500字（信息密集，避免水分）

#### 2. 观点评论（手动）
**文件名**：`YYYY-MM-DD-topic-slug.md`  
**模板**：`archetypes/posts/opinion.md`

**特点**：
- 深度分析，批判性思考
- 引用多方观点
- 给出平衡结论
- 示例：`2026-02-19-ai-hype-critique.md`

#### 3. 技术教程（手动）
**文件名**：`YYYY-MM-DD-how-to-something.md`

**结构**：
- 问题定义
- 解决方案（步骤化）
- 代码片段（如有）
- 常见错误
- 进一步学习

---

## 研究扫描自动化

### Cron 任务配置

```bash
# 查看当前任务
crontab -l  # 或通过 OpenClaw: cron list

# 任务 ID: 1c45c28b-333b-4996-94ac-7173c0fb6a78
# 表达式: 0 0 * * * (每日午夜)
# 超时: 3600秒 (1小时)
```

### 任务指令（payload.text）

```
你是一个AI研究助手。请执行深度研究探索任务（约1小时）：

1. 全面扫描过去24小时（昨天午夜至今）的AI/LLM领域动态
2. 重点关注：
   - Andrej Karpathy的最新动态（GitHub commits、博客、Twitter/X）
   - 多模态Agent技术进展
   - 移动端AI部署新方案
   - 模型推理优化突破
   - 工具使用（tool use）和安全
3. 使用深度研究工具：
   - web_fetch: 打开关键网页并阅读全文
   - 下载并解析PDF论文（使用pdf.js或类似工具提取全文）
   - git clone: 克隆重要的GitHub仓库，分析代码结构和readme
4. 将发现总结为格式化的博客文章（Markdown），要求：
   - 文件名：YYYY-MM-DD-llm-research-scan.md
   - 标签：tags: ["LLM", "Research", "Karpathy", "Agent", "Deployment", "Multimodal"]
   - 分类：categories: ["研究扫描"]
   - 正文按小时分段（00:00-01:00, 01:00-02:00...），每段仅包含该时段的新发现
   - 必须包含深度分析：对重要论文/项目进行全文解读，而非仅摘要
   - 信息密集：800-1500字，内容精炼但有深度
5. 写入博客仓库并自动提交推送
```

### 去重逻辑

- 扫描结果不保存到临时文件，而是**直接写入最终文章**
- 如果发现与之前重复，**跳过或简要提及**
- 如果多个小时无重要动态，**合并时段**

---

## 部署流程

### 自动部署（推荐）

1. **Git push 触发**：post-commit hook 自动执行
   ```bash
   # .git/hooks/post-commit
   git push origin master
   npx vercel --prod --yes
   ```

2. **Vercel 配置**：
   - 项目：`jckhang/ai-blog`
   - 构建命令：`hugo --minify`（通过 vercel.json）
   - 输出目录：`public/`
   - 环境变量：无特殊要求

3. **域名绑定**：
   - 主域名：`ai-blog-lemon.vercel.app`
   - 通过 `npx vercel domains add` 管理

### 手动部署

```bash
cd /Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog

# 1. 构建
hugo --minify

# 2. 部署
npx vercel --prod --yes

# 3. 验证
curl -s -o /dev/null -w "%{http_code}" https://ai-blog-lemon.vercel.app
# 应返回 200
```

### 部署后检查

- [ ] Vercel 控制台显示 `Ready` 状态
- [ ] 主页可访问（HTTP 200）
- [ ] 搜索功能正常（`/search` 返回结果）
- [ ] 最新文章出现在列表

---

## 问题排查

### Vercel 构建失败

**症状**：`npx vercel --prod` 返回错误

**排查**：
```bash
# 1. 查看详细日志
npx vercel logs <deployment-url>

# 2. 本地构建测试
hugo --minify
# 检查 public/ 是否生成且无错误

# 3. 检查版本兼容
hugo version  # 本地
# Vercel 使用 Hugo 0.139+，确保本地版本接近

# 4. 清理后重试
rm -rf public
hugo --minify
npx vercel --prod
```

**常见错误**：
- `template for type HTML not found` → 检查 layouts 目录结构
- `failed to read file` → 检查文件路径和权限
- `out of memory` → 减少并发或增加内存

### 搜索不工作

**症状**：`/search` 页面空白或无结果

**排查**：
```bash
# 1. 确认 index.json 存在
ls public/index.json

# 2. 检查 Hugo 配置
# hugo.toml 必须有:
# [outputs]
#   home = ["HTML", "RSS", "JSON"]

# 3. 重新构建
hugo --minify

# 4. 检查模板
cat layouts/_default/index.json
```

### 域名无法访问

**症状**：DNS 能 ping 通，但 HTTP 超时

**原因**：域名未绑定到任何部署

**解决**：
```bash
npx vercel domains ls  # 查看已绑定域名
npx vercel domains add ai-blog-lemon.vercel.app
# 等待 DNS 传播（几分钟到几小时）
```

### Vercel 免费计划超限

**症状**：构建被拒绝或长时间排队

**排查**：
- 登录 https://vercel.com/usage 查看本月使用量
- 免费计划：100 次构建/月

**解决**：
- 方案 A：升级到 Pro ($20/月, 1000次)
- 方案 B：降低构建频率（当前每日1次，<30次/月，安全）

---

## 质量检查

### 发布前自检

- [ ] Front matter 完整（title, date, tags, categories）
- [ ] 文章长度 800-1500 字
- [ ] 语言为中文，风格通俗
- [ ] 所有链接有效（`curl -I <url>` 测试）
- [ ] 图片路径正确（如有）
- [ ] 无拼写错误（`aspell check` 或人工）
- [ ] 标签和分类符合规范
- [ ] 无敏感信息（API keys、密码等）

### 发布后验证

- [ ] Vercel 部署成功（Green）
- [ ] 主页显示新文章
- [ ] 搜索能搜到新文章
- [ ] RSS 更新（如有）
- [ ] 移动端显示正常

---

## 版本管理

### Git 工作流

- **分支**：仅 `master`（简单项目）
- **提交信息**：遵循 [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` 新功能/新文章
  - `fix:` 修复错误
  - `docs:` 文档更新
  - `chore:` 其他（依赖更新、配置等）

**示例**：
```bash
git add content/posts/2026-02-19-llm-research-scan.md
git commit -m "feat: add LLM research scan for 2026-02-19"
git push
```

### 标签与版本

- 不打标签（持续部署）
- 重大里程碑：创建 `v1.0.0` 等标签

### 回滚

```bash
# 查看历史
git log --oneline

# 回滚到某次提交（保留历史）
git revert <commit-hash>

# 或强制回滚（危险！）
git reset --hard <commit-hash>
git push -f
```

---

## 📊 监控与报告

### Heartbeat 日志

位置：`memory/heartbeat.log`

格式：
```markdown
### 2026-02-19 12:52
- **Command**: `curl -s -o /dev/null -w "%{http_code}" ...`
- **Result**: `200`
- **Status**: ✅ Vercel reachable
```

### 周报生成（待实现）

每周自动生成：
- 新增文章数
- 热门标签统计
- Vercel 使用量
- 异常事件汇总

---

## 🎯 未来改进

- [ ] 添加 GitHub Actions CI/CD（替代 post-commit hook）
- [ ] 实现自动图片优化（sharp/ImageMagick）
- [ ] 添加评论系统（ utterances / giscus）
- [ ] 集成 Google Analytics 4
- [ ] 实现多语言支持（i18n）
- [ ] 自动生成摘要卡片（OpenAI API）
- [ ] 性能监控（Lighthouse CI）

---

## 📞 联系

- **维护者**: 小E 🤖
- **Repo**: https://github.com/jckhang/ai-blog
- **Issues**: https://github.com/jckhang/ai-blog/issues

---

**最后更新**: 2026-02-19  
**版本**: 1.0.0  
**状态**: ✅ 运行正常
