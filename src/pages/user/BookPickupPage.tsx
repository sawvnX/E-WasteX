import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, CheckCircle2, Calendar, Clock, MapPin, Phone, User as UserIcon, ArrowRight, ArrowLeft, Package, Sparkles } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { EwasteItem, PickupRequest } from '../../types';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const BookPickupPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();

  const userItems = apiService.getEwasteItems().filter((i) => i.status === 'SUBMITTED');

  // Step 1 to 5 state
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form selections
  const [selectedItems, setSelectedItems] = useState<EwasteItem[]>(userItems.slice(0, 2));
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [address, setAddress] = useState(user?.address || '742 Evergreen Terrace, Sector 14');
  const [city, setCity] = useState('Metro City');
  const [pinCode, setPinCode] = useState('110001');
  const [landmark, setLandmark] = useState('Opposite Central Park Gate 3');
  const [scheduledDate, setScheduledDate] = useState('2026-10-08');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 01:00 PM');
  const [notes, setNotes] = useState('Please call 10 minutes prior to arrival.');

  const [confirmedPickup, setConfirmedPickup] = useState<PickupRequest | null>(null);

  const toggleItemSelection = (item: EwasteItem) => {
    if (selectedItems.some((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedItems.length === 0) {
      showToast('Please select at least one e-waste item for pickup', 'warning');
      return;
    }
    try {
      const res = await apiService.createPickup({
        userId: user?.id || 'user-1',
        userName: name,
        userPhone: phone,
        address,
        city,
        pinCode,
        landmark,
        scheduledDate,
        timeSlot,
        items: selectedItems,
        notes,
      });

      setConfirmedPickup(res);
      setStep(5);
      showToast(`Pickup Booking ${res.pickupId} Confirmed!`, 'success');
    } catch {
      showToast('Booking failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" /> Doorstep Logistics
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Book Doorstep <span className="text-gradient">E-Waste Pickup</span>
          </h1>
          <p className="text-xs text-slate-400">
            Schedule convenient home or office collection with certified e-waste logistics agents.
          </p>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 rounded-2xl glass-panel border border-slate-800">
            {[
              { num: 1, label: 'Select Items' },
              { num: 2, label: 'Address' },
              { num: 3, label: 'Date' },
              { num: 4, label: 'Slot & Confirm' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step === s.num
                      ? 'bg-emerald-500 text-slate-950 shadow-lg emerald-glow'
                      : step > s.num
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className={`hidden sm:inline text-xs font-semibold ${step === s.num ? 'text-white' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Select E-Waste Items */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-400" /> Select E-Waste Items for Pickup
                  </h3>
                  <span className="text-xs font-bold text-emerald-400">{selectedItems.length} selected</span>
                </div>

                {userItems.length === 0 ? (
                  <div className="p-8 text-center space-y-3 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400">No pending submitted e-waste items found in your inventory.</p>
                    <button
                      onClick={() => navigate('/submit-ewaste')}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                    >
                      + Add New E-Waste First
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userItems.map((item) => {
                      const isSelected = selectedItems.some((i) => i.id === item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItemSelection(item)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="w-5 h-5 accent-emerald-500 rounded"
                            />
                            <div>
                              <div className="font-bold text-sm text-white">{item.brand} {item.model}</div>
                              <div className="text-xs text-slate-400">
                                {item.category} &bull; {item.weightKg} KG &bull; Est. ₹{item.estimatedValueINR}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-400 font-mono">{item.trackingId}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    disabled={selectedItems.length === 0}
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg hover:emerald-glow transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    Next: Enter Address &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Address */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-400" /> Pickup Location Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Contact Phone *</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Street Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">PIN Code *</label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg hover:emerald-glow transition-all"
                  >
                    Next: Select Date &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Date */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-400" /> Select Preferred Pickup Date
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['2026-10-08', '2026-10-09', '2026-10-10', '2026-10-11'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setScheduledDate(d)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        scheduledDate === d
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500 shadow-md font-bold'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">{new Date(d).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="text-lg font-black">{new Date(d).getDate()}</div>
                      <div className="text-[10px] text-slate-400">{new Date(d).toLocaleDateString('en-US', { month: 'short' })}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg hover:emerald-glow transition-all"
                  >
                    Next: Time Slot & Confirm &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Slot & Final Confirmation */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-400" /> Select Time Slot & Confirm
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Available Time Slots</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['09:00 AM - 12:00 PM', '10:00 AM - 01:00 PM', '02:00 PM - 05:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`p-3.5 rounded-xl border text-xs font-bold transition-all ${
                          timeSlot === slot
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Special Instructions for Collector</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>

                {/* Booking Summary Box */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2 text-xs text-slate-300">
                  <div className="font-bold text-white mb-1">Pickup Summary:</div>
                  <div><span className="text-slate-400">Items:</span> {selectedItems.map((i) => i.brand + ' ' + i.model).join(', ')}</div>
                  <div><span className="text-slate-400">Address:</span> {address}, {city} ({pinCode})</div>
                  <div><span className="text-slate-400">Date & Slot:</span> {scheduledDate} ({timeSlot})</div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm shadow-xl hover:emerald-glow transition-all"
                  >
                    Confirm & Schedule Pickup &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: SUCCESS CONFIRMATION */}
            {step === 5 && confirmedPickup && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto emerald-glow">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-white">Pickup Request Confirmed!</h2>
                  <p className="text-xs text-slate-400 mt-1">Collector assigned & dispatch scheduled</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 max-w-md mx-auto space-y-3 text-left">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs text-slate-400">Pickup ID</span>
                    <span className="text-sm font-black font-mono text-emerald-400">{confirmedPickup.pickupId}</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div><span className="text-slate-400">Scheduled:</span> {confirmedPickup.scheduledDate} ({confirmedPickup.timeSlot})</div>
                    <div><span className="text-slate-400">Location:</span> {confirmedPickup.address}, {confirmedPickup.city}</div>
                    <div><span className="text-slate-400">Items Count:</span> {confirmedPickup.items.length} Items</div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => navigate(`/track/${confirmedPickup.pickupId}`)}
                    className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg hover:emerald-glow transition-all"
                  >
                    Track Live Pickup Status &rarr;
                  </button>
                  <button
                    onClick={() => navigate('/my-pickups')}
                    className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                  >
                    View My Pickups
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
