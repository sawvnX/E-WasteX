import React, { useState } from 'react';
import { User, Phone, MapPin, Mail, Award, Shield, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500" />
            <div>
              <h2 className="text-xl font-extrabold text-white">{user?.name}</h2>
              <p className="text-xs text-emerald-400 font-mono font-bold uppercase">{user?.role} ACCOUNT</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-300 uppercase">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white" />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300 uppercase">Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white" />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300 uppercase">Default Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white" />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg hover:emerald-glow">
              Save Profile Settings &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
