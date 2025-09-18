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
function spawnPuff(x, y, sizeMin = 10, sizeJitter = 18) {
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

// Small burst helper around a rect center
function burstAtRectCenter(rect, count=12) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const r = Math.min(rect.width, rect.height) * (0.15 + Math.random() * 0.2);
    spawnPuff(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 12, 22);
  }
}

// Play puff sound with a touch of variety
function playSfx() {
  if (!sfx) return;
  try {
    sfx.currentTime = 0;
    sfx.volume = 0.85; // a bit louder on click
    const rate = 0.95 + Math.random() * 0.1; // slight variation
    sfx.playbackRate = rate;
    sfx.play();
  } catch (_) { /* autoplay restrictions */ }
}

// Optional: light haptics on mobile
function vibrate(ms = 20) {
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

const mascotOverlay = document.querySelector('.mascot-overlay');
const mascotImg      = mascotOverlay?.querySelector('img');

function cancel(e){
  e.preventDefault();
  e.stopPropagation();
  if (e.stopImmediatePropagation) e.stopImmediatePropagation();
}

function shieldDuringFade(ms = 1250){
  // Capture-phase shields so nothing underneath gets the same click
  const shield = (e) => cancel(e);
  document.addEventListener('pointerdown', shield, true);
  document.addEventListener('click',       shield, true);
  document.addEventListener('touchstart',  shield, true);

  setTimeout(() => {
    document.removeEventListener('pointerdown', shield, true);
    document.removeEventListener('click',       shield, true);
    document.removeEventListener('touchstart',  shield, true);
  }, ms);
}

function dismiss(){
  if (!mascotOverlay || mascotOverlay.classList.contains('fade-out')) return;

  // optional: little pop + particles + sound
  mascotImg?.classList.add('clicked');
  // ... your burstAtRectCenter(rect) + playSfx() here ...

  shieldDuringFade(1250);          // <- critical part
  mascotOverlay.classList.add('fade-out');
  mascotOverlay.addEventListener('transitionend', () => {
    mascotOverlay.remove();        // finally remove (then clicks can pass through)
  }, { once:true });
}

if (mascotOverlay){
  // Capture-phase handlers so we beat links below
  ['pointerdown','click','touchstart'].forEach(type => {
    mascotOverlay.addEventListener(type, (e) => {
      cancel(e);
      dismiss();
    }, { capture:true, once: type === 'pointerdown' ? false : false });
  });

  // Optional auto-dismiss if no interaction
  setTimeout(() => { if (document.body.contains(mascotOverlay)) dismiss(); }, 4000);
}
