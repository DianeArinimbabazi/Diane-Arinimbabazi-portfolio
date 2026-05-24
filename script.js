/* ============================================================
   DIANE ARINIMBABAZI — PORTFOLIO JAVASCRIPT
   - Dark / Light mode toggle (localStorage)
   - Mobile nav toggle
   - Scroll reveal (IntersectionObserver)
   - Skill bar animation on scroll
   - Blog category filter
   - Modal open / close (click + Escape key)
   - Contact form validation
   - AI recommendation engine
   ============================================================ */

/* DARK MODE */
const darkToggle = document.getElementById('dark-toggle');

function applyDark(on) {
  document.body.classList.toggle('dark', on);
  darkToggle.textContent = on ? '☀' : '☾';
  localStorage.setItem('dark', on);
}

applyDark(localStorage.getItem('dark') === 'true');
darkToggle.addEventListener('click', () => applyDark(!document.body.classList.contains('dark')));


/* MOBILE NAV */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* CV PRINT */
function printCv() {
  window.print();
}


/* SCROLL REVEAL */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* SKILL BAR ANIMATION */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width || '80%';
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.bar').forEach(bar => barObs.observe(bar));


/* BLOG FILTER */
function filterBlog(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.blog-card').forEach(card => {
    card.style.display = (category === 'all' || card.dataset.cat === category) ? '' : 'none';
  });
}


/* MODALS */
function openModal(id) {
  document.getElementById('modal-' + id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById('modal-' + id).classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(o => {
      o.classList.remove('open'); document.body.style.overflow = '';
    });
  }
});


/* CONTACT FORM VALIDATION */
function submitForm() {
  const name    = document.getElementById('f-name');
  const email   = document.getElementById('f-email');
  const message = document.getElementById('f-message');

  document.querySelectorAll('.form-error').forEach(e => e.style.display = 'none');
  document.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));

  let ok = true;

  if (!name.value.trim()) {
    name.classList.add('error');
    document.getElementById('err-name').style.display = 'block';
    ok = false;
  }
  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    email.classList.add('error');
    document.getElementById('err-email').style.display = 'block';
    ok = false;
  }
  if (!message.value.trim()) {
    message.classList.add('error');
    document.getElementById('err-message').style.display = 'block';
    ok = false;
  }

  if (ok) {
    document.getElementById('contact-form-inner').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }
}


/* AI RECOMMENDATION ENGINE */
const skillMap = {
  ict:      ['ICT support', 'system maintenance', 'troubleshooting', 'office technology operations'],
  data:     ['data entry', 'data handling', 'MS Excel', 'statistical analysis', 'reporting'],
  business: ['business information systems', 'project management', 'business process improvement', 'financial modeling'],
  network:  ['basic networking', 'cyber security fundamentals', 'cloud computing'],
  soft:     ['communication', 'teamwork', 'customer service', 'problem-solving', 'adaptability'],
};

function getAiRecommendation() {
  const input   = document.getElementById('ai-input').value.toLowerCase().trim();
  const loading = document.getElementById('ai-loading');
  const result  = document.getElementById('ai-result');

  if (!input) { alert('Please describe your project or role first.'); return; }

  loading.style.display = 'block';
  result.style.display  = 'none';

  setTimeout(() => {
    const matched = [];

    if (/ict|support|technical|computer|hardware|software|troubleshoot|helpdesk/.test(input))
      matched.push(...skillMap.ict);
    if (/data|excel|report|analysis|entry|statistics|spreadsheet|database/.test(input))
      matched.push(...skillMap.data);
    if (/business|project|management|process|system|organisation|organization|efficiency/.test(input))
      matched.push(...skillMap.business);
    if (/network|security|cloud|cyber|server|infrastructure/.test(input))
      matched.push(...skillMap.network);

    if (!matched.length) matched.push(...skillMap.soft);

    const unique = [...new Set(matched)].slice(0, 5);

    loading.style.display = 'none';
    result.innerHTML = `
      <strong>Recommended match for your needs:</strong><br><br>
      Based on your description, Diane's strongest relevant skills are:
      <strong>${unique.join(', ')}</strong>.<br><br>
      With her Bachelor of Business Information Technology (University of Rwanda),
      hands-on internship at Nova Services Ltd, and current role at MTN Rwanda,
      she can contribute meaningfully from day one.
      <br><br>
      <a href="#contact">Get in touch →</a>
    `;
    result.style.display = 'block';
  }, 1300);
}

document.getElementById('ai-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') getAiRecommendation();
});
