// The service catalogue behind /build.
//
// TIERS ARE NOT AUTHORED HERE. Every `tier` below is transcribed from the
// comparison matrix in plans.astro, which is itself governed by
// WEBSITE_PROCESS.md §9. `tier` means "the cheapest plan this is included in":
//
//   select  — a dot in all three columns
//   reserve — a dash under Select, a dot under Reserve
//   custom  — a dash under Select and Reserve
//
// The builder's rule is simply: the plan you need is the highest tier among
// the things you picked. If the matrix changes, change it there first and
// then here — a mismatch between this file and /plans is a pricing claim
// that contradicts itself on two public pages.
//
// Copy policy: WEBSITE_PROCESS.md §8 applies to every string in this file.
// No hours saved, no accuracy percentages, no ROI, no multipliers. The
// approval promise (ADR-P04) is never contradicted — nothing here may imply
// something sends without review.

export const TIERS = {
  select:  { key: 'select',  name: 'Select',         rank: 1 },
  reserve: { key: 'reserve', name: 'Reserve',        rank: 2 },
  custom:  { key: 'custom',  name: 'Custom Reserve', rank: 3 },
};

export const groups = [
  {
    key: 'email',
    name: 'Email',
    lede: 'The inbox is where the day gets decided. This is what stops it deciding for you.',
    art: 'grp-email',
    services: [
      {
        id: 'email-classification',
        name: 'Classification and smart foldering',
        tier: 'select',
        short: 'Every message sorted the way your business is organised.',
        detail: 'Mail is read and filed by client, matter, project or payer as it arrives — not into one flat archive you still have to search. The categories come from how your practice already works, set during onboarding.',
      },
      {
        id: 'email-noise',
        name: 'Spam, noise and newsletter suppression',
        tier: 'select',
        short: 'The mail that was never going to matter never reaches you.',
        detail: 'Vendor blasts, newsletters, notification noise and cold outreach are held back before they land. Nothing is deleted — it is filed where you can go and look if you want to.',
      },
      {
        id: 'email-scoring',
        name: 'Importance and urgency scoring',
        tier: 'select',
        short: 'What is urgent and what is merely loud, told apart.',
        detail: 'Each message is scored on how much it matters and how fast it needs an answer. Those are different questions, and treating them as one is why an inbox sorted by time is not sorted at all.',
      },
      {
        id: 'email-digest',
        name: 'Daily priority digest',
        tier: 'select',
        short: 'One read, first thing, covering what actually needs you.',
        detail: 'A single brief that opens with anything on a clock, then what needs a decision, then what has been handled. Built so that reading it is a substitute for scrolling the inbox rather than an addition to it.',
      },
      {
        id: 'email-unsubscribe',
        name: 'Unsubscribe hygiene',
        tier: 'select',
        short: 'The list you never joined stops arriving.',
        detail: 'Recurring senders you never engage with are unsubscribed from properly rather than filtered forever, so the volume falls instead of moving.',
      },
      {
        id: 'email-vip',
        name: 'VIP routing and escalation',
        tier: 'reserve',
        short: 'Named people and named situations jump the queue.',
        detail: 'You define who and what always reaches you immediately — a key client, a court, a specific payer, a subject line pattern. Everything matching escalates the moment it arrives rather than waiting for the digest.',
      },
      {
        id: 'email-drafts',
        name: 'Replies drafted in your voice',
        tier: 'reserve',
        short: 'The reply is written and waiting. You approve it.',
        detail: 'Voice is modelled on your own sent mail from the last six to twelve months, so drafts sound like you rather than like software. Nothing sends under your name without your approval, on any plan.',
      },
      {
        id: 'email-tasks',
        name: 'Task extraction from email',
        tier: 'reserve',
        short: 'What you agreed to in a thread becomes something tracked.',
        detail: 'Commitments buried in the body of a message are pulled out as tasks with the thread attached, so the promise you made on Tuesday is not depending on you remembering it on Friday.',
      },
    ],
  },
  {
    key: 'calendar',
    name: 'Calendar',
    lede: 'The calendar is the only part of the week you cannot make more of.',
    art: 'grp-calendar',
    services: [
      {
        id: 'cal-focus',
        name: 'Protected focus blocks',
        tier: 'select',
        short: 'Time for actual work, defended rather than hoped for.',
        detail: 'Blocks held against the drift of other people booking into them. The protection is a rule rather than a preference, so it survives a busy week.',
      },
      {
        id: 'cal-scheduling',
        name: 'Scheduling and booking coordination',
        tier: 'reserve',
        short: 'The back-and-forth to find a time stops being yours.',
        detail: 'Finding a slot, proposing it, confirming it and putting it in the calendar is handled end to end, including with people outside your organisation.',
      },
      {
        id: 'cal-conflicts',
        name: 'Conflict resolution and rescheduling',
        tier: 'reserve',
        short: 'When something moves, everything around it gets fixed.',
        detail: 'A double-booking or a moved meeting triggers the rearranging and the notifying, rather than starting a new email thread you have to run.',
      },
      {
        id: 'cal-prep',
        name: 'Meeting prep briefs',
        tier: 'custom',
        short: 'You walk in knowing where you left off.',
        detail: 'Before each external meeting, a short brief with the history, the last interaction and what is still open — assembled from the thread rather than from your memory.',
      },
      {
        id: 'cal-audit',
        name: 'Calendar audit and time analysis',
        tier: 'custom',
        short: 'Where the week actually went, in writing.',
        detail: 'A periodic read of how the calendar was really spent, by category and by who requested it. Most people have never seen this for their own week.',
      },
    ],
  },
  {
    key: 'followthrough',
    name: 'Meetings and follow-through',
    lede: 'Things rarely fail at the decision. They fail in the fortnight afterwards.',
    art: 'grp-followthrough',
    services: [
      {
        id: 'ft-notes',
        name: 'Meeting notes and summaries',
        tier: 'reserve',
        short: 'The meeting is written up without anyone writing it up.',
        detail: 'A record of what was discussed and what was decided, filed against the client or matter it belongs to.',
      },
      {
        id: 'ft-actions',
        name: 'Action item extraction and assignment',
        tier: 'reserve',
        short: 'What was agreed becomes a list with names on it.',
        detail: 'Actions are pulled out of the discussion and attributed, so the follow-up does not depend on whoever happened to be taking notes.',
      },
      {
        id: 'ft-commitments',
        name: 'Commitment tracking',
        tier: 'custom',
        short: 'Everything you said you would do, tracked to done.',
        detail: 'Promises made in mail, meetings and calls are held in one place and chased to a close rather than closed by being forgotten.',
      },
      {
        id: 'ft-waiting',
        name: 'Waiting-on tracking',
        tier: 'custom',
        short: 'Everything you are owed, chased on a schedule.',
        detail: 'Signatures, records, documents and answers you are waiting for are followed up on a rhythm instead of whenever it occurs to someone.',
      },
      {
        id: 'ft-crm',
        name: 'CRM sync',
        tier: 'custom',
        short: 'The system of record stops needing to be fed by hand.',
        detail: 'Contacts, activity and outcomes are written back to your CRM so the record reflects what happened without anyone retyping it.',
      },
      {
        id: 'ft-renewals',
        name: 'Vendor and subscription renewal tracking',
        tier: 'custom',
        short: 'Nothing auto-renews because nobody was watching.',
        detail: 'Renewal and notice dates are held and surfaced with enough lead time to actually decide, rather than discovered on an invoice.',
      },
    ],
  },
  {
    key: 'handwritten',
    name: 'The Handwritten Layer',
    lede: 'The one part of this a client can hold.',
    art: 'grp-handwritten',
    services: [
      {
        id: 'hw-cards',
        name: 'Handwritten cards',
        tier: 'reserve',
        short: 'A monthly allowance of real cards, actually written.',
        detail: 'Real pen, real ink, written by machine rather than printed. Ten a month on Reserve, twenty on Custom Reserve.',
        note: '10 / month on Reserve · 20 / month on Custom Reserve',
      },
      {
        id: 'hw-address',
        name: 'Request address for custom sends',
        tier: 'reserve',
        short: 'A dedicated address for "send this one".',
        detail: 'You or your assistant email a dedicated address when you want something specific sent, rather than filing a request.',
      },
      {
        id: 'hw-letters',
        name: 'Handwritten letters',
        tier: 'custom',
        short: 'Longer than a card, when a card is not enough.',
        detail: 'Five a month on Custom Reserve, in the same real pen and ink as the cards.',
        note: '5 / month on Custom Reserve',
      },
      {
        id: 'hw-thankyou',
        name: 'Automatic post-meeting thank-you',
        tier: 'custom',
        short: 'A qualifying meeting can trigger a card on its own.',
        detail: 'Drawn from a template library you approve once during onboarding, with a weekly digest of what went out. You set the monthly ceiling, so nobody gets a surprise invoice.',
      },
    ],
  },
  {
    key: 'custombuild',
    name: 'Custom build',
    lede: 'The part that stops being a product and starts being your operation.',
    art: 'grp-custombuild',
    services: [
      {
        id: 'cb-map',
        name: 'Documented workflow map',
        tier: 'custom',
        short: 'A written map of how your operation actually moves work.',
        detail: 'Produced during discovery. Most practices have never had one, and it is useful before we automate a single thing.',
      },
      {
        id: 'cb-escalation',
        name: 'Custom escalation logic',
        tier: 'custom',
        short: 'Urgent means what it means in your business.',
        detail: 'Not a generic importance score. Rules built around what actually constitutes an emergency for you — a filing deadline, a payer denial, a key client going quiet, a specific name in a subject line.',
      },
      {
        id: 'cb-routing',
        name: 'Custom assignment and routing',
        tier: 'custom',
        short: 'Who handles what, encoded.',
        detail: 'Which paralegal owns which matter type, which biller handles which payer, what goes to the office manager, what waits for the weekly review. Most things should not reach you at all.',
      },
      {
        id: 'cb-flows',
        name: 'Custom process flows',
        tier: 'custom',
        short: 'Multi-step work that runs as one flow, not six reminders.',
        detail: 'Intake through conflict check through engagement letter. Referral through insurance verification through pre-visit packet. Start to finish rather than step by step.',
      },
      {
        id: 'cb-analytics',
        name: 'Custom analytics and reporting',
        tier: 'custom',
        short: 'Built around the numbers you actually manage by.',
        detail: 'Response time by client tier, matter activity aging, referral source performance, payer correspondence aging — in the format and on the schedule you will actually read.',
      },
      {
        id: 'cb-industry',
        name: 'Industry configuration',
        tier: 'custom',
        short: 'Tuned to your practice type rather than to businesses in general.',
        detail: 'The pre-built vertical configuration, then tuned in discovery to your matters, your people and your thresholds.',
      },
    ],
  },
];

// Priced separately from the plan — never folded into the tier calculation,
// because doing so would imply they are included in the plan price.
export const addons = [
  {
    id: 'addon-regulated',
    name: 'Regulated Practice Layer',
    minTier: 'reserve',
    short: 'ZDR or a HIPAA-ready BAA, on Reserve and above.',
    detail: 'Zero data retention, or a signed business associate agreement for practices handling PHI. These are alternatives, not a menu — you take one path or the other.',
    art: 'addon-regulated',
  },
  {
    id: 'addon-accounts',
    name: 'Additional inbox or calendar',
    minTier: 'select',
    short: 'Beyond what the plan covers.',
    detail: 'Each plan includes a set number of accounts. Additional inboxes or calendars are available on any plan.',
    art: 'addon-accounts',
  },
  {
    id: 'addon-travel',
    name: 'Travel coordination workflows',
    minTier: 'select',
    short: 'Booking, itineraries and the rearranging when it changes.',
    detail: 'Available on any plan as an add-on rather than as part of the base build.',
    art: 'addon-travel',
  },
  {
    id: 'addon-dev',
    name: 'Additional custom development',
    minTier: 'custom',
    short: 'Beyond the bounded scope Custom Reserve includes.',
    detail: 'Custom Reserve includes a defined build scope. Work beyond it is quoted separately, so the plan price stays a plan price.',
    art: 'addon-dev',
  },
];

// Flat list, for the results panel and the tier calculation.
export const allServices = groups.flatMap((g) =>
  g.services.map((s) => ({ ...s, group: g.key, groupName: g.name }))
);

export function planFor(selectedIds) {
  const picked = allServices.filter((s) => selectedIds.includes(s.id));
  if (!picked.length) return null;
  const rank = Math.max(...picked.map((s) => TIERS[s.tier].rank));
  return Object.values(TIERS).find((t) => t.rank === rank);
}
