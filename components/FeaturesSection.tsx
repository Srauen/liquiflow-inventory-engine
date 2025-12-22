
import React, { useState } from 'react';
import { ShoppingBag, Globe, Truck, FileText, ArrowRight, BrainCircuit, ScanLine, BarChart3, Workflow } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { PageView } from '../App';

interface FeaturesSectionProps {
  onNavigate: (page: PageView) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-neon-blue" />,
      title: "AI Demand Forecasting",
      description: "Predict exactly when demand will drop for every SKU using historical velocity and market trends.",
      color: "blue",
      link: 'feature-markdowns' as PageView
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-neon-pink" />,
      title: "Smart Price Elasticity",
      description: "Our engine simulates demand curves to find the perfect discount that maximizes revenue, not just sales volume.",
      color: "pink",
      link: 'feature-markdowns' as PageView
    },
    {
      icon: <ScanLine className="w-8 h-8 text-neon-emerald" />,
      title: "Inventory Cleanliness",
      description: "Get a 0-100 health score for every product. Instantly identify at-risk items before they become dead stock.",
      color: "emerald",
      link: 'feature-sync' as PageView
    },
    {
      icon: <Globe className="w-8 h-8 text-neon-violet" />,
      title: "Marketplace Posting Hub",
      description: "One-click push to eBay, Amazon, Poshmark, and StockX. Syncs inventory in real-time across all channels.",
      color: "violet",
      link: 'feature-sync' as PageView
    },
    {
      icon: <FileText className="w-8 h-8 text-white" />,
      title: "Tax Write-Off Workflow",
      description: "Automate the generation of IRS Form 8283 for donations, turning total losses into tax deductions.",
      color: "blue",
      link: 'feature-tax' as PageView
    },
    {
      icon: <Truck className="w-8 h-8 text-neon-pink" />,
      title: "B2B Liquidation Network",
      description: "Aggregate micro-lots into pallets and sell directly to our network of vetted bulk buyers.",
      color: "pink",
      link: 'feature-b2b' as PageView
    },
    {
      icon: <Workflow className="w-8 h-8 text-neon-violet" />,
      title: "Workflow Builder",
      description: "Set 'If This Then That' rules. 'If stock > 180 days, apply 20% discount.' Run your ops on autopilot.",
      color: "violet",
      link: 'feature-markdowns' as PageView
    }
  ];

  return (
    <section className="py-20 px-6 container mx-auto">
      <div className="text-center mb-16">
         <h2 className="text-3xl font-bold mb-4">THE OPERATING SYSTEM FOR LIQUIDITY</h2>
         <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to analyze, price, and clear excess inventory in one platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <GlassCard 
            key={idx} 
            glowColor={feature.color as any} 
            className="flex flex-col items-center text-center p-8 group hover:bg-white/10 cursor-pointer"
            onClick={() => onNavigate(feature.link)}
          >
            <div className={`p-4 rounded-full bg-neon-${feature.color}/10 mb-6 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              {feature.description}
            </p>
            <div className="mt-auto flex items-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity text-neon-blue">
               Learn More <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
