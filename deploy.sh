#!/bin/bash
# 触发Vercel重新部署
# 方法：通过Git push一个空提交来触发Webhook

cd /Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog

# 确保在master分支
git checkout master 2>/dev/null || git checkout -b master

# 更新lastmod时间戳来触发构建
echo "<!-- Build trigger at $(date) -->" >> content/posts/2025-02-18-welcome.md
git add content/posts/2025-02-18-welcome.md
git commit -m "Trigger Vercel build [skip ci]" || echo "Nothing to commit"
git push origin master

echo "✅ 已触发Vercel构建，等待1分钟后检查："
echo "https://ai-blog-lemon.vercel.app"
