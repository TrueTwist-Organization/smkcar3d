export const CARS = [
  {
    id: 'bugatti-bolide',
    name: 'Bugatti Bolide',
    brand: 'Bugatti',
    type: 'Track-Only Hypercar',
    price: '$4,700,000',
    stats: {
      engine: '8.0L W16 Quad-Turbo',
      horsepower: '1850 PS',
      topSpeed: '500+ KM/H',
      acceleration: '2.17s',
    },
    modelUrl: '/bugatti_bolide.glb',
    videos: {
      hero: '/bugatti-hero.mp4',
      engine: '/bugatti-engine.mp4'
    },
    images: {
      hero: '/bugatti-hero-bg.jpg',
      thumbnail: '/bugatti-thumbnail.jpg',
      gallery: [
         '/bugatti-gallery-1.jpg',
         '/bugatti-gallery-2.jpg'
      ]
    },
    description: 'The Bugatti Bolide is an absolute masterpiece of automotive engineering — an uncompromising hypercar designed exclusively for the track. Representing the pinnacle of the W16 era, it delivers performance that challenges the limits of physics.',
    features: ['Ultra-Lightweight Carbon Shell', 'Extreme Aerodynamics', 'W16 Performance Heritage', 'Track-Optimized Chassis']
  },
  {
    id: 'f80',
    name: 'Ferrari F80',
    brand: 'Ferrari',
    type: 'Hypercar',
    price: '$3,900,000',
    stats: {
      engine: '3.0L V6 Hybrid',
      horsepower: '1200 CV',
      topSpeed: '350 KM/H',
      acceleration: '2.1s',
    },
    modelUrl: 'https://raw.githubusercontent.com/pmndrs/drei-assets/master/ferrari.glb',
    images: {
      hero: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2000',
      thumbnail: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
      gallery: [
         'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
         'https://images.unsplash.com/photo-1544636331-e26879cd4d9b'
      ]
    },
    description: 'The Ferrari F80 is the new pinnacle of the Prancing Horse range, following the GTO, F40, and LaFerrari.',
    features: ['Formula 1 Hybrid Tech', 'Active Aerodynamics', 'Carbon Fiber Monocoque', 'Digital Cockpit']
  },
  {
    id: 'revuelto',
    name: 'Revuelto',
    brand: 'Lamborghini',
    type: 'Hybrid Supercar',
    price: '$608,358',
    stats: {
      engine: '6.5L V12 Hybrid',
      horsepower: '1015 CV',
      topSpeed: '350+ KM/H',
      acceleration: '2.5s',
    },
    videos: {
      hero: '/lamborghini-revuelto-hero.mp4',
      engine: '/lamborghini-engine.mp4'
    },
    images: {
      hero: '/lamborghini-hero-bg.jpg',
      thumbnail: '/lamborghini-thumbnail.jpg',
      gallery: [
         '/lamborghini-gallery-1.jpg',
         '/lamborghini-gallery-2.jpg'
      ]
    },
    description: 'The Lamborghini Revuelto is the first V12 hybrid plug-in HPEV super sports car from the Sant’Agata Bolognese brand. A masterpiece of aerospace-inspired design and brutal power, it represents a bold leap into the electrification era.',
    features: ['V12 Engine + 3 Motors', 'Carbon Monofuselage', 'Active Aerodynamics 2.0', 'Connected Telemetry']
  },
  {
    id: 'm5-showcase',
    name: 'M5 Competition',
    brand: 'BMW',
    type: 'Luxury performance',
    price: '$111,900',
    stats: {
      engine: '4.4L V8 Twin-Turbo',
      horsepower: '625 HP',
      topSpeed: '305 KM/H',
      acceleration: '3.0s',
    },
    modelUrl: '/models/bmw.glb',
    images: {
      hero: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000',
      thumbnail: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
      gallery: [
         'https://images.unsplash.com/photo-1555215695-3004980ad54e'
      ]
    },
    description: 'The quintessence of the performance sedan. Raw power meets Bavarian precision.',
    features: ['Adaptive M Suspension', 'M xDrive System', 'Carbon Ceramic Brakes', 'Exhaust Valve Control']
  }
];

export const BRANDS = [
  { name: 'Bugatti', logo: 'https://www.bugatti.com/logos/bugatti_logo.svg' },
  { name: 'Ferrari', logo: 'https://www.ferrari.com/favicon.ico' },
  { name: 'Lamborghini', logo: 'https://www.lamborghini.com/favicon.ico' }
];
