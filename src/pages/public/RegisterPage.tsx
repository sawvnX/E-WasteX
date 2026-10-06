import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Recycle, Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('USER');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, role);
      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    } catch {
      showToast('Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 glass-panel rounded-3xl p-8 border border-emerald-500/30 shadow-2xl">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <Recycle className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-black text-white">E-Waste<span className="text-gradient">X</span></span>
          </Link>
          <h2 className="text-xl font-extrabold text-white">Create New E-WasteX Account</h2>
          <p className="text-xs text-slate-400">Join the smart e-waste recycling movement</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
              <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Account Persona Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="USER">Individual User / Resident</option>
              <option value="COLLECTOR">Logistics Agent / Collector</option>
              <option value="RECYCLER">Recycling Facility Representative</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg hover:emerald-glow transition-all"
          >
            {loading ? 'Creating Account...' : 'Register & Join Network \u2192'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account? <Link to="/login" className="text-emerald-400 font-bold hover:underline">Sign In</Link>
        </div>

        <div className="pt-2 border-t border-slate-800/60 text-center">
          <div className="text-[11px] font-mono text-emerald-400/80 font-medium">
            UI &amp; DEV by Sawan Kr.
          </div>
        </div>
      </div>
    </div>
  );
};
