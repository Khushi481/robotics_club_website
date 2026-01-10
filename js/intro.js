/**
 * Cinematic Intro - Interactive Mesh Background, Kinetic Typography, and Liquid Transition
 */

class CinematicIntro {
    constructor() {
        this.canvas = document.getElementById('mesh-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.gradients = [];
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createGradients();
        this.setupMouseTracking();
        this.animate();
        this.startTypographySequence();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    createGradients() {
        // High-end Cyberpunk Palette
        this.gradients = [
            { x: 0.1, y: 0.1, color: '#00f3ff', radius: 0.5 }, // Cyan
            { x: 0.8, y: 0.2, color: '#ff00cc', radius: 0.45 }, // Magenta
            { x: 0.3, y: 0.7, color: '#7000ff', radius: 0.5 }, // Electric Purple
            { x: 0.8, y: 0.8, color: '#0066cc', radius: 0.4 }, // Deep Blue
            { x: 0.5, y: 0.4, color: '#ffffff', radius: 0.2 }  // White Glow
        ];
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.targetMouse.x = e.clientX;
            this.targetMouse.y = e.clientY;
        });
    }

    animate() {
        // Smooth cursor following
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.04;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.04;

        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.gradients.forEach((grad, index) => {
            const offsetX = (this.mouse.x - window.innerWidth / 2) * 0.015 * (index + 1);
            const offsetY = (this.mouse.y - window.innerHeight / 2) * 0.015 * (index + 1);

            const x = (grad.x * this.canvas.width) + offsetX;
            const y = (grad.y * this.canvas.height) + offsetY;
            const radius = grad.radius * Math.max(this.canvas.width, this.canvas.height);

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, `${grad.color}30`);
            gradient.addColorStop(0.5, `${grad.color}10`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        });

        requestAnimationFrame(() => this.animate());
    }

    startTypographySequence() {
        if (typeof gsap === 'undefined') {
            setTimeout(() => this.startTypographySequence(), 100);
            return;
        }

        const tl = gsap.timeline();

        // Reveal full name
        tl.from('.intro-word', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        });

        tl.to({}, { duration: 1.5 });

        // Pre-capture letter elements and their screen positions to ensure absolute smoothness
        const letterIds = ['letter-n', 'letter-i', 'letter-t', 'letter-p'];
        const letterElements = letterIds.map(id => document.getElementById(id));

        // Capture INITIAL positions
        const initialPositions = letterElements.map(el => {
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        });

        // Phase 1: Fade suffixes gracefully
        tl.to('.suffix', {
            opacity: 0,
            y: -10,
            duration: 0.5,
            ease: 'power3.in',
            stagger: 0.02
        });

        // Phase 2: Glide N, I, T, P to center - LIQUID SMOOTH
        tl.add(() => {
            const screenCenterX = window.innerWidth / 2;
            const screenCenterY = window.innerHeight / 2;
            const letterSpacing = 65; // Elegant spacing
            const totalWidth = (letterElements.length - 1) * letterSpacing;
            const targetStartX = screenCenterX - (totalWidth / 2);

            const glideTl = gsap.timeline();

            letterElements.forEach((el, index) => {
                if (!el || !initialPositions[index]) return;

                // Absolute target for this letter
                const targetX = targetStartX + (index * letterSpacing);
                const targetY = screenCenterY;

                // Sync current position to fixed point to avoid layout shift glitches
                const startPos = initialPositions[index];

                glideTl.to(el, {
                    x: targetX - startPos.x,
                    y: targetY - startPos.y,
                    scale: 1.2,
                    fontWeight: 900,
                    duration: 1.3,
                    ease: 'expo.inOut', // Highest quality smooth motion
                    color: '#00f3ff',
                    textShadow: '0 0 30px #00f3ff',
                    zIndex: 100
                }, 0);
            });

            // Simultaneously hide residues WITHOUT causing a jump
            glideTl.to('.suffix, .intro-word:not(:has(.highlight)), .intro-letter:not(.highlight)', {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            }, 0);

            return glideTl;
        }, '-=0.3');

        // Phase 3: Transition to Branding Reveal
        tl.add(() => this.showBranding(), '+=0.2');
    }

    showBranding() {
        const tl = gsap.timeline();

        // Position branding reveal and kinetic letters to overlap
        tl.set('#branding-reveal', { visibility: 'visible', opacity: 0 });

        // 1. Move everything TOGETHER
        tl.to('.intro-letter.highlight', {
            y: -100, // Move kinetic letters up as they fade
            opacity: 0,
            duration: 0.8,
            ease: 'expo.inOut'
        });

        // 2. Fade in all branding elements TOGETHER
        tl.to('#branding-reveal', {
            opacity: 1,
            duration: 0.8,
            ease: 'expo.inOut'
        }, '<');

        tl.from(['#logo-robotics-row', '#nitp-text'], {
            scale: 0.9,
            opacity: 0,
            stagger: 0, // NO STAGGER - all together
            duration: 0.8,
            ease: 'expo.out'
        }, '<');

        // Decrease wait time as requested
        tl.to({}, { duration: 1.2 });

        // Start liquid wavy transition
        tl.add(() => this.liquidWavyTransition());
    }

    liquidWavyTransition() {
        const intro = document.getElementById('cinematic-intro');
        const tl = gsap.timeline({
            onComplete: () => {
                window.scrollTo(0, 0); // Force top of page
                document.body.classList.remove('intro-active');
                document.body.classList.add('intro-complete');
                // Signal for other scripts (like home.js) that it's safe to start
                document.dispatchEvent(new CustomEvent('introFinished'));
                setTimeout(() => intro.remove(), 500);
            }
        });

        // Exit EVERYTHING together
        tl.to(['#mesh-canvas', '#film-grain', '#branding-reveal', intro], {
            y: -window.innerHeight,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.inOut'
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        handleIntroInit();
    });
} else {
    handleIntroInit();
}

function handleIntroInit() {
    const introPlayed = sessionStorage.getItem('introPlayed');
    const introSection = document.getElementById('cinematic-intro');

    if (!introPlayed) {
        // First time in this session - Play Intro
        new CinematicIntro();
        sessionStorage.setItem('introPlayed', 'true');
    } else {
        // Already played - Skip Intro immediately
        if (introSection) introSection.remove();
        document.body.classList.remove('intro-active');
        document.body.classList.add('intro-complete');
        // Still dispatch event so other scripts (like home.js) start correctly
        document.dispatchEvent(new CustomEvent('introFinished'));
    }
}
