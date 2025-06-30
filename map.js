const grid = document.getElementById('grid');

for (let i = 1; i <= 100; i++) {
  const div = document.createElement('div');
  div.className = 'slot';
  div.textContent = i; // 👉 pour qu’on voie les cases
  grid.appendChild(div);
}
