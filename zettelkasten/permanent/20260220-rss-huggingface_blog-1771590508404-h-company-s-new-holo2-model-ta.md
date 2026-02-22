---
id: 20260220-rss-huggingface_blog-001-h-company-s-new-holo2-model-takes-the-lead-in-ui-l
title: H Company's new Holo2 model takes the lead in UI Localization
created: 2026-02-21
tags: ["rss","ai_research","auto-import","permanent"]
source: "Hugging Face Blog"
source_url: "https://huggingface.co/blog/Hcompany/introducing-holo2-235b-a22b"
source_type: "article"
content_length: 3840
quality_score: 0.95
---

# H Company's new Holo2 model takes the lead in UI Localization

## 来源信息

- **来源**: Hugging Face Blog
- **发布时间**: 见原文
- **原文链接**: https://huggingface.co/blog/Hcompany/introducing-holo2-235b-a22b
- **采集时间**: 2026-02-21

## 核心内容

const guestTheme = document.cookie.match(/theme=(\w+)/)?.[1]; document.documentElement.classList.toggle('dark', guestTheme === 'dark' || ( (!guestTheme || guestTheme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)); H Company&#39;s new Holo2 model takes the lead in UI Localization ((window.plausible = window.plausible || function () { (plausible.q = plausible.q || []).push(arguments); }), (plausible.init = plausible.init || function (i) { plausible.o = i || {}; })); plausible.init({ customProperties: { loggedIn: "false", }, endpoint: "/api/event", }); window.hubConfig = {"features":{"signupDisabled":false},"sshGitUrl":"git@hf.co","moonHttpUrl":"https:\/\/huggingface.co","captchaApiKey":"bd5f2066-93dc-4bdd-a64b-a24646ca3859","datasetViewerPublicUrl":"https:\/\/datasets-server.huggingface.co","stripePublicKey":"pk_live_x2tdjFXBCvXo2FFmMybezpeM00J6gPCAAc","environment":"production","userAgent":"HuggingFace (production)","spacesIframeDomain":"hf.space","spacesApiUrl":"https:\/\/api.hf.space","docSearchKey":"ece5e02e57300e17d152c08056145326e90c4bff3dd07d7d1ae40cf1c8d39cb6","logoDev":{"apiUrl":"https:\/\/img.logo.dev\/","apiKey":"pk_UHS2HZOeRnaSOdDp7jbd5w"}}; window.requestId = "Root=1-6998536c-4278aa583933918d6a344124"; window.featureFlags = {"buckets":false}; Hugging Face Models Datasets Spaces Community Docs Enterprise Pricing Log In Sign Up Back to Articles H Company's new Holo2 model takes the lead in UI Localization Team Article Published February 3, 2026 Upvote 5 Ramzi De Coster ramzidecoster Follow Hcompany Hamza Benchekroun hamza-hcompany Follow Hcompany Aurélien Lac h-aurelien-lac Follow Hcompany Tony Wu h-tonywu Follow Hcompany Pierre-Louis Cedoz plcedoz38 Follow Hcompany Kai Yuan h-kaiy Follow Hcompany Mart Bakler mbakler-h Follow Hcompany Antoine Bonnet ABonnetH Follow Hcompany Two months since releasing our first batch of Holo2 models, H Company is back with our largest UI localization model yet: Holo2-235B-A22B Preview . This model achieves a new State-of-the-Art (SOTA) record of 78.5% on Screenspot-Pro and 79.0% on OSWorld G. Available on Hugging Face , Holo2-235B-A22B Preview is a research release focused on UI element localization. Agentic Localization High-resolution 4K interfaces are challenging for localization models. Small UI elements can be difficult to pinpoint on a large display. With agentic localization, however, Holo2 can iteratively refine its predictions, improving accuracy with each step and unlocking 10-20% relative gains across all Holo2 model sizes. Holo2-235B-A22B's Performance on ScreenSpot-Pro Holo2-235B-A22B Preview reaches 70.6% accuracy on ScreenSpot-Pro in a single step. In agent mode, it achieves 78.5% within 3 steps, setting a new state-of-the-art on the most challenging GUI grounding benchmark. Trained with SkyPilot Training Holo2 models at scale requires coordinating workloads across multiple cloud providers. H Company uses SkyPilot as a unified interface for launching training jobs on our clusters with Kubernetes (k8s). By abstracting away infrastructure complexity, SkyPilot lets researchers focus on model development instead of managing k8s manifests or maintaining separate deployment scripts. Community Edit Preview Upload images, audio, and videos by dragging in the text input, pasting, or clicking here . Tap or paste here to upload images Comment · Sign up or log in to comment Upvote 5 System theme Company TOS Privacy About Careers Website Models Datasets Spaces Pricing Docs import("\/front\/build\/kube-8f23bef\/index.js"); window.moonSha = "kube-8f23bef\/"; window.__hf_deferred = {}; if (["hf.co", "huggingface.co"].includes(window.location.hostname)) { const script = document.createElement("script"); script.src = "https://js.stripe.com/v3/"; script.async = true; document.head.appendChild(script); }

## 关键观点

- 核心主题涉及Company's和Localization
- 研究来源: Hugging Face Blog
- 内容质量评分: 0.95

## 深度思考

- 这项研究的核心假设是什么？它们是否合理？
- 方法的主要局限性是什么？未来如何改进？
- 这个发现对实际应用场景有什么启示？
- 如果换一个数据集或环境，结果是否依然成立？
- 这项工作的创新点是否被充分论证？

## 相关链接

- [[001-zettelkasten-是什么]]
- [[009-写作就是思考]]
- [[011-从笔记到文章]]


*RSS 自动采集永久化 - 处理时间: 2026-02-21*
