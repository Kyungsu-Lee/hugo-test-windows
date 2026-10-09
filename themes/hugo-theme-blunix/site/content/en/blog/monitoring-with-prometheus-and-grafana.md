---
title: "Production Monitoring with Prometheus and Grafana"
date: 2026-01-08
description: "Setting up comprehensive monitoring for your infrastructure"
image: "images/mobile-work.jpg"
tags: ["monitoring", "prometheus", "grafana"]
---

Visibility into your infrastructure is critical. Without proper monitoring, you are flying blind. This article covers setting up Prometheus and Grafana for production monitoring.

## Architecture Overview

A typical monitoring stack consists of:

1. **Prometheus** — Time-series database and scraper
2. **Node Exporter** — System metrics collector
3. **Alertmanager** — Alert routing and notification
4. **Grafana** — Visualization and dashboards

## Installing Prometheus

```bash
apt install prometheus prometheus-node-exporter
```

Configure scrape targets in `/etc/prometheus/prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets:
        - 'web-1:9100'
        - 'web-2:9100'
        - 'db-1:9100'
```

## Key Metrics to Monitor

At minimum, track these metrics across all servers:

- **CPU usage** — Sustained high CPU indicates problems
- **Memory usage** — Watch for memory leaks
- **Disk I/O** — Slow disks cause cascading failures
- **Network traffic** — Unusual patterns may indicate attacks
- **Application-specific** — Response times, error rates, queue depths

## Setting Up Alerts

Define alerting rules for critical conditions:

```yaml
groups:
  - name: system
    rules:
      - alert: HighCPU
        expr: node_cpu_seconds_total{mode="idle"} < 10
        for: 5m
        labels:
          severity: warning
```

## Grafana Dashboards

Grafana provides powerful visualization. Import community dashboards for quick setup, then customize for your specific needs.

Good monitoring is an investment that pays for itself the first time it catches a problem before your users do.
