# Changelog

All notable changes to the ai-blog project will be documented in this file.

## [Unreleased]

### Added
- **2026-02-19**: Zettelkasten 卡片笔记系统完整实现
  - `zettelkasten/permanent/` - 15 张核心永久笔记 + 3 张自定义
  - `zettelkasten/inbox/` - 闪念笔记区域 + 示例
  - `zettelkasten/literature/` - 文献笔记区域 + README
  - `zettelkasten/resources/` - 附件文件夹
  - `zettelkasten/index.json` - 系统索引和配置
  - `zettelkasten/README.md` - 完整使用指南
  - `zettelkasten/permanent/README.md` - 永久笔记规范
  - `zettelkasten/INTEGRATION.md` - 与博客自动化集成方案
  - `zettelkasten/SETUP.sh` - 自动配置 Obsidian vault 脚本
- `SOP.md` - 标准操作流程（6000+字，覆盖维护、写作、部署、排查）
- `zettelkasten-system.json` - 系统定义（15张卡片 + 实施方案）
- `reading-report-卡片笔记写作法.md` - 读书笔记（3100字，科普风格）
- `vercel.json` - Vercel 构建配置（`hugo --minify`）
- `package.json` + `package-lock.json` - Node.js 依赖（pdf-parse 用于未来 PDF 解析）
- `read-book.js` - PDF 提取实验脚本（WIP）

### Changed
- **2026-02-19**: `README.md` 重大更新
  - 新增 "Zettelkasten 卡片笔记系统" 完整章节
  - 完善内容策略和写作规范
  - 添加集成方案说明
- **2026-02-19**: 研究扫描频率从每小时改为每天一次
  - Cron 表达式: `0 0 * * *` (midnight)
  - 超时: 3600s (1小时深度研究)
  - 理由: Vercel 免费计划限制（100 builds/month）
- **2026-02-19**: 写作风格标准化为科普向
  - 受众: 5-80岁大众
  - 特征: emoji、比喻、短段落、生活化例子
- **2026-02-19**: 搜索提供商从 Brave 改为 Perplexity (Sonar Pro)
- **2026-02-19**: Heartbeat 探活优化
  - 移除 `timeout 5` 严格限制
  - 改为无限 curl 避免 CDN 延迟误报
  - 新增 `memory/heartbeat.log` 记录详细历史

### Fixed
- **2026-02-19**: Vercel 域名连接问题（DNS 正常但 HTTP 超时）
  - 发现原因: 自定义域名未绑定
  - 后续自动恢复，现在访问正常
- **2026-02-19**: PaperMod 自定义 CSS 路径问题
  - 从 `static/css/` 移至 `assets/css/extended/custom.css`
  - 添加超链接样式钩子
- **2026-02-19**: Search index 模板语法错误
  - 简化 `index.json` 模板，避免 Hugo 版本差异
- **2026-02-19**: GitHub push 安全问题
  - 移除硬编码 Vercel token
  - 切换到 `npx vercel` 使用缓 percutaneous 登录

## [0.2.0] - 2026-02-19

### Added
- 博客系统完整自动化（Hugo + PaperMod + Vercel）
- Search functionality with Fuse.js (index.json generation)
- Auto-deploy post-commit hook (git push + npx vercel)
- Heartbeat monitoring system (30-90min checks)
-研究扫描 cron 任务（每小时，已改为每日）

### Changed
- 默认搜索禁用 Brave，启用 Perplexity
- 写作语言从英文改为中文（科普风格）
- Vercel 部署方式：CLI 代替 GitHub webhook

### Fixed
- 多 Hugo 版本兼容性问题
- 主题 CSS 加载失败
- Archive 页面 404

## [0.1.0] - 2026-02-18

### Added
- 初始 Hugo 项目搭建（PaperMod 主题）
- GitHub 仓库创建 (jckhang/ai-blog)
- Vercel 项目部署 (ai-blog-lemon.vercel.app)
- 初始 8 篇技术文章填充
- 自定义 CSS、Profile 模式、关于页面、SVG logo
- 搜索功能实现

---

## Release Schedule

- **Daily**: Research scan auto-published at 00:00 (Asia/Shanghai)
- **Weekly**: Heartbeat summary (Sunday 09:00)
- **Monthly**: Review usage stats, Vercel plan, and system health

---

**Maintained by**: 小E 🤖