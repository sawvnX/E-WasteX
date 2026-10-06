import React from 'react';
import { Camera, Truck, Factory, Award, QrCode, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            How E-WasteX <span className="text-gradient">Operates</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Step-by-step breakdown of our smart collection, AI detection, and secondary material recovery pipeline.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { step: '01', title: 'AI Camera Detection & Appraisal', icon: Camera, desc: 'Point your camera at old laptops, phones, or batteries. Our AI Vision model recognizes device class, estimates weight, and calculates buyback value.' },
            { step: '02', title: 'Doorstep Pickup or Drop-Off', icon: Truck, desc: 'Schedule a doorstep collection date/time slot or drop off your item at an authorized collection center near you.' },
            { step: '03', title: 'Digital Passport Generation', icon: QrCode, desc: 'Every registered item gets a unique QR Code tracking ID (e.g. EW-2026-000921) logged onto our digital ledger.' },
            { step: '04', title: 'Dismantling & Precious Material Extraction', icon: Factory, desc: 'Certified e-waste recyclers dismantle the device, remove lithium batteries safely, and extract gold, copper, and rare earths.' },
            { step: '05', title: 'Reward Wallet & Impact Certification', icon: Award, desc: 'Upon recycling completion, eco points are credited to your wallet for redemption, and zero-landfill certificates are issued.' }
          ].map((item) => (
            <div key={item.step} className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-xl flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-emerald-400" /> {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
