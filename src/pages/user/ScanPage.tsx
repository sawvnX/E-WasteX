import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Scale,
  Zap,
  Trash2,
  XCircle,
  PlusCircle,
  Truck,
  Calculator,
  ScanLine
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { AIScanResult } from '../../types';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();

  // Mode states: 'idle' | 'camera' | 'captured' | 'uploaded' | 'analyzing' | 'result'
  const [step, setStep] = useState<'idle' | 'camera' | 'captured' | 'uploaded' | 'analyzing' | 'result'>('idle');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<AIScanResult | null>(null);

  // Drag & drop highlight state
  const [isDragging, setIsDragging] = useState(false);

  // Video & Canvas refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up media stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    setStep('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Camera permission is required or camera device is unavailable. You can upload an image instead.');
      showToast('Camera permission denied or camera unavailable', 'error');
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
        setStep('captured');
      }
    }
  };

  const cancelCamera = () => {
    stopCamera();
    setStep('idle');
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP)', 'warning');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCapturedImage(e.target.result as string);
        setStep('uploaded');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const triggerAIScan = async () => {
    if (!capturedImage) return;
    setStep('analyzing');
    try {
      const res = await apiService.mockAIScan(capturedImage);
      setScanResult(res);
      setStep('result');
      showToast('E-Waste AI Detection Complete!', 'success');
    } catch (err) {
      showToast('AI scanning failed. Please try again.', 'error');
      setStep('captured');
    }
  };

  const handleAddToMyEwaste = async () => {
    if (!scanResult) return;
    try {
      const created = await apiService.createEwasteItem({
        userId: user?.id || 'user-1',
        userName: user?.name || 'Alex Rivera',
        category: scanResult.category,
        brand: scanResult.detectedDevice.split(' ')[0] || 'Generic',
        model: scanResult.detectedDevice,
        condition: scanResult.condition,
        workingStatus: scanResult.condition === 'Working',
        weightKg: parseFloat(scanResult.estimatedWeightRange.split(' ')[0]) || 2.0,
        quantity: 1,
        imageUrl: capturedImage || undefined,
        hazardLevel: scanResult.hazardLevel,
        recyclability: scanResult.recyclability,
        estimatedValueINR: scanResult.suggestedValueINR,
        rewardPoints: scanResult.suggestedPoints,
        description: `Scanned with AI Camera. Action: ${scanResult.recommendedAction}`,
      });
      showToast(`Item ${created.trackingId} added to your E-Waste inventory!`, 'success');
      navigate('/submit-ewaste');
    } catch {
      showToast('Failed to save item', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> AI Vision Engine 2.0
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Smart E-Waste <span className="text-gradient">AI Scanner</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Point your camera or upload an image to instantly identify device category, hazard level, recyclability rating, and estimated monetary & reward value.
          </p>
        </div>

        {/* Hidden Canvas for Frame Capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Main Interactive Scanner Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: IDLE / CHOICE STATE */}
            {step === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* OPTION A: Live Camera */}
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-emerald-500/20 hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-4 group">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-400 flex items-center justify-center transition-colors">
                        <Camera className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Live Camera Scan</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Directly stream your webcam or mobile camera to snap e-waste photo in real time.
                      </p>
                    </div>
                    <button
                      onClick={startCamera}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg hover:emerald-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" /> Open Camera
                    </button>
                  </div>

                  {/* OPTION B & C: Drag & Drop / Upload */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col justify-between space-y-4 ${
                      isDragging
                        ? 'border-emerald-400 bg-emerald-950/40'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3 text-center sm:text-left">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto sm:mx-0">
                        <Upload className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Upload from Device</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Drag & drop your e-waste photo here, or select JPG, PNG, WEBP format from your computer or phone.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment" /* OPTION D: Direct camera access on mobile devices */
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                        }}
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-emerald-400" /> Browse Files
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Your images are processed securely on-edge and never stored permanently without your consent.</span>
                </div>
              </motion.div>
            )}

            {/* STEP 2: LIVE CAMERA STREAM */}
            {step === 'camera' && (
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {cameraError ? (
                  <div className="p-6 text-center space-y-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl">
                    <XCircle className="w-12 h-12 text-rose-400 mx-auto" />
                    <p className="text-sm text-rose-200">{cameraError}</p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                      >
                        Upload Image Instead
                      </button>
                      <button
                        onClick={cancelCamera}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden bg-black border border-emerald-500/40 shadow-2xl aspect-video max-h-[480px] flex items-center justify-center">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    
                    {/* Reticle / Target Overlay */}
                    <div className="absolute inset-0 pointer-events-none border-2 border-emerald-500/40 m-6 rounded-xl flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-emerald-400 border-dashed rounded-lg animate-pulse" />
                      <div className="absolute top-4 left-4 text-[10px] font-mono text-emerald-400 bg-slate-950/80 px-2 py-1 rounded border border-emerald-500/30">
                        AI RETICLE: TARGET DEVICE IN FRAME
                      </div>
                    </div>

                    {/* Camera Control Overlay */}
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 z-20">
                      <button
                        onClick={capturePhoto}
                        className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-2xl emerald-glow flex items-center gap-2 cursor-pointer"
                      >
                        <Camera className="w-5 h-5" /> Capture Photo
                      </button>
                      <button
                        onClick={cancelCamera}
                        className="px-5 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3 & 4: IMAGE CAPTURED / UPLOADED PREVIEW */}
            {(step === 'captured' || step === 'uploaded') && capturedImage && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-emerald-500/40 shadow-2xl aspect-video max-h-[420px]">
                  <img src={capturedImage} alt="Captured E-Waste" className="w-full h-full object-contain" />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Photo Ready for Analysis
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCapturedImage(null);
                        setStep('idle');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-4 h-4" /> Retake / Choose Another
                    </button>
                  </div>

                  <button
                    onClick={triggerAIScan}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-sm shadow-xl hover:emerald-glow transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ScanLine className="w-5 h-5" /> Analyze E-Waste with AI &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: AI ANALYZING ANIMATION */}
            {step === 'analyzing' && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center space-y-6"
              >
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Sparkles className="w-10 h-10 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">Analyzing E-Waste Component...</h3>
                  <p className="text-xs text-slate-400 mt-1">Classifying circuit composition, battery hazard level, and recyclability score</p>
                </div>
              </motion.div>
            )}

            {/* STEP 6: AI DETECTED RESULT */}
            {step === 'result' && scanResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Result Top Badge */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AI Classification Detected</div>
                      <h3 className="text-xl font-extrabold text-white">{scanResult.detectedDevice}</h3>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-extrabold text-sm text-center">
                    {scanResult.confidence}% Confidence Match
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" /> Category
                    </div>
                    <div className="font-bold text-sm text-white">{scanResult.category}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Hazard Level
                    </div>
                    <div className="font-bold text-sm text-amber-400">{scanResult.hazardLevel}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-cyan-400" /> Est. Weight
                    </div>
                    <div className="font-bold text-sm text-white">{scanResult.estimatedWeightRange}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" /> Recyclability
                    </div>
                    <div className="font-bold text-sm text-emerald-400">{scanResult.recyclability}</div>
                  </div>
                </div>

                {/* Value & Recommended Action */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center sm:text-left">
                    <div className="text-xs text-emerald-400 font-semibold mb-1">Estimated Value</div>
                    <div className="text-2xl font-black text-white">₹{scanResult.suggestedValueINR}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-center sm:text-left">
                    <div className="text-xs text-teal-400 font-semibold mb-1">Reward Points</div>
                    <div className="text-2xl font-black text-teal-300">+{scanResult.suggestedPoints} Points</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="font-semibold text-slate-200">Recommended Action</div>
                    <p className="leading-relaxed text-slate-400">{scanResult.recommendedAction}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <button
                    onClick={handleAddToMyEwaste}
                    className="py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" /> Add to My E-Waste
                  </button>

                  <button
                    onClick={() => navigate('/calculator')}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-emerald-400" /> Calculate Value
                  </button>

                  <button
                    onClick={() => navigate('/book-pickup')}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" /> Book Pickup
                  </button>

                  <button
                    onClick={() => {
                      setCapturedImage(null);
                      setScanResult(null);
                      setStep('idle');
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> Scan Another
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
