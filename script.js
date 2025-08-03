// QueefCoin site interactivity
console.log('QueefCoin site ready.');

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // Get elements
  const enterButton = document.getElementById('enter-btn');
  const overlay = document.querySelector('.loading-overlay');
  const homeSection = document.getElementById('home');
  const queefSound = document.getElementById('queef-sound');
  const puffImage = document.querySelector('.queef-puff');
  const smokePoofs = document.querySelectorAll('.smoke');

  // Safety check
  if (enterButton && overlay && homeSection && queefSound && puffImage) {

    function triggerEmojiPuffs() {
      const emojiContainer = document.querySelector('.emoji-explosion');

      for (let i = 0; i < 20; i++) {
        const puff = document.createElement('span');
        puff.innerText = '💨';
        puff.classList.add('emoji-particle');

        // Random screen-wide burst directions
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 800 + 200;
        const x = Math.cos(angle) * distance + 'px';
        const y = Math.sin(angle) * distance + 'px';

        puff.style.setProperty('--x', x);
        puff.style.setProperty('--y', y);

        // Random starting point near center
        puff.style.left = '50%';
        puff.style.top = '50%';
        puff.style.transform = `rotate(${Math.random() * 360}deg)`;

        emojiContainer.appendChild(puff);

        setTimeout(() => puff.remove(), 1500);
      }
    }

    enterButton.addEventListener('click', function () {
      queefSound.currentTime = 0;
      queefSound.play().catch(err => console.warn('Autoplay blocked:', err));

      puffImage.classList.add('puff-explode');
      smokePoofs.forEach((smoke) => smoke.classList.add('show'));

      triggerEmojiPuffs(); // 💨

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
