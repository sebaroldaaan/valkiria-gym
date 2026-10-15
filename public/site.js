window.initValkiriaSite = function initValkiriaSite(motion) {
  const events = new AbortController();
  const cleanups = [];
  const on = (target, type, fn, options = {}) => target.addEventListener(type, fn, { ...options, signal: events.signal });
  const wa = text => 'https://wa.me/5491172357022?text=' + encodeURIComponent(text);
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = wa(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener';
  });
  const date = document.getElementById('date');
  const today = new Date();
  date.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
  on(document.getElementById('request'), 'submit', e => {
    e.preventDefault();
    let message = 'Hola Valkiria, quiero consultar sobre: ' + document.getElementById('interest').value + '.';
    if (date.value) message += ' Día preferido: ' + date.value.split('-').reverse().join('/') + '.';
    message += ' Franja: ' + document.getElementById('time').value + '.';
    const extra = document.getElementById('message').value.trim();
    if (extra) message += ' ' + extra;
    message += ' Entiendo que el turno queda sujeto a confirmación.';
    window.open(wa(message), '_blank', 'noopener');
    document.getElementById('status').textContent = 'Continuá en WhatsApp y enviá el mensaje. Tu turno todavía no está confirmado.';
  });
const content=window.VALKIRIA_CONTENT;
if(content.photos.length){const track=document.querySelector('[data-carousel="facilities"] .carousel-track');track.replaceChildren();content.photos.forEach((photo,i)=>{const slide=document.createElement('figure');slide.className='gallery-slide';slide.setAttribute('role','group');slide.setAttribute('aria-roledescription','diapositiva');slide.setAttribute('aria-label',`${i+1} de ${content.photos.length}`);const img=document.createElement('img');img.src=photo.src;img.alt=photo.alt;img.width=photo.width;img.height=photo.height;slide.style.setProperty('--photo-ratio',`${photo.width} / ${photo.height}`);img.loading='lazy';img.decoding='async';const caption=document.createElement('figcaption');caption.textContent=photo.caption;const source=document.createElement("a");source.href=photo.source;source.textContent="Ver en Google Maps ↗";source.target="_blank";source.rel="noopener";caption.append(document.createElement("br"),source);slide.append(img,caption);track.append(slide)})}
const reviews=content.reviews.filter(r=>r.author&&r.date&&Number.isInteger(r.rating)&&r.rating>=1&&r.rating<=5&&/^https:\/\/(www\.)?(google\.com|maps\.google\.com|maps\.app\.goo\.gl)\//.test(r.source));
if(reviews.length){const host=document.getElementById('reviews-content');host.innerHTML='<div class="carousel" data-carousel="reviews" role="region" aria-roledescription="carrusel" aria-label="Reseñas de Google Maps"><div class="carousel-track" tabindex="0" aria-label="Opiniones; usá las flechas del teclado"></div><div class="carousel-bar"><p class="carousel-position" aria-live="polite" aria-atomic="true"></p><div><button type="button" data-prev aria-label="Reseña anterior">←</button><button type="button" data-next aria-label="Reseña siguiente">→</button></div></div></div>';const track=host.querySelector('.carousel-track');reviews.forEach((r,i)=>{const card=document.createElement('article');card.className='review-card';card.setAttribute('role','group');card.setAttribute('aria-roledescription','diapositiva');card.setAttribute('aria-label',`${i+1} de ${reviews.length}`);const rating=document.createElement('p');rating.className='stars';rating.textContent='★'.repeat(r.rating)+'☆'.repeat(5-r.rating);rating.setAttribute('aria-label',`${r.rating} de 5 estrellas`);const quote=document.createElement('blockquote');quote.textContent=r.text?'“'+r.text+'”':'Valoración sin comentario escrito.';if(!r.text)quote.classList.add('rating-only');const by=document.createElement('p');by.textContent=r.author+' · '+r.date;const link=document.createElement('a');link.textContent=r.excerpt?'Leer reseña completa en Google Maps ↗':'Ver valoración en Google Maps ↗';link.href=r.source;link.target='_blank';link.rel='noopener';card.append(rating,quote);if(r.excerpt){const note=document.createElement('small');note.textContent='Fragmento de la reseña original';card.append(note)}card.append(by,link);track.append(card)})}
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    track.querySelectorAll(':scope > [aria-hidden="true"]').forEach(el => el.remove());
    const slides = [...track.children];
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    const label = carousel.querySelector('.carousel-position');
    if (slides.length < 2) return;
    let active = 0, inView = false, localPaused = false, touching = false;
    let cycle = 0, position = 0, last = 0, manualUntil = 0, frameId = 0;
    track.classList.add('continuous-track');
    const copies = slides.map(slide => {
      const clone = slide.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true'); clone.inert = true;
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      clone.querySelectorAll('a,button,input,[tabindex]').forEach(el => el.setAttribute('tabindex', '-1'));
      track.append(clone);
      return clone;
    });
    let pause = carousel.querySelector('.carousel-pause');
    if (!pause) {
      pause = document.createElement('button'); pause.type = 'button'; pause.className = 'carousel-pause';
      carousel.querySelector('.carousel-bar > div').prepend(pause);
    }
    pause.hidden = false;
    const stopped = () => localPaused || motion.paused;
    function update() {
      const x = cycle ? track.scrollLeft % cycle : track.scrollLeft;
      let distance = Infinity;
      slides.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft - slides[0].offsetLeft - x);
        if (d < distance) { distance = d; active = i; }
      });
      label.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    }
    function measure() {
      cycle = motion.reduced ? 0 : copies[0].offsetLeft - slides[0].offsetLeft;
      position = track.scrollLeft;
      update();
    }
    function sync() {
      pause.textContent = stopped() ? '▷' : 'Ⅱ';
      pause.setAttribute('aria-label', stopped() ? 'Activar desplazamiento continuo' : 'Pausar desplazamiento continuo');
      pause.setAttribute('aria-pressed', String(stopped()));
      pause.disabled = motion.paused;
      copies.forEach(c => { c.hidden = motion.reduced; });
      measure(); schedule();
    }
    function canPlay() {
      return !stopped() && !touching && inView && !document.hidden && !carousel.matches(':focus-within, :hover') && cycle > 0;
    }
    function schedule() {
      cancelAnimationFrame(frameId); frameId = 0; last = 0;
      if (canPlay()) frameId = requestAnimationFrame(frame);
    }
    function frame(now) {
      frameId = 0;
      if (!canPlay()) return;
      const dt = last ? Math.min((now - last) / 1000, .05) : 0;
      last = now;
      label.setAttribute('aria-live', 'off');
      if (now >= manualUntil) {
        position = (position + dt * 32) % cycle;
        track.scrollLeft = position;
        update();
      } else position = track.scrollLeft;
      frameId = requestAnimationFrame(frame);
    }
    function go(delta) {
      manualUntil = performance.now() + 1500;
      const i = (active + delta + slides.length) % slides.length;
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: motion.paused ? 'instant' : 'smooth' });
    }
    on(pause, 'click', () => { localPaused = !localPaused; sync(); });
    on(prev, 'click', () => go(-1));
    on(next, 'click', () => go(1));
    on(track, 'keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); go(e.key === 'ArrowRight' ? 1 : -1); }
    });
    on(track, 'scroll', () => {
      if (performance.now() < manualUntil || !canPlay()) position = track.scrollLeft;
      label.setAttribute('aria-live', canPlay() ? 'off' : 'polite'); update();
    }, { passive: true });
    on(track, 'touchstart', () => { touching = true; schedule(); }, { passive: true });
    const release = () => { touching = false; manualUntil = performance.now() + 1200; position = track.scrollLeft; schedule(); };
    on(track, 'touchend', release, { passive: true });
    on(track, 'touchcancel', release, { passive: true });
    on(track, 'wheel', () => { manualUntil = performance.now() + 1200; position = track.scrollLeft; }, { passive: true });
    on(carousel, 'mouseenter', schedule);
    on(carousel, 'mouseleave', schedule);
    on(carousel, 'focusin', schedule);
    on(carousel, 'focusout', () => queueMicrotask(schedule));
    on(document, 'visibilitychange', schedule);
    const visibility = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); });
    visibility.observe(carousel);
    const resize = new ResizeObserver(() => { measure(); schedule(); });
    resize.observe(track);
    const unsubscribe = motion.subscribe(sync);
    sync();
    cleanups.push(() => { unsubscribe(); visibility.disconnect(); resize.disconnect(); cancelAnimationFrame(frameId); copies.forEach(c => c.remove()); });
  });
  const ticker = document.querySelector('.ticker');
  const tickerButton = document.querySelector('.ticker-pause');
  let tickerPaused = false;
  function syncTicker() {
    ticker.classList.toggle('ticker-stopped', tickerPaused || motion.paused);
    tickerButton.textContent = tickerPaused ? '▷' : 'Ⅱ';
    tickerButton.setAttribute('aria-pressed', String(tickerPaused || motion.paused));
    tickerButton.setAttribute('aria-label', tickerPaused ? 'Activar cinta de palabras' : 'Pausar cinta de palabras');
    tickerButton.disabled = motion.paused;
    tickerButton.hidden = motion.reduced;
    document.body.classList.toggle('page-background', document.hidden);
  }
  on(tickerButton, 'click', () => { tickerPaused = !tickerPaused; syncTicker(); });
  const tickerVisibility = new IntersectionObserver(entries => ticker.classList.toggle('ticker-outside', !entries[0].isIntersecting));
  tickerVisibility.observe(ticker);
  cleanups.push(() => tickerVisibility.disconnect(), motion.subscribe(syncTicker));
  syncTicker();
  return () => { events.abort(); cleanups.reverse().forEach(cleanup => cleanup()); };
};
