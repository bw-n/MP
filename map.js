function scaleGrid() {
  const grid = document.querySelector('.grid');
  const scale = Math.min(
    window.innerWidth / 1000,
    window.innerHeight / 1000
  );
  grid.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', scaleGrid);
window.addEventListener('load', scaleGrid);
