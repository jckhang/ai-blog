---
id: 20260222-rss-karpathy_blog-001-auto-grading-decade-old-hacker-news-discussions-wi
title: Auto-grading decade-old Hacker News discussions with hindsight
created: 2026-04-06
tags: ["rss","ai_research","auto-import","permanent"]
source: "Andrej Karpathy Blog"
source_url: "https://karpathy.bearblog.dev/auto-grade-hn/"
source_type: "article"
content_length: 7096
quality_score: 0.85
---

# Auto-grading decade-old Hacker News discussions with hindsight

## 来源信息

- **来源**: Andrej Karpathy Blog
- **发布时间**: 见原文
- **原文链接**: https://karpathy.bearblog.dev/auto-grade-hn/
- **采集时间**: 2026-04-06

## 核心内容

<img src="https://bear-images.sfo2.cdn.digitaloceanspaces.com/karpathy/hnhero.webp" alt="hnhero" />

TLDR: <a href='https://karpathy.ai/hncapsule/'>https://karpathy.ai/hncapsule/</a>

<hr />
Yesterday I stumbled on this HN thread <a href='https://news.ycombinator.com/item?id=46205632'>Show HN: Gemini Pro 3 hallucinates the HN front page 10 years from now</a>, where Gemini 3 was hallucinating the frontpage of 10 years from now. One of the comments struck me a bit more though - Bjartr linked to the <a href='https://news.ycombinator.com/front?day=2015-12-09'>HN frontpage from exactly 10 years ago</a>, i.e. December 2015. I was reading through the discussions of 10 years ago and mentally grading them for prescience when I realized that an LLM might actually be a lot better at this task. I copy pasted one of the article+comment threads manually into ChatGPT 5.1 Thinking and it gave me a beautiful analysis of what people thought + what actually happened in retrospect, even better and significantly more detailed than what I was doing manually. I realized that this task is actually a really good fit for LLMs and I was looking for excuses to vibe code something with the newly released Opus 4.5, so I got to work. I'm going to get all the front pages of December (31 days, 30 articles per day), get ChatGPT 5.1 Thinking to do the analysis, and present everything in a nice way for historical reading.

There are two macro reasons for why I think the exercise is interesting more generally:

<ol>
- I believe it is quite possible and desirable to train your forward future predictor given training and effort.

- I was reminded again of my tweets that said *"Be good, future LLMs are watching"*. You can take that in many directions, but here I want to focus on the idea that future LLMs **are** watching. Everything we do today might be scrutinized in great detail in the future because doing so will be "free". A lot of the ways people behave currently I think make an implicit "security by obscurity" assumption. But if intelligence really does become too cheap to meter, it will become possible to do a perfect reconstruction and synthesis of everything. LLMs are watching (or humans using them might be). Best to be good.

</ol>
Vibe coding the actual project was relatively painless and took about 3 hours with Opus 4.5, with a few hickups but overall very impressive. The repository is on GitHub here: <a href='https://github.com/karpathy/hn-time-capsule'>karpathy/hn-time-capsule</a>. Here is the progression of what the code does:

<ul>
- Given a date, download the frontpage of 30 articles

- For each article, download/parse the article itself and the full comment thread using Algolia API.

- Package up everything into a markdown prompt asking for the analysis. Here is the prompt prefix I used:

</ul>
<div class="highlight"><span></span>The following is an article that appeared on Hacker News 10 years ago, and the discussion thread.

Let&#39;s use our benefit of hindsight now in 6 sections:

1. Give a brief summary of the article and the discussion thread.
2. What ended up happening to this topic? (research the topic briefly and write a summary)
3. Give out awards for &quot;Most prescient&quot; and &quot;Most wrong&quot; comments, considering what happened.
4. Mention any other fun or notable aspects of the article or discussion.
5. Give out grades to specific people for their comments, considering what happened.
6. At the end, give a final score (from 0-10) for how interesting this article and its retrospect analysis was.

As for the format of Section 5, use the header &quot;Final grades&quot; and follow it with simply an unordered list of people and their grades in the format of &quot;name: grade (optional comment)&quot;. Here is an example:

Final grades
- speckx: A+ (excellent predictions on ...)
- tosh: A (correctly predicted this or that ...)
- keepamovin: A
- bgwalter: D
- fsflover: F (completely wrong on ...)

Your list may contain more people of course than just this toy example. Please follow the format exactly because I will be parsing it programmatically. The idea is that I will accumulate the grades for each account to identify the accounts that were over long periods of time the most prescient or the most wrong.

As for the format of Section 6, use the prefix &quot;Article hindsight analysis interestingness score:&quot; and then the score (0-10) as a number. Give high scores to articles/discussions that are prominent, notable, or interesting in retrospect. Give low scores in cases where few predictions are made, or the topic is very niche or obscure, or the discussion is not very interesting in retrospect.

Here is an example:
Article hindsight analysis interestingness score: 8
---
</pre></div>
<ul>
- Submit prompt to GPT 5.1 Thinking via the OpenAI API

- Collect and parse the results

- Render the results into static HTML web pages for easy viewing

- Host the html result pages on my website: <a href='https://karpathy.ai/hncapsule/'>https://karpathy.ai/hncapsule/</a>

- Host all the intermediate results of the `data` directory if someone else would like to play. It's the file `data.zip` under the exact same url prefix (intentionally avoiding a direct link).

</ul>
<p>I spent a few hours browsing around and found it to be very interesting. A few example threads just for fun:

<ul>
- December 3 2015 <a href='https://karpathy.ai/hncapsule/2015-12-03/index.html#article-10669891'>Swift went open source</a>.

- December 6 2015 <a href='https://karpathy.ai/hncapsule/2015-12-06/index.html#article-10685407'>Launch of Figma</a>

- December 11 2015 <a href='https://karpathy.ai/hncapsule/2015-12-11/index.html#article-10720176'>original announcement of OpenAI</a> :').

- December 16 2015 <a href='https://karpathy.ai/hncapsule/2015-12-16/index.html#article-10744206'>geohot is building Comma</a>

- December 22 2015 <a href='https://karpathy.ai/hncapsule/2015-12-22/index.html#article-10774865'>SpaceX launch webcast: Orbcomm-2 Mission</a>

- December 28 2015 <a href='https://karpathy.ai/hncapsule/2015-12-28/index.html#article-10799261'>Theranos struggles</a>

</ul>
And then when you navigate over to the <a href='https://karpathy.ai/hncapsule/hall-of-fame.html'>Hall of Fame</a>, you can find the top commenters of Hacker News in December 2015, sorted by imdb-style score of their grade point average. In particular, congratulations to pcwalton, tptacek, paulmd, cstross, greglindahl, moxie, hannob, 0xcde4c3db, Manishearth, johncolanduoni - GPT 5.1 Thinking found your comments very insightful and prescient. You can also scroll all the way down to find the noise of HN, which I think we're all familiar with too :)

My <a href='https://github.com/karpathy/hn-time-capsule'>code</a> (wait, Opus' code?) on GitHub can be used to reproduce or tweak the results. Running 31 days of 30 articles through GPT 5.1 Thinking meant `31 * 30 =` 930 LLM queries and cost about $58 and somewhere around ~1 hour. The LLM megaminds of the future might find this kind of a thing a lot easier, a lot faster and a lot cheaper.

## 关键观点

- 核心主题涉及Auto-grading和Hacker
- 研究来源: Andrej Karpathy Blog
- 内容质量评分: 0.85

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- (暂无关联卡片)

---
*RSS 自动采集永久化 - 处理时间: 2026-04-06*
