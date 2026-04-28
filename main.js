import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // 1. LENIS SMOOTH SCROLL (The Foundation)
    const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GLOBAL SECTION TRANSITIONS (Ferrari Style Depth)
    // Non-destructive: Only applies to sections found in the DOM
    const sections = document.querySelectorAll('section, .section');
    sections.forEach((sec, i) => {
        if (i < sections.length - 1) {
            gsap.to(sec, {
                scale: 0.9,
                opacity: 0,
                filter: "blur(15px)",
                scrollTrigger: {
                    trigger: sec,
                    start: "bottom bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });

    // 3. GLOBAL ELEMENT REVEALS (Fade + Slide)
    // Targeting headers, paragraphs, and cards
    const revealTargets = 'h1, h2, h3, .news-card, .model-card, .dark-card, .supercar-card';
    document.querySelectorAll(revealTargets).forEach((el) => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    // 4. IMAGE PARALLAX & ZOOM
    // All images found within sections get a subtle zoom-on-scroll
    document.querySelectorAll('section img, .section img').forEach((img) => {
        gsap.to(img, {
            scale: 1.15,
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 5. MENU OVERLAY (Retaining Existing Functionality)
    const menuTrigger = document.getElementById('menu-trigger');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuClose = document.getElementById('menu-close');

    if (menuTrigger && menuOverlay) {
        menuTrigger.addEventListener('click', () => {
            menuOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            gsap.from('.menu-nav a', { opacity: 0, x: -20, stagger: 0.1, delay: 0.3 });
        });
        menuClose.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // 6. HEADER DYNAMICS
    const header = document.querySelector('nav, # lam-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // 7. PAGE TRANSITION (Blur Reveal on Load)
    gsap.from('body', {
        filter: "blur(10px)",
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });

    // 8. GLOBAL RANDOM HOVER COLORS & 3D TITLES
    setupGlobalVisualEffects();
});

// Implementation of global 3D Title and randomized text-hover color styling + Zoom/Border
function setupGlobalVisualEffects() {
    // Inject global styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* 3D Title Effect Base */
        h1, h2, h3, h4,
        .hero-title, .section-title, .supercar-title, 
        .hero-title-large, .kings-title, .about-title, 
        .section-headline, .card-brand-name, .exp-heading, .pre-logo {
            text-shadow: 
                -1px -1px 0 rgba(255,255,255,0.1),
                1px 1px 0 rgba(0,0,0,0.8),
                2px 2px 0 rgba(0,0,0,0.7),
                3px 3px 0 rgba(0,0,0,0.6),
                4px 4px 6px rgba(0,0,0,0.5) !important;
        }
        
        /* Smooth transition for all target elements */
        p, a, span, li, h1, h2, h3, h4, h5, h6, button, .btn, .nav-logo, .hero-sub, .about-body, .card-brand-name {
            transition: color 0.3s ease, transform 0.3s ease, outline 0.3s ease, text-shadow 0.3s ease, filter 0.3s ease !important;
            /* adding will-change for smooth scaling */
            will-change: transform;
        }
    `;
    document.head.appendChild(style);

    const colors = ['#D71920', '#2E8B57', '#1E90FF', '#FF8C00', '#FF1493', '#00CED1', '#9400D3', '#00FF7F', '#FFD700'];
    const targetSelectors = 'p, a, li, h1, h2, h3, h4, h5, h6, button, .btn, .nav-logo, .hero-sub, .about-body, .card-brand-name';

    document.body.addEventListener('mouseover', (e) => {
        const target = e.target.closest(targetSelectors);
        
        if (target) {
            // Apply Zoom
            target.style.setProperty('transform', 'scale(1.05)', 'important');
            
            // Apply Red Border (Outline used to prevent layout shifts)
            target.style.setProperty('outline', '2px solid #D71920', 'important');
            target.style.setProperty('outline-offset', '4px', 'important');
            // Give it a subtle background to pop out
            target.style.setProperty('background', 'rgba(215, 25, 32, 0.05)', 'important');
            target.style.setProperty('border-radius', '4px', 'important');
            target.style.setProperty('z-index', '50', 'important');

            // Apply Random Text Color
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            if (typeof target.dataset.origColor === 'undefined') {
                target.dataset.origColor = target.style.color || '';
            }
            if (typeof target.dataset.origBg === 'undefined') {
                target.dataset.origBg = target.style.background || '';
            }
            
            target.style.setProperty('color', randomColor, 'important');
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        const target = e.target.closest(targetSelectors);
        if (target) {
            // Remove Zoom & Border
            target.style.removeProperty('transform');
            target.style.removeProperty('outline');
            target.style.removeProperty('outline-offset');
            target.style.removeProperty('border-radius');
            target.style.removeProperty('z-index');
            
            if (typeof target.dataset.origBg !== 'undefined') {
                if (target.dataset.origBg === '') {
                    target.style.removeProperty('background');
                } else {
                    target.style.setProperty('background', target.dataset.origBg, 'important');
                }
            }
            
            if (typeof target.dataset.origColor !== 'undefined') {
                if (target.dataset.origColor === '') {
                    target.style.removeProperty('color');
                } else {
                    target.style.setProperty('color', target.dataset.origColor, 'important');
                }
            }
        }
    });
}

