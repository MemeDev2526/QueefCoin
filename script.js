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

  // 💨 Trigger emoji puff explosion from (x, y)
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

  // 💨 Play sound and puff burst
  function playQueefEffect(x, y) {
    if (queefSound) {
      queefSound.currentTime = 0;
      queefSound.play().catch(err => console.warn('Autoplay blocked:', err));
    }
    triggerEmojiPuffsFrom(x, y);
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
        }, 600);
      }, 800);
    });
  }

  // 🖱️ Handle mouse clicks and taps
  function handleGlobalClick(event) {
    const x = event.clientX || (event.touches && event.touches[0].clientX);
    const y = event.clientY || (event.touches && event.touches[0].clientY);
    if (x && y) playQueefEffect(x, y);
  }

  // Click for desktop
  document.addEventListener('click', handleGlobalClick);

  // Touch for mobile
  document.addEventListener('touchstart', handleGlobalClick);
});
