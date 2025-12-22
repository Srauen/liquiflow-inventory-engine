import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Zap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface FeatureDetailProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  imageGradient: string;
  onBack: () => void;
  onCta: () => void;
}

export const FeatureDetail: React.FC<FeatureDetailProps> = ({
  title,
  subtitle,
  icon,
  description,
  benefits,
  imageGradient,
  onBack,
  onCta,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="container mx-auto px-6 py-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        BACK
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 text-neon-blue">
            {icon}
            <span className="text-xs font-mono font-bold tracking-widest uppercase">Feature Deep Dive</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            {subtitle}
          </p>
          <div className="space-y-6 mb-10">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-neon-emerald shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={onCta}
            className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-neon-blue hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <Zap className="w-5 h-5 fill-current" />
            ACTIVATE THIS FEATURE
          </button>
        </div>

        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-tr ${imageGradient} blur-[100px] opacity-40 rounded-full animate-pulse-slow`}></div>
          <GlassCard className="relative z-10 min-h-[400px] flex items-center justify-center border-white/20">
            <div className="text-center p-8">
              <div className="mb-6 inline-block p-6 rounded-full bg-white/5 border border-white/10">
                 {React.cloneElement(icon as React.ReactElement<any>, { className: "w-24 h-24" })}
              </div>
              <h3 className="text-2xl font-bold mb-4">How it works</h3>
              <p className="text-gray-400">
                {description}
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};