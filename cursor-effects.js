/**
 * Cursor Effects
 * Adds various custom cursor effects to enhance user experience
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursorEffects();
});

/**
 * Initialize custom cursor effects
 */
function initCursorEffects() {
    // Create cursor elements
    createCursorElements();
    
    // Add event listeners for mouse movement
    document.addEventListener('mousemove', updateCursorPosition);
    
    // Add hover effects for interactive elements
    addElementHoverEffects();
}

/**
 * Create custom cursor elements
 */
function createCursorElements() {
    // Create main cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Create trailing cursor effect
    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    document.body.appendChild(cursorTrail);
}

/**
 * Update cursor position based on mouse movement
 */
function updateCursorPosition(e) {
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (cursor && cursorTrail) {
        // Update main cursor position
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Update trail position with a slight delay
        setTimeout(() => {
            cursorTrail.style.left = `${e.clientX}px`;
            cursorTrail.style.top = `${e.clientY}px`;
        }, 100);
    }
}

/**
 * Add hover effects for interactive elements
 */
function addElementHoverEffects() {
    // Add hover effect for all links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .nav-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.custom-cursor');
            const cursorTrail = document.querySelector('.cursor-trail');
            
            if (cursor && cursorTrail) {
                cursor.classList.add('cursor-hover');
                cursorTrail.classList.add('trail-hover');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.custom-cursor');
            const cursorTrail = document.querySelector('.cursor-trail');
            
            if (cursor && cursorTrail) {
                cursor.classList.remove('cursor-hover');
                cursorTrail.classList.remove('trail-hover');
            }
        });
    });
    
    // Special effect for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add a glow effect when hovering over skills
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.classList.add('cursor-glow');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.classList.remove('cursor-glow');
            }
        });
    });
}

/**
 * Create cursor particle effect on click
 */
document.addEventListener('click', (e) => {
    // Create particle burst on click
    createParticles(e.clientX, e.clientY);
});

/**
 * Create particle burst effect
 */
function createParticles(x, y) {
    // Number of particles
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cursor-particle');
        
        // Random position offset from click point
        const offsetX = Math.random() * 150 - 75;
        const offsetY = Math.random() * 150 - 75;
        
        // Random size
        const size = Math.floor(Math.random() * 12) + 4;
        
        // Random color - use white particles for contrast against black background
        const colors = ['#FFFFFF', '#F5F5F5', '#EEEEEE', '#DDDDDD'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set particle properties
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        // Add to DOM
        document.body.appendChild(particle);
        
        // Animate the particle
        setTimeout(() => {
            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            particle.style.opacity = '0';
        }, 10);
        
        // Remove the particle after animation
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1000);
    }
}