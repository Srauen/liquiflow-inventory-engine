
import React from 'react';
import { motion } from 'framer-motion';
import { Command, BarChart3, TrendingUp, Target, Zap, Shield, PieChart, Activity } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { PageView } from '../../../App';

interface StrategicOversightProps {
  onNavigate: (page: PageView, data?: any) => void;
}

const STRATEGIC_MODULES = [
  { id: 'yield-matrix', icon: BarChart3, label: 'Yield Matrix', color: 'blue', desc: 'NPV of capital recovered across current inventory base.' },
  { id: 'demand-forecast', icon: TrendingUp, label: 'Macro-Demand Forecast', color: 'emerald', desc: 'Predictive market sentiment analysis for core verticals.' },
  { id: 'exit-precision', icon: Target, label: 'Exit Path Precision', color: 'violet', desc: 'Deterministic success probability for liquidation channels.' },
  { id: 'instant-settlement', icon: Zap, label: 'Instant Settlement', color: 'pink', desc: 'Trigger immediate capital payout logic for vetted lots.' },
  { id: 'risk-enclave', icon: Shield, label: 'Risk Enclave v4', color: 'gold', desc: 'Secured calculation of at-risk principal thresholds.' },
  { id: 'capital-alloc', icon: PieChart, label: 'Capital Allocation', color: 'emerald', desc: 'Optimized distribution of recovered yield across R&D.' },
  { id: 'ops-pulse', icon: Activity, label: 'Operational Pulse', color: 'blue', desc: 'Global SKU velocity aggregate across 15+ regions.' },
  { id: 'logic-override', icon: Command, label: 'Logic Override', color: 'violet', desc: 'Manual system-wide parameter control for emergency pivots.' },
];

export const StrategicOversight: React.FC<StrategicOversightProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 pb-20">
      <motion.div layout>
        <div className="flex items-center gap-3 text-neon-blue mb-4">
          <Command className="w-6 h-6" />
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Clearance Level 10 // Strategic Oversight</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Command Matrix</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STRATEGIC_MODULES.map((module, i) => (
          <motion.div
            key={module.id}
            layoutId={module.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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
              <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                 <span className="text-[8px] font-mono text-gray-600 uppercase">Status: Optimal</span>
                 <button 
                   onClick={() => onNavigate('module-detail', module)}
                   className="text-[8px] font-black text-neon-blue uppercase hover:underline"
                 >
                   Access Module
                 </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
