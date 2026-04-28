import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Grid } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'Brands', path: '/brands' },
    { name: 'Compare', path: '/compare' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-8 md:px-12 py-8 flex justify-between items-center transition-all duration-1000 ${
          isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-6 shadow-2xl' : 'bg-transparent'
        }`}
      >
        {/* Left Side (Desktop) */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.slice(0, 3).map((link) => (
            <NavLink key={link.name} to={link.path}>{link.name}</NavLink>
          ))}
        </div>

        {/* Center Logo */}
        <Link to="/" className="flex flex-col items-center group">
          <motion.span 
            initial={{ letterSpacing: '0.4em' }}
            animate={{ letterSpacing: isScrolled ? '0.6em' : '1em' }}
            className="font-heading text-2xl md:text-3xl font-black text-white uppercase transition-all duration-1000 leading-none group-hover:text-red-600"
          >
            ZENTARO
          </motion.span>
          <span className="text-[7px] font-black tracking-[0.8em] text-white/20 uppercase mt-2">Bespoke Automotive</span>
        </Link>

        {/* Right Side (Desktop) */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.slice(3).map((link) => (
            <NavLink key={link.name} to={link.path}>{link.name}</NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-black z-[100] lg:hidden flex flex-col items-center justify-center p-10"
          >
            <div className="flex flex-col items-center gap-10">
               {navLinks.map((link) => (
                 <Link 
                   key={link.name} 
                   to={link.path}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="text-4xl font-black uppercase tracking-tighter italic text-white/40 hover:text-white transition-all"
                 >
                   {link.name}
                 </Link>
               ))}
            </div>
            <button 
              className="absolute top-12 right-12 text-white/40"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ to, children }) => (
  <Link 
    to={to}
    className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50 transition-all hover:text-white relative group"
  >
    {children}
    <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-600 transition-all duration-700 group-hover:w-full" />
  </Link>
);

export default Navbar;
