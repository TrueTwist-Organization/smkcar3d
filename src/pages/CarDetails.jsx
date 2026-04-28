import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { CARS } from '../data/cars';
import { 
  ArrowLeft, Volume2, VolumeX, Database, Cpu, Wind, 
  Maximize2, Activity, ShieldCheck, PlayCircle, Info
} from 'lucide-react';
import CarViewer3D from '../components/car/CarViewer3D';
import { carService } from '../api';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    carService.getOne(id).then(data => {
       if (data) setCar(data);
    }).catch(() => {
       const foundCar = CARS.find(c => c.id === id);
       setCar(foundCar);
    }).finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <DetailLoading />;
  if (!car) return <div className="h-screen bg-black flex items-center justify-center text-white font-black uppercase tracking-[2em]">Asset Missing</div>;

  const stats = car.specifications || car.stats;

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white overflow-hidden"
    >
      {/* 1. HERO SECTION (FULL VIDEO) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <video 
          autoPlay muted loop playsInline
          src={car.videos?.hero || car.images?.hero} 
          className="absolute inset-0 w-full h-full object-cover scale-110 brightness-[0.7]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* 2. ENGINE SOUND EXPERIENCE (CINEMATIC) */}
      <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden border-b border-white/5">
          <video 
            ref={videoRef}
            loop playsInline muted={isMuted}
            src={car.videos?.engine || car.videos?.hero} 
            className="absolute inset-0 w-full h-full object-cover scale-110 opacity-70" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          
          <div className="relative z-10 w-full max-w-[1440px] px-8 md:px-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
              >
                  <h2 className="text-7xl md:text-[8vw] font-black italic uppercase leading-[0.85] mb-12 text-white">
                    FEEL THE <br /> <span className="text-white/20">RUSH</span>
                  </h2>
                  <div className="flex items-center gap-6 mb-16">
                      <div className="w-1 h-16 bg-red-600" />
                      <p className="text-white/40 uppercase tracking-[0.2em] text-[11px] max-w-sm font-black text-left">
                         Immersive raw engine roar. Toggle sonic purity below.
                      </p>
                  </div>
                  <div className="flex gap-6">
                      <button 
                        onClick={() => { videoRef.current.play(); }}
                        className="flex items-center gap-4 px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-neutral-200 transition-all rounded-full"
                      >
                         <PlayCircle size={18} /> Play Video
                      </button>
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="px-10 py-5 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all rounded-full"
                      >
                         {isMuted ? 'Unmute Sound' : 'Mute Sound'}
                      </button>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* 3. MAIN TITLE SECTION (CLEAN DARK) */}
      <section className="relative py-40 px-8 md:px-24 bg-[#050505] border-b border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-[1240px] mx-auto"
          >
              <h1 className="text-7xl md:text-[7vw] font-black leading-none uppercase italic tracking-tighter mb-16 text-white text-left">
                 {car.brand} <br /> {car.name}
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 text-left">
                  <p className="text-neutral-500 text-lg leading-relaxed font-light uppercase tracking-wide">
                      {car.description}
                  </p>
                  <div className="flex flex-col gap-6 justify-end italic items-start">
                      <span className="text-red-600 font-black text-sm tracking-[0.6em]">ESTIMATED VALUATION</span>
                      <span className="text-6xl font-black text-white">{car.price}</span>
                  </div>
              </div>
          </motion.div>
      </section>

      {/* 4. PERFORMANCE GRID (FERRARI DATA GRID THEME) */}
      <section className="relative py-60 px-8 md:px-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img src={car.images?.hero} className="w-full h-full object-cover grayscale fixed opacity-10" alt="" />
             <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-[1240px] mx-auto">
              <span className="text-red-600 font-black tracking-[0.8em] text-[10px] mb-20 block uppercase text-left">Performance (Expected)</span>
              <div className="flex flex-col w-full h-full">
                  <PerfRow label="Power Output" value={stats?.horsepower} />
                  <PerfRow label="0-100 KM/H" value={stats?.acceleration} />
                  <PerfRow label="Top Velocity" value={stats?.topSpeed} />
                  <PerfRow label="Powertrain" value={stats?.engine} />
                  <PerfRow label="Drivetrain" value={car.features?.[2] || 'All-Wheel Drive'} />
              </div>
          </div>
      </section>

      {/* 5. SPLIT SECTION 1 — POWERTRAIN (FERRARI PARITY) */}
      <section className="py-40 px-8 md:px-24 bg-[#0a0a0a] border-b border-white/5">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                className="text-left"
              >
                  <span className="text-neutral-500 font-black text-[11px] mb-8 block uppercase tracking-[0.8em]">Powertrain</span>
                  <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] mb-12 tracking-tighter">
                    {stats?.engine?.split(' ')[0]} <br /> ON PAPER, <br /> THRILLS IN <br /> PRACTICE
                  </h2>
                  <div className="mb-16">
                      <p className="font-black text-2xl uppercase italic text-white leading-none mb-4">{stats?.engine}</p>
                      <p className="text-neutral-500 text-sm uppercase tracking-widest">{stats?.horsepower} MAXIMUM POWER</p>
                  </div>
                  <button className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all">
                    Discover Engineering
                  </button>
              </motion.div>
              <div className="relative">
                  <video autoPlay muted loop playsinline className="w-full aspect-[4/5] object-cover shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-2xl">
                      <source src={car.videos?.engine || car.videos?.hero} type="video/mp4" />
                  </video>
              </div>
          </div>
          
          {/* Internal Stats Grid */}
          <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 mt-40 border-t border-white/10 pt-20">
              <MinorStat label="Config" value={stats?.engine?.split(' ')[0]} />
              <MinorStat label="Valuation" value={car.price} />
              <MinorStat label="Acceleration" value={stats?.acceleration} />
              <MinorStat label="Top Speed" value={stats?.topSpeed} />
          </div>
      </section>

      {/* 6. SPLIT SECTION 2 — CHASSIS (FERRARI PARITY) */}
      <section className="py-40 px-8 md:px-24 bg-[#050505] border-b border-white/5">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-40">
              <div className="relative order-2 lg:order-1">
                  <video autoPlay muted loop playsinline className="w-[85%] aspect-[9/14] object-cover rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.6)] mx-auto border border-white/5">
                      <source src={car.videos?.chassis || car.videos?.hero} type="video/mp4" />
                  </video>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                className="order-1 lg:order-2 text-left md:pl-20"
              >
                  <span className="text-neutral-500 font-black text-[11px] mb-8 block uppercase tracking-[0.8em]">Architecture</span>
                  <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] mb-12 tracking-tighter">
                    A GENUINE <br /> PERFORMANCE <br /> ARCHITECTURE
                  </h2>
                  <p className="text-neutral-400 text-lg leading-relaxed font-light uppercase mb-16">
                    Designed for absolute rigidity and minimal weight. The carbon monofuselage represents the pinnacle of aerospace-inspired automotive construction.
                  </p>
                  <button className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all">
                    Technical Dossier
                  </button>
              </motion.div>
          </div>
      </section>

      {/* 7. SPLIT SECTION 3 — DESIGN (FERRARI PARITY) */}
      <section className="py-40 px-8 md:px-24 bg-[#0a0a0a] border-b border-white/5">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="lg:col-span-4 text-left"
              >
                  <span className="text-neutral-500 font-black text-[11px] mb-8 block uppercase tracking-[0.8em]">Bespoke Preview</span>
                  <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.85] mb-12 tracking-tighter">
                    {car.brand} <br /> {car.name} <br /> ENGINEERED <br /> FOR THE FUTURE
                  </h2>
                  <p className="text-neutral-400 text-lg leading-relaxed font-light uppercase mb-16">
                    Every curve is sculpted for performance. Its aggressive stance and aerodynamic profile are functionally essential for stability.
                  </p>
                  <button className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all">
                    Discover Design
                  </button>
              </motion.div>
              <div className="lg:col-span-8 h-[75vh] bg-[#111] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                 <Suspense fallback={<DetailLoading />}>
                    <CarViewer3D carId={car.id} />
                 </Suspense>
              </div>
          </div>
      </section>

      {/* 8. GALLERY HOVER GRID (FERRARI PARITY) */}
      <section className="grid grid-cols-1 md:grid-cols-3 bg-[#050505] py-40 px-4 md:px-24 gap-4 md:gap-10 border-b border-white/5">
          {[1, 2, 3].map((i) => (
             <motion.div 
               key={i}
               whileHover={{ scale: 0.98 }}
               className="h-[500px] overflow-hidden rounded-xl shadow-2xl group relative border border-white/5"
             >
                <img 
                  src={car.images?.gallery?.[i-1] || car.images?.hero} 
                  className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110 brightness-[0.8] group-hover:brightness-100" 
                  alt={`${car.name} Model ${i}`} 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">View Detail {i}</span>
                </div>
             </motion.div>
          ))}
      </section>

      {/* 9. CTA FOOTER SECTION */}
      <section className="h-[75vh] flex flex-col items-center justify-center bg-black text-center px-8 relative">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src={car.images?.hero} className="w-full h-full object-cover" alt="" />
           </div>
           <h2 className="text-5xl md:text-[6vw] font-black italic uppercase text-white mb-20 tracking-tighter mix-blend-difference relative z-10">
              The Pursuit of <br /> <span className="text-white/20">Absolute</span> Perfection.
           </h2>
           <Link to="/contact" className="relative z-10 px-16 py-6 border border-white/20 text-white font-black uppercase text-[11px] tracking-[0.6em] hover:bg-white hover:text-black transition-all rounded-full overflow-hidden group">
              Request Exclusive Privileges
           </Link>
      </section>
    </motion.main>
  );
};

// --- HELPER COMPONENTS ---

const PerfRow = ({ label, value }) => (
  <motion.div 
    initial={{ x: -20, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    className="group flex justify-between items-center py-12 border-t border-white/10 cursor-pointer hover:border-red-600 transition-all px-4"
  >
     <span className="text-neutral-500 font-black tracking-[0.4em] text-[11px] uppercase group-hover:text-red-500 transition-colors">{label}</span>
     <span className="text-white font-black text-2xl uppercase italic tracking-tighter group-hover:scale-110 transition-transform">{value}</span>
  </motion.div>
);

const MinorStat = ({ label, value }) => (
  <div className="flex flex-col gap-4 text-left">
     <span className="text-neutral-500 font-black uppercase text-[10px] tracking-[0.3em]">{label}</span>
     <span className="text-4xl font-black text-white leading-none italic uppercase tracking-tighter">{value}</span>
  </div>
);

const DetailLoading = () => (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">
       <div className="w-80 h-px bg-white/10 relative overflow-hidden mb-12">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 w-32 bg-red-600 shadow-[0_0_20px_#D71920]" 
          />
       </div>
       <p className="text-[10px] uppercase font-black tracking-[1.5em] text-neutral-500 animate-pulse">Syncing Visual Matrix</p>
    </div>
);

export default CarDetails;
