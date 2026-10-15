/* Scroll follows the visitor: native scrolling, no wheel interception or continuous JS loop. */
window.initValkiriaCinematic = function initValkiriaCinematic(motion) {
  const hero = document.querySelector('.hero-cinematic');
  const photograph = hero.querySelector('.hero-photograph');
  const photo = photograph.querySelector('img');
  const story = document.querySelector('.motion-story');
  const cards = [...story.querySelectorAll('.story-photo')];
  const lines = [...story.querySelectorAll('.story-line')];
  const progress = story.querySelector('.story-progress > span');
  const events = new AbortController();
  let frame = 0, disposed = false, heroVisible = false, storyVisible = false;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const on = (target, name, fn) => target.addEventListener(name, fn, { passive: true, signal: events.signal });
  const breathing = photo.animate?.([
    { transform: 'scale(1.04) translateX(0)' },
    { transform: 'scale(1.12) translateX(-1.5%)' },
  ], { duration: 18000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
  breathing?.pause();
  story.classList.add('story-enhanced');
  hero.dataset.scene = 'photographic';

  function renderStory() {
    const rect = story.getBoundingClientRect();
    const p = clamp(-rect.top / Math.max(1, rect.height - innerHeight));
    story.style.setProperty('--story-progress', p.toFixed(4));
    // A compact stack opens into three large photographs, then makes room for the final phrase.
    const open = clamp(p / .55);
    const exit = clamp((p - .62) / .38);
    const mobile = innerWidth <= 650;
    cards.forEach((card, index) => {
      const side = index - 1;
      const spread = (mobile ? 42 : 54) + open * (mobile ? 38 : 48) + exit * 26;
      const x = side * spread;
      const y = side ? 8 - open * 13 + exit * 8 : -5 + exit * 10;
      const rotate = side * (14 - open * 9 + exit * 5);
      const scale = .86 + open * .14 - exit * .08;
      card.style.transform = `translate(${x}%, ${y}%) rotate(${rotate}deg) scale(${scale})`;
    });
    const phase = clamp((p - .08) / .72) * 2;
    lines.forEach((line, index) => {
      const distance = index - phase;
      const opacity = clamp(1 - Math.abs(distance) * 1.7);
      line.style.opacity = opacity.toFixed(3);
      line.style.transform = `translateY(${clamp(distance, -1, 1) * 80}px) scale(${1 - Math.abs(clamp(distance, -1, 1)) * .05})`;
    });
    progress.style.transform = `scaleX(${p})`;
  }
  function render() {
    frame = 0;
    if (disposed || motion.paused || document.hidden) return;
    if (heroVisible) {
      const p = clamp(-hero.getBoundingClientRect().top / hero.offsetHeight);
      photograph.style.transform = `translateY(${p * 70}px)`;
    }
    if (storyVisible) renderStory();
  }
  function schedule() {
    if (!frame && !disposed && !motion.paused && !document.hidden && (heroVisible || storyVisible)) frame = requestAnimationFrame(render);
  }
  function sync() {
    cancelAnimationFrame(frame); frame = 0;
    if (motion.paused || !heroVisible || document.hidden) breathing?.pause();
    else breathing?.play();
    if (motion.reduced) {
      photograph.style.transform = '';
      breathing?.cancel();
    }
    schedule();
  }
  const visibility = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target === hero) heroVisible = entry.isIntersecting;
      if (entry.target === story) storyVisible = entry.isIntersecting;
    }
    sync();
  });
  visibility.observe(hero); visibility.observe(story);
  const resize = new ResizeObserver(schedule);
  resize.observe(story); resize.observe(hero);
  on(window, 'scroll', schedule);
  on(window, 'resize', schedule);
  on(document, 'visibilitychange', sync);
  const unsubscribe = motion.subscribe(sync);
  sync();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame); events.abort(); visibility.disconnect(); resize.disconnect(); unsubscribe(); breathing?.cancel();
    photograph.style.transform = '';
    story.classList.remove('story-enhanced'); story.style.removeProperty('--story-progress');
    cards.forEach(card => { card.style.transform = ''; });
    lines.forEach(line => { line.style.transform = ''; line.style.opacity = ''; });
    progress.style.transform = '';
  };
};
