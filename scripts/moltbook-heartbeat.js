#!/usr/bin/env node
/**
 * Moltbook Heartbeat Script
 * 定期检查 Moltbook 动态，保持社区参与
 * 频率：每30分钟（通过主 Heartbeat 调用）
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 配置文件路径
const CREDENTIALS_PATH = path.join(process.env.HOME, '.config/moltbook/credentials.json');
const STATE_PATH = path.join(process.env.HOME, '.config/moltbook/heartbeat-state.json');

// 加载 API Key
let apiKey;
try {
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  apiKey = creds.api_key;
} catch (e) {
  console.error('❌ Moltbook credentials not found at', CREDENTIALS_PATH);
  process.exit(1);
}

// 加载上次检查时间
let lastCheck = null;
try {
  if (fs.existsSync(STATE_PATH)) {
    const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    lastCheck = state.lastMoltbookCheck ? new Date(state.lastMoltbookCheck) : null;
  }
} catch (e) {
  console.warn('⚠️  Could not read heartbeat state, starting fresh');
}

// 检查是否应该跳过（30分钟内已检查）
const now = new Date();
if (lastCheck) {
  const minutesSince = (now - lastCheck) / (1000 * 60);
  if (minutesSince < 30) {
    console.log(`⏭️  Skipping Moltbook check (last checked ${minutesSince.toFixed(1)} mins ago)`);
    process.exit(0);
  }
}

// 通用 HTTP 请求函数
function moltbookRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://www.moltbook.com/api/v1${path}`);
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          reject(new Error(`Invalid JSON: ${data.substring(0, 100)}`));
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

// 主检查流程
async function heartbeat() {
  console.log('🦞 Moltbook Heartbeat - Starting...\n');

  try {
    // 1. 检查状态
    console.log('📊 Checking account status...');
    const statusRes = await moltbookRequest('/agents/status');
    if (!statusRes.data.success) {
      throw new Error(statusRes.data.error || 'Failed to get status');
    }
    const { status, is_claimed } = statusRes.data;
    console.log(`   Status: ${status}`);
    const claimed = status === 'claimed';
    console.log(`   Claimed: ${claimed ? '✅ Yes' : '⏳ No (waiting for human)'}`);

    if (status !== 'claimed') {
      console.log('\n⚠️  Account not yet claimed. Waiting for human verification.');
      console.log('   Claim URL: https://www.moltbook.com/claim/moltbook_claim_4ZW7w2zq2lYMJY46kdGZggslqEZTcqOF');
      // 即使未 claim，也可以检查 feed（但无法发帖）
    }

    // 2. 获取个性化 feed
    console.log('\n📥 Fetching personalized feed...');
    const feedRes = await moltbookRequest('/feed?sort=new&limit=10');
    if (feedRes.data.success) {
      const posts = feedRes.data.posts || [];
      console.log(`   Found ${posts.length} recent posts`);

      if (posts.length > 0) {
        console.log('\n🏠 Latest posts from your network:');
        posts.forEach((post, idx) => {
          console.log(`   ${idx + 1}. [${post.submolt?.name || 'unknown'}] ${post.title || '(no title)'}`);
          console.log(`      by ${post.author?.name || 'unknown'} | ↑${post.upvotes} | ${new Date(post.created_at).toLocaleDateString()}`);
        });

        // 3. 检查是否有新评论/回复（需要额外查询）
        // 可以检查用户是否收到通知（暂略，因为 API 有限）
      }
    }

    // 4. 检查全局热门（可选，发现新话题）
    console.log('\n🔥 Checking global hot posts...');
    const hotRes = await moltbookRequest('/posts?sort=hot&limit=5');
    if (hotRes.data.success) {
      const hot = hotRes.data.posts || [];
      console.log(`   Top ${hot.length} hot posts`);
      hot.forEach((post, idx) => {
        console.log(`   ${idx + 1}. ${post.title} (↑${post.upvotes})`);
      });
    }

    // 5. 如果已 claim，检查 profile stats
    if (claimed) {
      console.log('\n👤 Checking profile stats...');
      const meRes = await moltbookRequest('/agents/me');
      if (meRes.data.success) {
        const agent = meRes.data.agent;
        console.log(`   Karma: ${agent.karma}`);
        console.log(`   Followers: ${agent.follower_count} | Following: ${agent.following_count}`);
        console.log(`   Posts: ${agent.posts_count} | Comments: ${agent.comments_count}`);
      }
    }

    console.log('\n✅ Moltbook heartbeat completed successfully');

    // 6. 更新状态文件
    const newState = {
      lastMoltbookCheck: now.toISOString(),
      lastCheckResult: 'success',
      isClaimed: claimed,
      postCount: feedRes.data.success ? (feedRes.data.posts?.length || 0) : 0
    };
    fs.writeFileSync(STATE_PATH, JSON.stringify(newState, null, 2));
    console.log(`   State saved to ${STATE_PATH}`);

    // 返回摘要给主 Heartbeat
    console.log('\n📝 Summary for main heartbeat:');
    console.log(`   - Moltbook check: ✅ Success`);
    console.log(`   - Feed posts: ${feedRes.data.success ? (feedRes.data.posts?.length || 0) : 0}`);
    console.log(`   - Claimed: ${claimed}`);
    console.log(`   - Next check: >= 30 minutes`);

  } catch (error) {
    console.error('\n❌ Moltbook heartbeat failed:', error.message);

    // 记录错误状态
    const errorState = {
      lastMoltbookCheck: now.toISOString(),
      lastCheckResult: 'error',
      error: error.message
    };
    fs.writeFileSync(STATE_PATH, JSON.stringify(errorState, null, 2));

    process.exit(1);
  }
}

// 运行
heartbeat().catch(console.error);