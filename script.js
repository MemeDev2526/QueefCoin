// QueefCoin site interactivity
console.log('QueefCoin site ready.');

document.addEventListener('DOMContentLoaded', function () {
  const enterButton = document.getElementById('enter-btn');
  const overlay = document.querySelector('.loading-overlay');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const homeSection = document.getElementById('home');
  const queefSound = document.getElementById('queef-sound');
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
    morphSVG: {
      shape: "M0,160 Q360,180 720,240 T1440,160 V320 H0 Z"
    }
  });
}
*/
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // 🟠 Enter button interaction
  if (enterButton && overlay && homeSection && queefSound && puffImage) {
    enterButton.addEventListener('click', function () {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      playQueefEffect(centerX, centerY);

      puffImage.style.animation = 'none';
      void puffImage.offsetWidth; // force reflow
      puffImage.classList.add('puff-explode');
      smokePoofs.forEach(smoke => smoke.classList.add('show'));

      setTimeout(() => {
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = 'none';
        setTimeout(() => {
          overlay.style.display = 'none';
          homeSection.classList.add('fade-in');
          document.body.classList.add('loaded'); // Fallback visibility
        }, 600);
      }, 800);
    });
  }

  // 🖱️ Handle mouse clicks and taps with debounce
  let lastPuffTime = 0;
  function handleGlobalClick(event) {
    const now = Date.now();
    if (now - lastPuffTime < 400) return;
    lastPuffTime = now;

    const x = event.clientX || (event.touches && event.touches[0].clientX);
    const y = event.clientY || (event.touches && event.touches[0].clientY);
    if (x && y) playQueefEffect(x, y);
  }

  document.addEventListener('click', handleGlobalClick);
  document.addEventListener('touchstart', handleGlobalClick);
});

// ✅ ScrollReveal (run after full window load)
window.addEventListener('load', function () {
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

  // Debug: Check if elements are being matched
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
