import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ShieldCheck, Leaf, Globe, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white">
                E-Waste<span className="text-gradient">X</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Smart e-waste collection, responsible recycling, and end-to-end lifecycle transparency. Transform obsolete electronics into valuable secondary resources.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> ISO 14001 Certified
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[11px] font-semibold text-teal-400">
                <Leaf className="w-3.5 h-3.5" /> Zero-Landfill Policy
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home Landing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link to="/categories" className="hover:text-emerald-400 transition-colors">E-Waste Categories</Link></li>
              <li><Link to="/collection-centers" className="hover:text-emerald-400 transition-colors">Collection Centers</Link></li>
              <li><Link to="/rewards" className="hover:text-emerald-400 transition-colors">Eco Rewards Store</Link></li>
              <li><Link to="/calculator" className="hover:text-emerald-400 transition-colors">Value Calculator</Link></li>
            </ul>
          </div>

          {/* User & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Portals & Workflows</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">User Dashboard</Link></li>
              <li><Link to="/submit-ewaste" className="hover:text-emerald-400 transition-colors">Submit E-Waste</Link></li>
              <li><Link to="/scan" className="hover:text-emerald-400 transition-colors">AI E-Waste Scanner</Link></li>
              <li><Link to="/book-pickup" className="hover:text-emerald-400 transition-colors">Book Doorstep Pickup</Link></li>
              <li><Link to="/collector/dashboard" className="hover:text-emerald-400 transition-colors">Collector Hub</Link></li>
              <li><Link to="/recycler/dashboard" className="hover:text-emerald-400 transition-colors">Recycler Facility</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-emerald-400 transition-colors">Admin Command Center</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400">Subscribe for environmental impact insights & recycling drives.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to E-WasteX updates!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  className="w-full pl-3 pr-9 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="absolute right-2 top-2 text-emerald-400 hover:text-emerald-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>&copy; 2026 E-WasteX</span>
            <span className="text-slate-700">&bull;</span>
            <span className="text-emerald-400/90 font-mono font-semibold">UI &amp; DEV by Sawan Kr.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact Support</Link>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
