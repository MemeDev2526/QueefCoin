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

  function triggerEmojiPuffsFrom(xStart, yStart) {
    for (let i = 0; i < 20; i++) {
      const puff = document.createElement('span');
      puff.innerText = '💨';
      puff.classList.add('emoji-particle');

      // Random explosion direction
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 800 + 200;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Starting position (click location or center)
      puff.style.left = `${xStart}px`;
      puff.style.top = `${yStart}px`;
      puff.style.setProperty('--x', `${x}px`);
      puff.style.setPro
