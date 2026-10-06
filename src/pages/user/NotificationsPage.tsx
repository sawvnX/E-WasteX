import React from 'react';
import { Bell, CheckCircle2, Trash2 } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

export const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const notifications = user ? apiService.getNotifications(user.id) : [];

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-400" /> Notifications Center
          </h1>
          {user && (
            <button
              onClick={() => {
                apiService.markAllNotificationsAsRead(user.id);
                window.location.reload();
              }}
              className="text-xs text-emerald-400 font-bold hover:underline"
            >
              Mark All Read
            </button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all ${
                n.read ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-emerald-950/40 border-emerald-500/40 text-white'
              }`}
            >
              <div className="font-bold text-sm text-emerald-300">{n.title}</div>
              <p className="text-xs text-slate-300 mt-1">{n.message}</p>
              <div className="text-[10px] text-slate-500 mt-2 font-mono">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
