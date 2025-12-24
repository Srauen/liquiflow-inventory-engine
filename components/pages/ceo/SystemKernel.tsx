
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Key, Lock, Shield, Server, Cloud, HardDrive, Zap, Command } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
// Corrected: Import PageView from types.ts
import { PageView } from '../../../types';

interface SystemKernelProps {
  onNavigate: (page: PageView, data?: any) => void;
}

const KERNEL_MODULES = [
  { id: 'root-access', icon: Terminal, label: 'Root Kernel Access', color: 'pink', desc: 'Direct interaction with the deterministic core firmware.' },
  { id: 'gpu-cluster', icon: Cpu, label: 'GPU Node Cluster', color: 'blue', desc: 'Manage distributed compute resources for simulation depth.' },
  { id: 'crypto-auth', icon: Key, label: 'Cryptographic Auth', color: 'violet', desc: 'Secure session management and key rotation protocols.' },
  { id: 'encryption', icon: Lock, label: 'Encryption Layer', color: 'emerald', desc: 'End-to-end AES-256 wrapping for all operational data.' },
  { id: 'vault', icon: Server, label: 'Cold Storage Vault', color: 'blue', desc: 'Archival system for historical liquidity forensics.' },
  { id: 'region-sync', icon: Cloud, label: 'Multi-Region Sync', color: 'emerald', desc: 'Real-time consistency audit across global nodes.' },
  { id: 'emergency-purge', icon: Zap, label: 'Emergency Purge', color: 'pink', desc: 'Immediate system-wide liquidation of selected SKU segments.' },
  { id: 'universal-ctrl', icon: Command, label: 'Universal Controller', color: 'gold', desc: 'The master switch for automated workflow execution.' },
];

export const SystemKernel: React.FC<SystemKernelProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 pb-20">
      <motion.div layout>
        <div className="flex items-center gap-3 text-neon-pink mb-4">
          <Terminal className="w-6 h-6" />
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Clearance Level 10 // System Infrastructure</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">System Kernel</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KERNEL_MODULES.map((module, i) => (
          <motion.div
            key={module.id}
            layoutId={module.id}
            initial={{ opacity: 0, y: -10 }}
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
                 <div className="flex flex-col gap-1 font-mono text-[8px] text-gray-700 uppercase">
                    <div className="flex justify-between gap-2"><span>Core_ID:</span> <span className="text-neon-emerald">VALID</span></div>
                    <div className="flex justify-between gap-2"><span>Enc_Key:</span> <span className="text-neon-blue">ROTATING</span></div>
                 </div>
              </div>
              <button 
                onClick={() => onNavigate('module-detail', module)}
                className={`w-full py-2 bg-white/5 border border-white/10 rounded text-[9px] font-black text-gray-400 uppercase hover:bg-neon-${module.color} hover:text-black transition-all`}
              >
                Access Interface
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
