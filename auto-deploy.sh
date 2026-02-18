#!/bin/bash
# Auto-Deploy Hook for ai-blog
# 监控项目目录变化，自动 commit + push + vercel --prod

set -e

PROJECT_DIR="/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog"
cd "$PROJECT_DIR"

# 检查是否有未提交的更改
if git diff-index --quiet HEAD --; then
  echo "✅ 没有检测到更改"
  exit 0
fi

echo "🔄 检测到文件变化，开始自动部署..."

# 获取修改的文件列表
CHANGED_FILES=$(git diff --name-only)
echo "📝 修改的文件："
echo "$CHANGED_FILES"

# 生成提交信息
COMMIT_MSG="Auto: update $(date '+%Y-%m-%d %H:%M:%S')"
if echo "$CHANGED_FILES" | grep -q "content/posts/"; then
  COMMIT_MSG="Auto: new post $(basename $(echo "$CHANGED_FILES" | grep content/posts/ | head -1))"
fi

# Git 操作
echo "📦 提交更改..."
git add -A
git commit -m "$COMMIT_MSG" --no-verify

echo "🚀 推送到 GitHub..."
git push origin master

# 触发 Vercel 部署（使用 Vercel CLI，需要先 login）
if command -v vercel &> /dev/null; then
  echo "🌐 使用 Vercel CLI 部署..."
  vercel --prod --yes && echo "✅ 部署成功" || echo "⚠️  Vercel CLI 失败，请先运行 'vercel login'"
else
  echo "⚠️  Vercel CLI 未安装，跳过部署"
fi

echo "✅ 自动部署完成！"
