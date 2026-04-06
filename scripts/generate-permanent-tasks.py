#!/usr/bin/env python3
"""
Generate Permanent Conversion Tasks (Python version)

Scan literature/ directory and output JSONL tasks for permanent-converter.
Fixes path/encoding issues common in Node.js.
"""

import json
import os
import sys
import re
from pathlib import Path
from datetime import datetime

PROJECT_DIR = Path('/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace')
LITERATURE_DIR = PROJECT_DIR / 'projects' / 'ai-blog' / 'zettelkasten' / 'literature'
TENTATIVE_DIR = LITERATURE_DIR / 'tentative'
PERMANENT_DIR = PROJECT_DIR / 'projects' / 'ai-blog' / 'zettelkasten' / 'permanent'
TASKS_DIR = PROJECT_DIR / 'projects' / 'ai-blog' / 'scripts' / 'tasks'

# Ensure directories exist
TASKS_DIR.mkdir(parents=True, exist_ok=True)
TENTATIVE_DIR.mkdir(parents=True, exist_ok=True)

print('🔍 Scanning literature notes for permanent conversion...\n')

# Collect all literature files (including tentative)
lit_files = []

# From main literature dir
if LITERATURE_DIR.exists():
    for f in LITERATURE_DIR.iterdir():
        if f.is_file() and f.suffix == '.md' and f.name != 'README.md':
            lit_files.append({'file': f.name, 'tentative': False})

# From tentative dir
if TENTATIVE_DIR.exists():
    for f in TENTATIVE_DIR.iterdir():
        if f.is_file() and f.suffix == '.md':
            lit_files.append({'file': f.name, 'tentative': True})

print(f'   Found {len(lit_files)} literature notes')

# Read existing permanent sources to dedupe
permanent_sources = set()
if PERMANENT_DIR.exists():
    for f in PERMANENT_DIR.glob('*.md'):
        try:
            content = f.read_text(encoding='utf-8')
            # Look for literature_source: "filename.md"
            match = re.search(r'literature_source:\s*"([^"]+)"', content)
            if match:
                permanent_sources.add(match.group(1))
        except Exception as e:
            print(f'   ⚠️  Skipping {f.name}: {e}')

# Filter pending tasks
tasks = []
for item in lit_files:
    if item['file'] not in permanent_sources:
        rel_path = 'projects/ai-blog/zettelkasten/literature/tentative' if item['tentative'] else 'projects/ai-blog/zettelkasten/literature'
        base_dir = TENTATIVE_DIR if item['tentative'] else LITERATURE_DIR
        tasks.append({
            'file': f'{rel_path}/{item["file"]}',
            'tentative': item['tentative'],
            'timestamp': os.path.getmtime(str(base_dir / item['file']))
        })

print(f'   Pending conversion: {len(tasks)} notes')

if not tasks:
    print('   🎉 All literature notes already converted to permanent!')
    sys.exit(0)

# Sort by timestamp (newest first)
tasks.sort(key=lambda x: x['timestamp'], reverse=True)

# Output JSONL
timestamp = datetime.now().strftime('%Y-%m-%dT%H-%M-%S').replace(':', '-')
out_file = TASKS_DIR / f'permanent-convert-{timestamp}.jsonl'

with out_file.open('w', encoding='utf-8') as f:
    for t in tasks:
        f.write(json.dumps(t, ensure_ascii=False) + '\n')

print(f'\n📦 Task file generated: {out_file.name}')
print(f'\n📋 Summary:')
print(f'   Total literature notes: {len(lit_files)}')
print(f'   Already converted: {len(lit_files) - len(tasks)}')
print(f'   Need conversion: {len(tasks)}')
print(f'   Tentative notes included: {sum(1 for t in tasks if t["tentative"])}')
print(f'\n🚀 To process:')
print(f'   python3 projects/ai-blog/scripts/generate-permanent-tasks.py')
print(f'   node scripts/permanent-convert-orchestrator-v3.js {out_file.name}')
