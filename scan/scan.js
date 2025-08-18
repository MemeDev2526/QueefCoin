// Minimal, fast interactions: tap-to-puff + sound, no heavy libs.
const sfx = document.getElementById('puff-sfx');
const tapZone = document.querySelector('.tap-zone');

// starfield background
const star = document.createElement('div');
star.className = 'starfield';
document.body.appendChild(star);

function spawnPuff(x, y) {
  const p = document.createElement('div');
  p.className = 'puff';
  const size = 10 + Math.random()*18;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${x}px`;
  p.style.top  = `${y}px`;
  document.body.appendChild(p);
  p.addEventListener('animationend', ()=> p.remove());
}

function playSfx() {
  try {
    sfx.currentTime = 0;
    sfx.volume = 0.7;
    sfx.play();
  } catch (e) { /* autoplay guard */ }
}

tapZone.addEventListener('pointerdown', (e)=>{
  const rect = tapZone.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top  + rect.height/2;
  // burst of puffs from center + at tap point
  for (let i=0;i<10;i++){
    const jitterX = cx + (Math.random()-0.5)*rect.width*0.5;
    const jitterY = cy + (Math.random()-0.2)*rect.height*0.4;
    spawnPuff(jitterX, jitterY);
  }
  spawnPuff(e.clientX, e.clientY);
  playSfx();
});

// Optional: label swap on tap for playful feedback
tapZone.addEventListener('pointerdown', ()=>{
  const t = document.querySelector('.tap-text');
  t.textContent = '💨 Puff!';
  setTimeout(()=> t.textContent = 'Tap to Puff', 700);
});
