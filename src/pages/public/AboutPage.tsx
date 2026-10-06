import React from 'react';
import { ShieldCheck, Leaf, Globe, Recycle, Award, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Recycle className="w-3.5 h-3.5" /> Our Mission & Vision
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Pioneering Zero-Landfill <br />
            <span className="text-gradient">E-Waste Infrastructure</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            E-WasteX is an environmental technology platform empowering citizens, logistics fleets, and recyclers to divert toxic electronic waste into high-purity secondary raw materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-extrabold text-base text-white">ISO 14001 Compliant</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Full compliance with hazardous waste management standards and strict zero-landfill mandates.</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 text-center">
            <Globe className="w-8 h-8 text-teal-400 mx-auto" />
            <h3 className="font-extrabold text-base text-white">End-to-End Transparency</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Every item gets a digital QR passport tracing component extraction down to the foundry level.</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3 text-center">
            <Award className="w-8 h-8 text-cyan-400 mx-auto" />
            <h3 className="font-extrabold text-base text-white">Incentivized Recycling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Direct monetary buyback appraisals & eco reward points redeemable for gift cards and tree planting.</p>
          </div>
        </div>

        {/* Project Attribution Card */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 max-w-sm mx-auto text-center space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project</div>
          <div className="text-sm font-extrabold text-white">E-WasteX</div>
          <div className="text-xs font-mono font-semibold text-emerald-400 pt-1">UI &amp; DEV by Sawan Kr.</div>
        </div>
      </div>
    </div>
  );
};
