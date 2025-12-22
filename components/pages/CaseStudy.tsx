import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface CaseStudyProps {
  title: string;
  category: string;
  stats: { label: string; value: string; icon: any }[];
  content: string;
  onBack: () => void;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({
  title,
  category,
  stats,
  content,
  onBack,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-6 py-12 max-w-5xl"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        BACK TO RESOURCES
      </button>

      <div className="mb-12 text-center">
        <span className="text-neon-pink font-mono text-sm tracking-widest uppercase mb-2 block">{category}</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="flex flex-col items-center justify-center p-6 text-center" glowColor="emerald">
            <div className="p-3 bg-neon-emerald/10 rounded-full mb-3 text-neon-emerald">
              {stat.icon}
            </div>
            <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</span>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-10 md:p-16 leading-relaxed text-lg text-gray-300 space-y-6">
        {content.split('\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
        
        <div className="pt-8 mt-8 border-t border-white/10">
          <h3 className="text-white font-bold text-xl mb-4">Ready to replicate these results?</h3>
          <button className="px-6 py-3 bg-neon-blue text-black font-bold rounded hover:bg-white transition-colors">
            Start Your Analysis
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
};