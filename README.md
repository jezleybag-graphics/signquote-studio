# SignOps Enterprise — Fastsigns Estimating & Wholesale Sourcing OS

An operational AI workbench engineered specifically for commercial sign franchises (e.g., Fastsigns) operating on a hybrid production model (50% in-house / 50% wholesale fabrication).

**Built by:** Jezreel Dave Leybag  
**Specialization:** Signage Estimator & Vendor Sourcing Specialist (Google-Certified Gemini AI Specialist)

---

## ⚡ Core Operational Capabilities

1. **Inbound Project Spec Takeoff:**
   * Automated parsing of unstructured customer emails, RFP notes, and architectural blueprint dimensions into structured Bill of Materials (BOM) callouts.
   * Calculates face substrates (Cast #7328 Acrylic, 0.063" Aluminum), return depths (3.5" vs 5.0"), and backing materials (polycarbonate, ACM).
2. **Electrical & Driver Engineering:**
   * Automated calculation of LED module counts and wattages under strict **NEC 80% continuous safety load limits** (60W UL Class 2 drivers capped at $\le 48\text{W}$).
3. **North American Wholesale Sourcing & RFQ Dispatcher:**
   * Direct trade-partner allocation for 50% outsourced production:
     * **Direct Sign Wholesale (DSW)** — Denver, CO (Channel letters, front & reverse halo-lit)
     * **Gemini (geminimade.com)** — Cannon Falls, MN (Cast bronze, acrylic, architectural plaques)
     * **Quality Manufacturing (QM)** — Lancaster, PA (Extruded cabinets, trimless channel letters)
     * **Howard Industries** — Fairview, PA (Post-and-panel, campus wayfinding)
   * 1-Click generation of trade-standardized RFQ emails with serialized UL 48 label requirements and 1:1 scale paper installation patterns.
4. **CoreBridge Margin Protection Engine:**
   * Real-time calculation of Total Cost of Goods Sold (COGS), incorporating wholesale base, custom crating, freight, and in-house prep labor ($75/hr).
   * Enforces true Gross Margin formula ($\text{Price} = \frac{\text{COGS}}{1 - \text{GM}}$) against the franchise's strict 50.0% target, eliminating margin leakage.
5. **CoreBridge JSON Export:**
   * Instant export of standardized line-item objects for ERP and estimating software integration.

---

## 🛠️ Technology & UI/UX Standards

* Designed under `ui-ux-pro-max` enterprise design intelligence:
  * "Trust & Authority" B2B palette (`#F8FAFC`, `#0F172A`, `#0369A1`, `#059669`).
  * 100% clean vector SVG icons (Lucide / Heroicons) with **zero emojis**.
  * WCAG AAA compliant text contrast and tabular numeric data rendering (`JetBrains Mono`).
  * Zero external backend dependencies—runs natively on static web hosts (Vercel, GitHub Pages, Netlify).

---

## 🚀 Deployment

To deploy this project to Vercel independently:
```bash
npm install -g vercel
vercel
```
Or create a new GitHub repository and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/signops-gemini-os.git
git branch -M main
git push -u origin main
```
