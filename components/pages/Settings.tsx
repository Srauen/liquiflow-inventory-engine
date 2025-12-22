
import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Cpu, ToggleLeft, ToggleRight, Save, Database, Globe, CreditCard, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { MOCK_USER } from '../../utils/MockData';

interface SettingsProps {
   userPlan?: 'starter' | 'pro' | 'enterprise';
   isDemo?: boolean;
   onToggleDemo?: () => void;
   onManageSub?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ userPlan = 'starter', isDemo = false, onToggleDemo, onManageSub }) => {
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl mx-auto h-full overflow-y-auto custom-scrollbar pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 uppercase tracking-tighter">
            <SettingsIcon className="w-8 h-8 text-neon-blue" />
            System Control
          </h1>
          <p className="text-gray-400 mt-2">Manage your AI interface parameters and secure API connectivity.</p>
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black font-mono text-gray-500 uppercase tracking-widest">
          Version 4.1.0-LIVE
        </div>
      </div>
      
      {/* Profile Card */}
      <GlassCard className="flex flex-col md:flex-row items-center gap-6" glowColor="blue">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-neon-blue to-neon-violet flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
           <span className="text-3xl font-bold text-white">{MOCK_USER.name.charAt(0)}</span>
        </div>
        <div className="flex-1 text-center md:text-left">
           <div className="flex items-center gap-3 justify-center md:justify-start">
              <h2 className="text-2xl font-black uppercase tracking-tighter">{MOCK_USER.name}</h2>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[9px] uppercase font-black tracking-widest">
                 {userPlan} Plan
              </span>
           </div>
           <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-1 text-xs uppercase font-bold tracking-tight">
             <Shield className="w-4 h-4 text-neon-emerald" />
             {MOCK_USER.role} • Level {MOCK_USER.level} Clearance
           </p>
        </div>
        <button 
           onClick={onManageSub}
           className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded hover:bg-neon-blue transition-all flex items-center gap-2"
        >
           <CreditCard className="w-4 h-4" /> Subscription Node
        </button>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Logic Preferences */}
        <GlassCard className="space-y-6" glowColor="violet">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-neon-violet">
              <Cpu className="w-4 h-4" /> AI Strategic Intelligence
           </h3>
           
           <div className="space-y-4">
              <div className="p-4 bg-neon-violet/5 border border-neon-violet/20 rounded-lg">
                 <div className="flex items-center gap-2 text-neon-violet mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase font-mono tracking-widest">Uplink Status: Synced</span>
                 </div>
                 <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                    Analysis is performed by the Gemini Strategic Core. Real-time market signals and elasticity modeling are fetched via secure API uplink.
                 </p>
              </div>

              <div>
                 <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3">Reasoning Depth</label>
                 <input type="range" className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-neon-violet" defaultValue={90} />
                 <div className="flex justify-between text-[8px] font-mono text-gray-700 mt-2 uppercase tracking-widest">
                    <span>Low Latency</span>
                    <span>Optimized</span>
                    <span>Deep Reasoning</span>
                 </div>
              </div>
           </div>
        </GlassCard>

        {/* System Preferences */}
        <GlassCard className="space-y-6" glowColor="emerald">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-neon-emerald">
              <Bell className="w-4 h-4" /> System Preferences
           </h3>
           
           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-neon-blue/10 rounded text-neon-blue"><Globe className="w-4 h-4" /></div>
                    <div>
                       <span className="block font-black text-xs uppercase tracking-tight">Simulator Mode</span>
                       <span className="text-[10px] text-gray-600 font-mono uppercase">Sandboxed Intelligence</span>
                    </div>
                 </div>
                 <button onClick={onToggleDemo} className="text-neon-emerald transition-transform active:scale-95">
                    {isDemo ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                 </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-neon-pink/10 rounded text-neon-pink"><Bell className="w-4 h-4" /></div>
                     <div>
                        <span className="block font-black text-xs uppercase tracking-tight">Risk Pulse</span>
                        <span className="text-[10px] text-gray-600 font-mono uppercase">Liquidity Alerts</span>
                     </div>
                 </div>
                 <button onClick={() => setNotifications(!notifications)} className="text-neon-emerald transition-transform active:scale-95">
                    {notifications ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                 </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-neon-violet/10 rounded text-neon-violet"><Database className="w-4 h-4" /></div>
                     <div>
                        <span className="block font-black text-xs uppercase tracking-tight">API Telemetry</span>
                        <span className="text-[10px] text-gray-600 font-mono uppercase">Audit Logs</span>
                     </div>
                 </div>
                 <button onClick={() => setDataSharing(!dataSharing)} className="text-neon-emerald transition-transform active:scale-95">
                    {dataSharing ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                 </button>
              </div>
           </div>
        </GlassCard>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
         <button className="flex items-center gap-3 px-8 py-3 rounded bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-neon-blue transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Save className="w-4 h-4" /> Update Parameters
         </button>
      </div>
    </div>
  );
};
