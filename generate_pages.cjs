const fs = require('fs');

const template = fs.readFileSync('revuelto.html', 'utf8');

const cars = [
    { file: '296-speciale.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'FERRARI', newBrandTitle: 'Ferrari', newBrandCaps: 'FERRARI', origName: 'REVUELTO', newName: '296 SPECIALE', hp: '830 CV', speed: '330 km/h', engine: '3.0L V6 Hybrid', modelUrl: 'farrari.glb', image: 'https://images.unsplash.com/photo-1695627756184-75549007c04e?q=80&w=2000', color: '#D71920', vid: 'ferrari-bg.mp4', hq: 'Maranello', engineWord: 'V6' },
    { file: 'aston-martin.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'ASTON MARTIN', newBrandTitle: 'Aston Martin', newBrandCaps: 'ASTON MARTIN', origName: 'REVUELTO', newName: 'DB11', hp: '630 HP', speed: '322 km/h', engine: '5.2L V12', modelUrl: 'aston_martin_db11.glb', image: 'https://images.unsplash.com/photo-1628108101435-08e6789e9095?q=80&w=2000', color: '#006633', vid: 'aston-martin-bg.mp4', hq: 'Gaydon', engineWord: 'V12' },
    { file: 'bmw.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'BMW', newBrandTitle: 'BMW', newBrandCaps: 'BMW', origName: 'REVUELTO', newName: 'M5 CS', hp: '625 HP', speed: '305 km/h', engine: '4.4L V8 Twin-Turbo', modelUrl: '/models/bmw.glb', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2000', color: '#0066B1', vid: 'bmw-bg.mp4', hq: 'Munich', engineWord: 'V8' },
    { file: 'bugatti.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'BUGATTI', newBrandTitle: 'Bugatti', newBrandCaps: 'BUGATTI', origName: 'REVUELTO', newName: 'BOLIDE', hp: '1850 PS', speed: '500 km/h', engine: '8.0L W16', modelUrl: '2020_bugatti_bolide_concept.glb', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2000', color: '#0055FF', vid: 'bugatti-bg.mp4', hq: 'Molsheim', engineWord: 'W16' },
    { file: 'koenigsegg.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'KOENIGSEGG', newBrandTitle: 'Koenigsegg', newBrandCaps: 'KOENIGSEGG', origName: 'REVUELTO', newName: 'CC850', hp: '1385 HP', speed: '480+ km/h', engine: '5.0L V8 Twin-Turbo', modelUrl: '2023_koenigsegg_cc850.glb', image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000', color: '#FF9900', vid: 'koenigsegg-bg.mp4', hq: 'Ängelholm', engineWord: 'V8' },
    { file: 'mclaren.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'MCLAREN', newBrandTitle: 'McLaren', newBrandCaps: 'MCLAREN', origName: 'REVUELTO', newName: 'P1', hp: '916 PS', speed: '350 km/h', engine: '3.8L V8 Hybrid', modelUrl: 'mclaren_p1__www.vecarz.com (1).glb', image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2000', color: '#FF8000', vid: 'mclaren-bg.mp4', hq: 'Woking', engineWord: 'V8' },
    { file: 'pagani.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'PAGANI', newBrandTitle: 'Pagani', newBrandCaps: 'PAGANI', origName: 'REVUELTO', newName: 'ZONDA CINQUE', hp: '678 HP', speed: '350 km/h', engine: '7.3L AMG V12', modelUrl: '2010_pagani_zonda_cinque_roadster.glb', image: 'https://images.unsplash.com/photo-1614200171228-564539665bc8?q=80&w=2000', color: '#B0C4DE', vid: 'zonda-bg-new.mp4', hq: 'San Cesario sul Panaro', engineWord: 'V12' },
    { file: 'porsche.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'PORSCHE', newBrandTitle: 'Porsche', newBrandCaps: 'PORSCHE', origName: 'REVUELTO', newName: '911 GT3 RS', hp: '520 HP', speed: '312 km/h', engine: '4.0L Flat-6', modelUrl: 'porsche-911-gt3-rs (2).glb', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000', color: '#C0C0C0', vid: 'porsche-bg.mp4', hq: 'Stuttgart', engineWord: 'Flat-6' },
    { file: 'rimac.html', origBrandUpper: 'LAMBORGHINI', origBrandTitle: 'Lamborghini', newBrandUpper: 'RIMAC', newBrandTitle: 'Rimac', newBrandCaps: 'RIMAC', origName: 'REVUELTO', newName: 'NEVERA R', hp: '2107 HP', speed: '412 km/h', engine: 'Quad-Motor EV', modelUrl: 'rimac_nevera_r_2025__www.vecarz.com.glb', image: 'https://images.unsplash.com/photo-1592194996123-575084922123?q=80&w=2000', color: '#00D1FF', vid: 'rimac-bg.mp4', hq: 'Sveta Nedelja', engineWord: 'EV Motor' }
];

cars.forEach(car => {
    let html = template;
    html = html.replace(/LAMBORGHINI/g, car.newBrandUpper);
    html = html.replace(/Lamborghini/g, car.newBrandTitle);
    html = html.replace(/REVUELTO/g, car.newName);
    html = html.replace(/1000\+ CV/g, car.hp);
    html = html.replace(/350\+ km\/h/g, car.speed);
    html = html.replace(/Naturally Aspirated V12 Plug-In Hybrid/g, car.engine);
    html = html.replace(/lamborghini_aventador\.glb/g, car.modelUrl);
    html = html.replace(/ferrari_revuelto_concept_generated\.png/g, car.image);
    html = html.replace(/#FF8C00/g, car.color);
    html = html.replace(/lamborghini-bg\.mp4/g, car.vid);
    html = html.replace(/revuelto_bg\.mp4/g, car.vid);
    html = html.replace(/Sant\'Agata Bolognese/g, car.hq);
    html = html.replace(/V12/g, car.engineWord);
    
    fs.writeFileSync(car.file, html, 'utf8');
    console.log(`Generated ${car.file}`);
});
console.log('All 9 model pages have been entirely cloned and re-staged beautifully.');
