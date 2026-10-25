# Cybernovr Website — Static HTML v2

A separate multipage Cybernovr marketing site with four primary product pillars: CNII Watch, Vulnerability Management, Threat Intelligence, and SecOps & Automation.

## Pages
- `index.html` — home
- `platform.html` — NovrSOC platform overview
- `cnii.html` — critical infrastructure intelligence
- `vms.html` — vulnerability management
- `ti.html` — threat intelligence
- `secops.html` — security operations and automation
- `solutions.html` — audience and use cases
- `about.html` — company and ecosystem
- `contact.html` — contact form

## Preview
Extract the ZIP and open `index.html` in a browser. All pages link relatively and work without a build system. CSS and JS live in `assets/`. Google Fonts load when online; system fonts are fallback.

## Shared header/footer
`partials/header.html` and `partials/footer.html` are the source of truth for the nav and footer. Each page wraps its own copy in `<!-- PARTIAL:header -->...<!-- /PARTIAL:header -->` / `<!-- PARTIAL:footer -->...<!-- /PARTIAL:footer -->` markers; after editing a partial, run `node scripts/sync-partials.mjs` to propagate it to every page (plain static output, not a build step — nothing to install, nothing runs at deploy time).

## Deploy
Upload all files, keeping the folder structure, to any static host (Netlify, Vercel static deployment, Cloudflare Pages, or a regular web server). No backend required.

## Before publishing
- Verify all product claims and the Cybernovr brand wording with company leadership.
- Confirm `soc@cybernovr.com` and the NovrSOC login URL.
- Contact form uses `mailto:` (opens the visitor's email client), not a real form submission API.
- The homepage hero has a real-screenshot slot (`assets/screens/dashboard.png`, not yet supplied) rather than an illustrative mock-up — see the `TODO(RayneOps)` in `index.html`.
- Add approved company logo, privacy policy, legal details, analytics, and any approved imagery.
- No customer logos, certifications, performance metrics, pricing or testimonials have been invented.

## Design reference
Inspired by the polished enterprise landing-page structure of Novr Academy, but built as a distinct multipage site with original markup and content.
