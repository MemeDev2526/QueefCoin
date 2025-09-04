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
  document.body.classList.add('overlay-active'); // lock scroll until dismiss

  const enterButton  = document.getElementById('enter-btn');
  const overlay      = document.querySelector('.loading-overlay');
  const navToggle    = document.getElementById('nav-toggle');
  const navLinks     = document.getElementById('nav-links');
  const homeSection  = document.getElementById('home');
  const queefSound   = document.getElementById('queef-sound');
  const puffImage    = document.querySelector('.queef-puff');
  const smokePoofs   = document.querySelectorAll('.smoke');

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function dismissOverlay() {
    if (!overlay) return;
    overlay.classList.add('is-hidden');
    document.body.classList.remove('overlay-active');

    setTimeout(() => {
      overlay?.remove();
      document.body.classList.add('loaded');
      const main = document.getElementById('main');
      if (main) { main.setAttribute('tabindex', '-1'); main.focus(); }
      if (homeSection) homeSection.classList.add('fade-in');
    }, 650);
  }

  // ===== Mobile nav: open/close + a11y + body lock =====
  if (navToggle && navLinks) {
    const openNav = () => {
      navLinks.classList.add('show');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close navigation');
      navToggle.textContent = '✕';
      document.body.classList.add('no-scroll');
    };

    const closeNav = () => {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
      navToggle.textContent = '☰';
      document.body.classList.remove('no-scroll');
    };

    const isOpen = () => navLinks.classList.contains('show');

    navToggle.addEventListener('click', () => (isOpen() ? closeNav() : openNav()));
    navLinks.addEventListener('click', (e) => { if (e.target.matches('a')) closeNav(); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) closeNav();
      // If overlay is up and user presses Esc, close overlay and restore focus to the button
      if (e.key === 'Escape' && document.querySelector('.loading-overlay')) {
        dismissOverlay();
        enterButton?.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      if (!e.target.closest('nav')) closeNav();
    });
  }

  // ===== Roadmap (horizontal) popover wiring =====
  (function initRoadmap() {
    const roadmap  = document.querySelector('#roadmap');
    if (!roadmap) return;

    const popover  = roadmap.querySelector('#puff-popover');
    const card     = popover?.querySelector('.puff-popover__card');
    const titleEl  = popover?.querySelector('.puff-popover__title');
    const bodyEl   = popover?.querySelector('.puff-popover__body');
    const closeEl  = popover?.querySelector('.puff-popover__close');

    function positionCardNear(nodeBtn) {
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

    function openPopoverFor(btn) {
      const key = btn.dataset.phase;
      if (!key) return;
      const data = QC_PHASES[key];
      if (!data || !titleEl || !bodyEl || !popover || !card) return;

      titleEl.textContent = data.title;
      bodyEl.innerHTML = data.body;
      popover.hidden = false;

      requestAnimationFrame(() => {
        if (window.matchMedia('(min-width: 769px)').matches) {
          positionCardNear(btn);
          card.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        } else {
          window.setTimeout(() => card.focus?.(), 10);
        }
      });
    }

    function closePopover() { if (popover) popover.hidden = true; }

    roadmap.addEventListener('click', (e) => {
      const btn = e.target.closest('.puff-node');
      if (btn) openPopoverFor(btn);
    });

    closeEl && closeEl.addEventListener('click', closePopover);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && !popover.hidden && closePopover());
    window.addEventListener('resize', () => !popover.hidden && closePopover());
    document.addEventListener('click', (e) => {
      if (!popover || popover.hidden) return;
      if (!e.target.closest('#puff-popover') && !e.target.closest('.puff-node')) closePopover();
    });
  })();

  // ===== Enter button interaction =====
  if (enterButton && overlay && homeSection && queefSound && puffImage) {
    // CTA click
    enterButton.addEventListener('click', () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      playQueefEffect(centerX, centerY);

      // burst class (skip animation if reduced motion)
      if (!prefersReducedMotion) {
        puffImage.classList.remove('puff-explode');
        void puffImage.offsetWidth; // reflow
        puffImage.classList.add('puff-explode');
        smokePoofs.forEach(smoke => smoke.classList.add('show'));
      }
      setTimeout(dismissOverlay, 800);
    });

    // Backdrop bursts (no dismiss)
    let lastOverlayBurst = 0;
    const burstIfOk = (x, y) => {
      const now = Date.now();
      if (now - lastOverlayBurst < 300) return; // debounce
      lastOverlayBurst = now;
      playQueefEffect(x, y);
    };

    overlay.addEventListener('click', (e) => {
      if (e.target !== overlay) return;
      burstIfOk(e.clientX ?? window.innerWidth / 2, e.clientY ?? window.innerHeight / 2);
    });

    overlay.addEventListener('touchstart', (e) => {
      if (e.target !== overlay) return;
      const t = e.touches && e.touches[0];
      burstIfOk((t && t.clientX) || window.innerWidth / 2, (t && t.clientY) || window.innerHeight / 2);
    }, { passive: true });
  }

  // ===== ScrollReveal =====
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
    sr.reveal('.roadmap h2, .tokenomics h2, .charity h2, .merch h2, footer', { delay: 150 });
    sr.reveal('.roadmap h3, .roadmap p, .roadmap ul li, .tokenomics p, .tokenomics ul li, .charity p, .merch p, .carousel-item', {
      delay: 200,
      interval: 100
    });
    sr.reveal('.roadmap__nodes .puff-node', { delay: 150, interval: 80, scale: 0.98 });
  });

  // ===== Copy-to-clipboard (single implementation) =====
  (function () {
    function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      }
      // Fallback
      return new Promise((resolve, reject) => {
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.top = '-9999px';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          ta.setSelectionRange(0, ta.value.length);
          const ok = document.execCommand('copy');
          document.body.removeChild(ta);
          ok ? resolve() : reject(new Error('execCommand copy failed'));
        } catch (e) { reject(e); }
      });
    }

    function setupCopy(btn) {
      const targetSel = btn.getAttribute('data-copy-target');
      const target = document.querySelector(targetSel);
      const feedback = document.getElementById('copy-feedback');
      if (!target) return;

      btn.addEventListener('click', async () => {
        const text = (target.textContent || target.innerText || '').trim();
        const prev = btn.textContent;
        btn.disabled = true;

        try {
          await copyText(text);
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          if (feedback) feedback.textContent = 'Contract address copied to clipboard.';
        } catch (err) {
          btn.textContent = 'Copy failed';
          if (feedback) feedback.textContent = 'Copy failed. Tap and hold to select manually.';
          console.error(err);
        } finally {
          setTimeout(() => {
            btn.textContent = prev;
            btn.classList.remove('copied');
            btn.disabled = false;
            if (feedback) feedback.textContent = '';
          }, 1400);
        }
      });
    }

    // Single + future-proof
    document.querySelectorAll('[data-copy-target]').forEach(setupCopy);
  })();

  // ===== DEXTools chart shimmer =====
  (function initChartLoader() {
    const iframe = document.getElementById('dextools-widget');
    const placeholder = document.querySelector('.chart-placeholder');
    if (!iframe || !placeholder) return;

    let fallbackTimeout = setTimeout(() => {
      placeholder.textContent = '⚠️ Chart failed to load. Open on DEXTools directly.';
      placeholder.style.background = 'rgba(0,0,0,.7)';
      placeholder.style.color = '#FF6B00';
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.style.fontWeight = '700';
    }, 8000);

    iframe.addEventListener('load', () => {
      clearTimeout(fallbackTimeout);
      placeholder.style.transition = "opacity .4s ease";
      placeholder.style.opacity = "0";
      setTimeout(() => placeholder.remove(), 500);
    });
  })();

  // ===== Puff explosion utilities =====
  function triggerEmojiPuffsFrom(xStart, yStart) {
    const emojiContainer = document.querySelector('.emoji-explosion');
    if (!emojiContainer) return;

    const N = prefersReducedMotion ? 8 : 20;
    for (let i = 0; i < N; i++) {
      const puff = document.createElement('span');
      puff.innerText = '💨';
      puff.classList.add('emoji-particle');

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * (prefersReducedMotion ? 300 : 800) + (prefersReducedMotion ? 80 : 200);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      puff.style.left = `${xStart}px`;
      puff.style.top = `${yStart}px`;
      puff.style.setProperty('--x', `${x}px`);
      puff.style.setProperty('--y', `${y}px`);
      puff.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      puff.style.willChange = 'transform, opacity';

      emojiContainer.appendChild(puff);
      setTimeout(() => puff.remove(), prefersReducedMotion ? 1000 : 1800);
    }
  }

  function playQueefEffect(x, y) {
    const audio = document.getElementById('queef-sound');
    if (audio && !prefersReducedMotion) {
      audio.currentTime = 0;
      audio.play().catch(err => console.warn('Autoplay blocked:', err));
    }
    triggerEmojiPuffsFrom(x, y);
  }

  // Global puffs: skip on interactive UI to avoid annoyance
  (function enableGlobalPuffs() {
    const el = document.querySelector('.emoji-explosion');
    if (!el) return;

    const shouldSkip = (target) => {
      return target.closest('a, button, input, textarea, select, [role="button"], [data-no-puff]'); // opt-out hook too
    };

    const play = (x, y) => playQueefEffect(x, y);

    document.addEventListener('click', (e) => {
      if (shouldSkip(e.target)) return;
      const x = e.clientX ?? window.innerWidth / 2;
      const y = e.clientY ?? window.innerHeight / 2;
      play(x, y);
    });

    document.addEventListener('touchstart', (e) => {
      if (shouldSkip(e.target)) return;
      const t = e.touches?.[0];
      const x = (t && t.clientX) || window.innerWidth / 2;
      const y = (t && t.clientY) || window.innerHeight / 2;
      play(x, y);
    }, { passive: true });
  })();

  // ===== Coin Rain Observer (spawn once per view, scoped to container) =====
  (function coinRainOnce() {
    const container = document.querySelector("#coin-rain-container");
    if (!container) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const count = prefersReducedMotion ? 10 : 25;
          for (let i = 0; i < count; i++) {
            const coin = document.createElement("img");
            coin.src = "assets/queef-coin.png";
            coin.classList.add("coin");
            coin.alt = "$QUEEF coin";

            coin.style.left = `${Math.random() * 100}vw`;
            coin.style.animationDelay = `${Math.random()}s`;

            const size = 60 + Math.random() * 40;
            coin.style.width = `${size}px`;
            coin.style.height = `${size}px`;
            coin.style.transform = `rotate(${Math.random() * 360}deg)`;

            // keep DOM tidy: within container instead of body
            container.appendChild(coin);
            setTimeout(() => coin.remove(), 4000);
          }
          // Only once per entry; disconnect to avoid repeats
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(container);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) observer.disconnect();
    });
  })();

  // (Optional Morph animation )
 
 // === Puff divider morph animation ===
if (window.gsap && window.MorphSVGPlugin) {
  gsap.registerPlugin(MorphSVGPlugin);
  gsap.to('.puff-path', {
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    morphSVG: {
      shape: "M0,120 Q360,140 720,120 T1440,120 V160 H0 Z" // smoother wave
    }
  });
}


});
