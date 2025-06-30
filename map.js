const grid = document.getElementById('grid');
const filtersWrapper = document.getElementById('filters');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // Complète jusqu’à 100 slots
    for (let i = data.length; i < 100; i++) {
      data.push({ id: i });
    }

    data.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'slot';

      // Tag (support multiple tags)
      if (entry.tag) {
        const tags = Array.isArray(entry.tag) ? entry.tag : [entry.tag];
        div.setAttribute('data-tag', tags.join(','));
      }

      // Image + lien cliquable
      if (entry.href && entry.image) {
        const link = document.createElement('a');
        link.href = entry.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        const img = document.createElement('img');
        img.src = entry.image;
        img.alt = entry.label || '';

        link.appendChild(img);
        div.appendChild(link);
      } else if (entry.image) {
        const img = document.createElement('img');
        img.src = entry.image;
        img.alt = entry.label || '';
        div.appendChild(img);
      } else {
        div.classList.add('empty');
        div.textContent = '+';
      }

      grid.appendChild(div);
    });

    // Filtres dynamiques
    const filterButtons = document.querySelectorAll('#filters button[data-tag]');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedTag = button.getAttribute('data-tag');

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        document.querySelectorAll('.slot').forEach(slot => {
          const slotTags = (slot.getAttribute('data-tag') || '').split(',').map(tag => tag.trim());

          if (selectedTag === 'all') {
            slot.classList.remove('tag-active', 'tag-muted');
          } else if (slotTags.includes(selectedTag)) {
            slot.classList.add('tag-active');
            slot.classList.remove('tag-muted');
          } else {
            slot.classList.remove('tag-active');
            slot.classList.add('tag-muted');
          }
        });

        sendHeightUpdate();
      });
    });

    // Recalage de hauteur pour iframe
    new ResizeObserver(sendHeightUpdate).observe(document.body);
    new MutationObserver(sendHeightUpdate).observe(grid, { childList: true, subtree: true });

    setTimeout(sendHeightUpdate, 500);
    setTimeout(sendHeightUpdate, 1500);
    setTimeout(sendHeightUpdate, 3000);
  })
  .catch(err => {
    console.error('Erreur de chargement JSON :', err);
  });

// Communication à l'iframe parent
function sendHeightUpdate() {
  const height = document.body.scrollHeight || document.documentElement.scrollHeight;
  parent.postMessage({ type: 'setHeight', height }, '*');
}
