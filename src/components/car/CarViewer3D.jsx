import React, { useRef, useEffect } from 'react';
import { CARS } from '../../data/cars';

const CarViewer3D = ({ carId, color }) => {
  const modelRef = useRef(null);
  const car = CARS.find(c => c.id === carId || c._id === carId);

  // Set default model URL (placeholder if none found)
  const defaultModel = 'https://raw.githubusercontent.com/pmndrs/drei-assets/master/ferrari.glb';
  const carModelUrl = car?.modelUrl || car?.glbModel || defaultModel;
  
  useEffect(() => {
    if (modelRef.current && color) {
      const model = modelRef.current;
      // Change base color
      const material = model.model?.materials?.[0]; 
      if (material) {
        material.pbrMetallicRoughness.setBaseColorFactor(color);
      }
    }
  }, [color]);

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <model-viewer
        ref={modelRef}
        src={carModelUrl}
        alt={`A 3D model of ${car?.name || 'Supercar'}`}
        auto-rotate
        camera-controls
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        interaction-prompt="auto"
        ar-modes="webxr scene-viewer quick-look"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 text-white/5 font-black text-[20vw] select-none uppercase italic whitespace-nowrap">
           {car?.brand || 'EXOTIC'}
        </div>
      </model-viewer>
    </div>
  );
};

export default CarViewer3D;
