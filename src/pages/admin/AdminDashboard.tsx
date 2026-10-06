import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import {
  Users,
  Package,
  Scale,
  Truck,
  Recycle,
  Factory,
  MapPin,
  Award,
  BarChart3,
  FileText,
  ShieldCheck,
  Settings,
  Sparkles,
  Search,
  CheckCircle2,
  Trash2,
  Edit
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'USERS' | 'EWASTE' | 'PICKUPS' | 'CENTERS'>('OVERVIEW');
  const [searchFilter, setSearchFilter] = useState('');

  const users = apiService.getUsers();
  const ewasteItems = apiService.getEwasteItems();
  const pickups = apiService.getPickups();
  const centers = apiService.getCollectionCenters();

  const totalUsers = users.length;
  const totalEwaste = ewasteItems.length;
  const totalKg = ewasteItems.reduce((acc, i) => acc + i.weightKg, 0);
  const totalPickups = pickups.length;
  const recyclingRate = 96.8;
  const activeCollectors = 14;
  const activeRecyclers = 6;

  const monthlyVolumeData = [
    { month: 'May', kg: 1900 },
    { month: 'Jun', kg: 2300 },
    { month: 'Jul', kg: 2950 },
    { month: 'Aug', kg: 3800 },
    { month: 'Sep', kg: 4600 },
    { month: 'Oct', kg: 5420 },
  ];

  const categoryDistribution = [
    { name: 'Computers', value: 45, color: '#10b981' },
    { name: 'Mobiles', value: 25, color: '#38bdf8' },
    { name: 'Appliances', value: 15, color: '#f59e0b' },
    { name: 'Batteries', value: 10, color: '#a855f7' },
    { name: 'Audio/Video', value: 5, color: '#ec4899' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Oversight Console
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              E-WasteX <span className="text-gradient">Command Center</span>
            </h1>
            <p className="text-xs text-slate-400">
              System Health: <span className="text-emerald-400 font-bold">100% Operational</span> &bull; Security Protocol v2.4 Active
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {(['OVERVIEW', 'USERS', 'EWASTE', 'PICKUPS', 'CENTERS'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-8">
            
            {/* 8 Top Key Performance Indicator Cards (Requirement #20) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                <Users className="w-4 h-4 text-emerald-400 mx-auto" />
                <div className="text-lg font-black text-white">{totalUsers}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Users</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                <Package className="w-4 h-4 text-teal-400 mx-auto" />
                <div className="text-lg font-black text-white">{totalEwaste}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">E-Waste Items</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                <Scale className="w-4 h-4 text-cyan-400 mx-auto" />
                <div className="text-lg font-black text-white">{totalKg.toFixed(0)} KG</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Weight</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                <Truck className="w-4 h-4 text-purple-400 mx-auto" />
                <div className="text-lg font-black text-white">{totalPickups}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Pickups</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                <Recycle className="w-4 h-4 text-emerald-400 mx-auto" />
                <div className="text-lg font-black text-emerald-400">{recyclingRate}%</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Recycling Rate</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                <Truck className="w-4 h-4 text-amber-400 mx-auto" />
                <div className="text-lg font-black text-white">{activeCollectors}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Collectors</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                <Factory className="w-4 h-4 text-rose-400 mx-auto" />
                <div className="text-lg font-black text-white">{activeRecyclers}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Recyclers</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                <MapPin className="w-4 h-4 text-emerald-400 mx-auto" />
                <div className="text-lg font-black text-white">{centers.length}</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Drop Centers</div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white">Network Recycling Growth (KG)</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyVolumeData}>
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                      <Bar dataKey="kg" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white">Device Category Share</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Project Information Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Project</span>
                  <strong className="text-white">E-WasteX</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">UI &amp; DEV</span>
                  <strong className="text-emerald-400 font-mono">Sawan Kr.</strong>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Version</span>
                <span className="text-slate-300 font-mono font-semibold">1.0.0</span>
              </div>
            </div>

          </div>
        )}

        {/* USERS MANAGEMENT TAB */}
        {activeTab === 'USERS' && (
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">User Accounts Registry ({users.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold">
                    <th className="pb-3">User</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Points</th>
                    <th className="pb-3">Recycled</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/40">
                      <td className="py-3 font-bold text-white">{u.name}<br /><span className="text-slate-400 font-normal">{u.email}</span></td>
                      <td className="py-3 font-mono text-emerald-400 font-bold">{u.role}</td>
                      <td className="py-3 text-slate-200 font-mono">{u.points} PTS</td>
                      <td className="py-3 text-slate-200">{u.totalRecycledKg} KG</td>
                      <td className="py-3">
                        <button
                          onClick={() => showToast(`User ${u.name} updated`, 'info')}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EWASTE MANAGEMENT TAB */}
        {activeTab === 'EWASTE' && (
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">E-Waste Passport Directory ({ewasteItems.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold">
                    <th className="pb-3">Tracking ID</th>
                    <th className="pb-3">Device</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Weight</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {ewasteItems.map((i) => (
                    <tr key={i.id} className="hover:bg-slate-900/40">
                      <td className="py-3 font-mono text-emerald-400 font-bold">{i.trackingId}</td>
                      <td className="py-3 font-bold text-white">{i.brand} {i.model}</td>
                      <td className="py-3 text-slate-300">{i.category}</td>
                      <td className="py-3 text-slate-300">{i.weightKg} KG</td>
                      <td className="py-3 font-bold text-teal-400">{i.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PICKUPS MANAGEMENT TAB */}
        {activeTab === 'PICKUPS' && (
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Logistics Pickup Requests ({pickups.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold">
                    <th className="pb-3">Pickup ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Address</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {pickups.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40">
                      <td className="py-3 font-mono text-emerald-400 font-bold">{p.pickupId}</td>
                      <td className="py-3 font-bold text-white">{p.userName}</td>
                      <td className="py-3 text-slate-300">{p.scheduledDate}</td>
                      <td className="py-3 text-slate-300">{p.address}, {p.city}</td>
                      <td className="py-3 font-bold text-emerald-400">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CENTERS MANAGEMENT TAB */}
        {activeTab === 'CENTERS' && (
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Collection Centers Network ({centers.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {centers.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-sm text-white">{c.name}</div>
                  <div className="text-slate-400">{c.address}, {c.city}</div>
                  <div className="text-emerald-400 font-semibold">{c.openingHours}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
