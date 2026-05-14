import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black py-24 px-12 md:px-24">
      <div className="max-w-[1440px] mx-auto border-t border-white/5 pt-20 flex flex-col items-center">
        
        {/* Logo Mark */}
        <Link to="/" className="flex flex-col items-center gap-2 mb-20 group">
           <span className="text-4xl md:text-6xl font-black text-white tracking-[1em] transition-all duration-1000 group-hover:tracking-[1.4em]">ZENTARO</span>
           <span className="text-[8px] font-black tracking-[0.6em] text-white/20 uppercase mt-4">LEGACY AUTOMOTIVE</span>
        </Link>

        {/* Dynamic Horizontal Links */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-32">
           <FooterLink to="/cars">MODELS</FooterLink>
           <FooterLink to="/about">HISTORY</FooterLink>
           <FooterLink to="/compare">CONFIGURATOR</FooterLink>
           <FooterLink to="/contact">LOCATIONS</FooterLink>
        </div>

        {/* Bottom Legal */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex flex-col gap-2 scale-75 md:scale-100 opacity-20 hover:opacity-100 transition-all duration-700">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">PRIVACY POLICY</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">TERMS OF SERVICE</span>
           </div>

           <p className="text-[8px] font-black text-white/20 tracking-[0.4em] uppercase text-center">
              © 2026 ZENTARO EXOTIC AUTOMOTIVE GROUP. ALL RIGHTS RESERVED.
           </p>

           <div className="flex gap-10">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer">
                 <span className="text-[8px] font-black">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer">
                 <span className="text-[8px] font-black">IG</span>
              </div>
           </div>
        </div>

        {/* Credits */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-12 pt-8 border-t border-white/5">
           <p className="text-[8px] font-black text-white/20 tracking-[0.2em] uppercase text-center">
              Design by <a href="https://truetwist.in" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">truetwist.in</a>
           </p>
           <span className="hidden md:inline text-white/10">|</span>
           <p className="text-[8px] font-black text-white/20 tracking-[0.2em] uppercase text-center">
              Marketing by <a href="https://369network.com/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">369network.com</a>
           </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-white transition-all duration-500 hover:scale-110"
  >
    {children}
  </Link>
);

export default Footer;
