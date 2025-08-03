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

  // 🎉 Enter button interaction (initial overlay animation)
  if (enterButton && overlay && homeSection && queefSound && puffImage) {
    enterButton.addEventListener('click', function () {
      playQueefEffect(window.innerWidth / 2, window.innerHeight / 2);

      // Stop idle puff animation
      puffImage.style.animation = 'none';
      void puffImage.offsetWidth; // Force reflow
      puffImage.classList.add('puff-explode');

      // Show smoke poofs
      smokePoofs.forEach((smoke) => smoke.classList.add('show'));

      // Hide overlay
      setTimeout(() => {
        overlay.style.opacity = 0;
        overlay
