import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Award, TreePine, ShoppingBag, ShieldCheck, Trophy, Sparkles, CheckCircle2, Ticket, Lock } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { RewardItem, RewardType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const RewardsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'ALL' | RewardType>('ALL');
  const [redeemedCode, setRedeemedCode] = useState<{ title: string; code: string } | null>(null);

  const rewards = apiService.getRewards();
  const users = apiService.getUsers().sort((a, b) => b.points - a.points);

  const filteredRewards = activeTab === 'ALL' ? rewards : rewards.filter((r) => r.category === activeTab);

  const handleRedeem = async (reward: RewardItem) => {
    if (!user) {
      showToast('Please sign in to redeem reward points', 'warning');
      return;
    }
    const res = await apiService.redeemReward(reward.id, user.id);
    if (res.success && res.voucherCode) {
      refreshUser();
      setRedeemedCode({ title: reward.title, code: res.voucherCode });
      showToast(`Successfully redeemed "${reward.title}"!`, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Banner */}
        <div className="glass-panel rounded-3xl p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" /> Eco-Loyalty Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Recycle & Earn <span className="text-gradient">Green Rewards</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg">
              Convert your recycled e-waste points into discount coupons, tree planting sponsorships, carbon neutral certificates & eco-gear.
            </p>
          </div>

          {/* User Wallet Balance Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 text-center shrink-0 emerald-glow min-w-[240px]">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Your Eco Points Wallet</div>
            <div className="text-4xl font-black text-white mt-1">{user?.points || 0} <span className="text-base text-emerald-400 font-bold">PTS</span></div>
            <p className="text-[11px] text-slate-400 mt-1">100 Pts = ₹100 Equivalent Eco Value</p>
          </div>
        </div>

        {/* Modal for Voucher Display */}
        <AnimatePresence>
          {redeemedCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            >
              <div className="glass-panel rounded-3xl p-8 border border-emerald-500/40 shadow-2xl max-w-md w-full text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">Voucher Claimed!</h3>
                <p className="text-xs text-slate-300">{redeemedCode.title}</p>
                <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 font-mono text-lg font-black text-emerald-400">
                  {redeemedCode.code}
                </div>
                <button
                  onClick={() => setRedeemedCode(null)}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* E-Waste Point Conversion Guide */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Mobile Phone</div>
            <div className="text-xl font-extrabold text-emerald-400">+100 Pts</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Laptop / PC</div>
            <div className="text-xl font-extrabold text-emerald-400">+500 Pts</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Smart TV / Appliance</div>
            <div className="text-xl font-extrabold text-emerald-400">+700 Pts</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Battery / Powerpack</div>
            <div className="text-xl font-extrabold text-emerald-400">+50 Pts</div>
          </div>
        </div>

        {/* Rewards Store Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Gift className="w-6 h-6 text-emerald-400" /> Reward Catalog Store
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'ALL', label: 'All Rewards' },
                { id: 'COUPON', label: '🎁 Gift Vouchers' },
                { id: 'TREE', label: '🌱 Plant Trees' },
                { id: 'ECO_PRODUCT', label: '♻ Eco Gear' },
                { id: 'CERTIFICATE', label: '🏆 Certificates' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((item) => {
              const canAfford = (user?.points || 0) >= item.pointsCost;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 overflow-hidden relative">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 font-extrabold text-xs border border-emerald-500/30">
                        {item.pointsCost} PTS
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{item.sponsor || 'E-WasteX Partner'}</div>
                      <h3 className="font-extrabold text-base text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleRedeem(item)}
                      disabled={!canAfford || item.availableStock <= 0}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        canAfford && item.availableStock > 0
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                          : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? (
                        <>
                          <Ticket className="w-4 h-4" /> Redeem for {item.pointsCost} Points
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" /> Need {item.pointsCost - (user?.points || 0)} More Pts
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Global Recycling Leaderboard */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Eco Champions Leaderboard
              </h3>
              <p className="text-xs text-slate-400">Top individual & organization contributors diverted toxicity this month.</p>
            </div>
          </div>

          <div className="space-y-3">
            {users.map((u, rank) => (
              <div
                key={u.id}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  rank === 0
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-100'
                    : rank === 1
                    ? 'bg-slate-900/80 border-slate-400/40 text-slate-100'
                    : rank === 2
                    ? 'bg-amber-950/20 border-amber-700/40 text-amber-200'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-950 border border-current font-black text-xs flex items-center justify-center">
                    #{rank + 1}
                  </div>
                  <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                  <div>
                    <div className="font-bold text-sm text-white">{u.name}</div>
                    <div className="text-[11px] text-slate-400">{u.totalRecycledKg} KG Recycled &bull; {u.totalItemsRecycled} Devices</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-emerald-400">{u.points} PTS</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{u.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
