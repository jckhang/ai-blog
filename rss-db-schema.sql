-- RSS Items Database Schema
-- 用于管理RSS订阅、去重、优先级处理

CREATE TABLE IF NOT EXISTS rss_feeds (
  id TEXT PRIMARY KEY,           -- feed identifier (e.g., "lilian_weng")
  title TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  category TEXT,                 -- e.g., "ai_research", "engineering"
  priority INTEGER DEFAULT 1,   -- 1=high, 2=medium, 3=low
  last_fetched TIMESTAMP,
  status TEXT DEFAULT 'active', -- active|disabled|error
  error_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rss_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  source_id TEXT NOT NULL,      -- references rss_feeds.id
  url TEXT UNIQUE NOT NULL,
  content TEXT,                 -- full article content (NULL if not fetched)
  description TEXT,             -- RSS summary/description
  quality_score REAL,           -- 0-1, computed after content fetch
  fetched_at TIMESTAMP,         -- when RSS entry was first seen
  status TEXT DEFAULT 'pending', -- pending|processing|processed|failed|skipped
  processed_at TIMESTAMP,       -- when processing completed
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_id) REFERENCES rss_feeds(id)
);

CREATE INDEX IF NOT EXISTS idx_rss_items_status ON rss_items(status);
CREATE INDEX IF NOT EXISTS idx_rss_items_source ON rss_items(source_id);
CREATE INDEX IF NOT EXISTS idx_rss_items_fetched ON rss_items(fetched_at DESC);
CREATE INDEX IF NOT EXISTS idx_rss_items_quality ON rss_items(quality_score DESC);

-- Views for convenience
CREATE VIEW IF NOT EXISTS v_pending_high_priority AS
SELECT i.*, f.priority, f.title as source_title
FROM rss_items i
JOIN rss_feeds f ON i.source_id = f.id
WHERE i.status = 'pending' AND f.status = 'active'
ORDER BY f.priority ASC, i.fetched_at DESC
LIMIT 50;

CREATE VIEW IF NOT EXISTS v_processed_stats AS
SELECT
  date(fetched_at) as day,
  COUNT(*) as total_items,
  SUM(CASE WHEN status = 'processed' THEN 1 ELSE 0 END) as processed,
  SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
  AVG(quality_score) as avg_quality
FROM rss_items
GROUP BY day
ORDER BY day DESC;
