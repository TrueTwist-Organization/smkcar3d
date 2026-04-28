import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CARS } from '../data/cars';
import { Plus, X, ArrowRight, Gauge, Zap, Car, DollarSign } from 'lucide-react';

const ComparePage = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleCar = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedCars = selectedIds.map(id => CARS.find(c => c.id === id));

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen"
    >
      {/* Header */}
      <div className="max-w-[1440px] mx-auto mb-16 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-luxury-gold font-black tracking-[0.3em] uppercase text-xs mb-4"
        >
          Analysis Suite
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-black text-white leading-tight uppercase"
        >
          DUEL OF <span className="text-luxury-gold text-glow">PERFECTON</span>
        </motion.h1>
      </div>

      {/* Car Selector Grid */}
      <div className="max-w-[1440px] mx-auto mb-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARS.map((car) => (
               <button 
                 key={car.id} 
                 onClick={() => toggleCar(car.id)}
                 className={`relative aspect-video rounded-none overflow-hidden transition-all duration-300 border-2 ${selectedIds.includes(car.id) ? 'border-luxury-gold scale-105' : 'border-white/10 opacity-40 hover:opacity-100 hover:border-white/30'}`}
               >
                  <img src={car.images.thumbnail} alt={car.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
                     <p className="text-[10px] text-luxury-gold font-black uppercase tracking-widest mb-1">{car.brand}</p>
                     <h3 className="text-white font-black uppercase text-center">{car.name}</h3>
                     {selectedIds.includes(car.id) && (
                        <div className="absolute top-2 right-2 bg-luxury-gold text-black rounded-full p-1">
                           <X size={12} strokeWidth={4} />
                        </div>
                     )}
                  </div>
               </button>
            ))}
         </div>
         <p className="mt-8 text-center text-white/20 text-[10px] uppercase font-black tracking-widest underline cursor-pointer hover:text-luxury-gold" onClick={() => setSelectedIds([])}>
            Reset selection ({selectedIds.length}/3)
         </p>
      </div>

      {/* Comparison Table */}
      <AnimatePresence mode="wait">
         {selectedCars.length > 0 ? (
            <motion.div 
               key="table"
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="max-w-[1440px] mx-auto overflow-x-auto"
            >
               <table className="w-full bg-luxury-800 border-collapse">
                  <thead>
                     <tr>
                        <th className="p-10 text-left border border-white/5 w-64 bg-black/40">
                           <h4 className="text-white/20 text-xs tracking-widest font-black uppercase">Comparing specifications</h4>
                        </th>
                        {selectedCars.map((car) => (
                           <th key={car.id} className="p-10 border border-white/5 bg-luxury-900">
                              <div className="flex flex-col items-center text-center">
                                 <img src={car.images.thumbnail} alt={car.name} className="w-48 h-32 object-cover mb-6 border border-white/10" />
                                 <p className="text-luxury-gold text-[10px] font-black uppercase tracking-widest mb-1">{car.brand}</p>
                                 <h3 className="text-white text-3xl font-black uppercase">{car.name}</h3>
                              </div>
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     <CompareRow label="Marque" icon={<Award size={16} />} data={selectedCars.map(c => c.brand)} />
                     <CompareRow label="Category" icon={<Car size={16} />} data={selectedCars.map(c => c.type)} />
                     <CompareRow label="Price Point" icon={<DollarSign size={16} />} data={selectedCars.map(c => c.price)} />
                     <CompareRow label="Powertrain" icon={<Zap size={16} />} data={selectedCars.map(c => c.stats.engine)} />
                     <CompareRow label="Output" icon={<Award size={16} />} data={selectedCars.map(c => c.stats.horsepower)} />
                     <CompareRow label="Max Speed" icon={<Gauge size={16} />} data={selectedCars.map(c => c.stats.topSpeed)} />
                     <CompareRow label="0-100 kM/H" icon={<Zap size={16} />} data={selectedCars.map(c => c.stats.acceleration)} />
                     <tr>
                        <td className="p-10 border border-white/5 bg-black/20 text-white/10 uppercase font-black text-xs tracking-widest italic">Action</td>
                        {selectedCars.map((car) => (
                           <td key={car.id} className="p-10 border border-white/5 text-center">
                              <Link to={`/car/${car.id}`} className="btn-outline-gold !px-6 !py-2 !text-[10px]">VEHICLE DETAILS</Link>
                           </td>
                        ))}
                     </tr>
                  </tbody>
               </table>
            </motion.div>
         ) : (
            <motion.div 
               key="empty"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="max-w-[1440px] mx-auto py-40 border border-dashed border-white/10 text-center"
            >
               <h3 className="text-white/20 text-2xl font-black uppercase tracking-widest mb-4">Select models to compare performance</h3>
               <p className="text-luxury-gold text-xs tracking-widest uppercase font-bold animate-pulse">Waiting for selection...</p>
            </motion.div>
         )}
      </AnimatePresence>
    </motion.main>
  );
};

const CompareRow = ({ label, icon, data }) => (
   <tr>
      <td className="p-10 border border-white/5 bg-black/20">
         <div className="flex items-center gap-4 text-white/40">
            <span className="text-luxury-gold opacity-50">{icon}</span>
            <span className="text-xs uppercase tracking-[0.2em] font-black">{label}</span>
         </div>
      </td>
      {data.map((val, i) => (
         <td key={i} className="p-10 border border-white/5 text-center text-white font-heading font-black tracking-widest text-lg">
            {val}
         </td>
      ))}
   </tr>
);

const Award = ({ size, className, opacity }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} opacity={opacity}>
      <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
   </svg>
);

export default ComparePage;
