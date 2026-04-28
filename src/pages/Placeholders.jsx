import React from 'react';

const Placeholder = ({ title }) => (
  <div className="h-screen bg-black flex flex-col items-center justify-center text-center p-20">
    <h1 className="text-luxury-gold text-6xl font-black mb-6 uppercase tracking-widest">{title}</h1>
    <p className="text-white/40 text-sm tracking-[0.5em] uppercase font-black">Under High Performance Construction</p>
    <div className="mt-12 w-24 h-1 bg-luxury-gold glow" />
  </div>
);

export const About = () => <Placeholder title="The Legacy" />;
export const Contact = () => <Placeholder title="Reservations" />;
export const BrandPage = () => <Placeholder title="The Marque" />;
export const ComparePage = () => <Placeholder title="Duel of Speed" />;
