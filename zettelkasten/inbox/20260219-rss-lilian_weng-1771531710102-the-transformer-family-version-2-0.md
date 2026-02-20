---
id: 20260219-rss-lilian_weng-XXX-the-transformer-family-version-2-0
title: The Transformer Family Version 2.0
created: 2026-02-19
tags: ["rss", "engineering", "auto-import"]
source: "Lilian Weng's Blog"
source_url: "https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/"
source_type: "article"
content_length: 4196
quality_score: 0.90
---

# The Transformer Family Version 2.0

## 原文概览

- **来源**: Lilian Weng's Blog
- **发布时间**: Fri, 27 Jan 2023 00:00:00 +0000
- **原文链接**: https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/
- **抓取时间**: 2026-02-19T20:08:30.102Z

## 核心内容

Many new Transformer architecture improvements have been proposed since my last post on [<ins>&ldquo;The Transformer Family&rdquo;</ins>](https://lilianweng.github.io/posts/2020-04-07-the-transformer-family/) about three years ago. Here I did a big refactoring and enrichment of that 2020 post &mdash; restructure the hierarchy of sections and improve many sections with more recent papers. Version 2.0 is a superset of the old version, about twice the length.

# Notations

<table>
  <thead>
      <tr>
          <th>Symbol</th>
          <th>Meaning</th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td>$d$</td>
          <td>The model size / hidden state dimension / positional encoding size.</td>
      </tr>
      <tr>
          <td>$h$</td>
          <td>The number of heads in multi-head attention layer.</td>
      </tr>
      <tr>
          <td>$L$</td>
          <td>The segment length of input sequence.</td>
      </tr>
      <tr>
          <td>$N$</td>
          <td>The total number of attention layers in the model; not considering MoE.</td>
      </tr>
      <tr>
          <td>$\mathbf{X} \in \mathbb{R}^{L \times d}$</td>
          <td>The input sequence where each element has been mapped into an embedding vector of shape $d$, same as the model size.</td>
      </tr>
      <tr>
          <td>$\mathbf{W}^k \in \mathbb{R}^{d \times d_k}$</td>
          <td>The key weight matrix.</td>
      </tr>
      <tr>
          <td>$\mathbf{W}^q \in \mathbb{R}^{d \times d_k}$</td>
          <td>The query weight matrix.</td>
      </tr>
      <tr>
          <td>$\mathbf{W}^v \in \mathbb{R}^{d \times d_v}$</td>
          <td>The value weight matrix. Often we have $d_k = d_v = d$.</td>
      </tr>
      <tr>
          <td>$\mathbf{W}^k_i, \mathbf{W}^q_i \in \mathbb{R}^{d \times d_k/h}; \mathbf{W}^v_i \in \mathbb{R}^{d \times d_v/h}$</td>
          <td>The weight matrices per head.</td>
      </tr>
      <tr>
          <td>$\mathbf{W}^o \in \mathbb{R}^{d_v \times d}$</td>
          <td>The output weight matrix.</td>
      </tr>
      <tr>
          <td>$\mathbf{Q} = \mathbf{X}\mathbf{W}^q \in \mathbb{R}^{L \times d_k}$</td>
          <td>The query embedding inputs.</td>
      </tr>
      <tr>
          <td>$\mathbf{K} = \mathbf{X}\mathbf{W}^k \in \mathbb{R}^{L \times d_k}$</td>
          <td>The key embedding inputs.</td>
      </tr>
      <tr>
          <td>$\mathbf{V} = \mathbf{X}\mathbf{W}^v \in \mathbb{R}^{L \times d_v}$</td>
          <td>The value embedding inputs.</td>
      </tr>
      <tr>
          <td>$\mathbf{q}_i, \mathbf{k}_i \in \mathbb{R}^{d_k}, \mathbf{v}_i \in \mathbb{R}^{d_v}$</td>
          <td>Row vectors in query, key, value matrices, $\mathbf{Q}$, $\mathbf{K}$ and $\mathbf{V}$.</td>
      </tr>
      <tr>
          <td>$S_i$</td>
          <td>A collection of key positions for the $i$-th query $\mathbf{q}_i$ to attend to.</td>
      </tr>
      <tr>
          <td>$\mathbf{A} \in \mathbb{R}^{L \times L}$</td>
          <td>The self-attention matrix between a input sequence of lenght $L$ and itself. $\mathbf{A} = \text{softmax}(\mathbf{Q}\mathbf{K}^\top / \sqrt{d_k})$.</td>
      </tr>
      <tr>
          <td>$a_{ij} \in \mathbf{A}$</td>
          <td>The scalar attention score between query $\mathbf{q}_i$ and key $\mathbf{k}_j$.</td>
      </tr>
      <tr>
          <td>$\mathbf{P} \in \mathbb{R}^{L \times d}$</td>
          <td>position encoding matrix, where the $i$-th row $\mathbf{p}_i$ is the positional encoding for input $\mathbf{x}_i$.</td>
      </tr>
  </tbody>
</table>
# Transformer Basics

The **Transformer** (which will be referred to as &ldquo;vanilla Transformer&rdquo; to distinguish it from other enhanced versions; [Vaswani, et al., 2017](https://arxiv.org/abs/1706.03762)) model has an encoder-decoder architecture, as commonly used in many [NMT](https://lilianweng.github.io/posts/2018-06-24-attention/#born-for-translation) models. Later simplified Transformer was shown to achieve great performance in language modeling tasks, like in encoder-only [BERT](https://lilianweng.github.io/posts/2019-01-31-lm/#bert) or decoder-only [GPT](https://lilianweng.github.io/posts/2019-01-31-lm/#openai-gpt).

## 关键观点

<!-- TODO: 人工或LLM提取3-5个关键观点 -->

## 相关链接

- [[TODO-添加相关ZK卡片]]

---
*RSS 自动抓取 - 抓取时间: 2026-02-19T20:08:30.102Z*