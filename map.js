function scaleGrid() {
  const grid = document.querySelector('.grid');
  const wrapper = document.querySelector('.grid-wrapper');

  if (!grid || !wrapper) return;

  const wrapperWidth = wrapper.clientWidth;
  const wrapperHeight = wrapper.clientHeight;

  const baseSize = 1000; // Taille de la grille en px
  const scale = Math.min(
    wrapperWidth / baseSize,
    wrapperHeight / baseSize
  );

  grid.style.transform = `scale(${scale})`;
  grid.style.transformOrigin = 'top left';
}

// Appliquer le scale une fois le DOM prêt
window.addEventListener('DOMContentLoaded', scaleGrid);
window.addEventListener('resize', scaleGrid);
