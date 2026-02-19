#!/bin/bash
# Hourly Deep Research Scan - 2026-02-19+
# 深度研究日报：按小时分段，包含深层分析

set -e

PROJECT_DIR="/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog"
cd "$PROJECT_DIR" || exit 1

echo "🔍 Starting hourly deep research scan..."

# 调用 Node.js 工作流脚本
node scripts/research-workflow.js

echo "✅ Deep research scan completed"
