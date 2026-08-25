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
            form.reset();
          } else if (status) {
            status.textContent = data.message || 'Something went wrong. Please email questions@loquelogic.com.';
            status.className = 'form-status err show';
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
