/**
 * Centralized Contact & Gmail Compose URL Generator
 * 
 * Directs all portfolio CTAs into Gmail web compose in a new tab,
 * eliminating the broken OS mailto: handler bottleneck for hiring managers and clients.
 */

export const CONTACT_EMAIL = 'jezreelleybag.graphics@gmail.com';

export function getGmailComposeUrl({
  to = CONTACT_EMAIL,
  subject = 'Commercial Signage Estimator Opportunity - Jezreel Dave Leybag',
  body = `Hi Jezreel,

I reviewed your SignQuote AI & Architectural Estimating Workbench and would like to schedule a call regarding commercial signage estimating and operational workflows.

Best regards,`
} = {}) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
    su: subject,
    body
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
