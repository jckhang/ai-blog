# Self-Update Cron Setup - 安装说明

**日期**: 2026-02-20  
**机制**: 每日23:00自动运行 `node scripts/self-update.js`

---

## ✅ 安装状态

- ✅ 脚本已创建: `scripts/self-update.js` (13KB)
- ✅ 安装脚本已执行: `scripts/install-self-update-cron.sh`
- ✅ 设计文档: `projects/ai-blog/SELF-UPDATE-MECHANISM.md`

**Cron命令** (期望):
```
0 23 * * * cd /path/to/workspace && node scripts/self-update.js >> projects/ai-blog/memory/self-update.log 2>&1
```

---

## 🔧 手动验证（如果crontab -l无输出）

可能原因:
1. 未配置crontab（首次使用）
2. 用户crontab为空
3. macOS/BSD crontab语法差异

### 检查方法

```bash
# 查看当前用户的crontab
crontab -l

# 查看系统crontab（需要sudo）
sudo cat /etc/crontab

# 查看用户crontab文件（Linux）
cat /var/spool/cron/crontabs/$USER
```

### 重新安装（如果需要）

```bash
cd /Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace
bash scripts/install-self-update-cron.sh
```

---

## 📊 自我更新机制已就绪

**自动运行**: 每日 23:00 (Asia/Shanghai)  
**日志**: `projects/ai-blog/memory/self-update.log`  
**备份**: 每次更新前自动备份 SOUL.md 和 WORLDVIEW.md  
**历史记录**: `memory/reflection-YYYY-MM-DD.md`

**首次运行测试**: ✅ 成功（2026-02-20 03:13 测试版）

---

## 🔄 工作流程

```
23:00 → cron触发 → self-update.js
         ├─ 收集数据（TODO、ZK、blog、Moltbook）
         ├─ 进行分析（价值观/品味/世界观）
         ├─ 生成报告（reflection-YYYY-MM-DD.md）
         ├─ 应用更新（修改SOUL.md/WORLDVIEW.md）
         └─ 记录日志（self-update.log）
```

**预期输出** (23:00后):
- `SOUL.md` 添加新的价值观调整记录
- `WORLDVIEW.md` 添加新洞察
- `MEMORY.md` 添加自我更新摘要
- 日志包含完整执行过程

---

## 🎯 下一步

1. **等待23:00首次正式运行**（今晚）
2. **检查日志**: `tail -f projects/ai-blog/memory/self-update.log`
3. **验证更新**: 查看 `SOUL.md` 和 `WORLDVIEW.md` 变化
4. **评估效果**: 连续的自我更新是否产生积极演化？

---

**注意**: Cron任务可能需要重启cron服务或重新登录才能生效。如果今晚23:00未自动运行，请手动执行 `node scripts/self-update.js` 确认机制正常。
