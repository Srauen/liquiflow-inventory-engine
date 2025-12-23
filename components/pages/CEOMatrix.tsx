
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Target, TrendingUp, Globe, Database, Cpu, Command, Shield, 
  Layers, Binary, Activity, PieChart, BarChart3, Scan, Network, 
  Workflow, Server, Cloud, HardDrive, Box, Truck, CreditCard, 
  Users, Briefcase, FileText, Search, Settings, Lock, Share2, 
  Terminal, Code, GitBranch, Key, Eye, EyeOff, Radio, Signal
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const TACTICAL_NODES = [
  { icon: Globe, label: 'Global Liquidity Grid', color: 'blue' },
  { icon: Target, label: 'Exit Path Precision', color: 'emerald' },
  { icon: TrendingUp, label: 'Macro-Demand Forecast', color: 'gold' },
  { icon: Zap, label: 'Instant Settlement', color: 'pink' },
  { icon: Database, label: 'Neural Data Lake', color: 'violet' },
  { icon: Cpu, label: 'Core Decision Logic', color: 'blue' },
  { icon: Network, label: 'Wholesale Arbitrage', color: 'emerald' },
  { icon: Shield, label: 'Fraud Shield Core', color: 'pink' },
  { icon: Binary, label: 'Elasticity Engine', color: 'violet' },
  { icon: Workflow, label: 'Chain Automation', color: 'gold' },
  { icon: BarChart3, label: 'Yield Matrix', color: 'blue' },
  { icon: Activity, label: 'Real-time Pulse', color: 'emerald' },
  { icon: Scan, label: 'SKU Fingerprinting', color: 'violet' },
  { icon: Box, label: 'Inventory Virtualization', color: 'gold' },
  { icon: Truck, label: 'Logistics Orchestrator', color: 'pink' },
  { icon: CreditCard, label: 'Capital Disbursement', color: 'emerald' },
  { icon: Users, label: 'Personnel Access Grid', color: 'blue' },
  { icon: Briefcase, label: 'Tax Shield Repository', color: 'violet' },
  { icon: FileText, label: 'Compliance Auditor', color: 'gold' },
  { icon: Terminal, label: 'System Kernel', color: 'pink' },
  { icon: HardDrive, label: 'Cold Storage Vault', color: 'blue' },
  { icon: Cloud, label: 'Multi-Region Sync', color: 'emerald' },
  { icon: GitBranch, label: 'Strategic Branches', color: 'violet' },
  { icon: Eye, label: 'Market Oversight', color: 'gold' },
  { icon: Radio, label: 'Carrier Comms', color: 'pink' },
  { icon: Signal, label: 'Latency Map', color: 'emerald' },
  { icon: Code, label: 'API Development', color: 'blue' },
  { icon: Key, label: 'Cryptographic Auth', color: 'violet' },
  { icon: Layers, label: 'Middleware Tunnel', color: 'gold' },
  { icon: Share2, label: 'Partner Gateway', color: 'pink' },
  // Adding more to reach requested density
  { icon: Search, label: 'Quantum Search', color: 'blue' },
  { icon: Settings, label: 'Global Parameters', color: 'violet' },
  { icon: Lock, label: 'Encryption Layer', color: 'pink' },
  { icon: EyeOff, label: 'Dark Market Ops', color: 'emerald' },
  { icon: Database, label: 'Archival Node', color: 'gold' },
  { icon: Cpu, label: 'Sub-Processor 01', color: 'blue' },
  { icon: Cpu, label: 'Sub-Processor 02', color: 'blue' },
  { icon: Cpu, label: 'Sub-Processor 03', color: 'blue' },
  { icon: Workflow, label: 'Batch Processing', color: 'emerald' },
  { icon: Target, label: 'Local Optimization', color: 'violet' },
  { icon: Globe, label: 'Domain Management', color: 'pink' },
  { icon: Activity, label: 'Hardware Telemetry', color: 'gold' },
  { icon: Zap, label: 'Emergency Purge', color: 'pink' },
  { icon: Shield, label: 'Threat Intelligence', color: 'blue' },
  { icon: Binary, label: 'Algorithm Audit', color: 'emerald' },
  { icon: Network, label: 'Cluster Mapping', color: 'violet' },
  { icon: HardDrive, label: 'Log Aggregator', color: 'gold' },
  { icon: Cloud, label: 'Hybrid Mesh', color: 'blue' },
  { icon: Terminal, label: 'Root Terminal', color: 'pink' },
  { icon: Signal, label: 'Frequency Jammer', color: 'violet' },
  { icon: TrendingUp, label: 'Sentiment Logic', color: 'gold' },
  { icon: PieChart, label: 'Allocation Grid', color: 'emerald' },
  { icon: Box, label: 'SKU Re-routing', color: 'pink' },
  { icon: Scan, label: 'OCR Extraction', color: 'blue' },
  { icon: Binary, label: 'Heuristic Core', color: 'violet' },
  { icon: Cpu, label: 'GPU Cluster', color: 'emerald' },
  { icon: Network, label: 'B2B Handshake', color: 'gold' },
  { icon: Key, label: 'Private Subnets', color: 'pink' },
  { icon: Command, label: 'Universal Controller', color: 'blue' },
  { icon: Signal, label: 'Satellite Link', color: 'violet' },
];

export const CEOMatrix: React.FC = () => {
  return (
    <div className="space-y-12 pb-24">
      <div className="flex justify-between items-end">
        <div>
           <div className="flex items-center gap-3 text-neon-violet mb-4">
              <Command className="w-8 h-8" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Clearance Level 10 Active</span>
           </div>
           <h1 className="text-5xl font-black tracking-tighter uppercase italic">Command Matrix</h1>
           <p className="text-gray-500 mt-2 font-mono text-xs uppercase tracking-widest">Global Strategic Oversight Infrastructure</p>
        </div>
        <div className="flex gap-4">
           <GlassCard className="py-2 px-6 border-white/5 bg-white/[0.02]">
              <p className="text-[9px] font-mono text-gray-600 uppercase mb-1">Total NAV Oversight</p>
              <p className="text-xl font-black text-white font-mono">$12.4B</p>
           </GlassCard>
           <GlassCard className="py-2 px-6 border-white/5 bg-white/[0.02]">
              <p className="text-[9px] font-mono text-gray-600 uppercase mb-1">System Health</p>
              <p className="text-xl font-black text-neon-emerald font-mono">99.99%</p>
           </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
         {TACTICAL_NODES.map((node, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ delay: i * 0.01, duration: 0.3 }}
            >
               <GlassCard 
                 glowColor={node.color as any}
                 className="h-full flex flex-col items-center justify-center p-6 text-center border-white/5 bg-black/40 hover:bg-white/[0.05] transition-all group cursor-pointer"
               >
                  <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-5 group-hover:scale-110 group-hover:border-neon-${node.color} transition-all duration-500`}>
                     <node.icon className={`w-6 h-6 text-gray-600 group-hover:text-neon-${node.color} transition-colors`} />
                  </div>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">{node.label}</h3>
                  <div className="mt-4 w-8 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-500" />
               </GlassCard>
            </motion.div>
         ))}
      </div>

      {/* Background Decor */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 opacity-30">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(140,30,255,0.03)_0%,transparent_70%)]" />
      </div>
    </div>
  );
};
