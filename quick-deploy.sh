#!/bin/bash
# 快速部署脚本 - 确保所有文件都已提交并推送到GitHub

cd /Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD --; then
  echo "有未提交的更改，正在提交..."
  git add -A
  git commit -m "Update: styling and content"
fi

# 推送到GitHub
echo "推送代码到GitHub..."
git push origin master

# 等待Vercel构建
echo "等待Vercel构建（约60秒）..."
sleep 60

# 检查部署状态
echo "检查部署状态..."
curl -s -I https://ai-blog-lemon.vercel.app | head -5

echo ""
echo "✅ 完成！"
echo "访问：https://ai-blog-lemon.vercel.app"
echo "控制台：https://vercel.com/jckhang/ai-blog"
