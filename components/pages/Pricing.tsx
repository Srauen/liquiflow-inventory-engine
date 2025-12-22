
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Zap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface PricingProps {
  onBack: () => void;
  onSelect: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBack, onSelect }) => {
  const plans = [
    {
      name: 'Starter',
      price: '$25',
      period: '/mo',
      features: ['Up to 5,000 SKUs', 'Smart Markdowns', 'Shopify Integration', 'Email Support'],
      highlight: false,
      color: 'blue'
    },
    {
      name: 'Growth',
      price: '$100',
      period: '/mo',
      features: ['Up to 25,000 SKUs', 'Marketplace Sync', 'B2B Liquidation Access', 'Priority Support'],
      highlight: true,
      color: 'violet'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Unlimited SKUs', 'Dedicated Account Manager', 'Custom API Access', 'Tax Recovery Automation'],
      highlight: false,
      color: 'pink'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="container mx-auto px-6 py-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        BACK
      </button>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, ROI-Positive Pricing</h1>
        <p className="text-gray-400">Recover 10x your subscription cost in the first month, guaranteed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <GlassCard 
            key={idx} 
            className={`flex flex-col p-8 relative ${plan.highlight ? 'border-neon-violet bg-neon-violet/5' : ''}`}
            glowColor={plan.color as any}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-neon-violet text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-500 ml-1">{plan.period}</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className={`w-4 h-4 text-neon-${plan.color}`} />
                  {feat}
                </li>
              ))}
            </ul>

            <button 
              onClick={onSelect}
              className={`w-full py-3 rounded font-bold transition-all ${
                plan.highlight 
                  ? 'bg-neon-violet text-white hover:bg-neon-violet/80' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Get Started
            </button>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
};
