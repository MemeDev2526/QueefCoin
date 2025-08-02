// QueefCoin site interactivity
console.log('QueefCoin site ready.');

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // Get elements
  const enterButton = document.getElementById('enter-btn');
  const overlay = document.querySelector('.loading-overlay');
  const homeSection = document.getElementById('home');
  const queefSound = document.getElementById('queef-sound');

  // Safety check (in case elements are missing)
  if (enterButton && overlay && homeSection && queefSound) {
    enterButton.addEventListener('click', function () {
      // Play the queef sound
      queefSound.play().catch(err => console.warn('Autoplay blocked:', err));

      // Hide the loading overlay
      overlay.style.display = 'none';

      // Optionally add a class to reveal content with CSS animation
      homeSection.classList.add('fade-in');
    });
  } else {
    console.warn('QueefCoin entry elements not found.');
  }
});
