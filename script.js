// QueefCoin site interactivity
console.log('QueefCoin site ready.');

document.addEventListener('DOMContentLoaded', function () {
  const enterButton = document.getElementById('enter-btn');
  const overlay = document.querySelector('.loading-overlay');
  const homeSection = document.getElementById('home');
  const queefSound = document.getElementById('queef-sound');
  const puffImage = document.querySelector('.queef-puff');
  const smokePoofs = document.querySelectorAll('.smoke');
  const emojiContainer = document.querySelector('.emoji-explosion');

  // 💨 Burst emoji from a specific screen location
  function triggerEmojiPuffsFrom(xStart, yStart) {
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

      emojiContainer.appendChild(puff);
      setTimeout(() => puff.remove(), 1800);
    }
  }

  // 💨 Play sound and burst
  function playQueefEffect(x, y) {
    if (queefSound) {
      queefSound.currentTime = 0;
      queefSound.play().catch(err => console.warn('Autoplay blocked:', err));
    }
    triggerEmojiPuffsFrom(x, y);
  }

  // 🎉 Enter button click (initial burst and overlay removal)
  if (enterButton && overlay && homeSection && queefSound && puffImage) {
    enterButton.addEventListener('click', function () {
      playQueefEffect(window.innerWidth / 2, window.innerHeight / 2);

      // Stop puff idle loop and trigger explode
      puffImage.style.animation = 'none';
      void puffImage.offsetWidth;
      puffImage.classList.add('puff-explode');

      smokePoofs.forEach((smoke) => smoke.classList.add('show'));

      // Fade out overlay and fade in main content
      setTimeout(() => {
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = 'none';
        setTimeout(() => {
          overlay.style.display = 'none';
          homeSection.classList.add('fade-in');
        }, 600);
      }, 800);
    });
  } else {
    console.warn('QueefCoin overlay or enter button elements not found.');
  }

  // 💥 Global click or tap anywhere on site
  function handleTapOrClick(e) {
    const isTouch = e.type === 'touchstart';
    const touch = isTouch ? e.touches[0] : e;
    const x = touch.clientX;
    const y = touch.clientY;

    // Prevent queef burst if tapping the enter button while overlay is active
    const inOverlay = overlay && overlay.style.display !== 'none' && overlay.style.opacity !== '0';
    const isEnterBtn = e.target.id === 'enter-btn';

    if (!inOverlay || !isEnterBtn) {
      playQueefEffect(x, y);
    }
  }

  document.body.addEventListener('click', handleTapOrClick);
  document.body.addEventListener('touchstart', handleTapOrClick);
});
