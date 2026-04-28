import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Gauge, ArrowRight, Layers, SlidersHorizontal, MousePointer2 } from 'lucide-react';
import { CARS } from '../data/cars';
import { carService } from '../api';

const CarsListing = () => {
  const [allCars, setAllCars] = useState(CARS);
  const [filteredCars, setFilteredCars] = useState(CARS);
  const [loading, setLoading] = useState(true);
  
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    carService.getAll().then(data => {
      if (data && data.length > 0) {
        setAllCars(data);
        setFilteredCars(data);
      }
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = allCars.filter(car => {
      const brandMatch = selectedBrand === 'All' || car.brand.toLowerCase() === selectedBrand.toLowerCase();
      const priceVal = car.price ? parseInt(car.price.replace(/[$,]/g, '')) : 0;
      const priceMatch = priceVal <= maxPrice;
      const searchMatch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return brandMatch && priceMatch && searchMatch;
    });
    setFilteredCars(filtered);
  }, [selectedBrand, maxPrice, searchQuery, allCars]);

  const brands = ['All', 'Lamborghini', 'Bugatti', 'Ferrari', 'BMW'];

  if (loading) return <div className="h-screen bg-white flex items-center justify-center text-black tracking-[1em] text-[12px] uppercase font-black uppercase">Establishing Visual Uplink...</div>;

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white pt-48 pb-24 min-h-screen text-black"
    >
      {/* High-Visibility Background Watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-black text-black/[0.08] pointer-events-none select-none uppercase italic leading-none z-0 tracking-tighter transition-all duration-1000 whitespace-nowrap">
         {selectedBrand === 'All' ? 'ZENT' : selectedBrand.substring(0, 4)}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-24">
        {/* Cinematic Header (High Visibility) */}
        <div className="mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 mb-12"
          >
             <div className="w-16 h-[2px] bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" />
             <p className="text-red-600 font-extrabold tracking-[0.6em] uppercase text-[11px]">The Boutique Selection</p>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[10vw] md:text-[7.5vw] font-black text-black leading-none uppercase italic tracking-tighter"
          >
            AVAILABLE <br /> <span className="text-black/10 uppercase drop-shadow-sm">PORTFOLIO</span>
          </motion.h1>
        </div>

        {/* ULTRA-VISIBLE FILTERS HUB */}
        <div className="mb-48 grid grid-cols-1 lg:grid-cols-12 gap-24 items-end">
           
           {/* 1. BRAND SLIDER (Large Sharp Contrast) */}
           <div className="lg:col-span-8">
              <div className="flex flex-col gap-12">
                 <div className="flex items-center justify-between border-b border-black/5 pb-4">
                    <span className="text-[11px] font-black uppercase tracking-[0.8em] text-black/40">MARQUE CATEGORY</span>
                    <span className="text-[11px] font-black text-white px-5 py-2 bg-red-600 rounded-none shadow-md">{selectedBrand}</span>
                 </div>
                 
                 <div className="relative flex items-center bg-black/[0.05] p-2 rounded-none group overflow-x-auto no-scrollbar border-2 border-black/5">
                    <div className="flex items-center gap-0 w-full">
                       {brands.map((brand) => (
                          <button 
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            className="relative flex-1 py-6 px-4 group/btn"
                          >
                             <span className={`relative z-10 text-[13px] font-black uppercase tracking-[0.5em] transition-all duration-700 whitespace-nowrap ${selectedBrand === brand ? 'text-white' : 'text-black/60 group-hover/btn:text-black'}`}>
                                {brand}
                             </span>
                             {selectedBrand === brand && (
                                <motion.div 
                                  layoutId="activeBrandPill"
                                  className="absolute inset-0 bg-red-600 shadow-[0_10px_30px_rgba(220,38,38,0.4)]"
                                  transition={{ type: 'spring', bounce: 0.1, duration: 0.6 }}
                                />
                             )}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* 2. PRICE RANGE SLIDER (HIGH VISIBILITY) */}
           <div className="lg:col-span-4">
              <div className="flex flex-col gap-12 bg-black/5 p-12 border-l-4 border-red-600 shadow-xl">
                 <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col gap-3">
                       <span className="text-[11px] font-black uppercase tracking-[0.8em] text-black/40">Price Threshold</span>
                       <span className="text-5xl font-black text-black italic tracking-tighter drop-shadow-md">${(maxPrice / 1000000).toFixed(1)}M</span>
                    </div>
                    <SlidersHorizontal size={24} className="text-red-600 mb-2" />
                 </div>

                 <div className="relative w-full py-6 group">
                    <div className="absolute top-1/2 left-0 w-full h-[4px] bg-black/10 -translate-y-1/2" />
                    <div 
                      className="absolute top-1/2 left-0 h-[5px] bg-red-600 -translate-y-1/2 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
                      style={{ width: `${(maxPrice / 10000000) * 100}%` }}
                    />
                    <input 
                      type="range" 
                      min="100000" 
                      max="10000000" 
                      step="100000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="relative z-10 w-full h-16 bg-transparent appearance-none cursor-pointer outline-none focus:ring-0
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 
                        [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:border-4 
                        [&::-webkit-slider-thumb]:border-red-600 [&::-webkit-slider-thumb]:hover:scale-125 transition-all
                        [&::-webkit-slider-thumb]:shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                    />
                    <div className="flex justify-between mt-8 text-[10px] font-black text-black/40 tracking-[0.6em] border-t border-black/5 pt-4">
                       <span>$100K</span>
                       <span>$10M+</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Search Integration (High Contrast Focus) */}
        <div className="mb-32 flex flex-col md:flex-row items-center justify-between border-b-2 border-black/10 pb-12 gap-10 focus-within:border-red-600 transition-all duration-700">
           <div className="flex items-center gap-10 w-full md:w-auto">
              <Search className="text-red-600" size={32} />
              <input 
                type="text" 
                placeholder="ENTER MODEL NAME..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-2xl md:text-3xl font-black uppercase tracking-[0.5em] placeholder:text-black/10 text-black outline-none w-full md:w-[600px] focus:placeholder:text-red-600/20"
              />
           </div>
           <p className="text-[12px] font-black uppercase tracking-[0.6em] text-black">
              LIVE RESULTS: <span className="text-red-600 bg-red-600/5 px-4 py-1 ml-2">{filteredCars.length}</span>
           </p>
        </div>

        {/* Global Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden bg-white">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car, index) => (
              <BoutiqueCard key={car._id || car.id} car={car} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredCars.length === 0 && (
           <div className="py-72 text-center flex flex-col items-center">
              <span className="w-1 h-32 bg-gradient-to-b from-red-600 to-transparent mb-12 shadow-[0_0_20px_rgba(220,38,38,0.3)]" />
              <h3 className="text-black/10 text-8xl font-black uppercase italic tracking-tighter mb-8 select-none">NOT FOUND</h3>
              <p className="text-red-600 hover:text-black transition-all text-sm uppercase font-black tracking-[0.8em] cursor-pointer bg-red-600/5 px-10 py-4" onClick={() => {setSelectedBrand('All'); setMaxPrice(10000000); setSearchQuery('')}}>Reset All Filters</p>
           </div>
        )}
      </div>
    </motion.main>
  );
};

const BoutiqueCard = ({ car, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
    className="group relative h-[650px] bg-white overflow-hidden flex flex-col justify-end p-12 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
  >
    {/* Visual Foundation */}
    <div className="absolute inset-0 z-0">
      <img 
        src={car.images?.hero || car.images?.thumbnail || car.images?.[0]} 
        className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.9] group-hover:scale-110 transition-all duration-[3s]" 
        alt={car.name}
      />
      {/* High Visibility Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-70 transition-all" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
    </div>

    {/* Typography & Actions */}
    <div className="relative z-10 translate-y-12 group-hover:translate-y-0 transition-all duration-[1.2s] ease-[0.19,1,0.22,1]">
      <div className="flex items-center gap-4 mb-6">
         <div className="w-8 h-px bg-red-600" />
         <span className="text-white font-black uppercase tracking-[0.6em] text-[10px]">{car.brand}</span>
      </div>
      <h3 className="text-5xl md:text-6xl font-black text-white uppercase italic leading-none mb-12 tracking-tighter drop-shadow-2xl">
         {car.name}
      </h3>
      
      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-[1s] delay-100 border-t border-white/30 pt-12">
         <div className="flex gap-12">
            <div className="flex flex-col gap-3">
               <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em]">MAX VELOCITY</span>
               <span className="text-lg font-black text-red-500 italic shadow-red-500/10 drop-shadow-md">{car.stats?.topSpeed || '---'}</span>
            </div>
            <div className="flex flex-col gap-3">
               <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em]">VALUATION</span>
               <span className="text-lg font-black text-white italic tracking-tighter drop-shadow-md">{car.price || 'P.O.A.'}</span>
            </div>
         </div>
         <Link to={`/car/${car.id || car._id}`} className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] text-white group/btn">
            EXPLORE
            <span className="w-14 h-14 rounded-full border-2 border-red-600/40 flex items-center justify-center group-hover/btn:bg-red-600 group-hover/btn:border-red-600 group-hover/btn:text-white transition-all shadow-xl">
               <ArrowRight size={24} />
            </span>
         </Link>
      </div>
    </div>

    {/* Big Corner Number (High Precision) */}
    <div className="absolute top-12 right-12 text-black/10 font-black italic text-8xl group-hover:text-red-600/10 transition-all duration-1000 z-10 mix-blend-difference">
       #{index + 1}
    </div>
  </motion.div>
);

export default CarsListing;
