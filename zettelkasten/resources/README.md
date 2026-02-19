---
id: resources-readme
title: Resources 说明
created: 2026-02-19
tags: ["meta", "resources"]
---

# Resources 文件夹说明

存放所有**附件资源**：图片、PDF原稿、截图、音视频等。

## 原则

- ✅ 不直接引用资源文件，只存储
- ✅ 在笔记中使用相对路径链接（如 `![](./img/diagram.png)`）
- ✅ 按类型组织子文件夹
- ✅ 定期清理未使用的资源

## 结构建议

```
resources/
├── img/           # 图片（PNG, JPG, SVG）
│   ├── diagrams/  # 图表
│   └── screenshots/
├── pdf/           # 论文、原文
│   └── arxiv/
├── audio/         # 录音（如采访）
├── video/         # 视频片段
└── exports/       # Obsidian 导出的快照
```

## 使用示例

在永久笔记中嵌入图片：

```markdown
![](./img/diagrams/transformer-architecture.png)
```

链接到PDF：

```markdown
[原文PDF](./pdf/arxiv/2501.12345v2.pdf)
```

---

**注意**: 如果使用 iCloud/Git 同步，大文件（>100MB）会导致同步缓慢。考虑单独托管（S3、Git LFS）或仅存链接。