import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  PlusCircle,
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  ArrowRight,
  Sparkles,
  Info,
  Package,
  Layers,
  Scale
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { apiService } from '../../services/apiService';
import { EwasteCategory, EwasteCondition, EwasteHazard, EwasteItem } from '../../types';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

const ewasteSchema = z.object({
  category: z.enum([
    'Computer Equipment',
    'Mobile Devices',
    'Home Appliances',
    'Audio & Video',
    'Batteries & Power',
    'Office Electronics',
    'Other',
  ]),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model name is required'),
  serialNumber: z.string().optional(),
  condition: z.enum(['Working', 'Minor Damage', 'Severely Damaged', 'Scrap / Parts Only']),
  workingStatus: z.boolean(),
  purchaseYear: z.coerce.number().min(1990).max(new Date().getFullYear()),
  weightKg: z.coerce.number().min(0.05, 'Weight must be at least 0.05 kg'),
  quantity: z.coerce.number().min(1).max(100),
  description: z.string().optional(),
});

type EwasteFormData = z.infer<typeof ewasteSchema>;

export const SubmitEwastePage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();

  const [submittedItem, setSubmittedItem] = useState<EwasteItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EwasteFormData>({
    resolver: zodResolver(ewasteSchema) as any,
    defaultValues: {
      category: 'Computer Equipment',
      brand: '',
      model: '',
      serialNumber: '',
      condition: 'Minor Damage',
      workingStatus: false,
      purchaseYear: 2021,
      weightKg: 1.5,
      quantity: 1,
      description: '',
    },
  });

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: EwasteFormData) => {
    try {
      // Calculate estimated value & hazard level
      let hazardLevel: EwasteHazard = 'Low';
      if (data.category === 'Batteries & Power') hazardLevel = 'High';
      else if (data.condition === 'Severely Damaged') hazardLevel = 'Medium';

      const estValue = Math.round(data.weightKg * 400 * (data.condition === 'Working' ? 1.5 : 0.8));
      const rewardPts = Math.round(data.weightKg * 150 + (data.workingStatus ? 200 : 100));

      const created = await apiService.createEwasteItem({
        userId: user?.id || 'user-1',
        userName: user?.name || 'Alex Rivera',
        category: data.category as EwasteCategory,
        brand: data.brand,
        model: data.model,
        serialNumber: data.serialNumber,
        condition: data.condition as EwasteCondition,
        workingStatus: data.workingStatus,
        purchaseYear: data.purchaseYear,
        weightKg: data.weightKg,
        quantity: data.quantity,
        description: data.description,
        imageUrl: imagePreview || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400',
        hazardLevel,
        recyclability: 'High',
        estimatedValueINR: estValue,
        rewardPoints: rewardPts,
      });

      setSubmittedItem(created);
      showToast(`E-Waste ${created.trackingId} created successfully!`, 'success');
    } catch {
      showToast('Failed to create e-waste entry', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" /> Inventory Registration
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Register New <span className="text-gradient">E-Waste Item</span>
          </h1>
          <p className="text-xs text-slate-400">
            Fill in the specification details below to generate a unique digital tracking passport & QR code.
          </p>
        </div>

        {/* Success Modal Screen if Item Submitted */}
        <AnimatePresence>
          {submittedItem ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel rounded-3xl p-8 border border-emerald-500/40 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto emerald-glow">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">E-Waste Item Registered!</h2>
                <p className="text-xs text-slate-400 mt-1">Unique Tracking Passport Generated</p>
              </div>

              {/* QR Passport Card */}
              <div className="max-w-sm mx-auto p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl space-y-4">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  {submittedItem.trackingId}
                </div>

                <div className="p-4 bg-white rounded-xl inline-block shadow-inner mx-auto">
                  <QRCodeSVG value={`https://ewastex.app/track/${submittedItem.trackingId}`} size={160} />
                </div>

                <div className="text-xs text-slate-300 space-y-1 text-left bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div><span className="text-slate-400">Device:</span> <strong className="text-white">{submittedItem.brand} {submittedItem.model}</strong></div>
                  <div><span className="text-slate-400">Category:</span> {submittedItem.category}</div>
                  <div><span className="text-slate-400">Weight:</span> {submittedItem.weightKg} KG</div>
                  <div><span className="text-slate-400">Points Earned:</span> <strong className="text-emerald-400">+{submittedItem.rewardPoints} Pts</strong></div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => navigate(`/track/${submittedItem.trackingId}`)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg hover:emerald-glow transition-all flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" /> Track Passport Lifecycle &rarr;
                </button>

                <button
                  onClick={() => navigate('/book-pickup')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
                >
                  Book Pickup Now
                </button>

                <button
                  onClick={() => {
                    setSubmittedItem(null);
                    setImagePreview(null);
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                >
                  Submit Another
                </button>
              </div>
            </motion.div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit(onSubmit)} className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              
              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Device Category *</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Computer Equipment">Computer Equipment (Laptops, Desktops, Monitors, PC Components)</option>
                  <option value="Mobile Devices">Mobile Devices (Smartphones, Tablets, Smartwatches)</option>
                  <option value="Home Appliances">Home Appliances (TVs, Refrigerators, Microwaves, ACs)</option>
                  <option value="Audio & Video">Audio & Video (Headphones, Speakers, Cameras, Consoles)</option>
                  <option value="Batteries & Power">Batteries & Power (Power Banks, Inverters, Li-ion Cells)</option>
                  <option value="Office Electronics">Office Electronics (Printers, Scanners, Routers, Projectors)</option>
                  <option value="Other">Other Electronic Accessories</option>
                </select>
              </div>

              {/* Brand & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Brand Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Dell, Apple, Samsung"
                    {...register('brand')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.brand && <p className="text-xs text-rose-400">{errors.brand.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Model Name / Series *</label>
                  <input
                    type="text"
                    placeholder="e.g. XPS 15 9520 / Galaxy S22"
                    {...register('model')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.model && <p className="text-xs text-rose-400">{errors.model.message}</p>}
                </div>
              </div>

              {/* Serial Number & Purchase Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Serial Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. SN-9981-XXXX"
                    {...register('serialNumber')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Purchase Year *</label>
                  <input
                    type="number"
                    {...register('purchaseYear')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Condition & Working Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Physical Condition *</label>
                  <select
                    {...register('condition')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Working">Working (Fully Functional)</option>
                    <option value="Minor Damage">Minor Damage (Cosmetic scratches / degraded battery)</option>
                    <option value="Severely Damaged">Severely Damaged (Broken screen / burnt PCB)</option>
                    <option value="Scrap / Parts Only">Scrap / Parts Only (Non-functional scrap)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Power / Boot Status</label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="radio"
                        value="true"
                        checked={watch('workingStatus') === true}
                        onChange={() => setValue('workingStatus', true)}
                        className="accent-emerald-500"
                      />
                      Powers On / Works
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="radio"
                        value="false"
                        checked={watch('workingStatus') === false}
                        onChange={() => setValue('workingStatus', false)}
                        className="accent-emerald-500"
                      />
                      Dead / No Power
                    </label>
                  </div>
                </div>
              </div>

              {/* Weight & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Approximate Weight (KG) *</label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('weightKg')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.weightKg && <p className="text-xs text-rose-400">{errors.weightKg.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity *</label>
                  <input
                    type="number"
                    {...register('quantity')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Description / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Describe known defects, included accessories, or hazardous parts (e.g. swollen battery)..."
                  {...register('description')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Image Input (Camera / Upload / Drag & Drop) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Device Image</label>
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/40 text-center space-y-3">
                  {imagePreview ? (
                    <div className="relative max-w-xs mx-auto rounded-xl overflow-hidden border border-emerald-500/40">
                      <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover" />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 px-2 py-1 bg-slate-950/80 text-xs text-rose-400 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p className="text-xs text-slate-400">Drag & drop photo here or choose upload option</p>
                      <input
                        type="file"
                        accept="image/*"
                        id="ewaste-file-upload"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleImageChange(e.target.files[0]);
                        }}
                      />
                      <label
                        htmlFor="ewaste-file-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-sm shadow-xl hover:emerald-glow transition-all cursor-pointer"
              >
                {isSubmitting ? 'Generating Passport...' : 'Submit E-Waste & Generate QR Passport \u2192'}
              </button>
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
