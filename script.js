// Début du fichier : https://bw-n.github.io/new-members-featured/script.js

document.addEventListener('DOMContentLoaded', () => {

    // Code existant pour l'animation du canvas (déplacé du HTML)
    const canvas = document.getElementById('networkCanvas');
    if (canvas) { // Ajout d'une vérification au cas où le canvas ne serait pas sur toutes les pages
        const ctx = canvas.getContext('2d');
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const POINT_COUNT = 40;
        const MAX_DISTANCE = 120;
        const points = [];

        function generatePoints() {
            points.length = 0;
            for (let i = 0; i < POINT_COUNT; i++) {
                points.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                });
            }
        }

        function distance(p1, p2) {
            return Math.hypot(p1.x - p2.x, p1.y - p2.y);
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < POINT_COUNT; i++) {
                for (let j = i + 1; j < POINT_COUNT; j++) {
                    const dist = distance(points[i], points[j]);
                    if (dist < MAX_DISTANCE) {
                        const alpha = 1 - dist / MAX_DISTANCE;
                        ctx.strokeStyle = `rgba(92, 188, 224, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
                const p = points[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(92, 188, 224, 0.9)';
                ctx.fill();
            }
        }

        function update() {
            for (const p of points) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            }
        }

        function animate() {
            update();
            draw();
            requestAnimationFrame(animate);
        }

        generatePoints();
        animate();

        window.addEventListener('resize', () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            generatePoints();
        });
    }


    // Code existant pour Swiper (déplacé du HTML)
    const thumbsSwiper = new Swiper(".thumbs-swiper", {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
    });
    const mainSwiper = new Swiper(".main-swiper", {
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: thumbsSwiper
        },
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
    });

    // NOUVEAU CODE : Récepteur de message pour l'iframe de la carte
    window.addEventListener('message', (event) => {
        // IMPORTANT : Vérifiez toujours l'origine du message pour la sécurité
        if (event.origin !== 'https://bw-n.github.io') {
            console.warn("Message ignoré : origine non autorisée.", event.origin);
            return;
        }

        // Vérifiez que le message est bien celui de réglage de hauteur
        if (event.data && event.data.type === 'setHeight') {
            const iframe = document.getElementById('map-frame');
            if (iframe) {
                iframe.style.height = event.data.height + 'px';
                console.log(`Iframe 'map-frame' ajustée à la hauteur: ${event.data.height}px`);
            }
        }
    });

}); // Fin de document.addEventListener('DOMContentLoaded')

// Code pour la bannière de cookies (déplacé du HTML)
const banner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("accept-cookies");
const consentKey = "cookies-consent";

if (banner && acceptBtn) { // Vérification pour s'assurer que les éléments existent
    if (!localStorage.getItem(consentKey)) {
        banner.style.display = "flex";
    }

    acceptBtn.addEventListener("click", () => {
        localStorage.setItem(consentKey, "true");
        banner.style.display = "none";
    });
}
// Fin du fichier : https://bw-n.github.io/new-members-featured/script.js
