/* 
    SMK CAR MASTER DATA ENGINE 
    Primary Hypercar & Marque Registry
*/

const defaultBrands = [
    { id: 'lamborghini', name: 'Lamborghini', found: 1963, country: 'Italy', desc: 'The definition of wedge-shaped adrenaline and pure V12 aggression.', image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1500' },
    { id: 'bugatti', name: 'Bugatti', found: 1909, country: 'France', desc: 'The pinnacle of automotive engineering and absolute top speed.', image: 'assets/bugatti_bolide.png' },
    { id: 'mclaren', name: 'McLaren', found: 1963, country: 'UK', desc: 'Surgical precision. Formula One DNA unleashed on the streets.', image: 'assets/mclaren_p1.png' },
    { id: 'aston-martin', name: 'Aston Martin', found: 1913, country: 'UK', desc: 'Elegance meets power. The choice of icons.', image: 'assets/db11_premium.png' },
    { id: 'koenigsegg', name: 'Koenigsegg', found: 1994, country: 'Sweden', desc: 'The ghost squadron. Defying physics with every Jesko and Regera.', image: 'assets/cc850_premium.png' },
    { id: 'pagani', name: 'Pagani', found: 1992, country: 'Italy', desc: 'Art on wheels. Horacio Pagani\'s vision of aerodynamic beauty.', image: 'assets/zonda_cinque.png' },
    { id: 'maserati', name: 'Maserati', found: 1914, country: 'Italy', desc: 'Luxury in every roar. The trident of performance.', image: 'https://images.unsplash.com/photo-1510443905545-0dcf85b2e3ac?auto=format&fit=crop&q=80&w=1500' }
];

const defaultCars = [
    // LAMBORGHINI RANGE
    { 
        id: 'revuelto', name: 'Revuelto', brand: 'lamborghini', category: 'Range', 
        price: '$608,358', image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1500&auto=format&fit=crop', modelUrl: 'lamborghini_aventador.glb',
        specifications: { engine: '6.5L V12 Hybrid', horsepower: '1015 CV', acceleration: '2.5 s', topSpeed: '350 km/h' },
        videos: { hero: 'revuelto_sound_bg.mp4', engine: 'new_engine_video.mp4', chassis: 'revuelto-chassis-video.mp4' }
    },

    // BUGATTI RANGE
    { 
        id: 'bolide', name: 'Bolide Concept', brand: 'bugatti', category: 'Track-Only', 
        price: '$4.7 million', image: 'assets/bugatti_bolide.png', 
        modelUrl: 'bugatti_bolide.glb',
        specifications: { engine: '8.0L W16 Quad-Turbo', horsepower: '1850 PS', acceleration: '2.17 s', topSpeed: '500 km/h' },
        marketing: {
            introDesc: 'The Bugatti Bolide represents the ultimate expression of raw performance and aerodynamic excellence. Engineered as a track-only hypercar, it pushes the limits of what is possible with internal combustion technology.',
            galleryVid: 'bugatti-chassis-video.mp4'
        },
        videos: { hero: 'bugatti-main-bg.mp4', engine: 'bugatti_bg.mp4', chassis: 'bugatti-chassis-video.mp4' },
        images: { gallery: ['bugatti-divo-poster.jpg', 'bugatti-stats-bg.jpg'] }
    },

    // MCLAREN RANGE
    { 
        id: 'mclaren-p1', name: 'McLaren P1', brand: 'mclaren', category: 'Hypercars', 
        price: '$1.15 million', image: 'assets/mclaren_p1.png', 
        modelUrl: 'mclaren_p1__www.vecarz.com (1).glb',
        specifications: { engine: '3.8L V8 TWIN-TURBO HYBRID', horsepower: '903 PS', acceleration: '2.8 s', topSpeed: '350 km/h' },
        marketing: {
            powertrainLabel: 'POWERTRAIN',
            powertrainTitle: '3.8L V8 + HYBRID PERFORMANCE',
            powertrainEngine: '3.8L V8 TWIN-TURBO HYBRID',
            powertrainHP: '903 PS MAXIMUM POWER OUTPUT',
            powertrainCTA: 'DISCOVER ENGINEERING',
            powertrainVid: 'mclaren-powertrain.mp4',
            powertrainDetail: 'The McLaren P1™ was the first of a new breed of hypercar, a car that would redefine the limits of performance. Built on decades of racing innovation, it delivers an extraordinary balance of power, precision, and efficiency.',
            powertrainModalBg: 'mclaren-intro.jpg',
            architectureVid: 'mclaren-chassis.mp4',
            galleryVid: 'mclaren-engine.mp4',
            introLabel: 'McLaren Automotive',
            introTitle: 'McLaren P1',
            introImg: 'mclaren-intro.jpg',
            introDesc: 'The McLaren P1 represents the pinnacle of hybrid hypercar engineering, combining cutting-edge technology with relentless performance.',
            perfLabel: 'PERFORMANCE'
        },
        videos: { hero: 'mclaren-hero-new.mp4', engine: 'mclaren-engine.mp4', chassis: 'mclaren-chassis.mp4' },
        images: { gallery: ['mclaren-intro.jpg', 'mclaren-modal-bg.jpg'] }
    },

    // ASTON MARTIN RANGE
    { 
        id: 'db11', name: 'DB11 V12', brand: 'aston-martin', category: 'GT', 
        price: '$245,000', image: 'assets/db11_premium.png', 
        modelUrl: 'aston_martin_db11.glb',
        specifications: { engine: '5.2L V12 TWIN-TURBO', horsepower: '600 hp', acceleration: '3.9 s', topSpeed: '322 km/h' },
        videos: { hero: 'db11-hero.mp4', engine: 'db11-rush.mp4', chassis: 'db11-architecture.mp4' },
        marketing: {
            introLabel: 'Aston Martin',
            introTitle: 'ASTON MARTIN DB11',
            introImg: 'db11-intro.jpg',
            introDesc: 'The Aston Martin DB11 represents the perfect fusion of timeless design, advanced engineering, and grand touring performance.',
            perfLabel: 'PERFORMANCE',
            designVid: 'aston_456.mp4',
            powertrainLabel: 'POWERTRAIN',
            powertrainTitle: '5.2L V12 TWIN-TURBO PERFORMANCE',
            powertrainDesc: 'CRAFTED ON PAPER,<br>REFINED ON THE ROAD',
            powertrainVid: 'db11-powertrain.mp4',
            architectureVid: 'db11-architecture.mp4',
            galleryVid: 'db11-gall-vid.mp4',
            powertrainCTA: 'DISCOVER ENGINEERING',
            powertrainDetail: 'At the heart of the DB11 lies a 5.2-liter V12 twin-turbocharged engine, engineered to deliver effortless performance and refined power.'
        },
        images: { gallery: ['db11-gall-1.jpg', 'db11-gall-2.jpg'] }
    },

    // KOENIGSEGG RANGE
    { 
        id: 'cc850', name: 'CC850', brand: 'koenigsegg', category: 'Hypercars', 
        price: '$3.65 million', image: 'assets/cc850_premium.png', 
        modelUrl: '2023_koenigsegg_cc850.glb',
        specifications: { engine: '5.0L V8 TWIN-TURBO', horsepower: '1385 hp', acceleration: '2.5 s', topSpeed: '450 km/h' },
        videos: { hero: 'cc850-hero.mp4', engine: 'cc850-rush.mp4', chassis: 'cc850-architecture.mp4' },
        marketing: {
            introLabel: 'Koenigsegg',
            introTitle: 'KOENIGSEGG CC850',
            introImg: 'cc850-intro.jpg',
            introDesc: 'The CC850 is a homage to the original CC8S, blending timeless aesthetics with groundbreaking technology like the Engage Shift System (ESS).',
            designVid: 'koenigsegg_678.mp4',
            perfLabel: 'PERFORMANCE',
            powertrainLabel: 'POWERTRAIN',
            powertrainTitle: '5.0L V8 TWIN-TURBO PERFORMANCE',
            powertrainDesc: 'ENGINEERED ON PAPER,<br>UNLEASHED ON THE ROAD',
            powertrainVid: 'cc850-powertrain.mp4',
            powertrainCTA: 'DISCOVER ENGINEERING',
            powertrainDetail: 'At the heart of the CC850 lies a highly advanced 5.0-liter V8 twin-turbocharged engine, developed entirely in-house by Koenigsegg.',
            stats: [
                { val: '5.0L V8 TWIN-TURBOCHARGED', label: 'POWERTRAIN' },
                { val: '~2.3 s', label: '0–100 KM/H' },
                { val: '1.0 kg/hp', label: 'POWER-TO-WEIGHT' },
                { val: '1385 HP', label: 'POWER OUTPUT' }
            ],
            architectureVid: 'cc850-architecture.mp4',
            galleryVid: 'cc850-gall-vid.mp4'
        },
        images: { gallery: ['cc850-intro.jpg', 'cc850-intro.jpg'] }
    },

    // PAGANI RANGE
    { 
        id: 'zonda-cinque', name: 'Zonda Cinque Roadster', brand: 'pagani', category: 'Hypercars', 
        price: '$2.0 million', image: 'assets/zonda_cinque.png', 
        modelUrl: '2010_pagani_zonda_cinque_roadster.glb',
        specifications: { engine: '7.3L AMG V12', horsepower: '678 hp', acceleration: '3.4 s', topSpeed: '350 km/h' },
        videos: { hero: 'pagani_bg.mp4', engine: 'zonda_engine_rush.mp4', chassis: 'zonda_architecture_video.mp4' },
        marketing: {
            introLabel: 'Pagani Automobili',
            introTitle: 'ZONDA CINQUE ROADSTER',
            introImg: 'zonda_intro_bg.jpg',
            introDesc: 'The Pagani Zonda Cinque Roadster is not just a car—it’s a rare piece of automotive art, engineering brilliance, and extreme performance.',
            designVid: 'pagani_654.mp4',
            powertrainVid: 'zonda_powertrain_video.mp4',
            architectureVid: 'zonda_architecture_video.mp4'
        },
        images: { gallery: ['zonda_intro_bg.jpg', 'assets/zonda_cinque.png'] }
    },
];

/* Error-safe local storage retrieval */
const getSafeData = (key, fallback) => {
    try {
        const item = localStorage.getItem(key);
        if (item) {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.warn(`LocalStorage Parse Error for ${key}, falling back to defaults.`);
    }
    return fallback;
};

const db = {
    getBrands: () => getSafeData('smk car_brands', defaultBrands),
    getCars: () => getSafeData('smk car_cars', defaultCars),
    saveBrands: (data) => {
        try { localStorage.setItem('smk car_brands', JSON.stringify(data)); } catch (e) { console.warn('Could not save to localStorage'); }
    },
    saveCars: (data) => {
        try { localStorage.setItem('smk car_cars', JSON.stringify(data)); } catch (e) { console.warn('Could not save to localStorage'); }
    }
};

/* FORCE INITIALIZATION TO FIX CORRUPTED CACHES */
try {
    // Force refresh to apply updated image URLs
    // Force refresh to apply updated image URLs
    // Force refresh to apply updated image URLs
    // Force refresh to apply updated image URLs
    // Force refresh to apply updated image URLs
    const CACHE_VERSION = 'v142_full_asset_sync_final';
    if (localStorage.getItem('smk car_cache_version') !== CACHE_VERSION) {
        localStorage.removeItem('smk car_brands');
        localStorage.removeItem('smk car_cars');
        db.saveBrands(defaultBrands);
        db.saveCars(defaultCars);
        localStorage.setItem('smk car_cache_version', CACHE_VERSION);
    }
    if (!localStorage.getItem('smk car_brands') || localStorage.getItem('smk car_brands') === '[object Object]') {
        db.saveBrands(defaultBrands);
    }
    if (!localStorage.getItem('smk car_cars') || localStorage.getItem('smk car_cars') === '[object Object]') {
        db.saveCars(defaultCars);
    }
} catch (e) { }

// Make it universally available (browser environment)
window.db = db;
