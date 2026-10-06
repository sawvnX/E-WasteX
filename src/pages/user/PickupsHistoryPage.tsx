import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Calendar, MapPin, QrCode } from 'lucide-react';
import { apiService } from '../../services/apiService';

export const PickupsHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const pickups = apiService.getPickups();

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-400" /> My Pickup Requests History
          </h1>
          <button
            onClick={() => navigate('/book-pickup')}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            + Book New Pickup
          </button>
        </div>

        <div className="space-y-4">
          {pickups.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/track/${p.pickupId}`)}
              className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm text-emerald-400">{p.pickupId}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {p.status}
                </span>
              </div>
              <div className="text-xs text-slate-300">
                Scheduled: <strong>{p.scheduledDate} ({p.timeSlot})</strong>
              </div>
              <div className="text-xs text-slate-400">
                Location: {p.address}, {p.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
