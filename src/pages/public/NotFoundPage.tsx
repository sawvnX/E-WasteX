import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Recycle, AlertCircle, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-950">
      <div className="glass-panel rounded-3xl p-10 border border-emerald-500/30 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
          <AlertCircle className="w-10 h-10" />
        </div>

        <div>
          <div className="text-6xl font-black text-emerald-400 font-mono tracking-tighter">404</div>
          <h1 className="text-xl font-extrabold text-white mt-2">Page / Tracking Route Not Found</h1>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            The page or tracking passport you are looking for has been moved, recycled, or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md hover:emerald-glow flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
