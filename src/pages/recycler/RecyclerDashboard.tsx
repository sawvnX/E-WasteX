import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, Recycle, Layers, CheckCircle2, AlertTriangle, Sparkles, Scale, Cpu, ShieldCheck } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { EwasteItem } from '../../types';
import { useToast } from '../../context/ToastContext';

export const RecyclerDashboard: React.FC = () => {
  const { showToast } = useToast();

  const [items, setItems] = useState<EwasteItem[]>(() => apiService.getEwasteItems());
  const [selectedItem, setSelectedItem] = useState<EwasteItem | null>(items[0] || null);

  const [recoveredCopper, setRecoveredCopper] = useState('0.45');
  const [recoveredGold, setRecoveredGold] = useState('0.002');
  const [recoveredPlastics, setRecoveredPlastics] = useState('1.2');

  const refreshItems = () => {
    setItems(apiService.getEwasteItems());
  };

  const handleStageUpdate = (itemId: string, status: EwasteItem['status'], stageNote: string) => {
    try {
      const updated = apiService.updateEwasteStatus(
        itemId,
        status,
        stageNote,
        'GreenTech Recovery Facility #4, Industrial Zone'
      );
      setSelectedItem(updated);
      refreshItems();
      showToast(`Item ${updated.trackingId} stage updated to ${status}!`, 'success');
    } catch {
      showToast('Failed to update stage', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Factory className="w-3.5 h-3.5" /> High-Precision Recovery Plant
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Recycling Facility <span className="text-gradient">Control Panel</span>
            </h1>
            <p className="text-xs text-slate-400">
              Facility: <code className="text-emerald-400 font-bold">GreenTech Plant #4</code> &bull; Material Recovery Rate: 98.4%
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs">
            <div className="text-slate-400">Total Items Processed</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">{items.length} Units</div>
          </div>
        </div>

        {/* Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Incoming Items Stream */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Incoming E-Waste Inventory</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedItem?.id === item.id
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-xl'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-emerald-400">{item.trackingId}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-950 text-slate-300 border border-slate-800">
                      {item.status}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-white mt-1">{item.brand} {item.model}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {item.category} &bull; {item.weightKg} KG &bull; Hazard: <span className="text-amber-400">{item.hazardLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plant Processing Inspector */}
          {selectedItem && (
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400">ITEM PASSPORT: {selectedItem.trackingId}</div>
                  <h2 className="text-xl font-black text-white mt-0.5">{selectedItem.brand} {selectedItem.model}</h2>
                  <div className="text-xs text-slate-400">{selectedItem.category} &bull; {selectedItem.weightKg} KG</div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs">
                  {selectedItem.status}
                </span>
              </div>

              {/* Processing Pipeline Buttons (Requirement #19) */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recycling Facility Pipeline Stage</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleStageUpdate(selectedItem.id, 'SUBMITTED', 'Item received at plant loading bay')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border ${
                      selectedItem.status === 'SUBMITTED' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    1. Received
                  </button>

                  <button
                    onClick={() => handleStageUpdate(selectedItem.id, 'SORTED', 'Categorized under High Precision Circuitry')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border ${
                      selectedItem.status === 'SORTED' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    2. Sorted
                  </button>

                  <button
                    onClick={() => handleStageUpdate(selectedItem.id, 'DISMANTLED', 'Batteries removed, boards prepared for extraction')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border ${
                      selectedItem.status === 'DISMANTLED' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    3. Dismantled
                  </button>

                  <button
                    onClick={() => handleStageUpdate(selectedItem.id, 'RECYCLED', 'Metals extracted & foundry secondary ingots produced')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border ${
                      selectedItem.status === 'RECYCLED' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    4. Recycled
                  </button>
                </div>
              </div>

              {/* Material Recovery Recorder */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> Material Yield Recovery Entry
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-amber-400 font-semibold">Copper (KG)</span>
                    <input
                      type="number"
                      value={recoveredCopper}
                      onChange={(e) => setRecoveredCopper(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-yellow-400 font-semibold">Gold (Grams)</span>
                    <input
                      type="number"
                      value={recoveredGold}
                      onChange={(e) => setRecoveredGold(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-400 font-semibold">Polymers (KG)</span>
                    <input
                      type="number"
                      value={recoveredPlastics}
                      onChange={(e) => setRecoveredPlastics(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStageUpdate(selectedItem.id, 'RECYCLED', `Zero-landfill recycling complete. Recovered ${recoveredCopper}kg Cu, ${recoveredGold}g Au.`)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm shadow-xl hover:emerald-glow transition-all"
              >
                Complete Recycling & Publish Zero-Landfill Certificate &rarr;
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
