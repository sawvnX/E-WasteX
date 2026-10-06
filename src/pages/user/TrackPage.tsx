import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Layers,
  Recycle,
  MapPin,
  Phone,
  User as UserIcon,
  Download,
  Share2,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { PickupStatus } from '../../types';
import { useToast } from '../../context/ToastContext';

export const TrackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [searchId, setSearchId] = useState(id || 'PU-2026-004582');
  const [activeQuery, setActiveQuery] = useState(id || 'PU-2026-004582');

  const pickup = apiService.getPickupById(activeQuery);
  const ewasteItem = apiService.getEwasteById(activeQuery);

  const qrRef = useRef<SVGSVGElement | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setActiveQuery(searchId.trim());
      navigate(`/track/${searchId.trim()}`);
    }
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const SVGURL = window.URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = SVGURL;
    downloadLink.download = `EWASTEX-QR-${activeQuery}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    showToast(`QR Code Passport downloaded!`, 'success');
  };

  // Pickup Timeline Stages
  const pickupStages: { key: PickupStatus; label: string; desc: string }[] = [
    { key: 'REQUEST_CREATED', label: 'REQUEST CREATED', desc: 'Pickup request logged' },
    { key: 'COLLECTOR_ASSIGNED', label: 'COLLECTOR ASSIGNED', desc: 'Agent dispatched' },
    { key: 'PICKUP_SCHEDULED', label: 'PICKUP SCHEDULED', desc: 'Time slot confirmed' },
    { key: 'COLLECTED', label: 'COLLECTED', desc: 'E-waste retrieved' },
    { key: 'SORTING_CENTER', label: 'SORTING CENTER', desc: 'Arrived at hub' },
    { key: 'PROCESSING', label: 'PROCESSING', desc: 'Dismantling & recovery' },
    { key: 'RECYCLED', label: 'RECYCLED', desc: 'Zero-landfill certified' },
  ];

  const getStageIndex = (status: PickupStatus) => {
    return pickupStages.findIndex((s) => s.key === status);
  };

  const currentStageIndex = pickup ? getStageIndex(pickup.status) : 2;

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Search */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5" /> Blockchain Digital Passport
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Live Lifecycle <span className="text-gradient">Tracking</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Track real-time location, collector status, and recycling recovery metrics for any Pickup ID or E-Waste QR code.
          </p>

          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter PU-2026-... or EW-2026-..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
            >
              Track
            </button>
          </form>
        </div>

        {/* Content View: If Pickup Request Found */}
        {pickup ? (
          <div className="space-y-6">
            
            {/* Top Status Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    PICKUP TRACKING ID: {pickup.pickupId}
                  </div>
                  <h2 className="text-2xl font-black text-white mt-1">Status: {pickup.status.replace('_', ' ')}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Scheduled for {pickup.scheduledDate} ({pickup.timeSlot})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-xl shadow-inner shrink-0">
                    <QRCodeSVG ref={qrRef} value={`https://ewastex.app/track/${pickup.pickupId}`} size={80} />
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs flex items-center gap-1.5 font-bold"
                  >
                    <Download className="w-4 h-4" /> Download QR
                  </button>
                </div>
              </div>

              {/* Animated Timeline */}
              <div className="py-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lifecycle Tracking Milestones</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
                  {pickupStages.map((stage, idx) => {
                    const isPassed = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div
                        key={stage.key}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isCurrent
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 emerald-glow font-bold'
                            : isPassed
                            ? 'bg-slate-900 border-emerald-500/30 text-emerald-400'
                            : 'bg-slate-950/40 border-slate-800 text-slate-600'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full mx-auto mb-1.5 flex items-center justify-center font-bold text-[10px] bg-slate-950 border border-current">
                          {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div className="text-[10px] font-bold leading-tight">{stage.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Collector Details Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" /> Assigned Logistics Agent
                  </div>
                  <div className="text-slate-300">{pickup.collectorName || 'Marcus Vance (Eco Haulers)'}</div>
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> {pickup.collectorPhone || '+1 (555) 876-5432'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" /> Pickup Address
                  </div>
                  <div className="text-slate-300">{pickup.address}, {pickup.city}</div>
                  <div className="text-slate-400">Pincode: {pickup.pinCode}</div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Items in this Pickup</h4>
                <div className="space-y-2">
                  {pickup.items.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white">{item.brand} {item.model}</span>
                        <span className="text-slate-400 ml-2">({item.category})</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold">{item.trackingId}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : ewasteItem ? (
          /* Single E-Waste QR Item Lifecycle View */
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono font-bold text-emerald-400">PASSPORT: {ewasteItem.trackingId}</div>
                <h2 className="text-2xl font-black text-white">{ewasteItem.brand} {ewasteItem.model}</h2>
                <div className="text-xs text-slate-400 mt-1">{ewasteItem.category} &bull; {ewasteItem.weightKg} KG</div>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-inner">
                <QRCodeSVG value={`https://ewastex.app/track/${ewasteItem.trackingId}`} size={80} />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Detailed Audit Trail & Lifecycle History</h4>
              <div className="space-y-3">
                {ewasteItem.lifecycle.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{step.status}</span>
                        <span className="text-slate-400 font-mono">{step.timestamp}</span>
                      </div>
                      <div className="text-emerald-400 font-semibold">{step.location}</div>
                      <p className="text-slate-400">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center space-y-4 glass-panel rounded-3xl border border-slate-800">
            <Search className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Tracking Record Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We could not locate tracking record for "{activeQuery}". Try searching <code className="text-emerald-400">PU-2026-004582</code> or <code className="text-emerald-400">EW-2026-000921</code>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
