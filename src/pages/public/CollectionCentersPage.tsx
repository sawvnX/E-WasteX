import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter, Phone, Clock, Navigation, CheckCircle, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { CollectionCenter, EwasteCategory } from '../../types';
import { useToast } from '../../context/ToastContext';

export const CollectionCentersPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [openOnly, setOpenOnly] = useState(false);

  const centers = apiService.getCollectionCenters();

  const filteredCenters = centers.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || center.acceptedCategories.includes(selectedCategory as EwasteCategory);

    const matchesOpen = !openOnly || center.isOpen;

    return matchesSearch && matchesCategory && matchesOpen;
  });

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" /> Authorized Drop-Off Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            E-Waste <span className="text-gradient">Collection Centers</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Locate certified drop-off points, recycling hubs, and community collection bins near you.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by city, center name, or landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Categories</option>
              <option value="Computer Equipment">Computer Equipment</option>
              <option value="Mobile Devices">Mobile Devices</option>
              <option value="Home Appliances">Home Appliances</option>
              <option value="Batteries & Power">Batteries & Power</option>
              <option value="Audio & Video">Audio & Video</option>
            </select>

            <label className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={openOnly}
                onChange={(e) => setOpenOnly(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span>Open Now Only</span>
            </label>
          </div>
        </div>

        {/* Map & Grid View Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Centers Cards Column */}
          <div className="lg:col-span-7 space-y-4">
            {filteredCenters.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-3xl border border-slate-800 text-slate-400 text-xs">
                No collection centers found matching your filters.
              </div>
            ) : (
              filteredCenters.map((center) => (
                <motion.div
                  key={center.id}
                  whileHover={{ y: -2 }}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-white">{center.name}</h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            center.isOpen
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {center.isOpen ? 'OPEN NOW' : 'CLOSED'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {center.address}, {center.city} ({center.pinCode})
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-emerald-400 font-mono">{center.distanceKm} KM</div>
                      <div className="text-[10px] text-slate-500 font-semibold">Away</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {center.openingHours}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {center.phone}
                    </div>
                  </div>

                  {/* Accepted Categories Badges */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accepted E-Waste Categories:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {center.acceptedCategories.map((cat) => (
                        <span key={cat} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      onClick={() => showToast(`Directions loaded for ${center.name}`, 'info')}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Get Directions
                    </button>
                    <span className="text-xs text-slate-400">Rating: <strong className="text-emerald-400">★ {center.rating}</strong> / 5.0</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Interactive Map Placeholder */}
          <div className="lg:col-span-5 h-[500px] lg:h-auto glass-panel rounded-3xl border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden bg-slate-900/60">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-4 h-4" /> Live GIS Radar Map
              </div>
              <h3 className="text-lg font-bold text-white">Geospatial Collection Grid</h3>
            </div>

            {/* Radar Visual */}
            <div className="relative z-10 my-auto text-center space-y-4 py-12">
              <div className="w-24 h-24 rounded-full border-2 border-emerald-500/40 border-t-emerald-400 animate-spin mx-auto flex items-center justify-center">
                <MapPin className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Showing {filteredCenters.length} active collection centers within your sector radius.
              </p>
            </div>

            <div className="relative z-10 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
              <div className="font-semibold text-white mb-0.5">Need Bulk Collection?</div>
              <p className="text-[11px] text-slate-400">For enterprise or corporate e-waste exceeding 50 KG, use doorstep pickup booking.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
