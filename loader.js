fetch('map.obf.js')
  .then(res => res.text())
  .then(code => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const script = document.createElement('script');
    script.src = URL.createObjectURL(blob);
    document.body.appendChild(script);
  })
  .catch(err => console.error('Erreur de chargement JS', err));
