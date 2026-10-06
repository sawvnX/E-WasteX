import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import {
  Recycle,
  Search,
  Bell,
  User as UserIcon,
  LogOut,
  ShieldAlert,
  Truck,
  Factory,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
  Gift,
  PlusCircle,
  QrCode,
  Sliders,
  CheckCircle,
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { user, role, isAuthenticated, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = user ? apiService.getNotifications(user.id) : [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'ADMIN') navigate('/admin/dashboard');
    else if (newRole === 'COLLECTOR') navigate('/collector/dashboard');
    else if (newRole === 'RECYCLER') navigate('/recycler/dashboard');
    else navigate('/dashboard');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim();
    setSearchOpen(false);
    setSearchQuery('');
    // Direct redirect to tracking if looks like tracking ID or query parameter
    if (query.toUpperCase().startsWith('EW-') || query.toUpperCase().startsWith('PU-')) {
      navigate(`/track/${query}`);
    } else {
      navigate(`/collection-centers?search=${encodeURIComponent(query)}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Categories', path: '/categories' },
    { name: 'Collection Centers', path: '/collection-centers' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg group-hover:emerald-glow transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Recycle className="w-6 h-6 text-emerald-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                E-Waste<span className="text-gradient font-extrabold">X</span>
              </span>
              <span className="block text-[10px] font-semibold text-emerald-400 tracking-widest uppercase -mt-1">
                Smart Recycling
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors"
              title="Global Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Demo Role Switcher (Visible for testing convenience) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400 text-xs font-semibold text-slate-200 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="capitalize text-emerald-400 font-bold">{role.toLowerCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-2 border border-emerald-500/30 shadow-2xl z-50">
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                    Switch Persona (Demo)
                  </div>
                  <button
                    onClick={() => handleRoleSwitch('USER')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      role === 'USER' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>User Portal</span>
                    {role === 'USER' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('COLLECTOR')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      role === 'COLLECTOR' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Collector Portal</span>
                    {role === 'COLLECTOR' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('RECYCLER')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      role === 'RECYCLER' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Recycler Portal</span>
                    {role === 'RECYCLER' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('ADMIN')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      role === 'ADMIN' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Admin Command Center</span>
                    {role === 'ADMIN' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center shadow-lg">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-2xl p-4 border border-emerald-500/30 shadow-2xl z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <Bell className="w-4 h-4 text-emerald-400" /> Notifications
                      </h4>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => {
                            if (user) apiService.markAllNotificationsAsRead(user.id);
                            setNotifDropdownOpen(false);
                          }}
                          className="text-[11px] text-emerald-400 hover:underline font-semibold"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                      {notifications.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs">No notifications yet</div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              apiService.markNotificationAsRead(notif.id);
                              if (notif.link) navigate(notif.link);
                              setNotifDropdownOpen(false);
                            }}
                            className={`p-3 rounded-xl border transition-all cursor-pointer ${
                              notif.read
                                ? 'bg-slate-900/40 border-slate-800/60 text-slate-400'
                                : 'bg-emerald-950/40 border-emerald-500/30 text-slate-100 font-medium'
                            }`}
                          >
                            <div className="font-semibold text-xs mb-1 text-emerald-300">{notif.title}</div>
                            <div className="text-[11px] leading-relaxed text-slate-300">{notif.message}</div>
                            <div className="text-[9px] text-slate-500 mt-1">
                              {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dashboard / Auth CTA */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (role === 'ADMIN') navigate('/admin/dashboard');
                    else if (role === 'COLLECTOR') navigate('/collector/dashboard');
                    else if (role === 'RECYCLER') navigate('/recycler/dashboard');
                    else navigate('/dashboard');
                  }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={logout}
                  className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-rose-950/50 hover:text-rose-400 border border-slate-800 text-slate-400 flex items-center justify-center transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:emerald-glow transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 p-4 space-y-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-emerald-500/40 text-center"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Quick Switch Persona:</div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['USER', 'COLLECTOR', 'RECYCLER', 'ADMIN'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      handleRoleSwitch(r);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      role === r ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl glass-panel rounded-2xl p-6 border border-emerald-500/30 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-400" /> Search E-WasteX
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Enter Tracking ID (EW-2026-...), Pickup ID (PU-2026-...), or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
                <Search className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Try: <code className="text-emerald-400">EW-2026-000921</code> or <code className="text-emerald-400">PU-2026-004582</code></span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                >
                  Search &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
