---
title: "It Is Reasonable To Research How To Use Model Internals In Training"
source: "ai-alignment RSS"
url: "https://www.alignmentforum.org/posts/G9HdpyREaCbFJjKu5/it-is-reasonable-to-research-how-to-use-model-internals-in"
date: 2026-02-08T03:44:01.000Z
tags: [rss, ai-alignment]
status: pending-analysis
---

# It Is Reasonable To Research How To Use Model Internals In Training

> Published on February 8, 2026 3:44 AM GMT<br/><br/><p>There seems to be a common belief in the AGI safety community that involving interpretability in the training process is “<a href="https://www.lesswrong.com/posts/mpmsK8KKysgSKDm2T/the-most-forbidden-technique">the most forbidden technique</a>”, including recent criticism of Goodfire for <a href="https://www.goodfire.ai/blog/intentional-design">investing in this area</a>.</p>
<p>I find this odd since this is a pretty normal area of interpretability research in the AGI safety community. I have <a href="https://arxiv.org/abs/2507.16795">worked</a> <a href="https://www.lesswrong.com/posts/R5MdWGKsuvdPwGFBG/steering-rl-training-benchmarking-interventions-against">on it</a>, Anthropic Fellows have <a href="https://arxiv.org/abs/2507.21509">worked on it</a>, FAR has <a href="https://arxiv.org/pdf/2505.13787">worked on it</a>, etc.</p>
<p>I don’t know if it will be net positive to use this kind of thing in frontier model training, but it could plausibly be very helpful for AGI safety, and it seems like a clear mistake to me if we don’t do the required research to figure this out. Further, this seems like a massive pain to use in current frontier model training stacks, so I don’t see any imminent risk/benefit from this kind of work, it’s more of a longer-term bet.</p>
<p>My sense is that most people in this debate have pretty reasonable and nuanced views when you actually get into the details, but public discourse is kinda confusing. So I thought it might be helpful to lay out how I see the landscape here and why I would like to see more research in this direction, and am not particularly concerned about exactly how people go about doing it<span data-footnote-reference="" data-footnote-index="1" data-footnote-id="-4ZiAHjXsCN9omam9c-1" role="doc-noteref" id="fnref-4ZiAHjXsCN9omam9c-1" class="footnote-reference">
      <sup><a href="#fn-4ZiAHjXsCN9omam9c-1" class="">[1]</a></sup>
    </span></p>
<h2><strong>What do I actually mean by using interp in training?</strong></h2>
<p>I'm broadly referring to anything involving the use of model internals in training. This could encompass several things:</p>
<ul>
<li>Directly adding some function of the model's internals (e.g. a probe score) to the loss and differentiating through it to give strong gradient signals on how to break it</li>
<li>Adding a probe score to the reward in RL, where the model does not get gradients through the probe</li>
<li>Altering the model's internals during training, such as by <a href="https://arxiv.org/abs/2507.21509">adding a steering vector</a> or <a href="https://arxiv.org/abs/2507.16795">ablating unwanted concept directions</a></li>
<li>Any of the above, but you regularly retrain</li>
</ul>
<h2><strong>Why could this research help AGI safety?</strong></h2>
<p>Fundamentally, making safe models will involve being good at training models to do what we want in weird settings where it is hard to precisely specify exactly what good behaviour looks like. Therefore, the more tools we have for doing this, the better. There are certain things that may be much easier to specify using the internals of the model. For example: Did it do something for the right reasons? Did it only act this way because it knew it was being trained or watched?</p>
<p>Further, we should beware an isolated demand for rigor here. Everything we do in model training involves taking some proxy for desired behavior and applying optimization pressure to it. The current convention is that this is fine to do for the model's behavior, bad to do for the chain of thought, and no one can be bothered with the internals. But I see no fundamental reason behaviour should be fine and internals should be forbidden, this depends on empirical facts we don’t yet know.</p>
<h2>Why might you be worried about research here?</h2>
<p>The strongest concern I see is the hope to use interpretability as a test set. The idea is that we should not use interpretability during training at all and should purely use it to audit the model, for example, making lie detectors or determining if it's scheming. An implicit belief here is often that training against interpretability will be fragile or won't really work, but will break our ability to do the auditing. As such, it would be bad if frontier labs started using these techniques for capabilities, and broke our safety tools in the process.</p>
<p>My best guess for why people are against <em>research</em> in this area today, rather than solely being against frontier labs using model internals to train AGI, is that they think it's sufficiently likely that the work is net harmful for safety if used, <em>and</em> sufficiently likely that the work results in frontier labs using the techniques anyway, actually causing the harm for safety. &nbsp;Fortunately, it would be such a massive pain to change the highly optimised infrastructure stacks of frontier labs to use model internals in training that I think this is only likely to happen if there are major gains to be had and serious political will, whether for safety or otherwise. I would be very surprised if this happens in frontier model training in the near future, and I see this as a more speculative longer-term research bet.</p>
<h2><strong>This gets kinda nuanced</strong></h2>
<p>There’s a bunch of approaches and goals here and some are more concerning to me than others. I expect techniques here to be most effective when they are about shaping generalization, such as by avoiding emergent misalignment in favour of narrow misalignment or avoiding reward hacking.</p>
<p>Intuitively, any time you apply some intervention during training or add something to the loss, you are challenging gradient descent to find a way to break it. But gradient descent generally takes the path of least resistance. If the only way to perform well on a task is to break your intervention, your intervention had better be pretty robust. However, if there's an alternative desired generalization, then your intervention only needs to be more robust than that alternative is dispreferred. This is a much lower bar. We found in <a href="https://arxiv.org/abs/2507.16795">the CAFT paper</a> that this seems to somewhat work. “<a href="https://www.goodfire.ai/blog/intentional-design#developing-responsibly">Not fighting backprop</a>” as Goodfire put it.</p>
<p>Secondly, I'm more concerned about techniques that regularly retrain their interpretability tool, for example retraining a probe every 100 steps. This seems likely to train models that don't have representations that can be easily probed. Which seems like it might make a bunch of interpretability techniques break, while if we train against a frozen probe, we can probably train another probe after training. Unfortunately, this one probably would make a technique more effective.</p>
<p>Thirdly, I would guess that what you use these techniques <em>on</em> matters a lot. I'd speculate that using these techniques for pure capabilities will have much less of a negative effect on our ability to audit models than trying to use them to make the model safe. This is sensitive to definitions, e.g. I would count preventing reward hacking as both safety and capabilities, and that might damage our ability to detect deception in general. But if someone wanted to use this to train models to e.g. be better at writing code without tons of try-except statements, or adapting better to the language and culture of the user, that seems pretty chill to me.</p>
<p>Fourthly, I would argue that it's not yet settled whether interpretability is even useful as a test set. We don't have lie detectors that I trust. Anthropic has only very recently started mentioning interpretability in system cards, and I consider the ways it's used to be experimental and non-load-bearing. I certainly <em>hope</em> interpretability will become sufficiently robust and trustworthy that it can be an important part of how we audit models, but let's not take it as a given.</p>
<h2><strong>Why do I want to see more work here?</strong></h2>
<p>Zooming out, this is a pretty early field. I don't know how well it will work, how much it will break interpretability tools, or which things are more or less dangerous. I don't know whether training against a probe will break somewhat different interpretability tools like activation oracles. I don't know if training against a frozen probe will stop me from retraining a probe on the eventual model and having it work fine. I don’t know how much harder it is to break a probe when you don’t get gradients through it. I don't know whether it will let me do things that I can't easily do with existing methods.</p>
<p>These are important questions, and we should research them! I don’t even know if my intuitions above about which directions are concerning are legit. We need to check.</p>
<ol data-footnote-section="" role="doc-endnotes" class="footnote-section footnotes"><li data-footnote-item="" data-footnote-index="1" data-footnote-id="-4ZiAHjXsCN9omam9c-1" id="fn-4ZiAHjXsCN9omam9c-1" role="doc-endnote" class="footnote-item"><p>In the sense that I think it's hard to do research in this area, right now, that is clearly net negative - I definitely think some approaches are much more promising! But even if someone tries to do pure capabilities research here, I still expect to learn useful things about safety from it. <a href="#fnref-4ZiAHjXsCN9omam9c-1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
<br/><br/><a href="https://www.alignmentforum.org/posts/G9HdpyREaCbFJjKu5/it-is-reasonable-to-research-how-to-use-model-internals-in#comments">Discuss</a>

## Full Content

⚠️ 内容抓取延迟到分析阶段。使用 web_fetch(url) 或 Jina AI 补充。

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
