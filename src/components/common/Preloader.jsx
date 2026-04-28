import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-20"
    >
      <div className="relative flex flex-col items-center gap-10">
        {/* Animated Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-96 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />

        {/* Brand Reveal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="text-center"
        >
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-[1em] mb-4">ZENTARO</h1>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.8em] animate-pulse">Establishing Connection... [V12-CORE CONNECTED]</p>
        </motion.div>

        {/* Progress Bar (Faux) */}
        <div className="w-48 h-[2px] bg-white/5 mt-10 overflow-hidden relative">
           <motion.div 
             initial={{ left: '-100%' }}
             animate={{ left: '100%' }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 w-24 bg-white/40" 
           />
        </div>
      </div>
      
      <div className="absolute bottom-24 flex flex-col items-center gap-6 opacity-40">
         <span className="text-[8px] font-black uppercase tracking-widest text-white/50">Version 2.0.0R | Established Showroom</span>
         <div className="flex gap-4">
            {[1,2,3,4].map(i => (
               <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-1 h-1 bg-white rounded-full"
               />
            ))}
         </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
