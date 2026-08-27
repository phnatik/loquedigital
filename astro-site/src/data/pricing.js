// Plan pricing, for anywhere that needs it outside /pricing itself.
//
// NOT AUTHORED HERE. Every figure is transcribed from the price tables in
// pages/pricing.astro, which are themselves governed by WEBSITE_PROCESS.md §9
// and were ratified by ADR-W09. audit.py fails if this file and that page ever
// disagree, because two public pages quoting different prices for the same
// plan is the worst kind of drift.
//
// The prepay ladder is 30/10 quarterly and 50/20 semi-annual, applied to setup
// and monthly respectively. Do not recompute here — change §9 first, then
// pricing.astro, then this.

export const TERMS = [
  { key: 'mtm',      name: 'Month to month', short: 'MtM' },
  { key: 'quarterly', name: 'Quarterly',     short: '3 months', note: '30% off setup · 10% off monthly' },
  { key: 'semi',     name: 'Semi-annual',    short: '6 months', note: '50% off setup · 20% off monthly',
    best: true, bestLabel: 'What most people take' },
];

export const pricing = {
  select: {
    name: 'Select',
    mtm:       { setup: '$1,000', monthly: '$300' },
    quarterly: { setup: '$700',   monthly: '$270' },
    semi:      { setup: '$500',   monthly: '$240' },
  },
  reserve: {
    name: 'Reserve',
    mtm:       { setup: '$2,500', monthly: '$650' },
    quarterly: { setup: '$1,750', monthly: '$585' },
    semi:      { setup: '$1,250', monthly: '$520' },
  },
  custom: {
    name: 'Custom Reserve',
    mtm:       { setup: '$5,000', monthly: '$2,000' },
    quarterly: { setup: '$3,500', monthly: '$1,800' },
    semi:      { setup: '$2,500', monthly: '$1,600' },
  },
};
