import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, FileSpreadsheet, ServerCrash, Clock, Zap, BarChart3, Receipt } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-20 px-6 container mx-auto">
       <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">STOP MANAGING LIQUIDATION MANUALLY</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">The old way burns cash. The new way prints it.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-hidden">
          
          {/* Old Way */}
          <div className="bg-[#1a1a20] p-12 relative overflow-hidden group">
             <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
             <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-400 mb-8 flex items-center gap-2">
                   <FileSpreadsheet className="w-6 h-6" />
                   THE OLD WAY
                </h3>
                
                <ul className="space-y-6">
                   <li className="flex items-start gap-4 text-gray-500 group-hover:text-gray-400 transition-colors">
                      <X className="w-6 h-6 text-red-500/50 shrink-0" />
                      <div>
                         <strong className="block text-gray-300">Manual Spreadsheets</strong>
                         <span className="text-sm">Static data that is obsolete the moment you export it.</span>
                      </div>
                   </li>
                   <li className="flex items-start gap-4 text-gray-500 group-hover:text-gray-400 transition-colors">
                      <ServerCrash className="w-6 h-6 text-red-500/50 shrink-0" />
                      <div>
                         <strong className="block text-gray-300">Inventory Distortion</strong>
                         <span className="text-sm">Selling on eBay manually while stock sits frozen in Shopify.</span>
                      </div>
                   </li>
                   <li className="flex items-start gap-4 text-gray-500 group-hover:text-gray-400 transition-colors">
                      <Clock className="w-6 h-6 text-red-500/50 shrink-0" />
                      <div>
                         <strong className="block text-gray-300">Slow Reaction Time</strong>
                         <span className="text-sm">Markdowns applied weeks after demand has already peaked.</span>
                      </div>
                   </li>
                </ul>
             </div>
          </div>

          {/* New Way */}
          <div className="bg-gradient-to-br from-[#1a1a20] to-neon-blue/10 p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>
             <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                   <Zap className="w-6 h-6 text-neon-blue" />
                   THE LIQUIFLOW WAY
                </h3>
                
                <ul className="space-y-6">
                   <li className="flex items-start gap-4">
                      <div className="p-1 bg-neon-blue/20 rounded-full text-neon-blue">
                         <Check className="w-4 h-4" />
                      </div>
                      <div>
                         <strong className="block text-white">Real-time Elasticity</strong>
                         <span className="text-sm text-gray-400">AI automatically finds the price point that maximizes revenue.</span>
                      </div>
                   </li>
                   <li className="flex items-start gap-4">
                      <div className="p-1 bg-neon-blue/20 rounded-full text-neon-blue">
                         <Check className="w-4 h-4" />
                      </div>
                      <div>
                         <strong className="block text-white">Multi-Channel Sync</strong>
                         <span className="text-sm text-gray-400">Inventory delists from Shopify the second it sells on StockX.</span>
                      </div>
                   </li>
                   <li className="flex items-start gap-4">
                      <div className="p-1 bg-neon-blue/20 rounded-full text-neon-blue">
                         <Check className="w-4 h-4" />
                      </div>
                      <div>
                         <strong className="block text-white">Automated Tax Shields</strong>
                         <span className="text-sm text-gray-400">Generates IRS Form 8283 for unsold inventory donations.</span>
                      </div>
                   </li>
                </ul>
             </div>
          </div>

       </div>
    </section>
  );
};