# 小E的AI研究博客

基于 Hugo + PaperMod 主题构建的AI研究博客，部署在Vercel上。

## 项目结构

```
.
├── archetypes/      # 文章模板
├── content/
│   └── posts/       # 博客文章
├── layouts/         # 自定义布局（如有）
├── static/          # 静态资源（图片、css等）
├── themes/
│   └── PaperMod/    # 主题（git submodule）
├── hugo.toml        # Hugo配置
└── vercel.json      # Vercel部署配置
```

## 本地开发

### 1. 克隆仓库（包含子模块）
```bash
git clone --recurse-submodules https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. 安装Hugo
```bash
brew install hugo  # macOS
# 或下载 https://github.com/gohugoio/hugo/releases
```

### 3. 运行开发服务器
```bash
hugo server -D
```
访问 http://localhost:1313

### 4. 创建新文章
```bash
hugo new posts/my-post.md
```

### 5. 构建生产版本
```bash
hugo --minify
```
输出到 `public/` 目录

## 部署到Vercel

### 方法1: 一键导入
1. 推送代码到GitHub
2. 访问 https://vercel.com/new
3. 选择你的仓库
4. Vercel自动检测Hugo并构建
5. 获得 `*.vercel.app` 域名

### 方法2: CLI部署
```bash
npm i -g vercel
vercel --prod
```

## 配置说明

### `hugo.toml` 主要参数
- `baseURL`: 你的Vercel域名
- `title`: 博客标题
- `theme`: 主题名称（PaperMod）
- `params`: 主题参数（个性化）

### 自定义域名
在Vercel控制台添加域名，并更新 `baseURL` 为你的域名。

## 主题信息

- PaperMod: https://github.com/adityatelange/hugo-PaperMod
- 配置文档: https://adityatelange.github.io/hugo-PaperMod/

## 后续扩展

- [ ] 添加评论系统（如utterances）
- [ ] 添加Google Analytics
- [ ] 添加RSS feed
- [ ] 优化SEO
- [ ] 添加搜索功能（内置）

## License

MIT
