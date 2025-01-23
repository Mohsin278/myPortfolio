// Splash Screen
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingCounter = document.querySelector('.loading-counter');
    let progress = 0;
    let counterValue = 0;

    // Function to update loading bar and counter
    function updateLoader() {
        if (progress < 100) {
            // Reduced speed by lowering the increment value
            progress += Math.random() * 1.2;
            progress = Math.min(progress, 100);
            
            // Update loading bar
            loadingBar.style.width = `${progress}%`;
            
            // Update counter with a cleaner number
            counterValue = Math.floor(progress);
            loadingCounter.textContent = counterValue.toString().padStart(2, '0');
            
            if (progress < 100) {
                requestAnimationFrame(updateLoader);
            } else {
                // Increased delays for smoother end transition
                setTimeout(() => {
                    loadingCounter.style.transform = 'translateY(100%)';
                    setTimeout(() => {
                        splashScreen.classList.add('hidden');
                        setTimeout(() => {
                            splashScreen.remove();
                        }, 1000);
                    }, 1000);
                }, 500);
            }
        }
    }

    // Increased initial delay
    setTimeout(() => {
        requestAnimationFrame(updateLoader);
    }, 500);
});

// Scroll-triggered animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Theme Switcher
const themeSwitch = document.querySelector('.theme-switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
    setTheme('dark');
} else {
    setTheme('light');
}

themeSwitch.addEventListener('click', toggleTheme);

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Social Media Links Hover Effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = `translateY(-4px) rotate(${Math.random() * 16 - 8}deg)`;
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to sections when they come into view
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
            // Add animation to children elements
            entry.target.querySelectorAll('h2, p, .skills ul li').forEach((element, index) => {
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('fade-in', 'visible');
            });
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
document.body.appendChild(progressBar);

const updateScrollProgress = () => {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollable) * 100;
    scrollProgress.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateScrollProgress);

// Update current time
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    timeElement.textContent = time;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Add animation observer
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('education-card') || 
                    entry.target.classList.contains('skills-item')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe education cards
    document.querySelectorAll('.education-card').forEach(card => {
        observer.observe(card);
    });

    // Observe skill items
    document.querySelectorAll('.skills ul li').forEach(skill => {
        observer.observe(skill);
        skill.classList.add('skills-item');
    });
};

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);