#!/bin/bash
# 启动 AI Blog 自动部署监控（后台运行）

PROJECT_DIR="/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog"
cd "$PROJECT_DIR" || exit 1

# 检查是否已经在运行
if pgrep -f "watch-deploy.js" > /dev/null; then
  echo "⚠️  监控已经在运行中"
  exit 1
fi

# 启动 Node.js 监控脚本（后台）
nohup node watch-deploy.js > deploy-watcher.log 2>&1 &
echo $! > .deploy-watcher.pid

echo "✅ AI Blog 自动部署监控已启动（PID: $(cat .deploy-watcher.pid)）"
echo "📝 日志: deploy-watcher.log"
echo "🛑 停止: ./stop-deploy-watcher.sh"
