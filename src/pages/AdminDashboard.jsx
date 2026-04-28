import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Edit2, LogOut, Package, 
  Search, ShieldCheck, ChevronRight, X, 
  Save, Car, Gauge, Wind 
} from 'lucide-react';
import { CARS } from '../data/cars';
import { carService } from '../api';

const AdminDashboard = () => {
  const [cars, setCars] = useState(CARS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carService.getAll().then(data => {
      if (data && data.length > 0) setCars(data);
    }).finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (window.confirm('IRREVERSIBLE ACTION: Purge this asset from inventory?')) {
      await carService.delete(id).catch(() => {});
      setCars(cars.filter(car => (car._id || car.id) !== id));
    }
  };

  const handleSave = (carData) => {
    if (editingCar) {
      setCars(cars.map(c => ((c._id || c.id) === editingCar._id || (c._id || c.id) === editingCar.id) ? { ...c, ...carData } : c));
    } else {
      setCars([...cars, { ...carData, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
    setEditingCar(null);
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-red-600 font-black uppercase tracking-[1em]">Establishing Admin Handshake...</div>;

  return (
    <div className="min-h-screen bg-[#070707] pt-32 pb-20 px-8 md:px-24 text-white">
      {/* HEADER HUB */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
        <div>
          <div className="flex items-center gap-4 mb-6">
             <div className="w-10 h-[2px] bg-red-600" />
             <p className="text-red-500 font-black tracking-[0.5em] uppercase text-[9px]">Inventory Management</p>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4">Command <br /> <span className="text-white/10">CENTER</span></h1>
        </div>

        <div className="flex gap-6">
           <button 
             onClick={() => setIsFormOpen(true)}
             className="bg-red-600 px-12 py-5 text-white font-black uppercase tracking-[0.5em] text-[10px] hover:bg-white hover:text-black transition-all flex items-center gap-4 shadow-2xl shadow-red-600/20"
           >
              <Plus size={20} /> Deploy Asset
           </button>
           <button 
             onClick={handleLogout}
             className="bg-white/5 border border-white/10 px-10 py-5 text-white/40 font-black uppercase tracking-[0.4em] text-[10px] hover:text-red-500 transition-all flex items-center gap-4"
           >
              <LogOut size={18} /> Terminate
           </button>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
         <div className="bg-white/[0.03] p-12 border-l-4 border-red-600">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4 block">ACTIVE FLEET</span>
            <div className="flex justify-between items-end">
               <span className="text-7xl font-black italic tracking-tighter">{cars.length}</span>
               <span className="text-red-600 pb-2 font-black italic">UNIT(S)</span>
            </div>
         </div>
         <div className="bg-white/[0.03] p-12 border-l-4 border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4 block">VALUATION CAP</span>
            <span className="text-5xl font-black italic tracking-tighter text-white/40">$84.2M</span>
         </div>
         <div className="bg-white/[0.03] p-12 border-l-4 border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4 block">PORTAL STATUS</span>
            <span className="text-2xl font-black italic tracking-tighter text-red-600 uppercase glow-red">ENCRYPTED</span>
         </div>
      </div>

      {/* ASSETS LIST */}
      <div className="space-y-4">
         <div className="grid grid-cols-12 px-10 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-white/20 border-b border-white/5">
            <div className="col-span-1">Ref</div>
            <div className="col-span-4">Vehicle Identity</div>
            <div className="col-span-2">Marque</div>
            <div className="col-span-2">Valuation</div>
            <div className="col-span-3 text-right">Operational Actions</div>
         </div>

         {cars.map((car, idx) => (
            <motion.div 
               key={car._id || car.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.05 }}
               className="grid grid-cols-12 items-center px-10 py-8 bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all group"
            >
               <div className="col-span-1 text-white/20 font-black italic">0{idx + 1}</div>
               <div className="col-span-4 flex items-center gap-6">
                  <div className="w-12 h-12 bg-zinc-900 border border-white/10 overflow-hidden">
                     <img src={car.images?.thumbnail} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all" alt="" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-white group-hover:text-red-600 transition-all">{car.name}</span>
               </div>
               <div className="col-span-2 text-[10px] font-black text-white/30 uppercase tracking-widest">{car.brand}</div>
               <div className="col-span-2 text-xs font-black italic text-white/60">{car.price || 'P.O.A'}</div>
               <div className="col-span-3 flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => { setEditingCar(car); setIsFormOpen(true); }}
                    className="flex items-center gap-2 text-[9px] font-black uppercase text-white/40 hover:text-white transition-all bg-white/[0.05] px-5 py-2"
                  >
                     <Edit2 size={12} /> Core Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(car._id || car.id)}
                    className="flex items-center gap-2 text-[9px] font-black uppercase text-red-600/40 hover:text-red-600 transition-all bg-red-600/5 px-5 py-2 hover:bg-red-600/10"
                  >
                     <Trash2 size={12} /> Purge
                  </button>
               </div>
            </motion.div>
         ))}
      </div>

      {/* ADD/EDIT MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <CarFormModal 
             car={editingCar} 
             onClose={() => { setIsFormOpen(false); setEditingCar(null); }} 
             onSave={handleSave} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const CarFormModal = ({ car, onClose, onSave }) => {
  const [formData, setFormData] = useState(car || {
    name: '', brand: '', price: '', description: '',
    images: { hero: '', thumbnail: '' },
    stats: { engine: '', horsepower: '', topSpeed: '', acceleration: '' },
    features: []
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-10 bg-black/90 backdrop-blur-3xl"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 p-12 max-h-[90vh] overflow-y-auto no-scrollbar relative"
      >
        <div className="flex justify-between items-start mb-16">
           <div>
              <p className="text-red-500 font-black tracking-[0.5em] uppercase text-[9px] mb-4">Configuration Portal</p>
              <h2 className="text-5xl font-black italic uppercase italic tracking-tighter">Asset Definition</h2>
           </div>
           <button onClick={onClose} className="text-white/20 hover:text-white transition-all"><X size={32} /></button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="grid grid-cols-2 gap-x-12 gap-y-10">
           <Input label="Vehicle Identity" value={formData.name} onChange={v => setFormData({...formData, name: v})} required />
           <Input label="Marque (Brand)" value={formData.brand} onChange={v => setFormData({...formData, brand: v})} required />
           <Input label="Asset Valuation ($)" value={formData.price} onChange={v => setFormData({...formData, price: v})} required />
           <Input label="Hero Visual URL" value={formData.images.hero} onChange={v => setFormData({...formData, images: {...formData.images, hero: v}})} required />
           
           <div className="col-span-2 pt-10 border-t border-white/5">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-10">Performance Core Metrics</span>
              <div className="grid grid-cols-4 gap-8">
                 <Input label="Engine" value={formData.stats.engine} onChange={v => setFormData({...formData, stats: {...formData.stats, engine: v}})} />
                 <Input label="Horsepower" value={formData.stats.horsepower} onChange={v => setFormData({...formData, stats: {...formData.stats, horsepower: v}})} />
                 <Input label="Top Speed" value={formData.stats.topSpeed} onChange={v => setFormData({...formData, stats: {...formData.stats, topSpeed: v}})} />
                 <Input label="0-100 Acc" value={formData.stats.acceleration} onChange={v => setFormData({...formData, stats: {...formData.stats, acceleration: v}})} />
              </div>
           </div>

           <div className="col-span-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-white/30 block mb-4">Manifesto / Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-black/40 border border-white/5 p-6 text-sm text-white/60 focus:border-red-600 outline-none transition-all h-32"
                placeholder="The philosophical DNA of the machine..."
              />
           </div>

           <div className="col-span-2 flex justify-end gap-8 pt-10">
              <button 
                type="button" 
                onClick={onClose}
                className="px-12 py-5 text-[10px] font-black uppercase text-white/40 hover:text-white transition-all"
              >
                 Abort
              </button>
              <button 
                type="submit" 
                className="bg-red-600 px-16 py-5 text-white font-black uppercase tracking-[0.6em] text-[10px] hover:bg-white hover:text-black transition-all flex items-center gap-4"
              >
                 <Save size={18} /> Seal Asset
              </button>
           </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Input = ({ label, value, onChange, required = false }) => (
  <div className="space-y-4">
     <label className="text-[10px] uppercase font-black tracking-widest text-white/30">{label}</label>
     <input 
        type="text" 
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={`Enter ${label}...`}
        className="w-full bg-black/40 border-b border-white/10 py-4 text-sm font-black tracking-wider text-white focus:border-red-600 outline-none transition-all placeholder:text-white/5"
     />
  </div>
);

export default AdminDashboard;
