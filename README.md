# SignQuote Studio — Commercial Sign Estimating & Wholesale Sourcing Workbench

**SignQuote Studio** is a production-grade commercial signage estimating and wholesale trade sourcing workbench engineered specifically for U.S. Fastsigns franchise centers operating on a hybrid production model (50% in-house / 50% wholesale fabrication).

**Architected & Built by:** Jezreel Dave Leybag  
**Target Position:** Signage Estimator & Vendor Sourcing Specialist (Google-Certified Gemini AI Specialist)

---

## ⚡ Core Operational Capabilities

1. **Inbound Project Spec Takeoff:**
   * Automated parsing of unstructured contractor emails, RFP notes, and architectural blueprint dimensions into structured Bill of Materials (BOM) callouts.
   * Calculates face substrates (Cast #7328 Acrylic, 0.063" Aluminum), return depths (3.5" vs 5.0"), and backing materials (polycarbonate, ACM).
2. **Technical Channel Letter CAD Blueprint:**
   * Embedded interactive vector cross-section diagram showcasing the complete physical assembly: Opaque/Acrylic Face, 3.5" Aluminum Returns, 12V IP67 LEDs, Clear Polycarbonate Back, 1.5" Standoffs, and Building Facade.
3. **Electrical & Driver Engineering (NEC 80% Rule):**
   * Automated calculation of LED module counts and wattages under strict **NEC 80% continuous safety load limits** (60W UL Class 2 drivers capped at $\le 48\text{W}$).
4. **North American Wholesale Sourcing & RFQ Dispatcher:**
   * Direct trade-partner allocation for 50% outsourced production:
     * **Direct Sign Wholesale (DSW)** — Denver, CO (Channel letters, front & reverse halo-lit)
     * **Gemini (geminimade.com)** — Cannon Falls, MN (Cast bronze, acrylic, architectural plaques)
     * **Quality Manufacturing (QM)** — Lancaster, PA (Extruded cabinets, trimless channel letters)
     * **Howard Industries** — Fairview, PA (Post-and-panel, campus wayfinding)
   * 1-Click generation of trade-standardized RFQ emails with serialized UL 48 label requirements and 1:1 scale paper installation patterns.
5. **CoreBridge Margin Protection Engine:**
   * Real-time calculation of Total Cost of Goods Sold (COGS), incorporating wholesale base, custom crating, freight, and in-house prep labor ($75/hr).
   * Enforces true Gross Margin formula ($\text{Price} = \frac{\text{COGS}}{1 - \text{GM}}$) against the franchise's strict 50.0% target, eliminating margin leakage.
6. **CoreBridge JSON Export:**
   * Instant export of standardized line-item objects for ERP and estimating software integration.

---

## 🛠️ UI/UX Design System Specifications

* Designed strictly under `.agent/ui-ux-designer` and `ui-ux-pro-max` guidelines:
  * **Design Tokens:** Standardized CSS variable architecture (`--bg-canvas`, `--bg-surface`, `--border-subtle`, `--text-heading`, `--brand-700`, `--success-600`).
  * **Iconography:** 100% vector SVG icons (Lucide / Heroicons). **Zero emojis.**
  * **Accessibility:** WCAG AAA text contrast ratios, visible focus indicators, screen-reader friendly landmarks, and tabular monospace data presentation (`JetBrains Mono`).
  * **Operator Dossier:** Off-canvas slide-over drawer highlighting Jezreel's Google Gemini Certification (86%), print operations track record, and U.S. EST schedule readiness.

---

## 🚀 Standalone Deployment

Deploy independently to Vercel:
```bash
npm install -g vercel
vercel
```
Or push to a dedicated GitHub repository:
```bash
git remote add origin https://github.com/jezleybag-graphics/signquote-studio.git
git branch -M main
git push -u origin main
```
