
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Truck, Box, Radio, Signal, Eye, EyeOff, Workflow, Target } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
// Corrected: Import PageView from types.ts
import { PageView } from '../../../types';

interface MarketOperationsProps {
  onNavigate: (page: PageView, data?: any) => void;
}

const OPS_MODULES = [
  { id: 'liquidity-grid', icon: Globe, label: 'Global Liquidity Grid', color: 'blue', desc: 'Real-time mapping of world-wide inventory hotspots.' },
  { id: 'logistics-orch', icon: Truck, label: 'Logistics Orchestrator', color: 'emerald', desc: 'Predictive rerouting of at-risk stock clusters.' },
  { id: 'virtual-inv', icon: Box, label: 'Inventory Virtualization', color: 'violet', desc: 'Simulation of physical stock in simulated demand environments.' },
  { id: 'market-oversight', icon: Eye, label: 'Market Oversight', color: 'gold', desc: 'Competitive pricing detection across 50+ marketplaces.' },
  { id: 'dark-market', icon: EyeOff, label: 'Dark Market Ops', color: 'pink', desc: 'Access to invitation-only secondary B2B clearing networks.' },
  { id: 'carrier-comms', icon: Radio, label: 'Carrier Comms', color: 'blue', desc: 'Direct uplink to primary freight and last-mile providers.' },
  { id: 'latency-map', icon: Signal, label: 'Latency Map', color: 'emerald', desc: 'Detecting friction points in the global supply chain.' },
  { id: 'local-opt', icon: Target, label: 'Local Optimization', color: 'violet', desc: 'Hyper-local demand sensing for regional retail nodes.' },
];

export const MarketOperations: React.FC<MarketOperationsProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 pb-20">
      <motion.div layout>
        <div className="flex items-center gap-3 text-neon-gold mb-4">
          <Globe className="w-6 h-6" />
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Clearance Level 10 // Market Operations</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Market Nexus</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {OPS_MODULES.map((module, i) => (
          <motion.div
            key={module.id}
            layoutId={module.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard 
              glowColor={module.color as any}
              className="h-full flex flex-col p-8 border-white/5 bg-black/40 hover:bg-white/[0.05] transition-all group"
            >
              <div className={`p-3 w-fit rounded-xl bg-white/[0.03] border border-white/5 mb-6 group-hover:border-neon-${module.color} transition-all duration-500`}>
                <module.icon className={`w-5 h-5 text-gray-500 group-hover:text-neon-${module.color} transition-colors`} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-2">{module.label}</h3>
              <p className="text-[10px] text-gray-500 leading-relaxed font-medium mb-6">{module.desc}</p>
              <div className="mt-auto h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                 <motion.div 
                   animate={{ width: ['0%', '100%'] }} 
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className={`h-full bg-neon-${module.color}`} 
                 />
              </div>
              <button 
                onClick={() => onNavigate('module-detail', module)}
                className={`text-[8px] font-black text-neon-${module.color} uppercase hover:underline text-right`}
              >
                Access Module
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
