import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Phone, CheckCircle2, Clock, Upload, ArrowRight, ShieldCheck, Camera } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { PickupRequest, PickupStatus } from '../../types';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const CollectorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [pickups, setPickups] = useState<PickupRequest[]>(() => apiService.getPickups());
  const [selectedPickup, setSelectedPickup] = useState<PickupRequest | null>(pickups[0] || null);
  const [actualWeight, setActualWeight] = useState<string>('2.5');
  const [collectorNotes, setCollectorNotes] = useState<string>('Verified battery seal and motherboards intact.');

  const refreshPickups = () => {
    setPickups(apiService.getPickups());
  };

  const handleStatusUpdate = (pickupId: string, newStatus: PickupStatus) => {
    try {
      const updated = apiService.updatePickupStatus(pickupId, newStatus, {
        collectorId: user?.id || 'collector-1',
        collectorName: user?.name || 'Marcus Vance (Eco Haulers)',
        collectorPhone: user?.phone || '+1 (555) 876-5432',
        actualCollectedWeightKg: parseFloat(actualWeight) || 2.5,
        notes: collectorNotes,
        proofImageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=300',
      });
      setSelectedPickup(updated);
      refreshPickups();
      showToast(`Pickup ${updated.pickupId} status updated to ${newStatus}!`, 'success');
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" /> Eco Logistics Fleet Hub
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Collector Dispatch <span className="text-gradient">Console</span>
            </h1>
            <p className="text-xs text-slate-400">
              Agent ID: <code className="text-emerald-400 font-bold">{user?.id || 'collector-1'}</code> &bull; Eco Haulers Sector 4
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs">
            <div className="text-slate-400">Assigned Pickups Today</div>
            <div className="text-2xl font-black text-white font-mono">{pickups.length} Tasks</div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Pickup Tasks List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Assigned Pickups Queue</h3>
            <div className="space-y-3">
              {pickups.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPickup(p)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedPickup?.id === p.id
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-xl'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-emerald-400">{p.pickupId}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-950 text-slate-300 border border-slate-800">
                      {p.status}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-white mt-1">{p.userName}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {p.address}, {p.city}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action & Status Inspector Panel (Requirement #18) */}
          {selectedPickup && (
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400">PICKUP DETAILS: {selectedPickup.pickupId}</div>
                  <h2 className="text-xl font-black text-white mt-0.5">{selectedPickup.userName}</h2>
                </div>

                <a
                  href={`tel:${selectedPickup.userPhone}`}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Customer
                </a>
              </div>

              {/* Status Stepper Action */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Update Collector Workflow Stage</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { status: 'COLLECTOR_ASSIGNED', label: '1. Assigned' },
                    { status: 'PICKUP_SCHEDULED', label: '2. En Route' },
                    { status: 'COLLECTED', label: '3. Collected' },
                    { status: 'SORTING_CENTER', label: '4. Delivered Hub' },
                  ].map((st) => (
                    <button
                      key={st.status}
                      type="button"
                      onClick={() => handleStatusUpdate(selectedPickup.id, st.status as PickupStatus)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedPickup.status === st.status
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enter Collected Weight & Upload Proof */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verified Weight (KG)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={actualWeight}
                    onChange={(e) => setActualWeight(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verification Photo Proof</label>
                  <button
                    onClick={() => showToast('Proof photo captured & attached to ledger!', 'success')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Camera className="w-4 h-4 text-emerald-400" /> Capture Pickup Photo
                  </button>
                </div>
              </div>

              {/* Collector Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Collector Dispatch Notes</label>
                <textarea
                  rows={2}
                  value={collectorNotes}
                  onChange={(e) => setCollectorNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleStatusUpdate(selectedPickup.id, 'COLLECTED')}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm shadow-xl hover:emerald-glow transition-all"
                >
                  Mark Pickup Completed & Submit Weight &rarr;
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
