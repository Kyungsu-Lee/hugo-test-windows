---
title: "Privacy Policy"
date: 2024-01-01
draft: false
noindex: false
---

# Privacy Policy

**Last Updated:** {{ now.Format "January 2, 2006" }}

This Privacy Policy explains how this website collects, uses, and protects your personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable privacy laws.

## 1. Controller of Personal Data

The website is owned and operated by **{{ .Site.Params.author }}**. 

**Contact Information:**
{{- with .Site.Params.email }}
- Email: {{ . }}
{{- end }}
{{- with .Site.Params.website }}
- Website: {{ . }}
{{- end }}

## 2. What Data We Collect

### 2.1 Analytics Data

We use **Google Analytics 4 (GA4)** to understand how visitors use our website. When you visit this site, Google Analytics collects:

- Browser type, operating system, and device type
- Pages visited, time spent on site, clicks, and scroll depth
- City and country (based on IP address, not precise GPS)
- How you arrived at our site (referrer)
- A randomly generated user ID

### 2.2 Cookies

We use cookies to track your preferences and analytics:

- **`shizuka-cookie-consent`:** Stores your cookie consent choice (365 days)
- **Google Analytics Cookies:** `_ga`, `_gat`, `_gid` and others (up to 2 years)

### 2.3 Automatically Collected Data

- IP address (from server logs and Google Analytics)
- Timestamp of access
- Browser and device information

## 3. Legal Basis for Processing (GDPR Article 6)

We process your data based on:

- **Consent:** You explicitly consent to analytics via our cookie consent banner
- **Legitimate Interest:** Understanding site performance and user behavior to improve our service

## 4. Who We Share Your Data With

### 4.1 Google Analytics

Your data is sent to Google LLC. Google processes this data according to their [Privacy Policy](https://policies.google.com/privacy). Google has signed the EU Standard Contractual Clauses for international data transfers.

### 4.2 Other Third Parties

We do not share your data with other third parties.

## 5. Data Retention

- **Analytics Data:** Typically retained for 26 months, then anonymized
- **Consent Cookie:** Retained for 365 days
- **Server Logs:** Typically retained for 30-90 days

## 6. Your GDPR Rights

You have the following rights under GDPR:

- **Right to Access:** Request a copy of your personal data
- **Right to Rectification:** Request correction of inaccurate data
- **Right to Erasure:** Request deletion of your data ("right to be forgotten")
- **Right to Restrict Processing:** Limit how we use your data
- **Right to Data Portability:** Receive your data in a portable format
- **Right to Object:** Object to processing based on legitimate interest
- **Right to Withdraw Consent:** Withdraw consent at any time
- **Right to Lodge a Complaint:** File a complaint with your local data protection authority

## 7. Cookie Consent & Management

### 7.1 Managing Your Preferences

When you visit this site, a cookie consent banner appears. You can:

- **Accept:** Enable Google Analytics tracking
- **Reject:** Disable Google Analytics tracking
- **Change Your Mind:** Contact us to withdraw consent anytime

### 7.2 Disabling Analytics

To prevent Google Analytics tracking:

1. Reject the cookie consent banner
2. Install the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout)
3. Disable cookies in your browser settings

## 8. International Data Transfers

Your data may be transferred to the United States where Google hosts its analytics servers. This transfer is protected by:

- Google's EU Standard Contractual Clauses (SCCs)
- Data Processing Agreement (DPA) commitments

## 9. Security

We implement appropriate technical and organizational measures to protect your data, including HTTPS encryption and regular security updates. However, no internet transmission method is 100% secure.

## 10. Third-Party Links

This website may link to external sites. This Privacy Policy applies only to our site. We are not responsible for third-party privacy practices.

## 11. Children's Privacy

This website is not directed at children under 13. We do not knowingly collect data from children. If we become aware of such data, we will delete it immediately.

## 12. Changes to This Policy

We may update this Privacy Policy to reflect changes in our practices or applicable law. We will notify you of material changes by updating the "Last Updated" date.

## 13. Contact Us

If you have questions about this Privacy Policy or wish to exercise your GDPR rights:

{{- with .Site.Params.email }}
**Email:** {{ . }}
{{- end }}

We will respond to data subject requests within 30 days as required by GDPR.

---

## Appendix: Data Protection

**Analytics Provider:** Google LLC  
**Data Transfers:** EU Standard Contractual Clauses (SCCs)  
**Data Processing Agreement:** Yes, in place  
**IP Anonymization:** Enabled in GA4  
**Opt-out:** [Google Analytics Opt-out Add-on](https://tools.google.com/dlpage/gaoptout)  

For more information on your rights, visit your local data protection authority's website.
