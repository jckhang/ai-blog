#!/usr/bin/env python3
"""
RSS Monitor (Python version) - Karpathy理念

高质量RSS内容监控，自动导入Zettelkasten inbox。
- 智能去重（URL指纹）
- 内容补全（短内容自动fetch原文）
- 质量评估（长度、关键词、代码块）
"""

import json
import os
import sys
import re
import hashlib
import logging
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Optional
import urllib.request
import urllib.error
import html
import time

# 配置路径
PROJECT_ROOT = Path(__file__).parent.parent.parent.absolute()
CONFIG_PATH = PROJECT_ROOT / 'rss-feeds-config.json'
INBOX_DIR = PROJECT_ROOT / 'zettelkasten' / 'inbox'
STATE_DIR = PROJECT_ROOT / 'memory'
STATE_FILE = STATE_DIR / 'rss-monitor-state.json'

# 日志设置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)

class RSSMonitor:
    def __init__(self):
        self.config = self.load_config()
        self.state = self.load_state()
        INBOX_DIR.mkdir(parents=True, exist_ok=True)
        STATE_DIR.mkdir(parents=True, exist_ok=True)

    def load_config(self) -> Dict:
        """加载RSS配置"""
        try:
            with CONFIG_PATH.open('r', encoding='utf-8') as f:
                config = json.load(f)
            logger.info(f"✅ Loaded config: {config['name']} ({len(config['feeds'])} feeds)")
            return config
        except Exception as e:
            logger.error(f"❌ Failed to load config: {e}")
            sys.exit(1)

    def load_state(self) -> Dict:
        """加载监控状态（已处理URL）"""
        try:
            if STATE_FILE.exists():
                with STATE_FILE.open('r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            logger.warning(f"⚠️  Could not load state: {e}")
        return {'processed_urls': [], 'last_check': None}

    def save_state(self):
        """保存状态"""
        self.state['last_check'] = datetime.utcnow().isoformat()
        with STATE_FILE.open('w', encoding='utf-8') as f:
            json.dump(self.state, f, indent=2, ensure_ascii=False)

    def fetch_rss(self, feed: Dict) -> List[Dict]:
        """抓取单个RSS feed（简化版，实际需用feedparser）"""
        # 这里简化：假设返回空列表，实际需要安装feedparser
        logger.warning(f"⚠️  fetch_rss not implemented for {feed['id']}")
        return []

    def fetch_url(self, url: str, timeout: int = 10) -> Optional[str]:
        """抓取网页内容（简化）"""
        try:
            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (compatible; RSSBot/1.0)'}
            )
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read().decode('utf-8', errors='ignore')
        except Exception as e:
            logger.debug(f"   ⚠️  fetch_url failed: {e}")
            return None

    def extract_content(self, html: str, title: str) -> str:
        """从HTML提取正文（简化版）"""
        # 移除脚本样式
        text = re.sub(r'<(script|style).*?>.*?</\1>', '', html, flags=re.I|re.S)
        # 移除所有标签
        text = re.sub(r'<[^>]+>', '', text)
        # HTML实体解码
        text = html.unescape(text)
        # 合并多余空白
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def assess_quality(self, content: str, title: str) -> float:
        """评估内容质量（0-1）"""
        score = 0.5

        # 长度
        length = len(content)
        if length > 2000:
            score += 0.3
        elif length > 1000:
            score += 0.2
        elif length > 500:
            score += 0.1
        else:
            score -= 0.2

        # 标题出现
        if title[:20].lower() in content.lower():
            score += 0.1

        # 代码块
        if '```' in content or '<code>' in content:
            score += 0.05

        # 参考文献
        if re.search(r'\[\d+\]|references|citations', content, re.I):
            score += 0.05

        return min(score, 1.0)

    def generate_filename(self, title: str, feed_id: str) -> str:
        """生成唯一文件名"""
        date_str = datetime.now().strftime('%Y%m%d')
        slug = re.sub(r'[^a-z0-9]+', '-', title.lower())[:50].strip('-')
        return f"{date_str}-rss-{feed_id}-{slug}.md"

    def save_inbox(self, filename: str, content: str, meta: Dict):
        """保存到inbox"""
        filepath = INBOX_DIR / filename
        frontmatter = json.dumps(meta, ensure_ascii=False, indent=2)
        markdown = f"""---
{frontmatter}
---

{content}
"""
        with filepath.open('w', encoding='utf-8') as f:
            f.write(markdown)
        logger.info(f"   ✅ Saved: {filename}")

    def run(self):
        """主循环"""
        logger.info("🚀 Starting RSS Monitor...\n")

        total_new = 0
        for feed in self.config['feeds']:
            try:
                logger.info(f"📡 Fetching: {feed['title']}")
                items = self.fetch_rss(feed)  # 待实现

                # 限制处理数量
                max_items = self.config['settings']['max_items_per_feed']
                for item in items[:max_items]:
                    url = item.get('link', '')
                    if not url or is_already_processed(url):
                        continue

                    # 抓全文
                    content = item.get('content', '')
                    if len(content) < 200 and url:
                        full = self.fetch_url(url)
                        if full and len(full) > len(content):
                            content = self.extract_content(full, item['title'])

                    # 质量评估
                    quality = self.assess_quality(content, item['title'])
                    if quality < 0.5:  # 阈值可配置
                        logger.info(f"   ⚠️  Low quality ({quality:.2f}): {item['title'][:40]}...")
                        continue

                    # 生成文件
                    filename = self.generate_filename(item['title'], feed['id'])
                    meta = {
                        'title': item['title'],
                        'source': feed['title'],
                        'source_url': url,
                        'feed_id': feed['id'],
                        'published': item.get('published', ''),
                        'quality_score': quality,
                        'collected_at': datetime.utcnow().isoformat()
                    }
                    self.save_inbox(filename, content, meta)
                    mark_processed(url)
                    total_new += 1

            except Exception as e:
                logger.error(f"❌ Feed {feed['id']} error: {e}")

        logger.info(f"\n📊 RSS Monitor Summary:")
        logger.info(f"   Total new items: {total_new}")
        logger.info(f"   Next check: {self.config['settings']['check_interval_minutes']} minutes")
        self.save_state()

def mark_processed(url: str):
    """标记URL已处理"""
    if url not in monitor.state['processed_urls']:
        monitor.state['processed_urls'].append(url)
        # 保持最近1000条
        if len(monitor.state['processed_urls']) > 1000:
            monitor.state['processed_urls'] = monitor.state['processed_urls'][-1000:]

def is_already_processed(url: str) -> bool:
    """检查是否已处理"""
    return url in monitor.state['processed_urls']

if __name__ == '__main__':
    monitor = RSSMonitor()
    monitor.run()
