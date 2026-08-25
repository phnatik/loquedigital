// The five verticals. Nav, routing and per-page config all read from here,
// so adding a vertical is one entry plus one page file.
export const verticals = [
  {
    key: 'legal',
    path: '/legal',
    nav: 'Legal',
    navSub: 'Deadlines, matters and privilege',
    built: true,
  },
  {
    key: 'healthcare',
    path: '/healthcare',
    nav: 'Healthcare',
    navSub: 'PHI, referrals and payers',
    built: false,
  },
  {
    key: 'professional-services',
    path: '/professional-services',
    nav: 'Professional services',
    navSub: 'Finance, consulting and agencies',
    built: false,
  },
  {
    key: 'real-estate',
    path: '/real-estate',
    nav: 'Real estate',
    navSub: 'Contingencies, closings and clients',
    built: false,
  },
  {
    key: 'executives',
    path: '/executives',
    nav: 'Corporate executives',
    navSub: 'Alongside your chief of staff',
    built: false,
  },
];
