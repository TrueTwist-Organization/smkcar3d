import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CARS, BRANDS } from '../data/cars';
import { Search, ArrowRight, ChevronDown, Volume2, VolumeX, Menu, X, Play } from 'lucide-react';
import PowertrainSection from '../components/car/PowertrainSection';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';

const BMWPreview = () => {
  const { scene } = useGLTF('/models/bmw.glb');
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.material.envMapIntensity = 2;
        if (child.material.name.toLowerCase().includes('paint')) {
           child.material.metalness = 1;
           child.material.roughness = 0.1;
        }
      }
    });
  }, [scene]);
  return <primitive object={scene} scale={2} position={[0, -0.6, 0]} rotation={[0, -Math.PI / 1.5, 0]} />;
};

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black min-h-screen text-white select-none selection:bg-white selection:text-black"
    >
      <BugattiHero isMuted={isMuted} setIsMuted={setIsMuted} />
      <StorySection 
         title="AERODYNAMICS"
         subtitle="FORM FOLLOWS PERFORMANCE"
         content="Every curve, every air intake, every detail is sculpted by the wind. Engineered for zero compromises between beauty and absolute velocity."
         imageUrl="https://images.unsplash.com/photo-1621138838132-888981449339?auto=format&fit=crop&q=95&w=2600"
         position="left"
      />
      <StorySection 
         title="ENGINEERING"
         subtitle="THE HEART OF THE BEAST"
         content="A masterpiece of internal combustion. The quad-turbocharged W16 engine redefined the boundaries of automotive possibility."
         imageUrl="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=95&w=2600"
         position="right"
      />
      <PowertrainSection />
      <FeaturedGallery SectionTitle="THE MODERN LINEUP" />
      
      {/* BMW 3D INTEGRATION: "B M W" Title and interactive model as shown in screenshot */}
      <section className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
           <span className="text-sm font-black tracking-[1em] text-white/40">B M W</span>
        </div>
        
        <div className="w-full h-full absolute inset-0 z-0">
           <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white/5 font-black tracking-widest animate-pulse">INITIATING BMW NEXUS</div>}>
              <Canvas shadows camera={{ position: [5, 1, 5], fov: 40 }}>
                 <ambientLight intensity={0.5} />
                 <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={2} castShadow color="#0066B1" />
                 <Environment preset="night" />
                 <BMWPreview />
                 <ContactShadows position={[0, -0.6, 0]} opacity={0.6} scale={15} blur={1.5} far={1} />
                 <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
              </Canvas>
           </Suspense>
        </div>
        
        <div className="relative z-10 mt-[40vh] text-center">
           <div className="mb-10 w-24 h-px bg-red-600 mx-auto" />
           <Link to="/corvette" className="bg-red-600 px-24 py-4 text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-red-600 transition-all duration-500 shadow-xl shadow-red-600/20">
              DISCOVER MORE
           </Link>
        </div>
      </section>

      <CinematicCTA />
    </motion.main>
  );
};

const BugattiHero = ({ isMuted, setIsMuted }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 scale-105">
        <video 
           autoPlay 
           loop 
           muted={isMuted} 
           className="w-full h-full object-cover brightness-[0.4]"
        >
           <source src="https://www.bugatti.com/fileadmin/user_upload/chiron_pur_sport/video/BUGATTI_CHIRON_Pur_Sport_Launch_Video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-16">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
         >
            <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white/40 mb-10 block">BUGATTI | ZENTARO COLLABORATION</span>
            <h1 className="text-[8vw] md:text-[6vw] font-black leading-none mb-12 uppercase italic tracking-tighter glow-text">
               UNLEASH THE <br /> <span className="text-white/20">EXTREME</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
               <Link to="/cars" className="btn-bugatti">DISCOVER THE CATALOG</Link>
               <button 
                 onClick={() => setIsMuted(!isMuted)}
                 className="flex items-center gap-4 text-white hover:text-white/60 transition-colors uppercase font-black text-[9px] tracking-widest"
               >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  Cinematic Sound
               </button>
            </div>

            {/* NEW: DYNAMIC SEARCH BAR */}
            <DynamicSearchBar />
         </motion.div>
      </div>

      {/* Side Info */}
      <div className="absolute left-12 bottom-12 hidden lg:flex flex-col gap-8">
         <div className="flex flex-col">
            <span className="text-[8px] opacity-20 uppercase font-black tracking-widest mb-1">Top Velocity</span>
            <span className="text-sm font-black text-white">490+ KM/H</span>
         </div>
         <div className="flex flex-col">
            <span className="text-[8px] opacity-20 uppercase font-black tracking-widest mb-1">Configuration</span>
            <span className="text-sm font-black text-white">BESPOKE</span>
         </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
         <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Scroll</span>
         <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const StorySection = ({ title, subtitle, content, imageUrl, position }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen min-h-[800px] w-full flex items-center bg-black overflow-hidden px-8 md:px-24">
       <div className={`w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-20 ${position === 'right' ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Content */}
          <div className={position === 'right' ? 'lg:order-2' : ''}>
             <motion.p 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-white/20 font-black tracking-[0.3em] uppercase text-xs mb-8"
             >
                {subtitle}
             </motion.p>
             <motion.h2 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12 italic"
             >
                {title}
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-white/40 text-lg md:text-xl font-light leading-relaxed mb-16 max-w-lg font-body"
             >
                {content}
             </motion.p>
             <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
             >
                <button className="flex items-center gap-6 group">
                   <span className="w-16 h-px bg-white/20 group-hover:bg-white group-hover:w-24 transition-all duration-700" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Explore Evolution</span>
                </button>
             </motion.div>
          </div>

          {/* Visual */}
          <div className={`relative h-[60vh] md:h-[80vh] overflow-hidden ${position === 'right' ? 'lg:order-1' : ''}`}>
             <motion.img 
                style={{ scale }}
                src={imageUrl} 
                className="w-full h-full object-cover brightness-[0.7] grayscale hover:grayscale-0 transition-all duration-1000"
                alt={title}
             />
             <div className="absolute inset-0 border-[20px] border-black" />
          </div>
       </div>

       {/* Background Watermark */}
       <div className={`absolute bottom-0 ${position === 'left' ? 'right-0' : 'left-0'} story-title translate-y-1/2 select-none z-[-1]`}>
          {title}
       </div>
    </section>
  );
};

const FeaturedGallery = ({ SectionTitle }) => {
  return (
    <section className="bg-black py-40">
       <div className="max-w-[1440px] mx-auto px-8 md:px-24 mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
             <motion.h2 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-6xl font-black uppercase italic leading-none"
             >
                {SectionTitle}
             </motion.h2>
             <Link to="/cars" className="text-white/40 hover:text-white transition-colors uppercase font-black text-xs tracking-widest border-b border-white/20 pb-2">
                All Masterpieces
             </Link>
          </div>
       </div>

       <div className="flex flex-col">
          {CARS.slice(0, 3).map((car, index) => (
             <motion.div
               key={car.id}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="group relative h-screen w-full flex items-center justify-center overflow-hidden border-t border-white/5"
             >
                <div className="absolute inset-0 z-0">
                   <img 
                     src={car.images?.hero || car.images?.thumbnail} 
                     className="w-full h-full object-cover brightness-[0.3] group-hover:brightness-[0.5] group-hover:scale-105 transition-all duration-1000" 
                     alt={car.name}
                   />
                </div>
                
                <div className="relative z-10 text-center px-6">
                   <motion.span 
                      whileInView={{ scaleX: [0, 1] }} 
                      transition={{ duration: 1 }}
                      className="block w-32 h-px bg-white/40 mx-auto mb-10" 
                   />
                   <p className="text-white/40 text-[10px] uppercase tracking-[0.6em] font-black mb-6">{car.brand} EXCELLENCE</p>
                   <h3 className="text-6xl md:text-[10vw] font-black uppercase leading-none italic mb-12 tracking-tighter">
                      {car.name}
                   </h3>
                   <Link 
                     to={`/car/${car.id}`} 
                     className="btn-bugatti opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700"
                   >
                      EXPLORE VEHICLE
                   </Link>
                </div>

                <div className="absolute right-12 bottom-12 text-white/5 text-[20vw] font-black uppercase pointer-events-none select-none italic">
                   #0{index + 1}
                </div>
             </motion.div>
          ))}
       </div>
    </section>
  );
};

const CinematicCTA = () => (
  <section className="relative h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">
     <div className="absolute inset-0 z-0 opacity-20">
        <video autoPlay loop muted className="w-full h-full object-cover">
           <source src="https://www.bugatti.com/fileadmin/user_upload/chiron_pur_sport/video/CHIRON_PUR_SPORT_EXTERIOR_GALLERY.mp4" type="video/mp4" />
        </video>
     </div>
     
     <div className="relative z-10 text-center px-6">
        <h2 className="text-5xl md:text-[8vw] font-black uppercase leading-none mb-16 tracking-tighter italic">
           JOIN THE <span className="text-white/20">ETERNITY.</span>
        </h2>
        <Link to="/contact" className="btn-bugatti-gold">REQUEST PREVIEW</Link>
     </div>
     
     <div className="absolute bottom-24 vertical-line" />
  </section>
);

const DynamicSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (toQuery) => {
     const matches = CARS.filter(car => 
        car.name.toLowerCase().includes(toQuery.toLowerCase()) || 
        car.brand.toLowerCase().includes(toQuery.toLowerCase())
     );
     setResults(toQuery ? matches : []);
  }

  return (
    <div className="mt-16 relative max-w-xl mx-auto z-[100]">
       <div className="relative group">
          <input 
            type="text" 
            placeholder="Search by Marque or Model..." 
            value={query}
            onChange={(e) => { setQuery(e.target.value); handleSearch(e.target.value); }}
            className="w-full bg-white/5 border border-white/10 px-10 py-5 text-sm font-black uppercase tracking-[0.4em] text-white focus:outline-none focus:border-white transition-all backdrop-blur-md"
          />
          <Search className="absolute right-10 top-1/2 -translate-y-1/2 text-white/20" size={20} />
       </div>

       <AnimatePresence>
          {results.length > 0 && (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               className="absolute top-full left-0 w-full bg-black/90 border-x border-b border-white/10 overflow-hidden backdrop-blur-xl"
             >
                {results.map(car => (
                   <button 
                      key={car.id}
                      onClick={() => navigate(`/car/${car.id}`)}
                      className="w-full text-left p-6 hover:bg-white/10 transition-all border-b border-white/5 flex justify-between items-center group/item"
                   >
                      <div>
                         <span className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1 block">{car.brand}</span>
                         <span className="text-white font-black uppercase tracking-[0.2em]">{car.name}</span>
                      </div>
                      <ArrowRight size={16} className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all text-white/40" />
                   </button>
                ))}
             </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

export default Home;
