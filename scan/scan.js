// Puff scan page interactions
const sfx = document.getElementById('puff-sfx');
const tapZone = document.querySelector('.tap-zone');

// Inject starfield once
if (!document.querySelector('.starfield')) {
  const star = document.createElement('div');
  star.className = 'starfield';
  document.body.appendChild(star);
}

// Cache brand colours once
const rootStyles = getComputedStyle(document.documentElement);
const BRAND_COLOURS = [
  rootStyles.getPropertyValue('--white').trim(),
  rootStyles.getPropertyValue('--orange').trim(),
  rootStyles.getPropertyValue('--orange-hi').trim(),
  rootStyles.getPropertyValue('--gold').trim(),
  rootStyles.getPropertyValue('--solanaL').trim(),
];

// Spawn a puff particle with brand colour
function spawnPuff(x, y) {
  const p = document.createElement('div');
  p.className = 'puff';

  const size = 10 + Math.random() * 18;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${x}px`;
  p.style.top  = `${y}px`;

  const c = BRAND_COLOURS[(Math.random() * BRAND_COLOURS.length) | 0];
  p.style.background = `radial-gradient(circle at 30% 30%, ${c}, ${c} 60%, rgba(255,255,255,0) 70%)`;

  document.body.appendChild(p);
  p.addEventListener('animationend', () => p.remove(), { once: true });
}

// Play puff sound (safe unlock on first gesture)
function playSfx() {
  if (!sfx) return;
  try {
    sfx.currentTime = 0;
    sfx.volume = 0.6;
    sfx.play();
  } catch (_) { /* autoplay restrictions */ }
}

// Optional: light haptics on mobile
function vibrate(ms = 15) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

// ---- Tap zone interactions ----
if (tapZone) {
  tapZone.addEventListener('pointerdown', (e) => {
    const rect = tapZone.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;

    // Respect reduced motion: fewer particles
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bursts = prefersReduced ? 4 : 10;

    // Burst from center + tap point
    for (let i = 0; i < bursts; i++) {
      const jitterX = cx + (Math.random() - 0.5) * rect.width * 0.5;
      const jitterY = cy + (Math.random() - 0.2) * rect.height * 0.4;
      spawnPuff(jitterX, jitterY);
    }
    spawnPuff(e.clientX, e.clientY);

    playSfx();
    vibrate();
  }, { passive: true });

  // Fun label swap
  tapZone.addEventListener('pointerdown', () => {
    const t = document.querySelector('.tap-text');
    if (!t) return;
    t.textContent = '💨 Pump the Puff!';
    setTimeout(() => (t.textContent = 'Tap to Puff'), 900);
  }, { passive: true });
}

// ---- Mascot intro fade-out ----
const mascotOverlay = document.querySelector('.mascot-overlay');

if (mascotOverlay) {
  // Prevent the dismiss click from triggering underlying handlers
  mascotOverlay.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    mascotOverlay.classList.add('fade-out');
    // Also unlock audio on first gesture if desired
    playSfx();
    setTimeout(() => mascotOverlay.remove(), 1200);
  }, { once: true });

  (Optional) auto-dismiss after 3s if no interaction:
   setTimeout(() => {
     if (document.body.contains(mascotOverlay)) {
       mascotOverlay.classList.add('fade-out');
      setTimeout(() => mascotOverlay.remove(), 1200);
     }
   }, 3000);
}
