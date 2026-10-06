import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Recycle, Mail, Lock, LogIn, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('demo@ewastex.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast(`Welcome back to E-WasteX!`, 'success');
      navigate('/dashboard');
    } catch {
      showToast('Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (demoEmail: string, role: UserRole) => {
    setEmail(demoEmail);
    setPassword('password123');
    switchRole(role);
    showToast(`Logged in as Demo ${role}`, 'success');
    if (role === 'ADMIN') navigate('/admin/dashboard');
    else if (role === 'COLLECTOR') navigate('/collector/dashboard');
    else if (role === 'RECYCLER') navigate('/recycler/dashboard');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="w-full max-w-md space-y-8 glass-panel rounded-3xl p-8 border border-emerald-500/30 shadow-2xl relative z-10">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <Recycle className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-black text-white">E-Waste<span className="text-gradient">X</span></span>
          </Link>
          <h2 className="text-xl font-extrabold text-white">Sign In to Your Account</h2>
          <p className="text-xs text-slate-400">Access your e-waste portal & rewards wallet</p>
        </div>

        {/* Demo Quick Logins Box (Requirement #25) */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
          <div className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Demo Quick Sign-In (1-Click)
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('demo@ewastex.com', 'USER')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold text-left border border-slate-700"
            >
              👤 User Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('collector@ewastex.com', 'COLLECTOR')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold text-left border border-slate-700"
            >
              🚛 Collector Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('recycler@ewastex.com', 'RECYCLER')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold text-left border border-slate-700"
            >
              🏭 Recycler Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin@ewastex.com', 'ADMIN')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold text-left border border-slate-700"
            >
              🛡 Admin Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg hover:emerald-glow transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In \u2192'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Don't have an account? <Link to="/register" className="text-emerald-400 font-bold hover:underline">Register Now</Link>
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
