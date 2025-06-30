const grid = document.getElementById('grid');

for (let i = 1; i <= 100; i++) {
  const div = document.createElement('div');
  div.className = 'slot';
  div.title = `Slot #${i}`;
  grid.appendChild(div);
}
