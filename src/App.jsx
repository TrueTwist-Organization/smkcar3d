import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Preloader from './components/common/Preloader';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy loading pages for performance
const Home = lazy(() => import('./pages/Home'));
const CarsListing = lazy(() => import('./pages/CarsListing'));
const CarDetails = lazy(() => import('./pages/CarDetails'));
const CorvetteShowcase = lazy(() => import('./pages/CorvetteShowcase'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3500); // 3.5 seconds reveal
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader key="preloader" />}
      </AnimatePresence>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white/20 uppercase font-black tracking-[1em] animate-pulse">Establishing Nexus...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<CarsListing />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/corvette" element={<CorvetteShowcase />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
