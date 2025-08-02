// Placeholder for interactivity
console.log('QueefCoin site ready.');

// Get elements
const enterButton = document.getElementById('enter-btn');
const overlay = document.querySelector('.loading-overlay');
const homeSection = document.getElementById('home');
const queefSound = document.getElementById('queef-sound');  // Target the audio element

// Add click event listener to button
enterButton.addEventListener('click', function () {
  // Play the queef sound
  queefSound.play();

  // Hide the overlay
  overlay.style.display = 'none';

  // Show the main content
  homeSection.classList.add('fade-in');
});
