import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-screen bg-black flex flex-col items-center justify-center text-center p-20"
  >
    <h1 className="text-luxury-gold text-6xl font-black mb-6 uppercase tracking-widest">The Legacy</h1>
    <p className="text-white/40 text-sm tracking-[0.5em] uppercase font-black">Under High Performance Construction</p>
    <div className="mt-12 w-24 h-1 bg-luxury-gold glow" />
  </motion.div>
);

export default About;
