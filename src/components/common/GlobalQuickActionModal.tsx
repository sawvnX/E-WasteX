import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, Camera, Upload, Edit3, Truck, Calculator, X, Sparkles } from 'lucide-react';

export const GlobalQuickActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold shadow-2xl emerald-glow cursor-pointer"
        >
          <Recycle className="w-5 h-5 animate-spin-slow text-slate-950" />
          <span className="text-sm tracking-wide font-black">Recycle Now</span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
        </motion.button>
      </div>

      {/* Quick Action Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl overflow-hidden"
            >
              {/* Background ambient lighting */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">E-Waste Quick Actions</h3>
                    <p className="text-xs text-slate-400">Choose how you would like to proceed</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleAction('/scan')}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/60 hover:bg-emerald-950/30 transition-all text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 flex items-center justify-center transition-all shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-100 group-hover:text-emerald-400">
                      Scan with Camera
                    </div>
                    <div className="text-xs text-slate-400">Live AI device detection</div>
                  </div>
                </button>

                <button
                  onClick={() => handleAction('/scan')}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-teal-500/20 hover:border-teal-500/60 hover:bg-teal-950/30 transition-all text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-500/10 group-hover:bg-teal-500 group-hover:text-slate-950 text-teal-400 flex items-center justify-center transition-all shrink-0">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-100 group-hover:text-teal-400">
                      Upload Image
                    </div>
                    <div className="text-xs text-slate-400">Upload device photo</div>
                  </div>
                </button>

                <button
                  onClick={() => handleAction('/submit-ewaste')}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-500/60 hover:bg-cyan-950/30 transition-all text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-slate-950 text-cyan-400 flex items-center justify-center transition-all shrink-0">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-100 group-hover:text-cyan-400">
                      Enter Manually
                    </div>
                    <div className="text-xs text-slate-400">Fill device specs form</div>
                  </div>
                </button>

                <button
                  onClick={() => handleAction('/book-pickup')}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/60 hover:bg-emerald-950/30 transition-all text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 flex items-center justify-center transition-all shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-100 group-hover:text-emerald-400">
                      Book Pickup
                    </div>
                    <div className="text-xs text-slate-400">Doorstep collection slot</div>
                  </div>
                </button>
              </div>

              <div className="mt-3">
                <button
                  onClick={() => handleAction('/calculator')}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900/80 border border-emerald-500/30 hover:border-emerald-400 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm text-emerald-300">Calculate E-Waste Value</div>
                      <div className="text-xs text-slate-400">Instant price & reward estimation</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    Try Now &rarr;
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
