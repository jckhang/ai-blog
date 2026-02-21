---
id: 20260220-rss-huggingface_blog-001-one-shot-any-web-app-with-gradio-s-gr-html
title: One-Shot Any Web App with Gradio's gr.HTML
created: 2026-02-21
tags: ["rss","ai_research","auto-import","permanent"]
source: "Hugging Face Blog"
source_url: "https://huggingface.co/blog/gradio-html-one-shot-apps"
source_type: "article"
content_length: 7236
quality_score: 0.95
---

# One-Shot Any Web App with Gradio's gr.HTML

## 来源信息

- **来源**: Hugging Face Blog
- **发布时间**: 见原文
- **原文链接**: https://huggingface.co/blog/gradio-html-one-shot-apps
- **采集时间**: 2026-02-21

## 核心内容

const guestTheme = document.cookie.match(/theme=(\w+)/)?.[1]; document.documentElement.classList.toggle('dark', guestTheme === 'dark' || ( (!guestTheme || guestTheme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)); One-Shot Any Web App with Gradio&#39;s gr.HTML ((window.plausible = window.plausible || function () { (plausible.q = plausible.q || []).push(arguments); }), (plausible.init = plausible.init || function (i) { plausible.o = i || {}; })); plausible.init({ customProperties: { loggedIn: "false", }, endpoint: "/api/event", }); window.hubConfig = {"features":{"signupDisabled":false},"sshGitUrl":"git@hf.co","moonHttpUrl":"https:\/\/huggingface.co","captchaApiKey":"bd5f2066-93dc-4bdd-a64b-a24646ca3859","datasetViewerPublicUrl":"https:\/\/datasets-server.huggingface.co","stripePublicKey":"pk_live_x2tdjFXBCvXo2FFmMybezpeM00J6gPCAAc","environment":"production","userAgent":"HuggingFace (production)","spacesIframeDomain":"hf.space","spacesApiUrl":"https:\/\/api.hf.space","docSearchKey":"ece5e02e57300e17d152c08056145326e90c4bff3dd07d7d1ae40cf1c8d39cb6","logoDev":{"apiUrl":"https:\/\/img.logo.dev\/","apiKey":"pk_UHS2HZOeRnaSOdDp7jbd5w"}}; window.requestId = "Root=1-69985369-794272630b89562327f769d1"; window.featureFlags = {"buckets":false}; Hugging Face Models Datasets Spaces Community Docs Enterprise Pricing Log In Sign Up Back to Articles One-Shot Any Web App with Gradio's gr.HTML Published February 18, 2026 Update on GitHub Upvote 13 +7 yuvraj sharma ysharma Follow hysts hysts Follow Freddy Boulton freddyaboulton Follow Productivity Apps Business Apps Creative Apps ML Apps How It Works Why This Matters for Vibe Coding Gradio 6 quietly shipped a very powerful feature: gr.HTML now supports custom templates, scoped CSS, and JavaScript interactivity. Which means you can build pretty much any web component — and Claude (or any other frontier LLM) can generate the whole thing in one shot: frontend, backend, and state management, all in a single Python file. We tested this by building different types of apps. Each one is a single Python file, no build step, deployable to Hugging Face Spaces in seconds. Productivity Apps Pomodoro Timer : A focus timer where a pixel-art tree grows as you work. Starts as a seed, sprouts branches, grows leaves. Complete a session and the tree joins your forest. Session tracking, theme switching, break modes — all interactive, all in one file. The tree animation alone would normally require a separate React component. Here it's just CSS keyframes in css_template and state updates in js_on_load . Business Apps GitHub Contribution Heatmap : Click any cell to toggle contributions. Multiple color themes. Pattern generators (streaks, seasonal, random). Live stats that update as you edit. Kanban Board : Full drag-and-drop between columns. Inline editing (double-click any card). Search feature that can filter in real-time. Collapsible columns. Drag-and-drop usually means pulling in a library. Here it's native HTML5 drag events wired up in js_on_load , with state synced back to Python via trigger('change') . Creative Apps Spin-to-Win Wheel : Smooth CSS animation, rotation state that persists across re-renders. Preset configurations for yes/no decisions, restaurant picking, team selection. You can also add custom spinning segments on the fly. ML Apps This is where gr.HTML gets really interesting for ML work: you can build specialized components that can handle your exact output format, then use them like any built-in Gradio component. Detection Viewer : A custom viewer for object detection, instance segmentation, and pose estimation results. Renders bounding boxes, segmentation masks, keypoints, and skeleton connections — all in a reusable gr.HTML subclass that plugs directly into your model pipeline. The community's built some creative components with gr.HTML too: 3D Camera Control for Image Editing : A full Three.js viewport inside a Gradio app! Drag handles to control azimuth, elevation, and distance. Your uploaded image appears in the 3D scene, and the camera parameters feed directly into Qwen's latest image editing model. These kinds of interactive 3D controls would normally require a separate frontend — with Gradio it's just one gr.HTML subclass🔥 Real-time Speech Transcription : Live transcription with Mistral's Voxtral model. The transcript display is a custom gr.HTML component with animated status badges, a live WPM counter, and styled output that updates as you speak. Real-time UI feedback without using React! How It Works Every gr.HTML component takes three templates: gr.HTML( value={ "count" : 0 }, html_template= "<button>Clicked ${value.count} times</button>" , css_template= "button { background: #667eea; color: white; }" , js_on_load= """ element.querySelector('button').onclick = () => { props.value = { count: props.value.count + 1 }; trigger('change'); }; """ ) ${value} injects Python state. props.value updates it from JavaScript. trigger('change') syncs back to Python. That's the whole API. For reusable components, subclass gr.HTML : class Heatmap (gr.HTML): def __init__ ( self, value= None , theme= "green" , **kwargs ): super ().__init__( value=value, theme=theme, html_template=TEMPLATE, css_template=STYLES, js_on_load=SCRIPT, **kwargs ) Now Heatmap() works like gr.Image() or gr.Slider() — use it in Blocks, wire up event handlers, whatever you need. Why This Matters for Vibe Coding When you ask your LLM to build a custom component, single-file output is everything. No "now create the styles file" or "wire this into your build config." Just one Python file that runs immediately. The feedback loop becomes: describe what you want → get code → gradio app.py → see it working → describe what to fix → repeat. Each cycle takes seconds with Gradio's reload mode . Deploy to Spaces with gradio deploy or share a temporary link with demo.launch(share=True) . Within a few seconds from an idea to a live app. Gradio ships with 32 interactive components, but sometimes your perfect AI web app needs something special. That's where gr.HTML comes in. If you’ve got an idea, try building it with gr.HTML : describe what you want to your LLM, generate the code, run it. You might be surprised what you can ship in 5 minutes. Suggested reading: Gradio guide: Custom Components with gr.HTML API docs: gr.HTML More Articles from our Blog transformers v5 community Hot Transformers v5: Simple model definitions powering the AI ecosystem 298 December 1, 2025 gradio mcp community Implementing MCP Servers in Python: An AI Shopping Assistant with Gradio 60 July 31, 2025 Community Edit Preview Upload images, audio, and videos by dragging in the text input, pasting, or clicking here . Tap or paste here to upload images Comment · Sign up or log in to comment Upvote 13 +1 System theme Company TOS Privacy About Careers Website Models Datasets Spaces Pricing Docs import("\/front\/build\/kube-8f23bef\/index.js"); window.moonSha = "kube-8f23bef\/"; window.__hf_deferred = {}; if (["hf.co", "huggingface.co"].includes(window.location.hostname)) { const script = document.createElement("script"); script.src = "https://js.stripe.com/v3/"; script.async = true; document.head.appendChild(script); }

## 关键观点

- 核心主题涉及One-Shot和Gradio's
- 研究来源: Hugging Face Blog
- 内容质量评分: 0.95

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- [[016-llm-research-automation]]
- [[017-深度研究工具链]]
- [[018-研究扫描自动化的ZK集成策略]]

---
*RSS 自动采集永久化 - 处理时间: 2026-02-21*
