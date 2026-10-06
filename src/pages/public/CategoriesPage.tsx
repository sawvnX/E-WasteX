import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Smartphone, Tv, Battery, Headphones, Printer, Package, ArrowRight } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { title: 'Computer Equipment', icon: Cpu, desc: 'Laptops, desktops, servers, monitors, GPUs, motherboards, hard drives, RAM modules.', valueRate: 'High' },
    { title: 'Mobile Devices', icon: Smartphone, desc: 'Smartphones, tablets, e-readers, smartwatches, feature phones, cellular modems.', valueRate: 'High' },
    { title: 'Home Appliances', icon: Tv, desc: 'Smart TVs, refrigerators, air conditioners, microwave ovens, washing machines.', valueRate: 'Medium' },
    { title: 'Batteries & Power', icon: Battery, desc: 'Li-ion battery packs, power banks, UPS inverters, lead-acid batteries, solar cells.', valueRate: 'High (Hazardous)' },
    { title: 'Audio & Video', icon: Headphones, desc: 'Wireless headphones, Bluetooth speakers, DSLR cameras, gaming consoles, AV receivers.', valueRate: 'Medium' },
    { title: 'Office Electronics', icon: Printer, desc: 'Laser printers, scanners, photocopiers, Wi-Fi routers, projectors, landline phones.', valueRate: 'Medium' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Accepted E-Waste <span className="text-gradient">Categories</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Comprehensive breakdown of electronic items eligible for doorstep pickup, AI appraisal, and certified recycling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Recycle Yield: <strong className="text-emerald-400">{cat.valueRate}</strong></span>
                <button
                  onClick={() => navigate('/submit-ewaste')}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  Recycle &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
