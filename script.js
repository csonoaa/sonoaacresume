// Particles Animation
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${213 + Math.random() * 20}, 93%, 67%)`
            });
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }

            // Boundary collision
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
        this.drawConnections();
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(74, 158, 255, ${0.2 * (1 - distance / 80)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.particles = [];
            this.createParticles();
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Update cursor glow position
            const cursorGlow = document.querySelector('.cursor-glow');
            if (cursorGlow) {
                cursorGlow.style.left = (e.clientX - 10) + 'px';
                cursorGlow.style.top = (e.clientY - 10) + 'px';
            }
        });
    }
}

// Click Pulse Effect
class ClickPulse {
    constructor() {
        this.pulseElement = document.querySelector('.click-pulse');
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            this.createPulse(e.clientX, e.clientY);
        });
    }

    createPulse(x, y) {
        this.pulseElement.style.left = (x - 100) + 'px';
        this.pulseElement.style.top = (y - 100) + 'px';
        this.pulseElement.classList.add('active');

        setTimeout(() => {
            this.pulseElement.classList.remove('active');
        }, 600);
    }
}

// Text Animation Controller
class TextAnimation {
    constructor() {
        this.textElements = document.querySelectorAll('.animated-text');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        // Start the animation cycle
        this.animateTexts();
    }

    animateTexts() {
        // This is handled by CSS animations, but we can add additional logic here if needed
        setInterval(() => {
            // Optional: Add any additional text animation logic
        }, 9000); // Match the CSS animation duration
    }
}

// Navigation Functions
function navigateToBuilder() {
    // Add a small delay for the click animation
    setTimeout(() => {
        window.location.href = 'resume.html';
    }, 200);
}

// Auto-save functionality
class AutoSave {
    constructor() {
        this.saveKey = 'resume_data';
        this.saveInterval = 2000; // Save every 2 seconds
        this.setupAutoSave();
    }

    save(data) {
        try {
            localStorage.setItem(this.saveKey, JSON.stringify(data));
            console.log('Resume data saved automatically');
        } catch (error) {
            console.error('Failed to save resume data:', error);
        }
    }

    load() {
        try {
            const data = localStorage.getItem(this.saveKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load resume data:', error);
            return null;
        }
    }

    setupAutoSave() {
        // This will be used by the resume builder
        if (typeof window !== 'undefined') {
            window.autoSave = this;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize landing page features if we're on the landing page
    if (document.getElementById('particles-canvas')) {
        new ParticleSystem();
        new ClickPulse();
        new TextAnimation();
    }

    // Initialize auto-save for both pages
    new AutoSave();

    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Performance optimization: Reduce animations on mobile
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Reduce particle count on mobile
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            canvas.style.opacity = '0.5';
        }

        // Disable cursor glow on mobile
        const cursorGlow = document.querySelector('.cursor-glow');
        if (cursorGlow) {
            cursorGlow.style.display = 'none';
        }
    }
}

// Call optimization on load and resize
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// Export functions for global access
window.navigateToBuilder = navigateToBuilder;
