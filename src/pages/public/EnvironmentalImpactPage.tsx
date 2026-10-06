import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { ShieldCheck, Leaf, Zap, Scale, Globe, Info, Sparkles, Activity } from 'lucide-react';
import { apiService } from '../../services/apiService';

export const EnvironmentalImpactPage: React.FC = () => {
  const metrics = apiService.getEnvironmentalStats();

  const monthlyRecyclingData = [
    { month: 'Jan', kg: 650, co2: 975 },
    { month: 'Feb', kg: 820, co2: 1230 },
    { month: 'Mar', kg: 1100, co2: 1650 },
    { month: 'Apr', kg: 1450, co2: 2175 },
    { month: 'May', kg: 1900, co2: 2850 },
    { month: 'Jun', kg: 2300, co2: 3450 },
    { month: 'Jul', kg: 2950, co2: 4425 },
  ];

  const materialData = [
    { name: 'Copper (1,420 kg)', value: 1420.5, color: '#f59e0b' },
    { name: 'Gold & Silver (3.8 kg)', value: 3.82, color: '#eab308' },
    { name: 'Aluminum (3,210 kg)', value: 3210.0, color: '#38bdf8' },
    { name: 'Plastics (4,150 kg)', value: 4150.0, color: '#10b981' },
    { name: 'Rare Earth Elements (18 kg)', value: 18.5, color: '#a855f7' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" /> Planetary Audit Analytics
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Real-Time <span className="text-gradient">Environmental Impact</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Quantifying toxic e-waste diversion, greenhouse gas reduction, and secondary raw material recovery.
          </p>
        </div>

        {/* Animated Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -2 }}
            className="glass-panel rounded-3xl p-6 border border-emerald-500/30 shadow-xl space-y-2 relative overflow-hidden"
          >
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> Total E-Waste Recycled
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              {metrics.totalKgRecycled.toLocaleString()} <span className="text-lg text-emerald-400 font-bold">KG</span>
            </div>
            <p className="text-[11px] text-slate-400">Equivalent to diverting 5.4 metric tons of heavy metal landfill toxicity.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="glass-panel rounded-3xl p-6 border border-teal-500/30 shadow-xl space-y-2 relative overflow-hidden"
          >
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
              <Leaf className="w-4 h-4" /> CO₂ Emission Avoided
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              {metrics.co2AvoidedKg.toLocaleString()} <span className="text-lg text-teal-400 font-bold">KG CO₂</span>
            </div>
            <p className="text-[11px] text-slate-400">Equivalent to planting 780 mature urban trees for 10 years.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="glass-panel rounded-3xl p-6 border border-cyan-500/30 shadow-xl space-y-2 relative overflow-hidden"
          >
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Devices Diverted
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              {metrics.devicesDiverted.toLocaleString()} <span className="text-lg text-cyan-400 font-bold">Units</span>
            </div>
            <p className="text-[11px] text-slate-400">Computers, smartphones, appliances saved from incinerators.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="glass-panel rounded-3xl p-6 border border-purple-500/30 shadow-xl space-y-2 relative overflow-hidden"
          >
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Active Network Drop-Offs
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              {metrics.collectionPointsCount} <span className="text-lg text-purple-400 font-bold">Centers</span>
            </div>
            <p className="text-[11px] text-slate-400">Certified collection points across 18 metro sectors.</p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Monthly Recycling Growth Chart */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Monthly E-Waste Volume & CO₂ Offsets</h3>
                <p className="text-xs text-slate-400">Cumulative KG recycled trajectory over past 7 months</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                +42% MoM Growth
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRecyclingData}>
                  <defs>
                    <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="kg" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorKg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recovered Materials Breakdown */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Recovered Circular Materials</h3>
              <p className="text-xs text-slate-400">Secondary raw materials extracted without primary mining</p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={materialData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={4}>
                    {materialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {materialData.map((m) => (
                <div key={m.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="text-slate-300 font-semibold">{m.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Calculation Standard Disclaimer (Requirement #16) */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-200">Environmental Calculation Methodology & Compliance Statement:</span>
            <p className="mt-1">
              Environmental savings metrics are estimates modeled using standard life-cycle assessment (LCA) factors (1.5 KG CO₂ avoided per 1.0 KG e-waste recycled vs virgin mining). Realized recovery yields are physically verified upon secondary smelter processing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
