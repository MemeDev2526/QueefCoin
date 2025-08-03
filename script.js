// QueefCoin site interactivity
console.log('QueefCoin site ready.');

document.addEventListener('DOMContentLoaded', function () {
  const enterButton = document.getElementById('enter-btn');
  const overlay = document.querySelector('.loading-overlay');
  const homeSection = document.getElementById('home');
  const queefSound = document.getElementById('queef-sound');
  const puffImage = document.querySelector('.queef-puff');
  const smokePoofs = document.querySelectorAll('.smoke');

  if (enterButton && overlay && homeSection && queefSound && puffImage) {

    function triggerEmojiPuffs() {
      const emojiContainer = document.querySelector('.emoji-explosion');

      for (let i = 0; i < 20; i++) {
        const puff = document.createElement('span');
        puff.innerText = '💨';
        puff.classList.add('emoji-particle');

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 1400 + 400;
        const x = Math.cos(angle) * distance + 'px';
        const y = Math.sin(angle) * distance + 'px';

        puff.style.setProperty('--x', x);
        puff.style.setProperty('--y', y);
        puff.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;

        emojiContainer.appendChild(puff);
        setTimeout(() => puff.remove(), 1500);
      }
    }

    enterButton.addEventListener('click', function () {
      queefSound.currentTime = 0;
      queefSound.play().catch(err => console.warn('Autoplay blocked:', err));

      puffImage.style.animation = 'none'; // Stop the default puff loop
      void puffImage.offsetWidth; // Force reflow to apply the next animation
      puffImage.classList.add('puff-explode');
      smokePoofs.forEach((smoke) => smoke.classList.add('show'));
      triggerEmojiPuffs();

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
    console.warn('QueefCoin animation elements not found.');
  }
});
