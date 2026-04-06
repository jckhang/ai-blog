#!/usr/bin/env python3
# 调试单个文件

import json, os, re, time, urllib.request
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent.absolute()
INBOX_DIR = PROJECT_ROOT / 'zettelkasten' / 'inbox'
api_key = os.getenv('STEPFUN_API_KEY')

def call_llm(prompt):
    url = 'https://api.stepfun.com/v1/chat/completions'
    data = {'model': 'step-3.5-flash', 'messages': [{'role': 'user', 'content': prompt}], 'temperature': 0.6, 'max_tokens': 2000}
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req, timeout=60) as resp:
        result = json.loads(resp.read().decode('utf-8'))
        return result['choices'][0]['message']['content']

filepath = INBOX_DIR / 'test-article.md'
content = filepath.read_text(encoding='utf-8')
meta = {}
body = content
fm_match = re.match(r'^---\n(.*?)\n---\n', content, re.S)
if fm_match:
    fm_text = fm_match.group(1).strip()
    try:
        meta = json.loads(fm_text)
    except json.JSONDecodeError:
        for line in fm_text.split('\n'):
            if ':' in line:
                k, v = line.split(':', 1)
                meta[k.strip()] = v.strip().strip('"\'')
    body = content[fm_match.end():]

prompt = f"""Convert to JSON only.

Title: {meta.get('title','Unknown')}
Content: {body[:1500]}

Output:
{{
  "rephrased_content": "string",
  "key_points": ["a","b"],
  "critical_questions": ["?"],
  "value_scores": {{"density":3,"insight":3,"relevance":3,"timeliness":3,"actionability":3}},
  "total_score": 15,
  "decision": "keep",
  "reasoning": "text"
}}
"""

print("Sending prompt...")
resp = call_llm(prompt)
print("\n=== RAW RESPONSE ===")
print(resp)
print("\n=== END ===")

# 保存到文件
debug_file = PROJECT_ROOT / 'debug-llm-response.txt'
debug_file.write_text(resp, encoding='utf-8')
print(f"\n💾 Saved to {debug_file}")
