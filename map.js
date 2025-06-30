fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('grid');

    for (let i = 0; i < 100; i++) {
      const div = document.createElement('div');
      div.className = 'slot';

      const entry = data.find(item => item.id === i);

      if (entry) {
        if (entry.href) {
          const link = document.createElement('a');
          link.href = entry.href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';

          if (entry.image) {
            const img = document.createElement('img');
            img.src = entry.image;
            img.alt = entry.label || '';
            link.appendChild(img);
          } else {
            link.textContent = entry.label || 'Lien';
          }

          div.appendChild(link);
        } else if (entry.image) {
          const img = document.createElement('img');
          img.src = entry.image;
          img.alt = entry.label || '';
          div.appendChild(img);
        } else {
          div.textContent = entry.label || '';
        }
      }

      grid.appendChild(div);
    }
  })
  .catch(err => {
    console.error('Erreur de chargement des données :', err);
  });
