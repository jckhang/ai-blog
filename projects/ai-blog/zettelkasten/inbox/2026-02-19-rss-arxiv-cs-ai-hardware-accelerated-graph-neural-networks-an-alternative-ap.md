---
title: "Hardware-accelerated graph neural networks: an alternative approach for neuromorphic event-based audio classification and keyword spotting on SoC FPGA"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.16442"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Hardware-accelerated graph neural networks: an alternative approach for neuromorphic event-based audio classification and keyword spotting on SoC FPGA

> arXiv:2602.16442v1 Announce Type: cross 
Abstract: As the volume of data recorded by embedded edge sensors increases, particularly from neuromorphic devices producing discrete event streams, there is a growing need for hardware-aware neural architectures that enable efficient, low-latency, and energy-conscious local processing. We present an FPGA implementation of event-graph neural networks for audio processing. We utilise an artificial cochlea that converts time-series signals into sparse event data, reducing memory and computation costs. Our architecture was implemented on a SoC FPGA and evaluated on two open-source datasets. For classification task, our baseline floating-point model achieves 92.7% accuracy on SHD dataset - only 2.4% below the state of the art - while requiring over 10x and 67x fewer parameters. On SSC, our models achieve 66.9-71.0% accuracy. Compared to FPGA-based spiking neural networks, our quantised model reaches 92.3% accuracy, outperforming them by up to 19.3% while reducing resource usage and latency. For SSC, we report the first hardware-accelerated evaluation. We further demonstrate the first end-to-end FPGA implementation of event-audio keyword spotting, combining graph convolutional layers with recurrent sequence modelling. The system achieves up to 95% word-end detection accuracy, with only 10.53 microsecond latency and 1.18 W power consumption, establishing a strong benchmark for energy-efficient event-driven KWS.

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
