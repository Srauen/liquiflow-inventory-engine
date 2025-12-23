
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Binary, Search, BrainCircuit, Scan, Code, Layers, Share2, Network } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { PageView } from '../../../App';

interface NeuralDataProps {
  onNavigate: (page: PageView, data?: any) => void;
}

const DATA_MODULES = [
  { id: 'data-lake', icon: Database, label: 'Neural Data Lake', color: 'blue', desc: 'Centralized repository for unified inventory telemetry.' },
  { id: 'elasticity', icon: Binary, label: 'Elasticity Engine', color: 'violet', desc: 'Multi-variable demand modeling at the edge.' },
  { id: 'quantum-search', icon: Search, label: 'Quantum Search', color: 'pink', desc: 'Instantaneous discovery across millions of SKU permutations.' },
  { id: 'ocr', icon: Scan, label: 'OCR Extraction', color: 'emerald', desc: 'Automated ingestion of physical warehouse manifests.' },
  { id: 'api-tunnel', icon: Code, label: 'API Tunneling', color: 'blue', desc: 'Secure middleware management for legacy ERP integration.' },
  { id: 'sentiment', icon: Layers, label: 'Sentiment Logic', color: 'gold', desc: 'Market trend detection via social and retail signals.' },
  { id: 'arbitrage', icon: Network, label: 'Wholesale Arbitrage', color: 'violet', desc: 'Automated identification of bulk buyback opportunities.' },
  { id: 'partner-gateway', icon: Share2, label: 'Partner Gateway', color: 'emerald', desc: 'Verified secure data handshakes with B2B clearing agents.' },
];

export const NeuralData: React.FC<NeuralDataProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 pb-20">
      <motion.div layout>
        <div className="flex items-center gap-3 text-neon-violet mb-4">
          <Database className="w-6 h-6" />
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Clearance Level 10 // Neural Intelligence</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Intelligence Core</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DATA_MODULES.map((module, i) => (
          <motion.div
            key={module.id}
            layoutId={module.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
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
              <div className="mt-auto flex items-center justify-between">
                 <div className="flex gap-1">
                    {[1,2,3].map(bit => <div key={bit} className="w-1 h-3 bg-neon-emerald/20 rounded-full group-hover:bg-neon-emerald transition-all" />)}
                 </div>
                 <button 
                   onClick={() => onNavigate('module-detail', module)}
                   className="text-[8px] font-black text-neon-violet uppercase hover:underline"
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
