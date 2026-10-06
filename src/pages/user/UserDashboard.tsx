import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import {
  Package,
  Recycle,
  Award,
  Zap,
  Camera,
  Upload,
  Truck,
  Search,
  MapPin,
  ArrowRight,
  Sparkles,
  QrCode,
  Clock,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const ewasteItems = apiService.getEwasteItems().filter((i) => i.userId === user?.id || i.userId === 'user-1');
  const pickups = apiService.getPickups().filter((p) => p.userId === user?.id || p.userId === 'user-1');

  const totalKg = user?.totalRecycledKg || ewasteItems.reduce((acc, i) => acc + i.weightKg, 0);
  const recycledCount = ewasteItems.filter((i) => i.status === 'RECYCLED').length;
  const points = user?.points || 1450;
  const co2Saved = (totalKg * 1.5).toFixed(1);

  const categoryChartData = [
    { name: 'Computers', count: 4, color: '#10b981' },
    { name: 'Mobiles', count: 3, color: '#38bdf8' },
    { name: 'Appliances', count: 1, color: '#f59e0b' },
    { name: 'Audio', count: 2, color: '#a855f7' },
  ];

  const activityData = [
    { month: 'Jun', count: 1 },
    { month: 'Jul', count: 2 },
    { month: 'Aug', count: 3 },
    { month: 'Sep', count: 5 },
    { month: 'Oct', count: 8 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* User Welcome Banner */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Eco-Warrior Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, <span className="text-gradient">{user?.name || 'Alex Rivera'}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
              Track your e-waste contributions, book doorstep collections, and redeem earned rewards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/scan')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg hover:emerald-glow transition-all flex items-center gap-2"
            >
              <Camera className="w-4 h-4" /> AI Scanner
            </button>
            <button
              onClick={() => navigate('/book-pickup')}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-emerald-400" /> Book Pickup
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-4 h-4 text-emerald-400" /> Total E-Waste Logged
            </div>
            <div className="text-3xl font-black text-white font-mono">{ewasteItems.length} Items</div>
            <div className="text-[11px] text-slate-400">Total weight: {totalKg.toFixed(1)} KG</div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Recycle className="w-4 h-4 text-teal-400" /> Recycled Safely
            </div>
            <div className="text-3xl font-black text-emerald-400 font-mono">{recycledCount} Items</div>
            <div className="text-[11px] text-slate-400">100% Zero landfill residue</div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Reward Points
            </div>
            <div className="text-3xl font-black text-white font-mono">{points} PTS</div>
            <div className="text-[11px] text-emerald-400 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/rewards')}>
              Redeem Rewards &rarr;
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" /> CO₂ Impact Saved
            </div>
            <div className="text-3xl font-black text-cyan-400 font-mono">{co2Saved} KG</div>
            <div className="text-[11px] text-slate-400">Equivalent to 24 trees planted</div>
          </div>
        </div>

        {/* Quick Actions Panel (Requirement #14) */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Actions Hub</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => navigate('/scan')}
              className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-400 hover:bg-emerald-950/20 text-center space-y-2 transition-all group"
            >
              <Camera className="w-6 h-6 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Scan E-Waste</div>
            </button>

            <button
              onClick={() => navigate('/submit-ewaste')}
              className="p-4 rounded-2xl bg-slate-900/60 border border-teal-500/20 hover:border-teal-400 hover:bg-teal-950/20 text-center space-y-2 transition-all group"
            >
              <Upload className="w-6 h-6 text-teal-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Upload / Register</div>
            </button>

            <button
              onClick={() => navigate('/book-pickup')}
              className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-950/20 text-center space-y-2 transition-all group"
            >
              <Truck className="w-6 h-6 text-cyan-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Book Pickup</div>
            </button>

            <button
              onClick={() => navigate('/track')}
              className="p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20 hover:border-purple-400 hover:bg-purple-950/20 text-center space-y-2 transition-all group"
            >
              <QrCode className="w-6 h-6 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Track Item / QR</div>
            </button>

            <button
              onClick={() => navigate('/collection-centers')}
              className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-400 hover:bg-emerald-950/20 text-center space-y-2 transition-all group"
            >
              <MapPin className="w-6 h-6 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Find Center</div>
            </button>
          </div>
        </div>

        {/* Charts & Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent E-Waste Passports */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">My Registered E-Waste Items</h3>
              <button onClick={() => navigate('/submit-ewaste')} className="text-xs text-emerald-400 font-bold hover:underline">
                + Register Item
              </button>
            </div>

            <div className="space-y-3">
              {ewasteItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/track/${item.trackingId}`)}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.model} className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0" />
                    <div>
                      <div className="font-bold text-sm text-white">{item.brand} {item.model}</div>
                      <div className="text-xs text-slate-400">{item.category} &bull; {item.weightKg} KG</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      item.status === 'RECYCLED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">{item.trackingId}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Categories Chart */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Category Breakdown</h3>
              <p className="text-xs text-slate-400">Distribution by hardware type</p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryChartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
