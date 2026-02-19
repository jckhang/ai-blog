#!/bin/bash
# Zettelkasten Obsidian Vault Setup Script
# 用途: 快速将 zettelkasten 文件夹设为 Obsidian vault

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Zettelkasten Obsidian Setup ===${NC}"

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT_PATH="$SCRIPT_DIR"

echo -e "${YELLOW}Vault 路径:${NC} $VAULT_PATH"

# 检查 obsidian-cli 是否安装
if ! command -v obsidian-cli &> /dev/null; then
    echo -e "${YELLOW}⚠️  obsidian-cli 未安装${NC}"
    echo "可通过以下方式安装:"
    echo "  brew install yakitrak/yakitrak/obsidian-cli"
    echo "或下载: https://github.com/yakitrak/obsidian-cli/releases"
    echo ""
    echo -e "${GREEN}跳过 CLI 设置...${NC}"
else
    echo -e "${GREEN}✅ obsidian-cli 已安装${NC}"

    # 检查 Obsidian 是否在运行
    if ps aux | grep -i obsidian > /dev/null; then
        echo -e "${GREEN}✅ Obsidian 正在运行${NC}"

        # 设置默认 vault
        VAULT_NAME="zettelkasten (ai-blog)"
        echo -e "${YELLOW}正在设置默认 vault: $VAULT_NAME${NC}"
        obsidian-cli set-default "$VAULT_PATH" 2>/dev/null || true
        echo -e "${GREEN}✅ 已设置默认 vault${NC}"
    else
        echo -e "${YELLOW}⚠️  Obsidian 未运行，请先启动 Obsidian${NC}"
    fi
fi

# 检查文件夹结构
echo ""
echo -e "${YELLOW}检查文件夹结构...${NC}"
for dir in inbox literature permanent resources; do
    if [ -d "$VAULT_PATH/$dir" ]; then
        echo -e "${GREEN}✅ $dir/${NC}"
    else
        echo -e "${RED}❌ $dir/ 缺失${NC}"
    fi
done

# 统计卡片
PERMANENT_COUNT=$(ls -1 "$VAULT_PATH/permanent"/*.md 2>/dev/null | wc -l | tr -d ' ')
echo ""
echo -e "${GREEN}📊 永久笔记数: $PERMANENT_COUNT${NC}"

# 打印说明
echo ""
echo -e "${BLUE}=== 下一步 ===${NC}"
echo "1. 打开 Obsidian: File → Open folder as vault → 选择 '$VAULT_PATH'"
echo "2. 阅读 permanent/README.md 了解使用规范"
echo "3. 从阅读 [[001-zettelkasten-是什么]] 开始"
echo "4. 每天至少创建 1 张新永久笔记"
echo ""
echo -e "${GREEN}🎉 设置完成！开始你的卡片笔记之旅吧！${NC}"
