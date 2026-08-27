  // year
  document.getElementById('yr').textContent = new Date().getFullYear();

  // mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks){
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.textContent = open ? '✕' : '≡';
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    });
    // close menu when a link is tapped
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navLinks.removeAttribute('style'); // clear any leftover inline display
        menuBtn.textContent = '≡';
        menuBtn.setAttribute('aria-label', 'Menu');
      });
    });
  }

  // nav border on scroll
  const head = document.querySelector('header');
  addEventListener('scroll', () => head.classList.toggle('scrolled', scrollY > 12));

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, { threshold:.14 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // card pointer glow
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left)/r.width*100) + '%');
    });
  });

  // fire reveals already in view on load
  addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
  });

  // hero cursor-reactive glow
  const hero = document.querySelector('.hero');
  const heroCursor = document.getElementById('heroCursor');
  if (hero && heroCursor){
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      heroCursor.style.left = ((e.clientX - r.left)/r.width*100) + '%';
      heroCursor.style.top  = ((e.clientY - r.top)/r.height*100) + '%';
    });
  }

  // hero demo card 3D tilt + glow
  const demoCard = document.getElementById('demoCard');
  if (demoCard){
    const demo = document.getElementById('demo');
    demo.addEventListener('pointermove', e => {
      const r = demoCard.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width, py = (e.clientY - r.top)/r.height;
      demoCard.style.transform = `rotateY(${(px-.5)*10}deg) rotateX(${(.5-py)*10}deg)`;
      demoCard.style.setProperty('--gx', (px*100)+'%');
      demoCard.style.setProperty('--gy', (py*100)+'%');
    });
    demo.addEventListener('pointerleave', () => { demoCard.style.transform = ''; });
  }

  // hero triage demo — mail in, classified, drafted, waiting on you
  (function triage(){
    const from   = document.getElementById('demoFrom');
    const subj   = document.getElementById('demoSubj');
    const tags   = document.getElementById('demoTags');
    const draft  = document.getElementById('demoDraft');
    const dtext  = document.getElementById('demoDraftText');
    const rule   = document.getElementById('demoRule');
    const prog   = document.getElementById('demoProg');
    if (!subj || !dtext) return;

    const caret  = '<span class="caret"></span>';
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

    const DEFAULT_CYCLES = [
      {
        from:'Opposing counsel · Matter 2291',
        subject:'Re: Motion to compel — response due Thursday',
        tags:[{t:'Matter 2291'},{t:'Filing deadline',hot:true},{t:'Escalate now',hot:true}],
        rule:'a filing deadline',
        draft:'Counsel — confirming receipt. Our response will be filed by <b>Thursday</b> as scheduled. I have held Wednesday afternoon to review the draft with the team; if anything changes on your end before then, let me know.'
      },
      {
        from:'Meridian Health · prior authorization',
        subject:'Denial notice — auth #4471, records attached',
        tags:[{t:'Payer'},{t:'PHI detected',hot:true},{t:'Route to billing'}],
        rule:'protected health information',
        draft:'Following up on the denial for auth #4471. The clinical documentation supporting medical necessity was submitted on the 14th and is attached again here. Please confirm the <b>appeal window</b> and whether anything further is required.'
      },
      {
        from:'Dana Ortiz · board chair',
        subject:'Can we move Thursday’s board call to Friday?',
        tags:[{t:'VIP',hot:true},{t:'Calendar conflict'},{t:'Action required'}],
        rule:'a VIP scheduling request',
        draft:'Dana — Friday works. I have <b>10:30am and 2pm</b> open; 2pm keeps the morning clear for the audit review. Both are held on my end and I will release whichever you don’t take.'
      }
    ];

    // pages may define window.TRIAGE_CYCLES to tell a vertical-specific story
    const cycles = (window.TRIAGE_CYCLES && window.TRIAGE_CYCLES.length) ? window.TRIAGE_CYCLES : DEFAULT_CYCLES;

    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let i = 0;

    async function typeSubject(s){
      for (let n=0; n<=s.length; n++){ subj.innerHTML = s.slice(0,n) + caret; await sleep(reduce?0:46); }
    }
    function setProg(idx){
      [...prog.children].forEach((d,n) => d.classList.toggle('on', n===idx));
    }
    function buildTags(list){
      tags.innerHTML = '';
      return list.map(spec => {
        const el = document.createElement('span');
        el.className = 'demo-tag' + (spec.hot ? ' hot' : '');
        el.textContent = spec.t;
        tags.appendChild(el);
        return el;
      });
    }

    async function run(){
      while (true){
        const c = cycles[i];
        setProg(i);

        // reset
        draft.style.transition = 'none';
        draft.style.opacity = 0;
        draft.style.transform = 'translateZ(20px) translateY(8px)';
        dtext.innerHTML = '';
        from.textContent = c.from;
        rule.textContent = c.rule;
        subj.innerHTML = caret;
        const chips = buildTags(c.tags);
        await sleep(reduce?200:700);

        // the mail lands
        await typeSubject(c.subject);
        subj.innerHTML = c.subject; // drop caret while it classifies
        await sleep(reduce?120:520);

        // it gets classified
        for (const chip of chips){ chip.classList.add('in'); await sleep(reduce?0:200); }
        await sleep(reduce?120:620);

        // it gets drafted
        draft.style.transition = 'opacity .7s var(--ease), transform .7s var(--ease)';
        draft.style.opacity = 1;
        draft.style.transform = 'translateZ(20px)';
        if (reduce){
          dtext.innerHTML = c.draft;
        } else {
          const tokens = c.draft.split(/(<b>|<\/b>| )/).filter(Boolean);
          let built = '';
          for (const t of tokens){ built += t; dtext.innerHTML = built; await sleep(48); }
        }

        // and then it waits for you
        await sleep(reduce?1400:5000);
        i = (i+1) % cycles.length;
      }
    }
    run();
  })();

  // ---------------------------------------------------------------------
  // form instrumentation — WEBSITE_PROCESS.md Phase 9, ADR-W08.
  // Every form carries where the visitor entered, which vertical page they
  // are on, where they came from, and which rung of the ladder they reached.
  // Filled at load rather than at submit, so it does not depend on listener
  // order with the AJAX handler below.
  // ---------------------------------------------------------------------
  function loqueSession(){
    var s = {};
    try {
      var q = new URLSearchParams(location.search);
      var src = q.get('src') || q.get('utm_source') || '';
      if (!src && document.referrer) {
        try {
          var h = new URL(document.referrer).hostname;
          src = (h && h !== location.hostname) ? h : '';
        } catch (e) {}
      }
      s.source = sessionStorage.getItem('loque_source') || src || 'direct';
      s.landed = sessionStorage.getItem('loque_landed') || location.pathname;
      s.campaign = sessionStorage.getItem('loque_campaign') || q.get('utm_campaign') || '';
      var bodyVert = document.body && document.body.getAttribute('data-vertical');
      if (bodyVert) sessionStorage.setItem('loque_vertical', bodyVert);
      s.vertical = bodyVert || sessionStorage.getItem('loque_vertical') || '';
      sessionStorage.setItem('loque_source', s.source);
      sessionStorage.setItem('loque_landed', s.landed);
      if (s.campaign) sessionStorage.setItem('loque_campaign', s.campaign);
    } catch (e) {
      // private mode, blocked storage — fall back to this pageview only
      s.source = s.source || 'direct';
      s.landed = s.landed || location.pathname;
      s.campaign = s.campaign || '';
      s.vertical = (document.body && document.body.getAttribute('data-vertical')) || '';
    }
    return s;
  }

  window.loqueFormMeta = function (form) {
    var s = loqueSession();
    var body = document.body;
    var existing = form.querySelector('input[name="vertical"]');
    return {
      page: (body && body.getAttribute('data-page')) || location.pathname,
      vertical: (existing && existing.value) || s.vertical ||
                (body && body.getAttribute('data-vertical')) || '',
      source: s.source,
      landed_on: s.landed,
      campaign: s.campaign,
      rung: form.classList.contains('magnet-req') ? 'resource' : 'call'
    };
  };

  (function stampForms(){
    document.querySelectorAll('form[data-ajax]').forEach(function (form) {
      var meta = window.loqueFormMeta(form);
      Object.keys(meta).forEach(function (k) {
        if (!meta[k]) return;
        var input = form.querySelector('input[name="' + k + '"]');
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = k;
          form.appendChild(input);
        }
        input.value = meta[k];
      });
    });
  })();

  // forms — Web3Forms AJAX submit with inline status.
  // Binds every form[data-ajax], so the contact form and the lead-magnet
  // forms on the vertical pages all behave the same way.
  (function ajaxForms(){
    document.querySelectorAll('form[data-ajax]').forEach(form => {
      const status = form.querySelector('.form-status');
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const btnText = btn.textContent;
      const done = form.getAttribute('data-success') ||
                   "Thanks — that's in. We'll be in touch within one business day.";

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (status) status.className = 'form-status';
        btn.disabled = true;
        btn.textContent = 'Sending…';

        try {
          const res = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
          });
          const data = await res.json();
          if (res.ok && data.success){
            if (status){ status.textContent = done; status.className = 'form-status ok show'; }
            var m = window.loqueFormMeta ? window.loqueFormMeta(form) : {};
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'loque_form_submit',
              form_rung: m.rung, form_vertical: m.vertical,
              form_page: m.page, form_source: m.source, form_landed_on: m.landed_on
            });
            form.reset();
          } else if (status) {
            status.textContent = data.message || 'Something went wrong. Please email questions@loquelogic.com.';
            status.className = 'form-status err show';
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'loque_form_error', form_page: location.pathname });
          }
        } catch (err) {
          if (status){
            status.textContent = 'Network error — please try again or email questions@loquelogic.com.';
            status.className = 'form-status err show';
          }
        } finally {
          btn.disabled = false;
          btn.textContent = btnText;
        }
      });
    });
  })();

  // nav dropdown — CSS handles hover and keyboard focus on desktop; this adds
  // click support for touch, and closes on outside click / Escape
  (function navDrop(){
    const toggles = document.querySelectorAll('.drop-toggle');
    if (!toggles.length) return;
    const isStacked = () => matchMedia('(max-width:860px)').matches;

    function close(t){
      const d = document.getElementById(t.getAttribute('aria-controls'));
      if (d) d.classList.remove('open');
      t.setAttribute('aria-expanded','false');
    }
    toggles.forEach(t => {
      t.addEventListener('click', e => {
        if (isStacked()) return;            // stacked menu shows the links already
        e.preventDefault(); e.stopPropagation();
        const d = document.getElementById(t.getAttribute('aria-controls'));
        if (!d) return;
        const open = d.classList.toggle('open');
        t.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.addEventListener('click', e => {
      toggles.forEach(t => { if (!t.closest('.has-drop').contains(e.target)) close(t); });
    });
    addEventListener('keydown', e => {
      if (e.key === 'Escape') toggles.forEach(close);
    });
  })();

/* ---------------------------------------------------------------------------
   /build — the assistant builder (Phase 8).

   Rule: the plan you need is the highest tier among the things you picked.
   Add-ons never move the tier — they are priced on top of the plan, and
   folding them in would imply they are included in the plan price.

   The tier data is written onto each input as data-tier by build.astro, which
   reads it from services.js, which transcribes the /plans matrix. There is no
   second copy of the mapping here on purpose.
--------------------------------------------------------------------------- */
(function () {
  var form = document.getElementById('builder');
  if (!form) return;

  var RANK  = { select: 1, reserve: 2, custom: 3 };
  var LABEL = { select: 'Select', reserve: 'Reserve', custom: 'Custom Reserve' };
  var BLURB = {
    select:  'Know what matters. One inbox, sorted and summarised, with a daily digest.',
    reserve: 'Act on what matters. Everything in Select, plus drafting in your voice, scheduling and the Handwritten Layer.',
    custom:  'Nothing falls through. Everything in Reserve, plus a documented map of your operation and workflows built around it.'
  };
  var KEY = 'loque_build_v1';

  var grid   = document.getElementById('resultGrid');
  var cols   = document.getElementById('resultCols');
  var title  = document.getElementById('resultTitle');
  var lede   = document.getElementById('resultLede');
  var planEl = document.getElementById('resultPlan');
  var whyEl  = document.getElementById('resultWhy');
  var cta    = document.getElementById('resultCta');

  var bar = document.createElement('div');
  bar.className = 'build-bar';
  bar.innerHTML = '<span class="bb-n"></span><span class="bb-p"></span>' +
                  '<a href="#result" class="btn btn-primary">See your plan</a>';
  document.body.appendChild(bar);

  function inputs() {
    return Array.prototype.slice.call(form.querySelectorAll('input[type=checkbox]'));
  }
  function picked() {
    return inputs().filter(function (i) { return i.checked; });
  }

  function render() {
    var all = picked();
    var svc = all.filter(function (i) { return i.name === 'service'; });
    var add = all.filter(function (i) { return i.name === 'addon'; });

    save(all);

    markPresets();

    if (!svc.length && !add.length) {
      grid.hidden = true;
      title.textContent = 'Nothing picked yet.';
      lede.textContent  = 'Tick anything above and the plan that covers it appears here.';
      bar.classList.remove('in');
      return;
    }

    var rank = svc.reduce(function (m, i) {
      return Math.max(m, RANK[i.dataset.tier] || 0);
    }, 0);
    var tier = Object.keys(RANK).filter(function (k) { return RANK[k] === rank; })[0];

    // Group the picks by the tier that introduces them.
    var byTier = { select: [], reserve: [], custom: [] };
    svc.forEach(function (i) { byTier[i.dataset.tier].push(i); });

    cols.innerHTML = ['select', 'reserve', 'custom'].map(function (t) {
      if (!byTier[t].length) return '';
      return '<div class="result-col"><h4>' + LABEL[t] + ' &mdash; ' + byTier[t].length + '</h4><ul>' +
        byTier[t].map(function (i) {
          return '<li><b>' + esc(i.dataset.name) + '</b>' +
                 '<button type="button" class="result-drop" data-drop="' + i.value +
                 '" aria-label="Remove ' + esc(i.dataset.name) + '">&times;</button></li>';
        }).join('') + '</ul></div>';
    }).join('') + (add.length ? addonCol(add) : '');

    grid.hidden = false;
    title.textContent = tier ? 'You need ' + LABEL[tier] + '.' : 'Add-ons only.';
    lede.textContent  = tier ? BLURB[tier]
      : 'Add-ons sit on top of a plan. Pick at least one service above and we can tell you which.';

    planEl.innerHTML = '<div class="rp-k">Recommended plan</div>' +
      '<div class="rp-v">' + (tier ? LABEL[tier] : '&mdash;') + '</div>' +
      '<div class="rp-p">' + svc.length + ' service' + (svc.length === 1 ? '' : 's') +
      (add.length ? ' &middot; ' + add.length + ' add-on' + (add.length === 1 ? '' : 's') : '') +
      ' &middot; <a href="/pricing">see the price</a></div>';

    // The useful part: which specific picks are holding the tier up, so
    // "de-select to change the plan" is an informed choice rather than a hunt.
    whyEl.innerHTML = tier && byTier[tier].length
      ? '<b>Why ' + LABEL[tier] + ':</b> ' +
        listify(byTier[tier].map(function (i) { return esc(i.dataset.name); })) +
        (tier !== 'select'
          ? ' ' + (byTier[tier].length === 1 ? 'is' : 'are') +
            ' only in ' + LABEL[tier] + '. Remove ' +
            (byTier[tier].length === 1 ? 'it' : 'them') + ' and you drop a plan.'
          : ' — all of it is in the entry plan.')
      : '';

    if (cta) cta.href = '/book?plan=' + (tier || 'addons') + '&n=' + svc.length;

    bar.querySelector('.bb-n').textContent =
      svc.length + ' picked' + (add.length ? ' + ' + add.length : '');
    bar.querySelector('.bb-p').textContent = tier ? LABEL[tier] : '';
    bar.classList.add('in');
  }

  function addonCol(add) {
    return '<div class="result-col"><h4>Add-ons &mdash; ' + add.length +
      ' <span style="text-transform:none;letter-spacing:0;font-weight:400">(priced separately)</span></h4><ul>' +
      add.map(function (i) {
        return '<li><b>' + esc(i.dataset.name) + '</b>' +
               '<button type="button" class="result-drop" data-drop="' + i.value +
               '" aria-label="Remove ' + esc(i.dataset.name) + '">&times;</button></li>';
      }).join('') + '</ul></div>';
  }

  function listify(a) {
    if (a.length === 1) return '<b>' + a[0] + '</b>';
    if (a.length === 2) return '<b>' + a[0] + '</b> and <b>' + a[1] + '</b>';
    return '<b>' + a.slice(0, -1).join('</b>, <b>') + '</b> and <b>' + a[a.length - 1] + '</b>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function save(all) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(all.map(function (i) { return i.value; })));
    } catch (e) { /* private mode — the page still works, it just won't persist */ }
  }
  function restore() {
    var raw;
    try { raw = sessionStorage.getItem(KEY); } catch (e) { return; }
    if (!raw) return;
    try {
      var ids = JSON.parse(raw);
      inputs().forEach(function (i) { if (ids.indexOf(i.value) > -1) i.checked = true; });
    } catch (e) { /* corrupt value — ignore and start clean */ }
  }

  // --- presets -------------------------------------------------------
  // Cumulative, matching how the plans nest: Reserve ticks everything in
  // Select too. Add-ons are deliberately untouched — they are priced on top
  // of a plan, so a plan preset has nothing to say about them.
  var presets = Array.prototype.slice.call(document.querySelectorAll('.preset-btn'));

  function applyPreset(key) {
    inputs().forEach(function (i) {
      if (i.name !== 'service') return;
      i.checked = RANK[i.dataset.tier] <= RANK[key];
    });
    render();
  }

  function markPresets() {
    var on = picked().filter(function (i) { return i.name === 'service'; })
                     .map(function (i) { return i.value; }).sort().join('|');
    document.querySelectorAll('.preset').forEach(function (card) {
      var key = card.dataset.preset;
      var want = inputs().filter(function (i) {
        return i.name === 'service' && RANK[i.dataset.tier] <= RANK[key];
      }).map(function (i) { return i.value; }).sort().join('|');
      card.classList.toggle('is-on', on !== '' && on === want);
    });
  }

  presets.forEach(function (b) {
    b.addEventListener('click', function () { applyPreset(b.dataset.preset); });
  });

  // Some add-ons are alternatives rather than a menu. The three Regulated
  // Practice Layer paths are the case that matters: a HIPAA-ready BAA
  // requires retaining data for a defined window, so it cannot coexist with
  // zero data retention (ADR-P07). Presenting them as alternatives is not
  // enough if the UI lets you tick two, so ticking one clears its siblings.
  form.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.checked && t.dataset.exclusive) {
      inputs().forEach(function (i) {
        if (i !== t && i.dataset.exclusive === t.dataset.exclusive) i.checked = false;
      });
    }
    render();
  });

  document.addEventListener('click', function (e) {
    var drop = e.target.closest('[data-drop]');
    if (drop) {
      var box = form.querySelector('input[value="' + drop.dataset.drop + '"]');
      if (box) { box.checked = false; render(); }
      return;
    }
    if (e.target.id === 'resultClear') {
      inputs().forEach(function (i) { i.checked = false; });
      render();
      document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
    }
  });

  restore();
  render();
})();

/* Carry a /build selection into the booking form, so the enquiry says what
   they picked rather than arriving as an unexplained call request. */
(function () {
  var f = document.querySelector('form[data-ajax]');
  if (!f || !/\/book/.test(location.pathname)) return;
  var raw;
  try { raw = sessionStorage.getItem('loque_build_v1'); } catch (e) { return; }
  if (!raw) return;
  var ids;
  try { ids = JSON.parse(raw); } catch (e) { return; }
  if (!ids || !ids.length) return;

  var plan = new URLSearchParams(location.search).get('plan') || '';
  [['built_plan', plan], ['built_services', ids.join(', ')]].forEach(function (pair) {
    var h = document.createElement('input');
    h.type = 'hidden'; h.name = pair[0]; h.value = pair[1];
    f.appendChild(h);
  });
})();
