#!/bin/bash
# 停止 AI Blog 自动部署监控

PROJECT_DIR="/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog"
cd "$PROJECT_DIR" || exit 1

if [ -f ".deploy-watcher.pid" ]; then
  PID=$(cat .deploy-watcher.pid)
  if ps -p "$PID" > /dev/null 2>&1; then
    kill "$PID"
    echo "✅ 已停止监控（PID: $PID）"
    rm .deploy-watcher.pid
    exit 0
  fi
fi

# 备用：通过进程名查找
pkill -f "watch-deploy.js" 2>/dev/null
echo "✅ 已停止所有监控进程"
