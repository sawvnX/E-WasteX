import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Recycle,
  Camera,
  MapPin,
  Truck,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Smartphone,
  Tv,
  Battery,
  Headphones,
  Users
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 animate-pulse" /> Next-Gen Environmental Technology
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight"
          >
            Give Your E-Waste <br />
            <span className="text-gradient">a Second Life.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Smart collection. Responsible recycling. Complete transparency.
            Transform obsolete devices into valuable secondary resources with AI scanning & blockchain tracking.
          </motion.p>

          {/* Hero CTA Buttons (Requirement #5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => navigate('/submit-ewaste')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-sm shadow-2xl hover:emerald-glow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Recycle className="w-5 h-5 text-slate-950 animate-spin-slow" /> Recycle Now
            </button>

            <button
              onClick={() => navigate('/scan')}
              className="px-8 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white font-extrabold text-sm border border-emerald-500/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-5 h-5 text-emerald-400" /> Scan E-Waste
            </button>

            <button
              onClick={() => navigate('/collection-centers')}
              className="px-8 py-4 rounded-full bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white font-bold text-sm border border-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-cyan-400" /> Find Collection Center
            </button>
          </motion.div>

          {/* Hero Visual Banner Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8 max-w-3xl mx-auto"
          >
            <div className="glass-panel rounded-3xl p-4 sm:p-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                alt="Electronics Transformation"
                className="w-full h-64 sm:h-80 object-cover rounded-2xl filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent rounded-2xl flex items-end p-6">
                <div className="text-left space-y-1">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Circular Economy Visualizer</div>
                  <div className="text-lg font-black text-white">Circuit Boards &bull; Lithium Recovery &bull; 0% Landfill Residue</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Statistics Section (Requirement #5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-emerald-500/20 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">10,000+</div>
            <div className="text-xs text-emerald-400 font-extrabold uppercase tracking-wider">KG Recycled</div>
          </div>
          <div className="glass-panel rounded-3xl p-6 border border-teal-500/20 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">5,000+</div>
            <div className="text-xs text-teal-400 font-extrabold uppercase tracking-wider">Devices Processed</div>
          </div>
          <div className="glass-panel rounded-3xl p-6 border border-cyan-500/20 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">2,500+</div>
            <div className="text-xs text-cyan-400 font-extrabold uppercase tracking-wider">Registered Users</div>
          </div>
          <div className="glass-panel rounded-3xl p-6 border border-purple-500/20 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">120+</div>
            <div className="text-xs text-purple-400 font-extrabold uppercase tracking-wider">Collection Points</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">3-Step Process</div>
          <h2 className="text-3xl font-extrabold text-white">How E-WasteX Works</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">Seamless end-to-end workflow from camera scan to certified recycling.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xl">1</div>
            <h3 className="text-lg font-bold text-white">Scan or Register</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use our AI Camera Scanner or fill out quick specs. Get instant device valuation & QR digital passport.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-4 hover:border-teal-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-black text-xl">2</div>
            <h3 className="text-lg font-bold text-white">Drop Off or Pickup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Schedule doorstep pickup with certified logistics agents or drop off at nearest authorized center.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-black text-xl">3</div>
            <h3 className="text-lg font-bold text-white">Track & Earn Rewards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Follow live recycling progress, earn eco points, and redeem gift cards or tree planting sponsorships.
            </p>
          </div>
        </div>
      </section>

      {/* E-Waste Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Accepted E-Waste Categories</h2>
            <p className="text-xs text-slate-400">We safely handle all electronic hardware categories.</p>
          </div>
          <Link to="/categories" className="text-xs font-bold text-emerald-400 hover:underline">
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-center space-y-3 transition-all">
            <Cpu className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="font-bold text-xs text-white">Computers & Laptops</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 text-center space-y-3 transition-all">
            <Smartphone className="w-8 h-8 text-teal-400 mx-auto" />
            <div className="font-bold text-xs text-white">Mobile Devices</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-center space-y-3 transition-all">
            <Tv className="w-8 h-8 text-cyan-400 mx-auto" />
            <div className="font-bold text-xs text-white">Home Appliances</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 text-center space-y-3 transition-all">
            <Battery className="w-8 h-8 text-purple-400 mx-auto" />
            <div className="font-bold text-xs text-white">Batteries & Power</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 text-center space-y-3 transition-all">
            <Headphones className="w-8 h-8 text-pink-400 mx-auto" />
            <div className="font-bold text-xs text-white">Audio & Video</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-10 border border-emerald-500/30 text-center space-y-6 relative overflow-hidden emerald-glow">
          <h2 className="text-3xl font-black text-white">Ready to Clean Up Your E-Waste?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">Join 2,500+ users building a cleaner, zero-landfill environment today.</p>
          <button
            onClick={() => navigate('/submit-ewaste')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-sm shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            Get Started Now &rarr;
          </button>
        </div>
      </section>

    </div>
  );
};
