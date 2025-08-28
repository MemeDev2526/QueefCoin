// QueefCoin site interactivity
console.log('QueefCoin site ready.');

// === Puff Plan (Roadmap) copy ===
const QC_PHASES = {
  node1: {
    title: "🌬️ Puff Origin",
    body: `
      <p><em>Where it all begins — one puff, infinite potential.</em></p>
      <p><strong>🎯 Focus:</strong> Launch the coin. Ignite the cult. Define the legend.</p>
      <ul>
        <li>✅ Genesis drop on Solana via bonk.fun (because obviously it's the best)</li>
        <li>💬 The First Gathering — Telegram opens</li>
        <li>🐦 Twitter/X — The Puff Speaks</li>
        <li>📦 Sticker packs, GIFs & Telegram bots unleashed</li>
        <li>🌐 Website & meme-grade whitepaper goes live</li>
        <li>📜 Lore Drop #1 — <em>“The Puff Prophecy”</em> — cinematic launch reel reveal</li>
      </ul>
    `
  },
  node2: {
    title: "📈 Pump the Puff",
    body: `
      <p><em>We meme. We build. We go borderline cult.</em></p>
      <p><strong>🎯 Focus:</strong> Amplify the brand. Grow the movement. Stoke the hype.</p>
      <ul>
        <li>🚀 Meme Raids: Operation Cloudburst</li>
        <li>🎨 Meme War Contests w/ $QUEEF rewards</li>
        <li>🛍️ Merch Store Launch — Puff Gear, No Shame</li>
        <li>💸 Holder-Only Merch Discounts</li>
        <li>🕹️ Puff Dodge DEMO — <em>“The Trial Run”</em></li>
        <li>🔥 Mini Burn #1 — symbolic start to the prophecy</li>
        <li>🤝 Alliances with BONK-affiliated projects</li>
      </ul>
    `
  },
  node3: {
    title: "🚀 Puff Unleashed",
    body: `
      <p><em>We burn. We roar. We make the Puff soar! Let’s be unstoppable!</em></p>
      <p><strong>🎯 Focus:</strong> Launch utility. Burn big. Unleash the puff. Go viral. Break the feed.</p>
      <ul>
        <li>🕹️ Puff Dodge FULL Release — Burn-Per-Play unlocked</li>
        <li>🌍 Global Leaderboards go live</li>
        <li>🗳️ DAO-lite voting for burns & treasury moves</li>
        <li>🔥 The Great Burn — first large-scale community burn</li>
        <li>🧢 Themed Restock Drops (Holder-Only Discounts)</li>
        <li>👀 Lore Drop #2 — <em>“The Puff Takes Form”</em></li>
      </ul>
    `
  },
  node4: {
    title: "💗 Puff With Purpose",
    body: `
      <p><em>The joke becomes a mission — We vote. We quest. We blow for change.</em></p>
      <p><strong>🎯 Focus:</strong> Align the puff with a mission. Blow wind for change. Meme with meaning.</p>
      <ul>
        <li>🗳️ DAO chooses the first Puff-backed cause</li>
        <li>💝 Charitable merch for chosen cause</li>
        <li>🤝 Partnerships with mission-aligned builders</li>
        <li>📊 Transparent donation & burn tracker goes public</li>
        <li>📣 Lore Drop #3 — <em>“The First Quest”</em> — Meme-for-a-Cause Week begins</li>
      </ul>
    `
  },
  node5: {
    title: "🌀 The Puff Beyond",
    body: `
      <p><em>We hold. We rise. We ascend together!</em></p>
      <p><strong>🎯 Focus:</strong> Classified. Only the Puff knows.</p>
      <ul>
        <li>🚫 Redacted until the prophecy demands it</li>
        <li>🗝️ Hidden clues scattered across earlier phases</li>
        <li>🔮 Lore Drop #4 — <em>“Ascension”</em> — When the Puff rises, you’ll know</li>
      </ul>
    `
  }
};


document.addEventListener('DOMContentLoaded', function () {
  const enterButton = document.getElementById('enter-btn');
  const overlay = document.querySelector('.loading-overlay');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const homeSection = document.getElementById('home');
  const queefSound = document.getElementById('queef-sound');
  const puffImage = document.querySelector('.queef-puff');
  const smokePoofs = document.querySelectorAll('.smoke');

  function dismissOverlay() {
    // add CSS exit state
    overlay.classList.add('is-hidden');
    // release scroll lock
    document.body.classList.remove('overlay-active');

    // remove overlay node after fade (match CSS transition ~600ms)
    setTimeout(() => {
      overlay?.remove();
      document.body.classList.add('loaded'); // fallback visibility
      // focus main content for a11y
      const main = document.getElementById('main');
      if (main) { main.setAttribute('tabindex', '-1'); main.focus(); }
      // reveal home section
      if (homeSection) homeSection.classList.add('fade-in');
    }, 650);
  }

  // Nav toggle
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

 // === Roadmap (horizontal) popover wiring ===
(function initRoadmap(){
  const roadmap = document.querySelector('#roadmap');
  if (!roadmap) return;

  const popover = roadmap.querySelector('#puff-popover');
  const card    = popover?.querySelector('.puff-popover__card');
  const titleEl = popover?.querySelector('.puff-popover__title');
  const bodyEl  = popover?.querySelector('.puff-popover__body');
  const closeEl = popover?.querySelector('.puff-popover__close');

  function positionCardNear(nodeBtn){
    if (!roadmap || !popover || !card) return;
    const rr = roadmap.getBoundingClientRect();
    const rn = nodeBtn.getBoundingClientRect();
    const cw = card.offsetWidth || 420;
    const ch = card.offsetHeight || 240;

    let top  = (rn.top  - rr.top)  + rn.height + 12;     // below node
    let left = (rn.left - rr.left) + rn.width/2 - cw/2;  // centered

    top  = Math.max(8, Math.min(top,  rr.height - ch - 8));
    left = Math.max(8, Math.min(left, rr.width  - cw - 8));

    card.style.top  = `${top}px`;
    card.style.left = `${left}px`;
  }

  function openPopoverFor(btn){
    const key = btn.dataset.phase;
    const data = QC_PHASES[key];
    if (!data || !titleEl || !bodyEl) return;
    titleEl.textContent = data.title;
    bodyEl.innerHTML = data.body;
    popover.hidden = false;
    requestAnimationFrame(()=> positionCardNear(btn));
  }
  function closePopover(){ if (popover) popover.hidden = true; }

  // Delegation: any click on a .puff-node inside the roadmap
  roadmap.addEventListener('click', (e)=>{
    const btn = e.target.closest('.puff-node');
    if (btn) openPopoverFor(btn);
  });

  closeEl && closeEl.addEventListener('click', closePopover);
  document.addEventListener('keydown', (e)=> e.key === 'Escape' && !popover.hidden && closePopover());
  window.addEventListener('resize', ()=> !popover.hidden && closePopover());
  document.addEventListener('click', (e)=>{
    if (!popover || popover.hidden) return;
    if (!e.target.closest('#puff-popover') && !e.target.closest('.puff-node')) closePopover();
  });
})();

// 🟠 Enter button interaction
if (enterButton && overlay && homeSection && queefSound && puffImage) {
  // Enter button click
  enterButton.addEventListener('click', () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    playQueefEffect(centerX, centerY);

    // optional burst on Queefy, then dismiss
    puffImage.classList.remove('puff-explode'); // reset if clicked twice
    void puffImage.offsetWidth; // reflow
    puffImage.classList.add('puff-explode');

    smokePoofs.forEach(smoke => smoke.classList.add('show')); 
    setTimeout(dismissOverlay, 800);
  });

  // 💨 Burst on backdrop tap/click (no dismiss)
  let lastOverlayBurst = 0;

  // Click
  overlay.addEventListener('click', (e) => {
    if (e.target !== overlay) return; // only backdrop
    const now = Date.now();
    if (now - lastOverlayBurst < 300) return; // debounce
    lastOverlayBurst = now;

    const x = e.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? window.innerHeight / 2;
    playQueefEffect(x, y);
  });

  // Touch
  overlay.addEventListener('touchstart', (e) => {
    if (e.target !== overlay) return;
    const now = Date.now();
    if (now - lastOverlayBurst < 300) return;
    lastOverlayBurst = now;

    const t = e.touches && e.touches[0];
    const x = (t && t.clientX) || window.innerWidth / 2;
    const y = (t && t.clientY) || window.innerHeight / 2;
    playQueefEffect(x, y);
  }, { passive: true });
}



  // 💨 Puff divider animation temporarily disabled
  /*
  const puffPath = document.querySelector('.puff-path');
  if (puffPath && typeof gsap !== 'undefined' && typeof window.MorphSVGPlugin !== 'undefined') {
    const MorphSVGPlugin = window.MorphSVGPlugin;
    gsap.registerPlugin(MorphSVGPlugin);
    gsap.to(puffPath, {
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      morphSVG: { shape: "M0,160 Q360,180 720,240 T1440,160 V320 H0 Z" }
    });
  }
  */

  // (Optional extras—uncomment if you want these behaviors)
  // if (queefSound) queefSound.addEventListener('ended', dismissOverlay);
  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && document.querySelector('.loading-overlay')) dismissOverlay();
  // });
  // overlay?.addEventListener('click', (e) => { if (e.target === overlay) dismissOverlay(); });
});

// ✅ ScrollReveal (run after full window load)
window.addEventListener('load', function () {
  if (!window.ScrollReveal) return;
  const sr = ScrollReveal({
    distance: '30px',
    duration: 800,
    easing: 'ease-out',
    origin: 'bottom',
    scale: 0.95,
    reset: false
  });

  sr.reveal('.hero h1', { delay: 100 });
  sr.reveal('.hero p', { delay: 200, interval: 100 });
  sr.reveal('.hero .cta-button', { delay: 400 });
  // sr.reveal('.puff-divider', { delay: 100 }); // puff disabled
  sr.reveal('.roadmap h2, .tokenomics h2, .charity h2, .merch h2, footer', { delay: 150 });
  sr.reveal('.roadmap h3, .roadmap p, .roadmap ul li, .tokenomics p, .tokenomics ul li, .charity p, .merch p, .carousel-item', {
    delay: 200,
    interval: 100
  });
  // Nicely stagger the roadmap nodes
  sr.reveal('.roadmap__nodes .puff-node', { delay: 150, interval: 80, scale: 0.98 });

  console.log('[ScrollReveal targets]', document.querySelectorAll('.tokenomics p, .charity p, .merch p'));
});

// 💨 Puff explosion utility
function triggerEmojiPuffsFrom(xStart, yStart) {
  const emojiContainer = document.querySelector('.emoji-explosion');
  if (!emojiContainer) return;

  for (let i = 0; i < 20; i++) {
    const puff = document.createElement('span');
    puff.innerText = '💨';
    puff.classList.add('emoji-particle');

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 800 + 200;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    puff.style.left = `${xStart}px`;
    puff.style.top = `${yStart}px`;
    puff.style.setProperty('--x', `${x}px`);
    puff.style.setProperty('--y', `${y}px`);
    puff.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    puff.style.willChange = 'transform, opacity';

    emojiContainer.appendChild(puff);
    setTimeout(() => puff.remove(), 1800);
  }
}

function playQueefEffect(x, y) {
  const queefSound = document.getElementById('queef-sound');
  if (queefSound) {
    queefSound.currentTime = 0;
    queefSound.play().catch(err => console.warn('Autoplay blocked:', err));
  }
  triggerEmojiPuffsFrom(x, y);
}
// Global "any click or tap" -> play sound + puffs
(function enableGlobalPuffs(){
  const el = document.querySelector('.emoji-explosion');
  if (!el) return;
  const play = (x,y) => playQueefEffect(x,y);

  // Click anywhere
  document.addEventListener('click', (e) => {
    // ignore if clicking the CTA already triggers (won't hurt if double)
    const x = e.clientX ?? window.innerWidth/2;
    const y = e.clientY ?? window.innerHeight/2;
    play(x,y);
  });

  // Touch anywhere
  document.addEventListener('touchstart', (e) => {
    const t = e.touches?.[0];
    const x = (t && t.clientX) || window.innerWidth/2;
    const y = (t && t.clientY) || window.innerHeight/2;
    play(x,y);
  }, {passive:true});
})();

 // Mascot ambient particles
  let puffTimer;
  function spawnParticleBurst(){
    const rect = mascot.getBoundingClientRect();
    const baseX = rect.left + rect.width * 0.5 + (Math.random()*10-5);
    const baseY = rect.top  + rect.height* 0.65;
    for(let i=0;i<6;i++){
      const p = document.createElement('span');
      p.className = 'qc-particle';
      const offsetX = (Math.random()*90 - 45);
      const offsetY = 10 + Math.random()*14;

      p.style.left = (baseX + offsetX) + 'px';
      p.style.top  = (baseY + offsetY) + 'px';
      const s = 8 + Math.random()*10;
      p.style.width = p.style.height = s + 'px';
      p.style.animationDuration = (2.6 + Math.random()*1.2) + 's';
      particlesWrap.appendChild(p);
      setTimeout(()=>p.remove(), 3600);
    }
  }
  function startParticles(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    puffTimer = setInterval(spawnParticleBurst, 3200);
  }

  // Faux live counter (randomized bump)
  const counterEl = document.getElementById('qcCount');
  const base = 12340 + Math.floor(Math.random()*200); // varies per session
  let ticks = 0;
  function tickCounter(){
    ticks += 1 + Math.floor(Math.random()*3);
    counterEl.textContent = (base + ticks).toLocaleString();
  }

// 💰 Coin Rain Observer
const coinContainer = document.querySelector("#coin-rain-container");
if (coinContainer) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        for (let i = 0; i < 25; i++) {
          const coin = document.createElement("img");
          coin.src = "assets/queef-coin.png";
          coin.classList.add("coin");

          coin.style.left = `${Math.random() * 100}vw`;
          coin.style.animationDelay = `${Math.random()}s`;

          const size = 60 + Math.random() * 40;
          coin.style.width = `${size}px`;
          coin.style.height = `${size}px`;
          coin.style.transform = `rotate(${Math.random() * 360}deg)`;

          document.body.appendChild(coin);
          setTimeout(() => coin.remove(), 4000);
        }
      }
    });
  }, { threshold: 0.3 });

  observer.observe(coinContainer);
}
