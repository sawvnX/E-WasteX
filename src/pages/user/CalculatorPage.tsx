import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Zap, Award, Info, ArrowRight, RefreshCw, CheckCircle } from 'lucide-react';
import { EwasteCategory, EwasteCondition } from '../../types';

export const CalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState<EwasteCategory>('Computer Equipment');
  const [brand, setBrand] = useState('Dell');
  const [ageYears, setAgeYears] = useState(3);
  const [condition, setCondition] = useState<EwasteCondition>('Working');
  const [weightKg, setWeightKg] = useState(2.0);

  // Dynamic Calculation
  const calculateValues = () => {
    let baseRatePerKg = 450;
    if (category === 'Mobile Devices') baseRatePerKg = 2200;
    else if (category === 'Computer Equipment') baseRatePerKg = 850;
    else if (category === 'Home Appliances') baseRatePerKg = 150;
    else if (category === 'Batteries & Power') baseRatePerKg = 600;

    let conditionMultiplier = 1.0;
    if (condition === 'Working') conditionMultiplier = 1.8;
    else if (condition === 'Minor Damage') conditionMultiplier = 1.2;
    else if (condition === 'Severely Damaged') conditionMultiplier = 0.7;
    else conditionMultiplier = 0.4;

    const ageDepreciation = Math.max(0.4, 1 - ageYears * 0.12);

    const estimatedValueINR = Math.round(weightKg * baseRatePerKg * conditionMultiplier * ageDepreciation);
    const recyclingValueINR = Math.round(weightKg * 120 + estimatedValueINR * 0.3);
    const rewardPoints = Math.round(weightKg * 150 + (condition === 'Working' ? 300 : 150));
    const co2Saved = (weightKg * 1.8).toFixed(1);

    return { estimatedValueINR, recyclingValueINR, rewardPoints, co2Saved };
  };

  const results = calculateValues();

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" /> Instant Appraisal Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            E-Waste <span className="text-gradient">Value Calculator</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Estimate monetary buyback value, material salvage value, and eco-reward points instantly based on device specs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Device Specifications
            </h3>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Device Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EwasteCategory)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="Computer Equipment">Computer Equipment (Laptop, Desktop, Server)</option>
                <option value="Mobile Devices">Mobile Devices (Smartphones, Tablets)</option>
                <option value="Home Appliances">Home Appliances (TV, Refrigerator, AC)</option>
                <option value="Audio & Video">Audio & Video (Headphones, Speakers)</option>
                <option value="Batteries & Power">Batteries & Power (Power Banks, Inverters)</option>
                <option value="Office Electronics">Office Electronics (Printers, Scanners)</option>
              </select>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Dell, Apple, Samsung"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Working Condition</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Working', 'Minor Damage', 'Severely Damaged', 'Scrap / Parts Only'] as EwasteCondition[]).map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setCondition(cond)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-left transition-all ${
                      condition === cond
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300 uppercase tracking-wider">Age of Device</span>
                <span className="text-emerald-400 font-mono">{ageYears} Years Old</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={ageYears}
                onChange={(e) => setAgeYears(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300 uppercase tracking-wider">Approximate Weight</span>
                <span className="text-emerald-400 font-mono">{weightKg} KG</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="25"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <motion.div
              key={`${category}-${condition}-${weightKg}-${ageYears}`}
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-center pb-4 border-b border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calculated Market Value</div>
                <div className="text-4xl font-black text-white mt-1">₹{results.estimatedValueINR.toLocaleString()}</div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">Direct payout upon collection</div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Award className="w-4 h-4 text-emerald-400" /> Reward Wallet Credits
                  </div>
                  <div className="text-base font-black text-emerald-400">+{results.rewardPoints} Pts</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Zap className="w-4 h-4 text-teal-400" /> CO₂ Avoided Impact
                  </div>
                  <div className="text-base font-black text-teal-300">{results.co2Saved} KG CO₂</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <RefreshCw className="w-4 h-4 text-cyan-400" /> Salvage Material Value
                  </div>
                  <div className="text-sm font-bold text-white">₹{results.recyclingValueINR.toLocaleString()}</div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200/80 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Disclaimer: Estimated values are indicative and may vary after physical component inspection by authorized collectors.</span>
              </div>

              {/* Next CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate('/book-pickup')}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg hover:emerald-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Book Pickup at this Valuation &rarr;
                </button>
                <button
                  onClick={() => navigate('/scan')}
                  className="w-full py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Scan Device with Camera First
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
