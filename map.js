function scaleGrid() {
  const grid = document.querySelector('.grid');
  const wrapper = document.querySelector('.grid-wrapper');

  if (!grid || !wrapper) return;

  const availableWidth = wrapper.clientWidth;
  const availableHeight = wrapper.clientHeight;

  const scale = Math.min(availableWidth / 1000, availableHeight / 1000);
  grid.style.transform = `scale(${scale})`;
}
