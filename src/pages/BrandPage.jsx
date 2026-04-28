import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CARS, BRANDS } from '../data/cars';
import { ArrowLeft, ChevronRight, History, Globe, Zap } from 'lucide-react';

const BrandPage = () => {
  const { brand } = useParams();
  const brandData = BRANDS.find(b => b.name.toLowerCase() === brand.toLowerCase()) || { name: brand };
  const brandCars = CARS.filter(c => c.brand.toLowerCase() === brand.toLowerCase());

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black pt-24"
    >
      {/* Brand Hero */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
           <span className="text-[25vw] font-black uppercase text-white leading-none whitespace-nowrap -translate-x-1/2 absolute top-1/2 left-1/2 -translate-y-1/2">
              {brandData.name}
           </span>
        </div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-32 h-32 mb-12 flex items-center justify-center p-6 border border-white/10"
        >
          {brandData.logo ? (
            <img src={brandData.logo} alt={brandData.name} className="w-full h-full object-contain brightness-0 invert" />
          ) : (
             <span className="text-luxury-gold text-4xl font-black italic">{brandData.name[0]}</span>
          )}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 text-white text-5xl md:text-8xl font-black uppercase tracking-thighter"
        >
          {brandData.name}
        </motion.h1>
      </section>

      {/* History / Info */}
      <section className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-24 items-center border-y border-white/5 bg-luxury-800">
         <div>
            <p className="text-luxury-gold font-black tracking-[0.3em] uppercase text-xs mb-8">The Marque Heritage</p>
            <h2 className="text-white text-4xl font-black mb-10 leading-tight uppercase">Legacy of <br /> Excellence</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-12 font-body">
              For over a century, {brandData.name} has pushed the boundaries of what's possible on four wheels. From revolutionary racing triumphs to the perfection of road-going luxury, every masterpiece carries the weight of a legendary history.
            </p>
            <div className="flex gap-12">
               <div>
                  <h4 className="text-white font-black text-3xl mb-1">110+</h4>
                  <p className="text-white/30 text-xs uppercase tracking-widest">Years of History</p>
               </div>
               <div>
                  <h4 className="text-white font-black text-3xl mb-1">940</h4>
                  <p className="text-white/30 text-xs uppercase tracking-widest">Grand Prix Wins</p>
               </div>
            </div>
         </div>
         <div className="aspect-video bg-white/5 border border-white/10 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1500" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" alt="History" />
         </div>
      </section>

      {/* Car List */}
      <section className="section-padding">
         <div className="max-w-[1440px] mx-auto mb-16">
            <h2 className="text-white text-3xl font-black uppercase tracking-widest border-b border-luxury-gold/50 inline-block pb-4">
               Current Lineup
            </h2>
         </div>
         
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {brandCars.map((car, index) => (
               <Link 
                 key={car.id} 
                 to={`/car/${car.id}`}
                 className="group aspect-video bg-luxury-900 overflow-hidden relative border border-white/5"
               >
                  <img src={car.images.hero} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-10 left-10 text-white">
                     <p className="text-luxury-gold text-xs font-black uppercase tracking-widest mb-1">{car.type}</p>
                     <h3 className="text-4xl font-black uppercase group-hover:text-luxury-gold transition-colors">{car.name}</h3>
                     <div className="mt-6 flex items-center gap-4 text-white/40 group-hover:text-white transition-colors uppercase text-xs tracking-widest font-black">
                        Explore vehicle details <ChevronRight size={16} />
                     </div>
                  </div>
               </Link>
            ))}

            {brandCars.length === 0 && (
               <p className="text-white/30 py-20 uppercase font-black tracking-widest text-center col-span-2">No active inventory for this particular marque</p>
            )}
         </div>
      </section>

      {/* Contact Section Placeholder */}
      <section className="py-40 bg-black flex flex-col items-center border-t border-white/5">
          <Link to="/contact" className="btn-outline-gold">
             Book Private viewing
          </Link>
      </section>
    </motion.main>
  );
};

export default BrandPage;
