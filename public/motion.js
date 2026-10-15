/* Progressive enhancement: content is readable before JS and after cleanup. */
window.createValkiriaMotion = function createValkiriaMotion() {
  const query = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const button = document.getElementById('motion');
  const listeners = new Set();
  const running = new Set();
  const seen = new WeakSet();
  const watched = new Map();
  let userPaused = false;
  let destroyed = false;
  const paused = () => userPaused || query.matches;

  function settle() {
    for (const animation of running) animation.cancel();
    running.clear();
  }
  function sync() {
    document.body.classList.toggle('motion-paused', paused());
    button.disabled = query.matches;
    button.setAttribute('aria-pressed', String(paused()));
    button.textContent = query.matches ? 'Movimiento reducido' : paused() ? 'Activar movimiento' : 'Pausar movimiento';
    button.setAttribute('aria-label', button.textContent);
    button.title = button.textContent;
    if (paused()) settle();
    listeners.forEach(fn => fn());
  }
  button.hidden = false;
  button.addEventListener('click', () => { userPaused = !userPaused; sync(); }, { signal: events.signal });
  query.addEventListener('change', sync, { signal: events.signal });
  document.addEventListener('visibilitychange', () => {
    for (const animation of running) {
      if (document.hidden) animation.pause();
      else if (!paused()) animation.play();
    }
    listeners.forEach(fn => fn());
  }, { signal: events.signal });

  const frames = {
    up: [{ opacity: 0, transform: 'translateY(64px)' }, { opacity: 1, transform: 'translateY(0)' }],
    left: [{ opacity: 0, transform: 'translateX(-100px)' }, { opacity: 1, transform: 'translateX(0)' }],
    right: [{ opacity: 0, transform: 'translateX(100px)' }, { opacity: 1, transform: 'translateX(0)' }],
    line: [{ opacity: 0.2, transform: 'translateY(105%) rotate(2deg)' }, { opacity: 1, transform: 'translateY(0) rotate(0)' }],
    image: [{ opacity: 0.2, clipPath: 'inset(0 65% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0)' }],
  };
  function cardFrames(el) {
    const siblings = [...el.parentElement.children];
    const sign = siblings.indexOf(el) % 2 ? 1 : -1;
    const distance = innerWidth <= 650 ? 64 : 110;
    return [
      { opacity: 0, transform: `translate(${sign * distance}px, 90px) rotate(${sign * 4}deg) scale(.91)` },
      { opacity: 1, transform: 'translate(0, 0) rotate(0deg) scale(1)' },
    ];
  }
  function reveal(el, kind = 'up', delay = 0) {
    if (seen.has(el) || destroyed) return;
    seen.add(el);
    el.dataset.revealed = 'true';
    if (paused() || !el.animate || document.hidden || el.matches(':focus-within')) return;
    if (kind === 'card') {
      // Recalculate the row at entry so resizing before scrolling keeps the sequence correct.
      const row = [...el.parentElement.children].filter(sibling => Math.abs(sibling.offsetTop - el.offsetTop) < 8);
      delay = Math.min(row.indexOf(el) * 160, 480);
    }
    const animation = el.animate(kind === 'card' ? cardFrames(el) : frames[kind], {
      duration: kind === 'card' ? 1050 : kind === 'image' ? 1100 : kind === 'line' ? 900 : 850,
      delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards',
    });
    running.add(animation);
    animation.finished.catch(() => {}).finally(() => { running.delete(animation); animation.cancel(); });
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const { kind, delay } = watched.get(entry.target);
      reveal(entry.target, kind, delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }) : null;

  function watch(el, kind = 'up', delay = 0) {
    if (!el || watched.has(el)) return;
    watched.set(el, { kind, delay });
    el.dataset.motion = kind;
    if (observer) observer.observe(el);
    else reveal(el, kind, delay);
  }
  document.querySelectorAll('.hero-line > span').forEach((el, i) => reveal(el, 'line', i * 150));
  document.querySelectorAll('.gallery-heading h2, #planes > h2').forEach(el => watch(el, 'left'));
  document.querySelectorAll('.gallery-heading > p, .gallery-heading > a').forEach(el => watch(el, 'right', 80));
  document.querySelectorAll('.split').forEach(split => {
    watch(split.children[0], 'left');
    watch(split.children[1], 'right', 100);
  });
  document.querySelectorAll('.cards, .plan-options').forEach(grid => {
    [...grid.children].forEach(el => watch(el, 'card'));
  });
  document.querySelectorAll('.facilities .carousel').forEach(el => watch(el, 'image'));
  document.querySelectorAll('.quote-lines > *').forEach((el, i) => watch(el, 'up', i * 110));
  document.querySelectorAll('.manifesto .motion-word').forEach((el, i) => watch(el, 'up', i * 55));
  watch(document.querySelector('.booking > div'), 'left');
  watch(document.querySelector('.booking form'), 'right', 100);
  document.addEventListener('focusin', e => {
    // Keyboard focus never lands on an element in a delayed entrance.
    for (const animation of running) {
      const el = animation.effect?.target;
      if (el?.contains(e.target)) animation.cancel();
    }
  }, { signal: events.signal });
  sync();
  return {
    get paused() { return paused(); },
    get reduced() { return query.matches; },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    destroy() {
      destroyed = true;
      events.abort();
      observer?.disconnect();
      settle();
      listeners.clear();
      document.body.classList.remove('motion-paused', 'page-background');
      button.hidden = true;
    },
  };
};
