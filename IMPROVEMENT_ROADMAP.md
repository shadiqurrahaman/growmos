# GrowMos — Improvement Roadmap (6.5 → 9.0)

> Goal: take the current GrowMos marketing site from a **6.5/10 B2B CEO impression** to a **9.0/10** by closing the **trust gap** (visuals are already a 7.5; trust is the bottleneck).

Last reviewed: 2026-08-11 · Stack: Next.js 16 · React 19 · Postgres/Neon

---

## How the score breaks down today

| Dimension | Score | Notes |
|---|---|---|
| Visual polish & design language | 7.5 | Consistent bento/hero system, good typography, responsive. |
| Information architecture | 7.0 | Service pages + blog CMS + admin are wired end-to-end. |
| SEO foundations | 8.0 | Per-page metadata, JSON-LD, dynamic sitemap, robots, OG/Twitter. |
| **Trust & proof** | **5.0** | Dead footer links, no founder team, generic case studies, mismatched geography. |
| Conversion clarity | 6.5 | Calendly/WhatsApp/phone visible — but no pricing, no engagement model. |
| Copy & specificity | 5.5 | "Solution" appears 3×; broad claims; placeholder blog post still in DB. |
| Accessibility & polish | 5.5 | No `prefers-reduced-motion`, contrast gaps, `<img>` instead of `next/image`, dropdown not keyboard-accessible. |
| **Overall (CEO buyer's view)** | **6.5** | Shortlist-able, but arrives with skepticism about depth. |

**The gap is not design. It's proof.** Each P0 below directly attacks a CEO objection.

---

## P0 — Ship-blockers (close the trust gap, no CEO will sign without these)

These four items, in this order, will move the site from 6.5 to **~8.0** on their own.

### P0-1 · Add a real "About / Team" page
**Why:** B2B CEOs buy people, not logos. The founder is currently invisible. The footer link is `href="#"` — first thing a CEO clicks.
- [ ] Create `app/(public)/about/page.tsx`
- [ ] Add 4–6 team cards: headshot, name, role, LinkedIn link, 1-line bio
- [ ] Wire `<Link href="/about">` in `components/Footer.tsx` and `components/Header.tsx`
- [ ] Add founder story section (origin, why GrowMos exists, what you believe)
- [ ] Add `metadata` + JSON-LD `Person` schema for each founder
- **Done when:** A CEO can click "About Us" and see 4 real humans with LinkedIn profiles within 5 seconds.

### P0-2 · Three named case studies with real logos + metrics
**Why:** "D2C Brand Paid Social Scale" and "B2B SaaS Lead Generation" are placeholders. No CEO will write a $100K check for an unnamed brand.
- [ ] Replace generic titles with real client names + permission (or anonymize professionally: "Fortune 500 FinServ Co.")
- [ ] Add real logos to the existing client-logo marquee (or hide it if you can't)
- [ ] Each case study: client logo · 1-line metric · 3-bullet breakdown · pull quote with attribution · link to full write-up
- [ ] Move case studies into their own `/case-studies` route for shareability
- **Done when:** A skeptical CEO can verify at least one named engagement.

### P0-3 · Real Privacy Policy and Terms of Service pages
**Why:** Legal due-diligence blocker. Any B2B procurement team will fail the site at this step.
- [ ] Create `app/(public)/privacy-policy/page.tsx` and `app/(public)/terms-of-service/page.tsx`
- [ ] Use a vetted template (Termly, TermsFeed) and customize with GrowMos data
- [ ] Wire `<Link>` in footer (currently dead `href="#"`)
- [ ] Add cookie consent banner (GDPR/CCPA)
- **Done when:** Footer links resolve, procurement legal review passes.

### P0-4 · Fix the "is this real?" content gaps
- [ ] Delete or replace the placeholder blog post (`"this is my first post"`) — currently still in the DB
- [ ] Add a recent (≤30 days old) blog post to signal active practice
- [ ] Replace the word "solution" everywhere it appears (≥3 occurrences) with concrete verbs: "platform", "service", "engine"
- [ ] Decide on **one** primary geography (US / UK / EU / BD) and align phone, currency, case studies, JSON-LD `areaServed` to it
  - Current inconsistency: `+880-1731-438768` (BD phone) + `£` pricing + Worldwide `areaServed` = "who are you selling to?"
- **Done when:** A CEO cannot find placeholder text or contradictory geography anywhere on the site.

---

## P1 — Conversion & depth (6.5 → 8.5)

### P1-1 · "How We Engage" page with pricing tiers
- [ ] Create `app/(public)/engagement/page.tsx` (or `/pricing`)
- [ ] Three tiers: Starter / Growth / Embedded — with ballpark ranges ("From $X/mo")
- [ ] Each tier: deliverables, timeline, ideal customer profile, what's excluded
- [ ] CTA at bottom: book a 15-min scoping call (separate Calendly link from the main one)
- **Why:** Saves both sides 30 minutes. Filters out tire-kickers.

### P1-2 · Industries-served page
- [ ] Create `/industries/saas`, `/industries/ecommerce`, `/industries/retail`, `/industries/edtech` (you already have these directories — flesh them out)
- [ ] Each: industry-specific problem, your solution, 1 case study, 1 testimonial
- **Why:** Specialization signal. CEOs compare agencies by domain expertise.

### P1-3 · Recent, dated thought leadership
- [ ] Publish 1 high-quality post per week for the next quarter (4–5 visible in the archive)
- [ ] Each post: original framework or named-source data, author byline + photo, 600–1200 words
- [ ] Add JSON-LD `Article` + `author` Person schema (already partly in place)
- **Why:** Active blog = sharp agency. Stale blog = "they've moved on."

### P1-4 · Trust badges & certifications row
- [ ] Add a footer strip or hero badge row: SOC 2, GDPR, ISO 27001, AWS/GCP partner, "Trusted by", "As featured in" (TechCrunch, etc.)
- [ ] If you don't have certifications, swap for: client logos, "Years in business: X", "Team size: X"
- **Why:** Procurement teams check this before forwarding to a decision-maker.

### P1-5 · Founder thought-leadership surface
- [ ] Add a "From the Founder" section to home + About page
- [ ] Optional: link to founder LinkedIn / Twitter / podcast appearances
- **Why:** CEOs Google the founder before the call. Make their first impression land well.

---

## P2 — Accessibility & polish (8.5 → 9.0)

The build is clean; these are the items that separate "good" from "premium."

### P2-1 · Motion & accessibility
- [ ] Add `prefers-reduced-motion` block in `app/globals.css` disabling counter, marquee, gradient blob animations
- [ ] Add `aria-current="page"` on active nav links
- [ ] Make the services dropdown keyboard-accessible (currently `onMouseEnter` only)
- [ ] Add a "Skip to content" link at the top of `<body>`
- [ ] Add `loading.tsx` + `error.tsx` + styled `not-found.tsx`

### P2-2 · Typography contrast
- [ ] Replace text colored `--gray-500: #9aa0a6` on white with `--gray-700` (currently fails WCAG AA at ~2.85:1, needs 4.5:1)
- [ ] Audit all CTA copy on light backgrounds

### P2-3 · Image optimization
- [ ] Replace remaining `<img>` in `app/(public)/page.tsx`, `blog/[slug]/page.tsx`, blog list with `next/image` + explicit `sizes`
- [ ] Convert blog post inline `style={{…}}` layout to CSS classes (currently feels half-finished)

### P2-4 · Floating CTA persistence
- [ ] Persist "close" state in `localStorage` so it doesn't reappear on every page load
- [ ] Consider replacing with an exit-intent variant

### P2-5 · Brand consistency
- [ ] Unify header logo `GrowMos` with footer `Grow` + `Mos` styling
- [ ] Update copyright from `2024` to `2026`
- [ ] Move `@types/mailparser`, `@types/nodemailer` from `dependencies` → `devDependencies`
- [ ] Strip `ADMIN_PASSWORD=shaon@123` from `.env.example` and replace with placeholder

---

## Polish — small wins

- [ ] Remove commented-out social icon block in Footer (or wire it up)
- [ ] Rewrite `README.md` (still create-next-app boilerplate)
- [ ] Add Google Analytics / Plausible + cookie consent
- [ ] Self-host Font Awesome (currently blocking CDN request on every page)
- [ ] Add UTM tagging to the Calendly link
- [ ] Verify `AGENTS.md` references are still accurate for Next 16
- [ ] Consider `sitemap.ts` reading `NEXT_PUBLIC_BASE_URL` instead of hardcoded `https://growmos.com`

---

## Bug log (must fix before launch)

These were the **functional bugs** found in audit — already fixed in current commit, kept here for traceability:

| Bug | Status |
|---|---|
| Missing `/api/subscribers/unsubscribe` route (one-click unsubscribe from emails was broken) | ✅ Fixed — `app/api/subscribers/unsubscribe/route.ts` |
| Unsubscribe page auto-unsubscribed on page load without confirmation | ✅ Fixed — now requires explicit button click |
| Hydration mismatch on `<body>` from Grammarly extension injecting `data-gr-*` attributes | ✅ Fixed — `suppressHydrationWarning` on `<body>` |
| Placeholder DB URL was used by my dev server start, causing 500s | ✅ Fixed — restarted with real `.env` |
| Footer link to `/digital-marketing` returns 404 | ⏳ Open — see P2 or quick fix: redirect to `#services` |
| Footer `About Us` / `Careers` / `Privacy` / `Terms` are `href="#"` | ⏳ Open — see P0-3 for Privacy/Terms |

---

## Suggested order of execution

| Week | Focus | Expected score |
|---|---|---|
| **W1** | P0-1 (Team) + P0-3 (Legal pages) + delete placeholder post + footer link cleanup | **7.5** |
| **W2** | P0-2 (Case studies) + P1-4 (trust badges) + P1-5 (founder section) | **8.0** |
| **W3** | P1-1 (Pricing) + P1-2 (Industries) + P1-3 (blog cadence) | **8.5** |
| **W4** | P2 accessibility + image optimization + analytics | **9.0** |

**Owner:** Agency principal. **Cadence:** ship 1 P0 per week, then P1, then P2.

---

## What the CEO will say when you hit 9.0

> "Clear team, named clients, defensible pricing, active thought leadership, accessible site, real legal pages. Book the call."

vs. today:

> "Looks good. Who are these people? What's it cost? I'll ask around."