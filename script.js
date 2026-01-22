document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        en: {
            "nav-home": "Home",
            "badge-key": "KEY REQUIRED",
            "card1-quote": '"No ground control this time, only survival"',
            "card1-desc": "A 2D pixel art survival arena shoot ’em up. Control a lone astronaut stranded in hostile territory. Survive waves and upgrade your gear.",
            "btn-play": "Play Now",
            "btn-feedback": "Feedback",
            "card2-title": "My Projects",
            "card2-desc": "Access my full library of indie games, prototypes, and jam entries on my official Itch.io profile.",
            "btn-view": "View Portfolio",
            "card3-title": "YouTube",
            "card3-desc": "Follow my journey as a game developer. Devlogs, tutorials, and showcases of my latest creations.",
            "btn-sub": "Subscribe",
            "card4-title": "Instagram",
            "card4-desc": "Behind the scenes, art previews, and daily updates on my game development process.",
            "btn-insta": "Follow Me"
        },
        pt: {
            "nav-home": "Início",
            "badge-key": "CHAVE NECESSÁRIA",
            "card1-quote": '"Sem controle de solo desta vez, apenas sobrevivência"',
            "card1-desc": "Um shooter de arena e sobrevivência 2D em pixel art. Controle um astronauta solitário em território hostil. Sobreviva a hordas e melhore seu equipamento.",
            "btn-play": "Jogar Agora",
            "btn-feedback": "Feedback",
            "card2-title": "Meus Projetos",
            "card2-desc": "Acesse minha biblioteca completa de jogos, protótipos e game jams no meu perfil oficial do Itch.io.",
            "btn-view": "Ver Portfólio",
            "card3-title": "YouTube",
            "card3-desc": "Acompanhe minha jornada como dev. Devlogs, tutoriais e apresentações das minhas últimas criações.",
            "btn-sub": "Inscrever-se",
            "card4-title": "Instagram",
            "card4-desc": "Bastidores, prévias de arte e atualizações diárias sobre o processo de desenvolvimento dos meus jogos.",
            "btn-insta": "Seguir"
        }
    };

    let currentLang = localStorage.getItem('language') || 'en';

    function updateLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
        localStorage.setItem('language', currentLang);
    }

    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'pt' : 'en';
        updateLanguage();
    });

    updateLanguage();

    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() { this.init(); }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            const colors = ['#ff3e3e', '#cc2b2b', '#660000', '#330000'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.8 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    this.x -= directionX * force * 2;
                    this.y -= directionY * force * 2;
                }
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 250; i++) { particles.push(new Particle()); }
    }

    function animate() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
});