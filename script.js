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
  const particleContainer = document.querySelector('.particles');

  // Safety check
  if (enterButton && overlay && homeSection && queefSound && puffImage && particleContainer) {

    function triggerParticles() {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('span');
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 80;
        const x = Math.cos(angle) * distance + 'px';
        const y = Math.sin(angle) * distance + 'px';
        particle.style.setProperty('--x', x);
        particle.style.setProperty('--y', y);
        particleContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
      }
    }

    enterButton.addEventListener('click', function () {
      // Play the queef sound
      queefSound.currentTime = 0;
      queefSound.play().catch(err => console.warn('Autoplay blocked:', err));

      // Trigger puff explosion
      puffImage.classList.add('puff-explode');

      // Smoke poofs
      smokePoofs.forEach((smoke) => smoke.classList.add('show'));

      // Particle burst
      triggerParticles();

      // Fade out overlay after animation
      setTimeout(() => {
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = 'none';
        setTimeout(() => {
          overlay.style.display = 'none';
          homeSection.classList.add('fade-in');
        }, 600); // Buffer for fade-out
      }, 800); // Match puff-explode duration
    });

  } else {
    console.warn('QueefCoin animation elements not found.');
  }
});
