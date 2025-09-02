// Puff scan page interactions
const sfx = document.getElementById('puff-sfx');
const tapZone = document.querySelector('.tap-zone');

// If starfield isn't already in markup, inject
if (!document.querySelector('.starfield')) {
  const star = document.createElement('div');
  star.className = 'starfield';
  document.body.appendChild(star);
}

// Spawn a puff particle with brand colour
function spawnPuff(x, y) {
  const p = document.createElement('div');
  p.className = 'puff';

  const size = 10 + Math.random() * 18;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${x}px`;
  p.style.top  = `${y}px`;

  // Brand accent colours
  const colours = [
    getComputedStyle(document.documentElement).getPropertyValue('--white'),
    getComputedStyle(document.documentElement).getPropertyValue('--orange'),
    getComputedStyle(document.documentElement).getPropertyValue('--orange-hi'),
    getComputedStyle(document.documentElement).getPropertyValue('--gold'),
    getComputedStyle(document.documentElement).getPropertyValue('--solanaL')
  ];
  const c = colours[Math.floor(Math.random() * colours.length)].trim();
  p.style.background = `radial-gradient(circle at 30% 30%, ${c}, ${c} 60%, rgba(255,255,255,0) 70%)`;

  document.body.appendChild(p);
  p.addEventListener('animationend', () => p.remove());
}

// Play puff sound
function playSfx() {
  try {
    sfx.currentTime = 0;
    sfx.volume = 0.6; // slightly softer
    sfx.play();
  } catch (e) { /* ignore autoplay restrictions */ }
}

// Tap zone → burst effect
tapZone.addEventListener('pointerdown', (e) => {
  const rect = tapZone.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;

  // Burst from center + tap point
  for (let i = 0; i < 10; i++) {
    const jitterX = cx + (Math.random() - 0.5) * rect.width * 0.5;
    const jitterY = cy + (Math.random() - 0.2) * rect.height * 0.4;
    spawnPuff(jitterX, jitterY);
  }
  spawnPuff(e.clientX, e.clientY);

  playSfx();
});

// Fun label swap
tapZone.addEventListener('pointerdown', () => {
  const t = document.querySelector('.tap-text');
  t.textContent = '💨 Pump the Puff!';
  setTimeout(() => t.textContent = 'Tap to Puff', 900);
});
