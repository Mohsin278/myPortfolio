// ============================================
// HAND-DRAWN SKETCHY PORTFOLIO — script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Splash Screen ----
    const splashScreen = document.getElementById('splash-screen');
    const splashBar = document.getElementById('splash-bar');
    const splashCounter = document.getElementById('splash-counter');
    let progress = 0;

    function updateSplash() {
        if (progress < 100) {
            progress += Math.random() * 2.5 + 0.5;
            progress = Math.min(progress, 100);
            splashBar.style.width = `${progress}%`;
            splashCounter.textContent = `${Math.floor(progress)}%`;
            requestAnimationFrame(updateSplash);
        } else {
            splashCounter.textContent = '100%';
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                setTimeout(() => splashScreen.remove(), 700);
            }, 400);
        }
    }

    setTimeout(() => requestAnimationFrame(updateSplash), 300);

    // ---- Scroll Progress Bar ----
    const scrollProgressBar = document.getElementById('scroll-progress-bar');

    function updateScrollProgress() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const pct = scrollable > 0 ? (scrolled / scrollable) * 100 : 0;
        scrollProgressBar.style.width = `${pct}%`;
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // ---- Current Time ----
    const timeEl = document.getElementById('current-time');

    function updateTime() {
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    setInterval(updateTime, 1000);
    updateTime();

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Scroll-Triggered Animations ----
    // Add .anim-in to all animated elements
    const animatedSelectors = [
        '.sketchy-card',
        '.hero-badge',
        '.hero-title',
        '.hero-tagline',
        '.hero-buttons',
        '.social-links'
    ];

    animatedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('anim-in');
        });
    });

    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.anim-in').forEach(el => {
        animObserver.observe(el);
    });

    // ---- Wobbly Hover on Social Links ----
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            const randomAngle = (Math.random() * 12 - 6).toFixed(1);
            this.style.transform = `translateY(-4px) rotate(${randomAngle}deg)`;
        });
        link.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // ---- Random Pencil-Scratch Decorations ----
    // Add tiny rotations to section headings for a hand-drawn feel
    document.querySelectorAll('section h2').forEach(h2 => {
        const rot = (Math.random() * 2 - 1).toFixed(2);
        h2.style.transform = `rotate(${rot}deg)`;
    });

});