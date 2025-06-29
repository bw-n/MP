// Dans votre script.js sur votre page Weebly
// (Le même fichier qui gère les membres à l'honneur)

document.addEventListener('DOMContentLoaded', () => {
    // ... (Votre code existant pour les membres à l'honneur et l'animation de réseau) ...

    // AJOUTEZ CE BLOC DE CODE POUR ÉCOUTER LES MESSAGES DE L'IFRAME
    window.addEventListener('message', (event) => {
        // !!! SÉCURITÉ IMPORTANTE !!!
        // Remplacez 'https://bw-n.github.io' par l'ORIGINE EXACTE de votre iframe.
        // Si l'URL de la carte est 'https://bw-n.github.io/premium-map/', alors l'origine est 'https://bw-n.github.io'.
        // Si vous avez un doute, laissez '*' pour les tests, mais il est recommandé de spécifier l'origine.
        if (event.origin !== 'https://bw-n.github.io') { 
            console.warn("Message ignoré : origine non autorisée.", event.origin);
            return; 
        }

        // Vérifiez que le message est bien celui de "setHeight" pour notre iframe
        if (event.data && event.data.type === 'setHeight') {
            const iframe = document.getElementById('map-frame'); // Cible l'iframe par son ID
            if (iframe) {
                iframe.style.height = event.data.height + 'px';
                console.log(`Iframe 'map-frame' ajustée à la hauteur: ${event.data.height}px`);
            }
        }
    });

}); // Fin de document.addEventListener('DOMContentLoaded')
