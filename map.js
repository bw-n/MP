const grid = document.getElementById('grid');
const filtersWrapper = document.getElementById('filters');

// Charge les données JSON externes
fetch('data.json')
  .then(response => response.json())
  .then(slotData => {
    // Force exactement 100 slots
    for (let i = slotData.length; i < 100; i++) {
      slotData.push({ id: i });
    }

    // Crée les blocs
    slotData.forEach(slot => {
      const cell = document.createElement('div');
      cell.className = 'slot';

      // Ajoute les tags (support array ou string)
      if (slot.tag) {
        const tags = Array.isArray(slot.tag) ? slot.tag : [slot.tag];
        cell.setAttribute('data-tag', tags.join(','));
      }

      // Infobulle personnalisée
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';

      let tooltipText = slot.label || 'Emplacement libre';
      if (slot.tag) {
        tooltipText += ` (${Array.isArray(slot.tag) ? slot.tag.join(', ') : slot.tag})`;
      }
      tooltip.textContent = tooltipText;

      // Si image + lien => rendu cliquable
      if (slot.image && slot.href) {
        const link = document.createElement('a');
        link.href = slot.href;
        link.target = '_blank';
        link.style.display = 'block';
        link.style.width = '100%';
        link.style.height = '100%';
        link.style.position = 'relative';

        const img = document.createElement('img');
        img.src = slot.image;
        img.alt = slot.label || '';
        img.onload = () => sendHeightUpdate();

        link.appendChild(img);
        link.appendChild(tooltip);
        cell.appendChild(link);
      } else {
        // Slot vide
        cell.classList.add('empty');
        cell.textContent = '+';
        cell.style.color = '#00ffee';
        cell.style.fontSize = '1.8em';
        cell.style.fontWeight = 'bold';
        cell.appendChild(tooltip);
      }

      grid.appendChild(cell);
    });

    // ✅ Filtres fonctionnels uniquement sur les boutons
    const filterButtons = document.querySelectorAll('#filters button[data-tag]');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedTag = btn.getAttribute('data-tag');

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.slot').forEach(slot => {
          const tagAttr = slot.getAttribute('data-tag') || '';
          const tags = tagAttr.split(',').map(t => t.trim());

          if (selectedTag === 'all') {
            slot.classList.remove('tag-active', 'tag-muted');
          } else if (tags.includes(selectedTag)) {
            slot.classList.add('tag-active');
            slot.classList.remove('tag-muted');
          } else {
            slot.classList.remove('tag-active');
            slot.classList.add('tag-muted');
          }
        });

        setTimeout(sendHeightUpdate, 300);
      });
    });

    // Observateurs de hauteur pour iframe
    new MutationObserver(sendHeightUpdate).observe(grid, { childList: true, subtree: true });
    new ResizeObserver(sendHeightUpdate).observe(document.body);
    if (filtersWrapper) {
      new ResizeObserver(sendHeightUpdate).observe(filtersWrapper);
    }

    // Sécurité recalage
    setTimeout(sendHeightUpdate, 500);
    setTimeout(sendHeightUpdate, 1500);
    setTimeout(sendHeightUpdate, 3000);
  });

// Fonction de communication iframe
function sendHeightUpdate() {
  const height = document.body.scrollHeight || document.documentElement.scrollHeight;
  parent.postMessage({ type: 'setHeight', height }, '*');
}

// Post-chargement
window.addEventListener('load', () => {
  setTimeout(sendHeightUpdate, 300);
});
