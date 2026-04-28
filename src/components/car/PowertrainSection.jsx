import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, Environment, ContactShadows, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2, Zap } from 'lucide-react';
import useSound from 'use-sound';

/* ── 3D ENGINE COMPONENT ── */
function EngineModel({ autoRotate = true }) {
  // Loading GLTF model
  const { scene } = useGLTF('/ferrari-f80.glb');
  const group = useRef();

  useFrame((state) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={group} 
      object={scene} 
      scale={2.5} 
      position={[0, -0.5, 0]}
    />
  );
}

const PowertrainSection = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [playEngineSound] = useSound('/ferrari-f80-engine.mp3', { volume: 0.4 });

  const handleDiscover = () => {
    setShowDetails(true);
    playEngineSound();
  };

  /* ── VARIANTS ── */
  const textContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,     // High staggery effect for premium feel
        delayChildren: 0.2 
      }
    }
  };

  const lineFadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden selection:bg-red-600 font-body">
      <AnimatePresence mode="wait">
        {!showDetails ? (
          /* ── HERO VIEW (PHASE 1) ── */
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24 z-10"
          >
            <div className="absolute inset-0 z-[-1] opacity-40">
               <img 
                 src="/ferrari-f80-engine-concept.png" 
                 className="w-full h-full object-cover grayscale" 
                 alt="Engine Background"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
            </div>

            <motion.div
               initial={{ x: -20, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
               <span className="text-white/40 text-[10px] uppercase tracking-[0.8em] font-black mb-12 flex items-center gap-4">
                  <span className="w-12 h-px bg-red-600" /> POWERTRAIN
               </span>

               <h2 
                 className="text-[9vw] md:text-[8vw] font-black leading-[0.85] uppercase italic tracking-tighter mb-12 text-white glow-text"
                 style={{ letterSpacing: '-0.05em' }}
               >
                 V6 ON <br /> PAPER, <br /> <span className="text-red-500">THRILLS</span> <br /> IN PRACTICE
               </h2>

               <div className="flex flex-col gap-2 mb-16 relative overflow-hidden group">
                  <p className="text-white font-black text-xl md:text-3xl uppercase tracking-[0.1em] border-l-4 border-red-600 pl-6">V6 120° ENGINE</p>
                  <p className="text-white/50 font-black text-[10px] uppercase tracking-[0.4em] pl-7">1000+ CV MAXIMUM POWER</p>
               </div>

               <button 
                 onClick={handleDiscover}
                 className="group relative px-12 py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.5em] overflow-hidden transition-all hover:pr-16 hover:bg-red-600 hover:text-white"
               >
                 <span className="relative z-10">Discover the powertrain</span>
                 <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0" size={18} />
               </button>
            </motion.div>
          </motion.div>
        ) : (
          /* ── DETAIL VIEW (PHASE 2: SPLIT SCREEN) ── */
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col lg:flex-row h-screen w-full"
          >
            {/* LEFT SIDE: 3D VIEWER */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative bg-[#050505]">
              <Canvas shadows camera={{ position: [5, 2, 5], fov: 35 }}>
                <Suspense fallback={null}>
                  <Stage intensity={0.5} environment="city" shadows="contact" adjustCamera={1.2}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                       <EngineModel />
                    </Float>
                  </Stage>
                  <OrbitControls 
                    enablePan={false} 
                    minPolarAngle={Math.PI / 4} 
                    maxPolarAngle={Math.PI / 1.5} 
                    autoRotate={false}
                    enableDamping={true}
                  />
                  <Environment preset="night" />
                  <ContactShadows opacity={0.4} scale={10} blur={2.4} far={0.8} />
                </Suspense>
              </Canvas>
              
              {/* Interaction Hint Overlay */}
              <div className="absolute bottom-12 left-12 flex items-center gap-6 text-white/30 backdrop-blur-md bg-black/20 p-4 border border-white/5">
                <div className="flex gap-1">
                   <div className="w-1 h-1 bg-red-600 animate-ping rounded-full" />
                   <div className="w-1 h-1 bg-white/20 rounded-full" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] font-black">Scroll to zoom • Drag to Rotate Architecture</span>
              </div>

              {/* Engine Spec UI Overlay */}
              <div className="absolute top-12 left-12">
                 <div className="flex items-center gap-3 text-red-500 mb-2">
                    <Zap size={16} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">Hybrid Excellence</span>
                 </div>
                 <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">F80 TYPE <span className="text-white/20">F163CF</span></h3>
              </div>
            </div>

            {/* RIGHT SIDE: DETAILED CONTENT SCROLLABLE */}
            <div className="w-full lg:w-1/2 h-full bg-black overflow-y-auto no-scrollbar px-8 py-16 lg:p-24 border-l border-white/5 scroll-smooth">
              <motion.button
                onClick={() => setShowDetails(false)}
                className="text-white/30 hover:text-white transition-all mb-24 flex items-center gap-6 group hover:translate-x-[-10px]"
              >
                 <ArrowRight className="rotate-180 transition-transform group-hover:scale-125 text-red-600" size={18} />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Return to Overview</span>
              </motion.button>

              <motion.div
                variants={textContainer}
                initial="hidden"
                animate="show"
                className="max-w-xl"
              >
                <motion.h4 variants={lineFadeIn} className="text-red-600 font-black tracking-[0.6em] text-[10px] uppercase mb-4">Formula 1 Synergy</motion.h4>
                <motion.h2 variants={lineFadeIn} className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-16 leading-none text-white glow-text">POWERTRAIN</motion.h2>
                
                <div className="space-y-12 text-white/40 text-[15px] md:text-[16px] leading-relaxed font-light">
                  <motion.p variants={lineFadeIn}>
                    The carry-over from racing also includes technology from Formula 1, from which the concepts of the <span className="text-white font-medium italic">MGU-K and the MGU-H</span> (with a bespoke e-turbo application) have been borrowed. It was also decided to tilt the engine-transmission unit down by 1.3° in the Z axis, to lower the centre of gravity without compromising aerodynamic performance.
                  </motion.p>
                  
                  <motion.p variants={lineFadeIn}>
                    The powertrain uses an advanced electric motor (MGU-K) developed entirely in-house, featuring a tooth-coil stator and Halbach array rotor with carbon fibre magnet retention system. A DC/DC converter manages multiple voltages including <span className="text-red-500 font-bold">800V, 48V and 12V</span> simultaneously.
                  </motion.p>

                  {/* Highlights Grid */}
                  <motion.div variants={lineFadeIn} className="grid grid-cols-2 gap-10 my-16 border-y border-white/10 py-12 relative">
                     <div className="absolute left-1/2 top-12 bottom-12 w-px bg-white/10" />
                     <div>
                        <span className="block text-[10px] text-white/20 uppercase tracking-[0.3em] font-black mb-3 text-red-600">Configuration</span>
                        <span className="text-white font-black text-2xl md:text-4xl italic uppercase font-heading leading-tight">V6 120° <br/> ENGINE</span>
                     </div>
                     <div className="pl-6">
                        <span className="block text-[10px] text-white/20 uppercase tracking-[0.3em] font-black mb-3">Power Unit</span>
                        <span className="text-white font-black text-2xl md:text-4xl italic uppercase font-heading leading-tight">1000+ <br/> CV MAX</span>
                     </div>
                  </motion.div>

                  <motion.p variants={lineFadeIn}>
                    The front axle integrates two electric motors, an inverter and cooling system, enabling torque vectoring and improving efficiency. Mechanical efficiency is enhanced through <span className="text-white border-b border-red-600/30 pb-1">low-viscosity oil</span> and a dry sump lubrication system, reducing power loss by 20%.
                  </motion.p>

                  <motion.p variants={lineFadeIn} className="bg-white/5 p-8 border-l-2 border-red-600">
                    The inverter system also manages energy regeneration and power delivery. The Ferrari Power Pack (FPP) integrates all power conversion components into a compact unit.
                  </motion.p>

                  <motion.p variants={lineFadeIn}>
                    The high-voltage battery uses Formula 1-derived lithium-cell technology and a carbon fibre monocoque casing. Positioned low in the chassis, it improves vehicle dynamics and weight distribution. The battery includes <span className="text-white font-medium italic">204 cells, 2.3 kWh capacity</span>, and delivers up to 242 kW power.
                  </motion.p>
                </div>

                <motion.div variants={lineFadeIn} className="mt-24 pb-20">
                   <button className="w-full px-12 py-6 border border-white/10 text-white font-black uppercase tracking-[0.6em] text-[10px] hover:bg-white hover:text-black hover:border-white transition-all duration-1000 group">
                      Download Tech Syllabus <ArrowRight className="inline-block ml-4 group-hover:translate-x-2 transition-transform" size={14} />
                   </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PowertrainSection;
