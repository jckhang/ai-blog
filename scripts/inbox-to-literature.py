#!/usr/bin/env python3
"""
Inbox to Literature (Python version) - Fixed v2
"""

import json, os, re, time, logging, sys
from pathlib import Path
from typing import Dict
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s', datefmt='%H:%M:%S')
logger = logging.getLogger(__name__)

PROJECT_ROOT = Path(__file__).parent.parent.absolute()
INBOX_DIR = PROJECT_ROOT / 'zettelkasten' / 'inbox'
LITERATURE_DIR = PROJECT_ROOT / 'zettelkasten' / 'literature'
TENTATIVE_DIR = LITERATURE_DIR / 'tentative'
LITERATURE_DIR.mkdir(parents=True, exist_ok=True)
TENTATIVE_DIR.mkdir(parents=True, exist_ok=True)

MIN_SCORE = 15

class InboxProcessor:
    def __init__(self):
        self.llm_available = bool(os.getenv('STEPFUN_API_KEY'))

    def call_llm(self, prompt: str, max_retries: int = 2) -> str:
        import urllib.request
        api_key = os.getenv('STEPFUN_API_KEY') or os.getenv('OPENROUTER_API_KEY')
        if not api_key: raise RuntimeError("No API key")
        url = 'https://api.stepfun.com/v1/chat/completions'
        data = {'model': 'step-3.5-flash', 'messages': [{'role': 'user', 'content': prompt}], 'temperature': 0.6, 'max_tokens': 3500}
        for attempt in range(max_retries + 1):
            try:
                req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'),
                    headers={'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'}, method='POST')
                with urllib.request.urlopen(req, timeout=60) as resp:
                    result = json.loads(resp.read().decode('utf-8'))
                    msg = result['choices'][0]['message']
                    return msg.get('content') or msg.get('reasoning', '')
            except Exception as e:
                if attempt < max_retries: time.sleep(2)
                else: raise

    def parse_inbox(self, filepath: Path) -> Dict:
        content = filepath.read_text(encoding='utf-8')
        meta, body = {}, content
        fm_match = re.match(r'^---\n(.*?)\n---\n', content, re.S)
        if fm_match:
            fm_text = fm_match.group(1).strip()
            try: meta = json.loads(fm_text)
            except json.JSONDecodeError:
                meta = {}
                for line in fm_text.split('\n'):
                    if line and ':' in line and not line.startswith('#'):
                        k, v = line.split(':', 1)
                        meta[k.strip()] = v.strip().strip('"\'')
            body = content[fm_match.end():]
        score = meta.get('quality_score', self.quick_quality_score(body))
        return {'meta': meta, 'body': body, 'title': meta.get('title', filepath.stem),
                'source': meta.get('source', meta.get('feed_id', 'unknown')),
                'source_url': meta.get('url', meta.get('source_url', '')),
                'quality_score': float(score)}

    def quick_quality_score(self, text: str) -> float:
        length = len(text)
        if length < 300: return 0.4
        if length > 1500: return 0.7
        return 0.5

    def build_prompt(self, article: Dict) -> str:
        return f"""Convert to literature note. OUTPUT ONLY RAW JSON (no markdown, no explanations, no extra text).

INPUT:
Title: {article['title']}
Source: {article['source']}

{article['body'][:1200]}

OUTPUT FORMAT (strict):
{{
  "rephrased_content": "200-300 word summary",
  "key_points": ["p1", "p2", "p3", "p4"],
  "critical_questions": ["q1", "q2", "q3", "q4"],
  "value_scores": {{"density": 3, "insight": 3, "relevance": 3, "timeliness": 3, "actionability": 3}},
  "total_score": 15,
  "decision": "keep",
  "reasoning": "brief"
}}

RULES:
- Response must START with {{
- Response must END with }}
- No ``` or any other characters after closing }}
- Escape internal quotes with backslash
- Only the JSON object, nothing before or after

Output:"""

    def extract_json(self, response: str) -> str:
        response = response.strip()
        if not response: raise ValueError("Empty response")
        start = response.find('{')
        end = response.rfind('}') + 1
        if start == -1 or end <= start:
            raise ValueError(f"No JSON object in response: {response[:100]}...")
        json_text = response[start:end]
        cleaned = re.sub(r'[\u201c\u201d]', '"', json_text)
        cleaned = re.sub(r'[\u2018\u2019]', "'", cleaned)
        cleaned = re.sub(r',\s*}', '}', cleaned)
        cleaned = re.sub(r',\s*]', ']', cleaned)
        cleaned = re.sub(r'\n\s*"', '"', cleaned)
        return cleaned

    def parse_llm_response(self, response: str) -> Dict:
        try:
            cleaned = self.extract_json(response)
            return json.loads(cleaned)
        except json.JSONDecodeError as e:
            logger.error(f"❌ JSON parse error: {e}")
            logger.debug(f"Extracted: {cleaned[:300] if 'cleaned' in locals() else 'N/A'}...")
            raise

    def generate_filename(self, title: str, source: str) -> str:
        from datetime import datetime
        date_str = datetime.now().strftime('%Y%m%d')
        source_slug = re.sub(r'[^a-z0-9]+', '-', source.lower())[:30]
        title_slug = re.sub(r'[^a-z0-9\u4e00-\u9fff]+', '-', title.lower())[:50]
        return f"{date_str}-{source_slug}-{title_slug}.md"

    def save_literature(self, inbox_file: Path, article: Dict, llm_result: Dict):
        from datetime import datetime
        filename = self.generate_filename(article['title'], article['source'])
        outpath = LITERATURE_DIR if llm_result['decision'] == 'keep' else TENTATIVE_DIR / filename
        frontmatter = {'id': filename.replace('.md',''), 'title': article['title'], 'created': datetime.now().strftime('%Y-%m-%d'), 'tags': [], 'source': article['source'], 'source_url': article['source_url'], 'value_score': llm_result['total_score'], 'decision': llm_result['decision']}
        content = f"""---
{json.dumps(frontmatter, indent=2, ensure_ascii=False)}
---

# {article['title']}

## 核心内容（重述）
{llm_result['rephrased_content']}

## 关键观点
{chr(10).join(f'- {kp}' for kp in llm_result['key_points'])}

## 批判性问题
{chr(10).join(f'{i+1}. {q}' for i, q in enumerate(llm_result['critical_questions']))}

---
*Score: {llm_result['total_score']} | {llm_result['reasoning']}*
"""
        outpath.write_text(content, encoding='utf-8')
        logger.info(f"   ✅ {'📌' if llm_result['decision']=='tentative' else '✅'} {filename}")
        inbox_file.unlink(missing_ok=True)

    def process_inbox(self):
        inbox_files = list(INBOX_DIR.glob('*.md'))
        logger.info(f"📥 Found {len(inbox_files)} files\n")
        stats = {'processed':0, 'kept':0, 'tentative':0, 'rejected':0}
        for filepath in inbox_files:
            try:
                logger.info(f"🔄 {filepath.name}")
                article = self.parse_inbox(filepath)
                if article['quality_score'] < 0.5:
                    logger.info(f"   ⚠️  Low quality ({article['quality_score']:.2f})")
                    filepath.unlink(missing_ok=True)
                    stats['rejected'] += 1
                    continue
                prompt = self.build_prompt(article)
                response = self.call_llm(prompt)
                if not response.strip():
                    logger.warning("   ⚠️  Empty LLM response")
                    continue
                result = self.parse_llm_response(response)
                if result['total_score'] < MIN_SCORE and result['decision'] != 'tentative':
                    logger.info(f"   ❌ Rejected (score: {result['total_score']})")
                    filepath.unlink(missing_ok=True)
                    stats['rejected'] += 1
                else:
                    self.save_literature(filepath, article, result)
                    stats['kept' if result['decision']=='keep' else 'tentative'] += 1
                stats['processed'] += 1
            except Exception as e:
                logger.error(f"   ❌ Error: {str(e)[:80]}")
        logger.info(f"\n📊 Summary: Processed={stats['processed']}, Kept={stats['kept']}, Tentative={stats['tentative']}, Rejected={stats['rejected']}")

if __name__ == '__main__':
    p = InboxProcessor()
    if not p.llm_available:
        logger.error("❌ Set STEPFUN_API_KEY"); sys.exit(1)
    p.process_inbox()
