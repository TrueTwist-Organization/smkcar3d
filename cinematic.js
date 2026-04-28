/**
 * SMK CAR CINEMATIC ENGINE v1.0
 * Ultra-Premium Ferrari-style scroll animations.
 * Non-destructive animation layer.
 */

(function() {
    // 1. DYNAMIC DEPENDENCY LOADER (with existing check)
    const scripts = [
        { name: 'gsap', src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" },
        { name: 'ScrollTrigger', src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" },
        { name: 'Lenis', src: "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/dist/lenis.min.js" }
    ];

    let loadedCount = 0;
    
    function checkAndLoad() {
        const toLoad = scripts.filter(s => {
            if (s.name === 'gsap' && window.gsap) return false;
            if (s.name === 'ScrollTrigger' && window.ScrollTrigger) return false;
            if (s.name === 'Lenis' && window.Lenis) return false;
            return true;
        });

        if (toLoad.length === 0) return initCinematic();

        toLoad.forEach(s => {
            const el = document.createElement('script');
            el.src = s.src;
            el.onload = () => {
                loadedCount++;
                if (loadedCount === toLoad.length) initCinematic();
            };
            document.head.appendChild(el);
        });
    }

    checkAndLoad();

    function initCinematic() {
        gsap.registerPlugin(ScrollTrigger);

        // a. LENIS SMOOTH SCROLL (Inertia)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // b. SECTION DEPTH TRANSITIONS
        const sections = document.querySelectorAll('section, .section, .supercar-section, .experience-section');
        sections.forEach((sec, i) => {
            if (i < sections.length - 1) {
                gsap.to(sec, {
                    scale: 0.85,
                    opacity: 0,
                    filter: "blur(20px)",
                    scrollTrigger: {
                        trigger: sec,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });

        // c. ELEMENT REVEALS (Headers, P, Buttons, Cards)
        const targets = 'h1, h2, h3, h4, .about-text, .dark-card, .supercar-card, .btn-primary, .grid-layout > div';
        document.querySelectorAll(targets).forEach(el => {
            gsap.from(el, {
                y: 50,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });
        });

        // d. IMAGE PARALLAX SCALE
        document.querySelectorAll('img').forEach(img => {
            if (img.parentElement.offsetHeight > 200) { // Only for large-ish images
                gsap.to(img, {
                    scale: 1.2,
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });

        // e. NAV DINAMISM
        const nav = document.querySelector('nav, #navbar');
        if (nav) {
            window.addEventListener('scroll', () => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
            });
        }

        // f. INITIAL LOAD BLUR REVEAL
        gsap.from('body', {
            filter: "blur(20px)",
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        });

        /* NEW: Global Visibility Optimizations */
        setupVisibilityObservers();

        // g. GLOBAL VISUAL EFFECTS - Run during idle time to prevent blocking
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => setupGlobalVisualEffects());
        } else {
            setTimeout(setupGlobalVisualEffects, 1000);
        }
    }

    function setupVisibilityObservers() {
        // 1. Video Observer (Play only when visible)
        const videoObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.play().catch(() => {});
                else entry.target.pause();
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('video').forEach(v => {
            // Skip videos that are meant to be controlled manually or special cases
            if (v.hasAttribute('autoplay')) videoObs.observe(v);
        });

        // 2. Model-Viewer Observer (Lazy reveal)
        const modelObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeof entry.target.dismissPoster === 'function') entry.target.dismissPoster();
                    modelObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('model-viewer').forEach(m => {
            m.setAttribute('loading', 'lazy');
            m.setAttribute('reveal', 'manual');
            modelObs.observe(m);
        });
    }

    // Implementation of global 3D Title and randomized text-hover color styling + Zoom/Border
    function setupGlobalVisualEffects() {
        // Inject global styles
        const style = document.createElement('style');
        style.innerHTML = `
            /* 3D Title Effect Base - Optimized */
            h1, h2, h3, h4,
            .hero-title, .section-title, .supercar-title, 
            .hero-title-large, .kings-title, .about-title, 
            .section-headline, .card-brand-name, .exp-heading, .pre-logo {
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3) !important;
            }
            
            /* Global Performance: Section Containment */
            section, .section, .supercar-section {
                content-visibility: auto;
                contain-intrinsic-size: 1px 1000px;
            }

            /* Smooth transition for all target elements */
            a, button, .btn, .nav-logo {
                transition: color 0.3s ease, transform 0.3s ease, outline 0.3s ease, filter 0.3s ease !important;
                will-change: transform;
            }

            /* Optimized Hover using CSS instead of heavy JS listeners where possible */
            .hover-effect-active {
                transform: scale(1.05) !important;
                outline: 2px solid #D71920 !important;
                outline-offset: 4px !important;
                background: rgba(215, 25, 32, 0.05) !important;
                border-radius: 4px !important;
                z-index: 50 !important;
            }

            /* NEW: Container Highlight Box (Unified Red Border) */
            .highlight-box {
                transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                border: 1px solid transparent;
                padding: 30px;
                margin: -30px; /* offset padding */
                border-radius: 12px;
                cursor: default;
            }
            .highlight-box:hover {
                border-color: #D71920;
                background: rgba(215, 25, 32, 0.03);
                box-shadow: 0 0 30px rgba(215, 25, 32, 0.1);
                transform: scale(1.01);
            }
            @media (max-width: 768px) {
                .highlight-box { padding: 15px; margin: -15px; }
            }
        `;
        document.head.appendChild(style);

        const colors = ['#D71920', '#2E8B57', '#1E90FF', '#FF8C00', '#FF1493', '#00CED1', '#9400D3', '#00FF7F', '#FFD700'];
        // Removed p, h1, h2 etc to prevent individual word/line zooming inside blocks
        const targetSelectors = 'a, button, .btn, .nav-logo, .card-brand-name';

        document.body.addEventListener('mouseover', (e) => {
            const target = e.target.closest(targetSelectors);
            if (target) {
                target.classList.add('hover-effect-active');
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                if (typeof target.dataset.origColor === 'undefined') {
                    target.dataset.origColor = target.style.color || '';
                }
                target.style.setProperty('color', randomColor, 'important');
            }
        });

        document.body.addEventListener('mouseout', (e) => {
            const target = e.target.closest(targetSelectors);
            if (target) {
                target.classList.remove('hover-effect-active');
                if (typeof target.dataset.origColor !== 'undefined') {
                    if (target.dataset.origColor === '') target.style.removeProperty('color');
                    else target.style.setProperty('color', target.dataset.origColor, 'important');
                }
            }
        });
    }

    // h. BFCache / Back Button Cleanup
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            // Restore visibility if coming back from cache
            const loaders = document.querySelectorAll('#preloader, #page-loader, .preloader, .loader-wrapper');
            loaders.forEach(loader => {
                loader.style.display = 'none';
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            });
            document.body.style.overflow = 'auto';
            document.body.style.opacity = '1';
            document.body.style.filter = 'none';
        }
    });

})();
