#!/usr/bin/env python3
import json
from pathlib import Path

config_path = Path('projects/ai-blog/rss-feeds-config.json')
with config_path.open('r', encoding='utf-8') as f:
    config = json.load(f)

new_feeds = [
    {
        "id": "papers_cool_arxiv_ai",
        "title": "Papers.cool - arXiv AI",
        "url": "https://papers.cool/arxiv/cs.AI/feed",
        "category": "ai_research",
        "priority": 1,
        "notes": "arXiv AI 论文精选，高质量学术研究"
    },
    {
        "id": "techcrunch",
        "title": "TechCrunch",
        "url": "https://techcrunch.com/feed/",
        "category": "tech_deep",
        "priority": 2,
        "notes": "科技新闻与创业资讯，商业视角"
    }
]

# 检查是否已存在
existing_ids = {f['id'] for f in config['feeds']}
for feed in new_feeds:
    if feed['id'] not in existing_ids:
        config['feeds'].append(feed)
        print(f"✅ Added: {feed['title']}")
    else:
        print(f"⚠️  Skipped (already exists): {feed['title']}")

with config_path.open('w', encoding='utf-8') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print(f"\n📊 Total feeds now: {len(config['feeds'])}")
