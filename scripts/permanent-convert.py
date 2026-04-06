#!/usr/bin/env python3
"""
Permanent Convert (Python version)

从 literature/ 读取笔记，转换为永久笔记。
- 原子拆分：关键点 >3 时拆分多个笔记
- 真实链接：只链接到已存在的永久笔记
- 宁缺毋滥：无相关链接则留空
"""

import json
import os
import re
import time
from pathlib import Path
from typing import List, Dict, Tuple
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent.parent.absolute()
LITERATURE_DIR = PROJECT_ROOT / 'zettelkasten' / 'literature'
TENTATIVE_DIR = LITERATURE_DIR / 'tentative'
PERMANENT_DIR = PROJECT_ROOT / 'zettelkasten' / 'permanent'

MIN_SCORE = 18

def read_literature(filepath: Path) -> Optional[Dict]:
    """读取 literature 文件"""
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        print(f"   ❌ Read error: {e}")
        return None

    # 解析 frontmatter
    meta = {}
    fm_match = re.match(r'^---\n(.*?)\n---\n', content, re.S)
    if fm_match:
        try:
            meta = json.loads(fm_match.group(1))
        except json.JSONDecodeError as e:
            print(f"   ❌ Invalid frontmatter: {e}")
            return None
        body = content[fm_match.end():]
    else:
        body = content

    # 提取关键部分
    def extract_section(title: str) -> List[str]:
        pattern = rf'## {re.escape(title)}\s*\n([\s\S]*?)(?=\n##|\n---|$)'
        match = re.search(pattern, body)
        if not match:
            return []
        items = []
        for line in match.group(1).strip().split('\n'):
            line = line.strip()
            if line.startswith('- '):
                items.append(line[2:])
            elif re.match(r'^\d+\. ', line):
                items.append(re.sub(r'^\d+\. ', '', line))
        return items

    key_points = extract_section('关键观点')
    questions = extract_section('批判性问题')

    rephrased_match = re.search(r'## 核心内容（重述）\s*\n([\s\S]*?)(?=\n##|$)', body)
    rephrased = rephrased_match.group(1).strip() if rephrased_match else ''

    return {
        'meta': meta,
        'key_points': key_points,
        'questions': questions,
        'rephrased': rephrased,
        'filepath': filepath
    }

def get_all_permanent_notes() -> List[Dict]:
    """获取所有永久笔记（用于链接推荐）"""
    notes = []
    if PERMANENT_DIR.exists():
        for f in PERMANENT_DIR.glob('*.md'):
            try:
                content = f.read_text(encoding='utf-8')
                meta_match = re.match(r'^---\n(.*?)\n---\n', content, re.S)
                if meta_match:
                    meta = json.loads(meta_match.group(1))
                    notes.append({
                        'id': f.stem,
                        'title': meta.get('title', f.stem),
                        'tags': meta.get('tags', [])
                    })
            except:
                continue
    return notes

def filter_relevant_notes(keywords: List[str], all_notes: List[Dict], max_count: int = 10) -> List[Dict]:
    """基于关键词筛选相关笔记"""
    kw_set = set(k.lower() for k in keywords if len(k) > 2)
    if not kw_set:
        return []

    scored = []
    for note in all_notes:
        text = (note['title'] + ' ' + ' '.join(note['tags'])).lower()
        score = sum(1 for kw in kw_set if kw in text)
        if score > 0:
            scored.append((note, score))

    scored.sort(key=lambda x: x[1], reverse=True)
    return [n for n, _ in scored[:max_count]]

def call_llm(prompt: str, max_tokens: int = 2000) -> str:
    """调用 LLM API"""
    import urllib.request
    import json

    api_key = os.getenv('STEPFUN_API_KEY') or os.getenv('OPENROUTER_API_KEY')
    if not api_key:
        raise RuntimeError("No LLM API key")

    # 使用 StepFun
    url = 'https://api.stepfun.com/v1/chat/completions'
    data = {
        'model': 'step-3.5-flash',
        'messages': [{'role': 'user', 'content': prompt}],
        'temperature': 0.6,
        'max_tokens': max_tokens
    }

    for attempt in range(3):
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(data).encode('utf-8'),
                headers={
                    'Authorization': f'Bearer {api_key}',
                    'Content-Type': 'application/json'
                },
                method='POST'
            )
            with urllib.request.urlopen(req, timeout=60) as resp:
                result = json.loads(resp.read().decode('utf-8'))
                return result['choices'][0]['message']['content']
        except Exception as e:
            if attempt < 2:
                time.sleep(2)
            else:
                raise

def extract_json(response: str) -> Dict:
    """从响应中提取 JSON"""
    # 移除 markdown 代码块
    response = re.sub(r'```(?:json)?\n?', '', response).strip()

    start = response.find('{')
    end = response.rfind('}') + 1
    if start == -1 or end <= start:
        raise ValueError("No JSON found")

    json_text = response[start:end]

    # 清理常见问题
    cleaned = re.sub(r'[\u201c\u201d]', '"', json_text)
    cleaned = re.sub(r'[\u2018\u2019]', "'", cleaned)
    cleaned = re.sub(r',\s*}', '}', cleaned)
    cleaned = re.sub(r',\s*]', ']', cleaned)
    cleaned = re.sub(r'\n\s*"', '"', cleaned)

    # 修复未转义引号（简化）
    cleaned = re.sub(r'(?<!\\)"', r'\"', cleaned)  # 暴力转义所有引号（可能过度但安全）

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        # 保存调试
        debug_file = PERMANENT_DIR / '..' / 'debug-json' / f'error-{int(time.time())}.txt'
        debug_file.parent.mkdir(exist_ok=True)
        debug_file.write_text(f"ERROR: {e}\n\nOriginal:\n{response}\n\nCleaned:\n{cleaned}", encoding='utf-8')
        raise

def generate_id(title: str, suffix: str = '') -> str:
    """生成永久笔记 ID"""
    date_str = datetime.now().strftime('%Y%m%d')
    title_slug = re.sub(r'[^a-z0-9\u4e00-\u9fff]+', '-', title.lower())[:50]
    if suffix:
        title_slug = f"{title_slug}-{suffix}"
    title_slug = title_slug.strip('-')
    return f"{date_str}-{title_slug}"

def build_prompt_single(article: Dict, meta: Dict, relevant_notes: List[Dict]) -> str:
    """构建单笔记转换 prompt"""
    notes_list = '\n'.join(f'- [[{n["id"]}]]: {n["title"]}' for n in relevant_notes[:15])

    return f"""Convert this literature note into a permanent atomic note.

# Original
Title: {meta['title']}
Source: {meta['source']}
URL: {meta.get('source_url', 'N/A')}

# Content
{meta.get('rephrased', article['rephrased'])[:1200]}

# Key Points
{chr(10).join(f'- {kp}' for kp in meta.get('key_points', article['key_points'])[:5])}

# Task
1. Write atomic note (200-400 words), self-contained
2. Content must be valid JSON string: escape all " as \\", no raw newlines
3. Add 3-5 links to existing notes from the list below (use [[ID]])
4. Suggest 3-5 tags (lowercase snake_case)

# Available Notes (ONLY use these IDs)
{notes_list if notes_list else '(None relevant)'}

# Output (JSON only)
{{
  "title": "Refined title",
  "content": "Escaped string",
  "tags": ["tag1", "tag2"],
  "links": [{{"target_id": "ID", "reason": "text"}}]
}}

Rules:
- If no relevant links, use empty array []
- target_id MUST be from Available Notes
- No markdown, start with {{ and end with }}
"""

def build_prompt_atomic(article: Dict, meta: Dict, point: str, idx: int, relevant_notes: List[Dict]) -> str:
    """构建原子笔记 prompt"""
    notes_list = '\n'.join(f'- [[{n["id"]}]]: {n["title"]}' for n in relevant_notes[:10])

    return f"""Create atomic note for key point.

# Context
Original: {meta['title']}
Context: {meta.get('rephrased', article['rephrased'])[:800]}

# Focus
Key Point {idx}: {point}

# Available Notes (link only these)
{notes_list if notes_list else '(None)'}

# Output (JSON only)
{{
  "title": "Concise title",
  "content": "Escaped string (150-300 words)",
  "tags": ["tag"],
  "links": [{{"target_id": "...", "reason": "..."}}]
}}

Requirements:
- Content: single-line JSON string, escape quotes
- Use [[ID]] format in links
- If no relevant links, use []
- No explanations, only JSON
"""

def convert_single(lit_file: Path, lit_data: Dict, all_notes: List[Dict]) -> bool:
    """转换单笔记"""
    meta = lit_data['meta']
    article = lit_data

    # 质量检查
    if meta.get('value_score', 0) < MIN_SCORE and meta.get('decision') != 'tentative':
        print(f"   ❌ Low score: {meta.get('value_score')}")
        return False

    relevant = filter_relevant_notes(
        meta['title'].split() + article['key_points'],
        all_notes,
        15
    )

    prompt = build_prompt_single(article, meta, relevant)
    try:
        response = call_llm(prompt, 2500)
        data = extract_json(response)

        # 验证链接
        valid_links = []
        for link in data.get('links', []):
            if any(n['id'] == link['target_id'] for n in all_notes):
                valid_links.append(link)

        note_id = generate_id(meta['title'])
        outpath = PERMANENT_DIR / f"{note_id}.md"

        frontmatter = {
            'id': note_id,
            'title': data['title'],
            'created': datetime.now().strftime('%Y-%m-%d'),
            'tags': data.get('tags', []),
            'source': meta.get('source', 'Unknown'),
            'source_url': meta.get('source_url', '')
        }

        content = f"""---
{json.dumps(frontmatter, indent=2, ensure_ascii=False)}
---

# {data['title']}

{data['content']}

## 深度链接

{chr(10).join(f'- [[{l["target_id"]}]] - {l["reason"]}' for l in valid_links) if valid_links else '*（暂无相关链接）*'}
"""
        outpath.write_text(content, encoding='utf-8')
        print(f"   ✅ Created: {note_id}.md ({len(valid_links)} links)")
        return True

    except Exception as e:
        print(f"   ❌ Failed: {str(e)[:80]}")
        return False

def convert_multiple(lit_file: Path, lit_data: Dict, all_notes: List[Dict]) -> int:
    """拆分为多个原子笔记"""
    meta = lit_data['meta']
    key_points = lit_data['key_points']

    if len(key_points) <= 3:
        # 不需要拆分
        return 1 if convert_single(lit_file, lit_data, all_notes) else 0

    success = 0
    for idx, point in enumerate(key_points, 1):
        relevant = filter_relevant_notes([point], all_notes, 10)
        prompt = build_prompt_atomic(lit_data, meta, point, idx, relevant)

        try:
            response = call_llm(prompt, 2000)
            data = extract_json(response)

            valid_links = [
                l for l in data.get('links', [])
                if any(n['id'] == l['target_id'] for n in all_notes)
            ]

            note_id = generate_id(meta['title'], str(idx))
            outpath = PERMANENT_DIR / f"{note_id}.md"

            frontmatter = {
                'id': note_id,
                'title': data['title'],
                'created': datetime.now().strftime('%Y-%m-%d'),
                'tags': data.get('tags', []),
                'source': meta.get('source', 'Unknown')
            }

            content = f"""---
{json.dumps(frontmatter, indent=2, ensure_ascii=False)}
---

# {data['title']}

{data['content']}

## 深度链接

{chr(10).join(f'- [[{l["target_id"]}]] - {l["reason"]}' for l in valid_links) if valid_links else '*（暂无相关链接）*'}
---
*Atomic note {idx}/{len(key_points)} from "{meta['title']}"*
"""
            outpath.write_text(content, encoding='utf-8')
            print(f"   ✅ Point {idx}: {note_id}.md")
            success += 1
            time.sleep(6)  # 速率限制

        except Exception as e:
            print(f"   ❌ Point {idx} failed: {str(e)[:60]}")

    return success

def main():
    print("🔍 Scanning literature...\n")

    # 收集所有 literature 文件
    lit_files = []
    for d in [LITERATURE_DIR, TENTATIVE_DIR]:
        if d.exists():
            for f in d.glob('*.md'):
                if f.name != 'README.md':
                    lit_files.append(f)

    print(f"   Found {len(lit_files)} literature notes")

    # 加载所有永久笔记（用于链接）
    all_notes = get_all_permanent_notes()
    print(f"   📚 Loaded {len(all_notes)} permanent notes for linking\n")

    total_converted = 0
    for lit_file in lit_files:
        print(f"🔄 Converting: {lit_file.name}")
        lit_data = read_literature(lit_file)
        if not lit_data:
            continue

        if len(lit_data['key_points']) > 3:
            converted = convert_multiple(lit_file, lit_data, all_notes)
        else:
            converted = 1 if convert_single(lit_file, lit_data, all_notes) else 0

        total_converted += converted
        # 可选：转换后删除 literature 文件
        # lit_file.unlink(missing_ok=True)

    print(f"\n📊 Summary:")
    print(f"   Converted notes: {total_converted}")
    print(f"   Remaining literature: {len(lit_files)}")
    print(f"   Total permanent: {len(all_notes) + total_converted}")

if __name__ == '__main__':
    main()
