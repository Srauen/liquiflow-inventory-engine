
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
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-neon-blue" />
            System Configuration
          </h1>
          <p className="text-gray-400 mt-2">Manage your neural interface parameters and account security.</p>
        </div>
        <div className="px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-xs font-mono text-neon-blue">
          v2.5.0-local
        </div>
      </div>
      
      {/* Profile Card */}
      <GlassCard className="flex flex-col md:flex-row items-center gap-6" glowColor="blue">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-neon-blue to-neon-violet flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
           <span className="text-3xl font-bold text-white">{MOCK_USER.name.charAt(0)}</span>
        </div>
        <div className="flex-1 text-center md:text-left">
           <div className="flex items-center gap-3 justify-center md:justify-start">
              <h2 className="text-2xl font-bold">{MOCK_USER.name}</h2>
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] uppercase font-bold tracking-wider">
                 {userPlan} Plan
              </span>
           </div>
           <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-1">
             <Shield className="w-4 h-4 text-neon-emerald" />
             {MOCK_USER.role} • Level {MOCK_USER.level} Clearance
           </p>
        </div>
        <button 
           onClick={onManageSub}
           className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-neon-blue transition-colors text-sm flex items-center gap-2"
        >
           <CreditCard className="w-4 h-4" /> Manage Subscription
        </button>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Logic Preferences */}
        <GlassCard className="space-y-6" glowColor="violet">
           <h3 className="text-xl font-bold flex items-center gap-2 text-neon-violet">
              <Cpu className="w-5 h-5" /> Local Intelligence Core
           </h3>
           
           <div className="space-y-4">
              <div className="p-4 bg-neon-violet/5 border border-neon-violet/20 rounded-lg">
                 <div className="flex items-center gap-2 text-neon-violet mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase font-mono">Deterministic Engine Active</span>
                 </div>
                 <p className="text-xs text-gray-400 leading-relaxed">
                    Your analysis is processed by our local Micro-Economics engine. No data leaves your machine, and no API costs are incurred.
                 </p>
              </div>

              <div>
                 <label className="block text-sm text-gray-400 mb-2">Simulation Depth</label>
                 <input type="range" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-violet" defaultValue={70} />
                 <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Performance</span>
                    <span>Optimized</span>
                    <span>Deep Trace</span>
                 </div>
              </div>
           </div>
        </GlassCard>

        {/* System Preferences */}
        <GlassCard className="space-y-6" glowColor="emerald">
           <h3 className="text-xl font-bold flex items-center gap-2 text-neon-emerald">
              <Bell className="w-5 h-5" /> System Preferences
           </h3>
           
           <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-neon-blue/10 rounded text-neon-blue"><Globe className="w-4 h-4" /></div>
                    <div>
                       <span className="block font-bold text-sm">Demo Mode</span>
                       <span className="text-xs text-gray-400">View simulated data</span>
                    </div>
                 </div>
                 <button onClick={onToggleDemo} className="text-neon-emerald transition-transform active:scale-95">
                    {isDemo ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                 </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-neon-pink/10 rounded text-neon-pink"><Bell className="w-4 h-4" /></div>
                     <div>
                        <span className="block font-bold text-sm">Critical Alerts</span>
                        <span className="text-xs text-gray-400">Push notifications for risks</span>
                     </div>
                 </div>
                 <button onClick={() => setNotifications(!notifications)} className="text-neon-emerald transition-transform active:scale-95">
                    {notifications ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                 </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-neon-violet/10 rounded text-neon-violet"><Database className="w-4 h-4" /></div>
                     <div>
                        <span className="block font-bold text-sm">Telemetry</span>
                        <span className="text-xs text-gray-400">Share local performance logs</span>
                     </div>
                 </div>
                 <button onClick={() => setDataSharing(!dataSharing)} className="text-neon-emerald transition-transform active:scale-95">
                    {dataSharing ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                 </button>
              </div>
           </div>
        </GlassCard>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
         <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-blue text-black font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <Save className="w-4 h-4" /> Save Configuration
         </button>
      </div>
    </div>
  );
};
