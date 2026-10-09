---
title: "Securing Your Linux Servers: A Practical Checklist"
date: 2026-01-22
description: "Essential security hardening steps for production Linux servers"
image: "images/stressed-work.jpg"
tags: ["security", "linux", "hardening"]
---

Server security is not optional. Whether you are running a small web application or a large-scale infrastructure, these fundamental security practices should be in place from day one.

## SSH Hardening

The most common attack vector for Linux servers is SSH. Lock it down:

```bash
# /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
AllowUsers deploy admin
```

Always use SSH keys instead of passwords, and consider changing the default port.

## Firewall Configuration

Use `nftables` or `iptables` to restrict network access:

- Allow only necessary inbound ports (22, 80, 443)
- Block all other inbound traffic by default
- Consider rate limiting for SSH connections

## Automatic Security Updates

Enable unattended security updates to patch vulnerabilities quickly:

```bash
apt install unattended-upgrades
dpkg-reconfigure unattended-upgrades
```

## Monitoring and Alerting

Set up monitoring to detect anomalies:

- Monitor failed login attempts
- Track disk usage and system resources
- Alert on unexpected process activity
- Log everything centrally

## Regular Backups

A security incident without backups is a disaster. Ensure:

- Daily automated backups with BorgBackup
- Off-site backup copies
- Regular restore testing
- Encrypted backup storage

## Conclusion

Security is an ongoing process, not a one-time setup. Review these practices regularly and stay updated on new vulnerabilities affecting your software stack.
