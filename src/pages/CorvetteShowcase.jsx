import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  SpotLight, 
  Float, 
  PresentationControls,
  BakeShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Gauge, Flame, Volume2, VolumeX, ChevronDown } from 'lucide-react';

/* --- 3D CAR MODEL COMPONENT --- */
const CorvetteModel = () => {
  const group = useRef();
  const { scene } = useGLTF('/models/car.glb'); // Path from prompt
  const { scrollYProgress } = useScroll();
  
  // High-End Material Tuning for Premium Feel
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          if (child.material.name.toLowerCase().includes('paint')) {
            child.material.metalness = 1.0;
            child.material.roughness = 0.05;
            child.material.envMapIntensity = 3;
            child.material.color.set('#ff0000'); // Corvette Red
          }
        }
      }
    });
  }, [scene]);

  // Scroll-linked Zoom & Floating
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.position.y = -0.6 + Math.sin(t / 2) * 0.05;
    
    // Zoom factor based on scroll
    const zoomFactor = 1 + scrollYProgress.get() * 0.5;
    group.current.scale.set(2.2 * zoomFactor, 2.2 * zoomFactor, 2.2 * zoomFactor);
  });

  return <primitive ref={group} object={scene} scale={2.2} position={[0, -0.6, 0]} rotation={[0, -Math.PI / 1.5, 0]} />;
};

/* --- LOADING COMPONENT --- */
const Loader = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
     <div className="w-48 h-px bg-white/20 relative overflow-hidden mb-8">
        <motion.div 
          animate={{ x: [-200, 200] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-0 bg-red-600"
        />
     </div>
     <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 animate-pulse">
        CALIBRATING NEXUS
     </div>
  </div>
);

/* --- MAIN SHOWCASE PAGE --- */
const CorvetteShowcase = () => {
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Specs');

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden select-none selection:bg-red-600 selection:text-white">
      
      {/* 1. THREE.JS CANVAS (The Main Star) */}
      <div className="fixed inset-0 z-0 h-screen w-full">
        <Canvas shadows gl={{ antialias: true, preserveDrawingBuffer: true }}>
          <Suspense fallback={null}>
            {/* Cinematic Camera */}
            <PerspectiveCamera makeDefault position={[5, 1.5, 5]} fov={35} />
            
            {/* Dynamic Controls */}
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 2, Math.PI / 2]}
            >
              <Float 
                speed={1.5} 
                rotationIntensity={0.2} 
                floatIntensity={0.5}
              >
                 <CorvetteModel />
              </Float>
            </PresentationControls>

            {/* Cinematic Pro Lighting */}
            <ambientLight intensity={0.4} />
            <spotLight 
              position={[10, 10, 10]} 
              angle={0.15} 
              penumbra={1} 
              intensity={2} 
              castShadow 
              color="#ffffff"
            />
            <spotLight 
              position={[-10, 5, -10]} 
              angle={0.15} 
              penumbra={1} 
              intensity={1} 
              color="#ff0000" 
            />
            
            {/* Dynamic Point Lights for Car Surface */}
            <pointLight position={[2, 1, 0]} intensity={1.5} color="#ff3333" />
            
            {/* High-End Environment Reflections */}
            <Environment preset="night" />
            
            {/* Realistic Shadows on Floor */}
            <ContactShadows 
              position={[0, -0.6, 0]} 
              opacity={0.65} 
              scale={20} 
              blur={2.4} 
              far={0.8} 
              color="#000000"
            />
            
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={3.5} 
              maxDistance={7}
              maxPolarAngle={Math.PI / 2.1} 
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
            
            <BakeShadows />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. OVERLAY UI LAYERS (Framer Motion) */}
      <div className="relative z-10 w-full">
        
        {/* HERO HEADER */}
        <section className="h-screen w-full flex flex-col justify-between p-8 md:p-20 py-32 pointer-events-none">
           <motion.div 
             initial={{ opacity: 0, x: -30 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ duration: 1, delay: 0.5 }}
             className="flex flex-col gap-4"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-px bg-red-600" />
                 <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/50">CHEVROLET | ZENTARO ELITE</span>
              </div>
              <h1 className="text-[10vw] md:text-[8vw] font-black leading-none uppercase tracking-tighter italic glow-red">
                 CORVETTE <br /> <span className="text-white/10">STINGRAY C8</span>
              </h1>
              <p className="max-w-md text-sm md:text-lg text-white/40 font-light leading-relaxed mt-4">
                 The first mid-engine Corvette in history. A redefined legend engineered to challenge the supercars of Europe with absolute velocity and precision.
              </p>
           </motion.div>

           <div className="flex flex-col md:flex-row items-end justify-between gap-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-12 pointer-events-auto"
              >
                 <SpecItem icon={<Gauge size={20} />} label="Top Vel." value="312" unit="KM/H" />
                 <SpecItem icon={<Zap size={20} />} label="Torque" value="637" unit="NM" />
                 <SpecItem icon={<Flame size={20} />} label="0-100" value="2.9" unit="SEC" />
                 <SpecItem icon={<Zap size={20} />} label="Power" value="495" unit="HP" />
              </motion.div>
              
              <div className="pointer-events-auto">
                 <button className="btn-red-outline flex items-center gap-8 group">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">INITIATE CONFIG</span>
                    <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" />
                 </button>
              </div>
           </div>
        </section>

        {/* DETAILS SECTION (Appears on Scroll) */}
        <section className="h-screen w-full flex items-center justify-center pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ margin: "-100px" }}
             className="text-center px-10"
           >
              <h2 className="text-[6vw] font-black uppercase tracking-tighter mb-10 italic">MID-ENGINE <span className="text-red-600">EVOLUTION.</span></h2>
              <p className="max-w-xl mx-auto text-white/40 text-lg leading-relaxed mb-16">
                 Perfect weight distribution for extreme cornering. The LT2 V8 heart pulsates with raw American power, delivering an unparalleled connection between pilot and machine.
              </p>
              <div className="w-1 h-24 bg-gradient-to-b from-red-600 to-transparent mx-auto" />
           </motion.div>
        </section>

        {/* INTERACTIVE SPECS SECTION */}
        <section className="min-h-screen bg-black py-40 px-8 lg:px-40">
           <div className="mb-24">
              <span className="text-[10px] text-red-600 font-bold tracking-[0.3em] uppercase mb-4 block">TECH SPECIFICATIONS</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">PERFORMANCE <br /> INTELLIGENCE.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              <FeatureCard 
                title="ENGINE" 
                subtitle="LT2 6.2L V8" 
                desc="Direct injection with Active Fuel Management, peak torque at 5150 RPM." 
              />
              <FeatureCard 
                title="TRANSMISSION" 
                subtitle="Dual-Clutch" 
                desc="8-speed automatic specifically designed to handle extreme G-forces." 
              />
              <FeatureCard 
                title="AERODYNAMICS" 
                subtitle="Z51 Splitter" 
                desc="Engineered rear wing generating massive downforce for ultra-high-speed stability." 
              />
           </div>
        </section>

        {/* CTA FOOTER */}
        <section className="h-[60vh] flex flex-col items-center justify-center bg-zinc-950">
           <span className="text-[10px] font-black tracking-[0.8em] text-white/20 mb-10 uppercase">Sourced & Verified by Zentaro Group</span>
           <button 
             onClick={() => navigate('/')}
             className="text-[4vw] font-black italic uppercase tracking-tighter hover:text-red-600 transition-colors duration-500"
           >
             RETURN TO NEXUS
           </button>
        </section>

      </div>

      {/* FLOATING HUD CONTROLS */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-10 bg-white/5 backdrop-blur-xl border border-white/10 px-10 py-4 rounded-full">
         <button className="text-[9px] font-black uppercase tracking-widest text-red-600">V8.INTAKE</button>
         <div className="w-px h-8 bg-white/10" />
         <button className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">AERO.LOGIC</button>
         <div className="w-px h-8 bg-white/10" />
         <button 
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
         >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            Sound
         </button>
      </div>

    </div>
  );
};

/* --- MINI COMPONENTS --- */
const SpecItem = ({ icon, label, value, unit }) => (
  <div className="flex flex-col gap-2 group cursor-pointer hover:bg-white/5 p-4 transition-all duration-500 border-l border-white/0 hover:border-red-600">
     <div className="text-red-600 group-hover:scale-110 transition-transform">{icon}</div>
     <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">{label}</span>
     <div className="text-3xl font-black italic uppercase italic leading-none">{value} <span className="text-[10px] text-white/30 not-italic">{unit}</span></div>
  </div>
);

const FeatureCard = ({ title, subtitle, desc }) => (
  <div className="bg-zinc-900/50 p-12 border border-white/5 hover:border-red-600/50 transition-all duration-700 group cursor-default">
     <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-6 block">{title}</span>
     <h3 className="text-3xl font-black uppercase italic mb-6 group-hover:translate-x-2 transition-transform duration-500">{subtitle}</h3>
     <p className="text-white/40 text-sm leading-relaxed font-light">{desc}</p>
  </div>
);

export default CorvetteShowcase;
