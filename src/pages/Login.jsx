import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy Authentication as requested
    if (email === 'admin@gmail.com' && password === '123456') {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminToken', 'zentaro_dummy_token_2026');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Authorized personnel only.');
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-12 relative z-10"
      >
        <div className="mb-16 text-center">
           <div className="w-20 h-20 bg-red-600/10 border border-red-600/20 text-red-600 flex items-center justify-center mx-auto mb-10">
              <ShieldCheck size={40} />
           </div>
           <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Command Center</h1>
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">System Administration Interface</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-10">
           <div className="space-y-4">
              <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 block mb-4">Master Identifier</label>
              <div className="relative group">
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                   placeholder="admin@gmail.com"
                   className="w-full bg-black/40 border border-white/10 px-12 py-5 text-sm font-black uppercase tracking-widest text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-white/5"
                 />
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-600" size={18} />
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 block mb-4">Security Passphrase</label>
              <div className="relative group">
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   placeholder="••••••"
                   className="w-full bg-black/40 border border-white/10 px-12 py-5 text-sm font-black uppercase tracking-widest text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-white/5"
                 />
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-600" size={18} />
              </div>
           </div>

           {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-[10px] font-black uppercase tracking-widest text-center"
              >
                {error}
              </motion.p>
           )}

           <button 
             type="submit" 
             className="w-full bg-red-600 py-6 text-white font-black uppercase tracking-[0.6em] text-[10px] hover:bg-white hover:text-black transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-4 group"
           >
              AUTHENTICATE <ArrowRight className="group-hover:translate-x-3 transition-transform" />
           </button>
        </form>

        <div className="mt-20 pt-10 border-t border-white/5 text-center">
           <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">
              Authorized Users ONLY | All activities are logged
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
