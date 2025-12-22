
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, OptimalPath, RecommendationMeta } from '../../types';
// Added AlertTriangle to the imports from lucide-react
import { ShoppingCart, Truck, HeartHandshake, Box, DollarSign, Clock, Zap, ArrowRight, X, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { calculateElasticity, calculateOptimalPath } from '../../utils/MicroeconomicsEngine';

interface LiquidityNodeGraphProps {
  products: Product[];
  selectedProduct?: Product | null;
  onExecute: (productId: string, pathId: string) => void;
}

interface PathData {
  id: string;
  label: string;
  icon: any;
  color: string;
  x: number;
  y: number;
  recovery: number;
  timeToLiquidity: string;
  risk: 'Low' | 'Medium' | 'High';
  description: string;
  assumptions: string[];
  meta: RecommendationMeta;
}

export const LiquidityNodeGraph: React.FC<LiquidityNodeGraphProps> = ({ products, selectedProduct, onExecute }) => {
  const [activePath, setActivePath] = useState<string | null>(null);
  const [showRecPanel, setShowRecPanel] = useState(true);

  // Use selected product or aggregate first few for the "Current Focus"
  const target = selectedProduct || products[0];

  const pathMetrics = useMemo(() => {
    if (!target) return [];

    const cost = target.costBasis * target.stockLevel;
    const retail = target.marketPrice * target.stockLevel;
    
    // 1. Retail Markdown (B2C) - Simulated at 25% discount
    const b2cSim = calculateElasticity(target.marketPrice, target.velocity, target.marketPrice * 0.75, target.elasticityCoef);
    const b2cRecovery = b2cSim.projectedRevenue * target.stockLevel * 0.1; 

    // 2. B2B Wholesale - Immediate buyout at 40% of retail
    const b2bRecovery = retail * 0.42;

    // 3. Tax Recovery - Donation at cost basis * 25% tax shield
    const taxRecovery = cost * 0.25;

    // 4. Channel Shift - Moving stock to high-demand region (90% yield - transfer costs)
    const shiftRecovery = retail * 0.88;

    const data: PathData[] = [
      { 
        id: 'b2c', 
        label: 'Retail Markdown', 
        icon: ShoppingCart, 
        x: 200, y: 120, 
        color: 'neon-emerald',
        recovery: b2cRecovery,
        timeToLiquidity: '14-30 Days',
        risk: 'Medium',
        description: 'Direct consumer exit via tiered discounting. Highest potential yield but carries market absorption risk.',
        assumptions: ['25% Base Discount', 'Standard Ad Spend', 'Current Traffic Velocity'],
        meta: {
           inputs: ['Historical SKU Velocity', 'Elasticity Coefficient', 'Seasonal Demand Factor'],
           alternatives: ['B2B Wholesale (Rejected: Yield too low)', 'Tax Shield (Rejected: Capital needs priority)'],
           primaryRisk: 'Demand softness in primary geo-zone.',
           confidence: 'High (Dense Data)'
        }
      },
      { 
        id: 'b2b', 
        label: 'B2B Wholesale', 
        icon: Truck, 
        x: 600, y: 120, 
        color: 'neon-blue',
        recovery: b2bRecovery,
        timeToLiquidity: '3-5 Days',
        risk: 'Low',
        description: 'Bulk clearance to vetted wholesale partners. Immediate capital release at fixed pricing.',
        assumptions: ['Bulk Palletization', 'FOB Shipping', 'Immediate Payment Terms'],
        meta: {
           inputs: ['Partner Buy-offer API', 'Logistic Lead Times', 'Inventory Physical Cond.'],
           alternatives: ['Wait for Season (Rejected: Holding burn exceeds 15%)'],
           primaryRisk: 'Counterparty default on large-volume clear.',
           confidence: 'Medium (Market Variance)'
        }
      },
      { 
        id: 'donation', 
        label: 'Tax Recovery', 
        icon: HeartHandshake, 
        x: 200, y: 410, 
        color: 'neon-pink',
        recovery: taxRecovery,
        timeToLiquidity: 'Tax Cycle',
        risk: 'Low',
        description: 'Inventory donation for IRS-8283 credits. Effective for aged stock with zero market velocity.',
        assumptions: ['501(c)(3) Recipient', 'Fair Market Value Audit', '25% Corporate Tax Rate'],
        meta: {
           inputs: ['Tax Shield Cap YTD', 'Inventory FMV Data', 'Accountant Clearance'],
           alternatives: ['Scrap Sale (Rejected: Net yield < $500)'],
           primaryRisk: 'FMV Audit challenge by authorities.',
           confidence: 'High (Dense Data)'
        }
      },
      { 
        id: 'shift', 
        label: 'Channel Shift', 
        icon: Box, 
        x: 600, y: 410, 
        color: 'neon-violet',
        recovery: shiftRecovery,
        timeToLiquidity: '7-14 Days',
        risk: 'High',
        description: 'Inter-store or regional transfer to areas with positive demand delta. High logistic overhead.',
        assumptions: ['Regional Demand Gap', 'Shipping Cost < 5%', 'Available Floor Space'],
        meta: {
           inputs: ['Store-level demand delta', 'Transfer costs', 'Regional promo capacity'],
           alternatives: ['Central Clearing (Rejected: Fulfillment hub full)'],
           primaryRisk: 'Inter-region demand cannibalization.',
           confidence: 'Low (Insufficient Signal)'
        }
      },
    ];

    return data;
  }, [target]);

  const primaryRecommendation = useMemo(() => {
    if (!pathMetrics.length) return null;
    return pathMetrics.reduce((prev, current) => (prev.recovery > current.recovery) ? prev : current);
  }, [pathMetrics]);

  const activePathData = pathMetrics.find(p => p.id === activePath);

  const handleExecuteProtocol = () => {
    if (activePathData && target) {
      onExecute(target.id, activePathData.id);
      setActivePath(null);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-void/20 select-none">
      {/* Background Grid & Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <defs>
          <filter id="glow">
             <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
             <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
             </feMerge>
          </filter>
        </defs>
        {pathMetrics.map((ch) => {
          const isRecommended = ch.id === primaryRecommendation?.id;
          const isActive = ch.id === activePath;
          return (
            <g key={ch.id}>
              <motion.line 
                x1={400} y1={280} 
                x2={ch.x} y2={ch.y} 
                stroke={isRecommended ? 'currentColor' : 'rgba(255,255,255,0.05)'}
                className={isRecommended ? `text-${ch.color}/40` : ''}
                strokeWidth={isRecommended || isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "4 4"}
                filter={isRecommended ? "url(#glow)" : "none"}
              />
            </g>
          );
        })}
      </svg>

      {/* Path Nodes */}
      {pathMetrics.map((ch) => {
        const isRecommended = ch.id === primaryRecommendation?.id;
        const isActive = ch.id === activePath;
        
        return (
          <motion.div
            key={ch.id}
            onClick={() => setActivePath(ch.id)}
            style={{ left: ch.x, top: ch.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer group transition-all ${
              activePath && !isActive ? 'opacity-40 grayscale' : 'opacity-100'
            }`}
          >
            <div className={`p-5 rounded-2xl bg-black/80 border transition-all shadow-xl ${
              isActive ? `border-${ch.color} scale-110 shadow-${ch.color}/20` : isRecommended ? `border-${ch.color}/40` : 'border-white/10 hover:border-white/30'
            }`}>
               <ch.icon className={`w-7 h-7 ${isActive ? `text-${ch.color}` : isRecommended ? `text-${ch.color}/60` : 'text-gray-600'}`} />
            </div>
            
            <div className="text-center">
               <div className="text-[10px] font-black uppercase tracking-widest text-white">{ch.label}</div>
               <div className={`text-[11px] font-mono font-bold mt-1.5 text-${ch.color}`}>
                 ${Math.floor(ch.recovery).toLocaleString()}
               </div>
               {isRecommended && !isActive && (
                 <div className="text-[8px] font-black text-neon-emerald uppercase mt-1.5 animate-pulse">PRIMARY OPTION</div>
               )}
            </div>
          </motion.div>
        );
      })}

      {/* Central Capital Hub */}
      <div 
        style={{ left: 400, top: 280 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
      >
        <div className="text-center">
           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.15)] border-4 border-black relative mb-3">
              <DollarSign className="w-10 h-10 text-black" />
           </div>
           <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Recoverable Base</p>
           <p className="text-sm font-black text-white font-mono tracking-tighter mt-1">
             ${target ? (target.marketPrice * target.stockLevel).toLocaleString() : '0'}
           </p>
        </div>
      </div>

      {/* Detail Overlay Panel */}
      <AnimatePresence>
        {activePathData && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="absolute top-6 right-6 bottom-6 w-80 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 z-[100] shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className={`text-xs font-black uppercase tracking-widest text-${activePathData.color}`}>Path Analysis</h4>
              <button onClick={() => setActivePath(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-xl bg-${activePathData.color}/10 border border-${activePathData.color}/30 text-${activePathData.color}`}>
                <activePathData.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white uppercase leading-none">{activePathData.label}</h3>
                <span className="text-[10px] text-gray-500 uppercase font-mono">SIMULATED FORECAST</span>
              </div>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
               <div>
                  <label className="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-widest mb-2 block">Calculated Yield</label>
                  <div className="text-4xl font-black text-white font-mono tracking-tighter">
                    ${Math.floor(activePathData.recovery).toLocaleString()}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                     <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-tighter">Velocity</span>
                     </div>
                     <div className="text-xs font-bold text-white uppercase">{activePathData.timeToLiquidity}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                     <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-tighter">Risk Level</span>
                     </div>
                     <div className={`text-xs font-bold uppercase ${
                       activePathData.risk === 'Low' ? 'text-neon-emerald' : activePathData.risk === 'Medium' ? 'text-neon-blue' : 'text-neon-pink'
                     }`}>
                        {activePathData.risk}
                     </div>
                  </div>
               </div>

               {/* Why This Recommendation Panel */}
               <div className="border border-white/10 rounded-xl overflow-hidden">
                  <button 
                     onClick={() => setShowRecPanel(!showRecPanel)}
                     className="w-full p-4 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                  >
                     <span className="text-[10px] font-black uppercase tracking-widest text-white">Logic Scaffolding</span>
                     {showRecPanel ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  <AnimatePresence>
                     {showRecPanel && (
                        <motion.div 
                           initial={{ height: 0 }} 
                           animate={{ height: 'auto' }} 
                           exit={{ height: 0 }} 
                           className="overflow-hidden bg-black/40 p-4 space-y-4"
                        >
                           <div>
                              <label className="text-[8px] font-mono text-gray-600 uppercase tracking-widest block mb-1">Data Inputs</label>
                              <div className="flex flex-wrap gap-1">
                                 {activePathData.meta.inputs.map((inp, idx) => (
                                    <span key={idx} className="text-[9px] text-gray-400 bg-white/5 px-2 rounded">{inp}</span>
                                 ))}
                              </div>
                           </div>
                           <div>
                              <label className="text-[8px] font-mono text-gray-600 uppercase tracking-widest block mb-1">Alternatives Evaluated</label>
                              <ul className="space-y-1">
                                 {activePathData.meta.alternatives.map((alt, idx) => (
                                    <li key={idx} className="text-[9px] text-gray-500 line-through">{alt}</li>
                                 ))}
                              </ul>
                           </div>
                           <div>
                              <label className="text-[8px] font-mono text-gray-600 uppercase tracking-widest block mb-1">Primary Risk Factor</label>
                              <p className="text-[9px] text-neon-pink font-bold uppercase">{activePathData.meta.primaryRisk}</p>
                           </div>
                           <div className="pt-2 border-t border-white/5">
                              <span className="text-[8px] font-mono text-gray-600 uppercase">System Confidence</span>
                              <p className={`text-[10px] font-black uppercase tracking-tighter ${activePathData.meta.confidence.includes('High') ? 'text-neon-emerald' : 'text-neon-blue'}`}>{activePathData.meta.confidence}</p>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{activePathData.description}</p>
               </div>

               <div>
                  <label className="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-widest mb-3 block">Model Assumptions</label>
                  <ul className="space-y-2">
                    {activePathData.assumptions.map((asm, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
                        <div className={`w-1 h-1 rounded-full bg-${activePathData.color}/50`} />
                        {asm}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            <button 
              onClick={handleExecuteProtocol}
              className={`w-full mt-8 py-4 bg-${activePathData.color} text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2`}
            >
              Execute Protocol <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticker Indicator */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
         <Zap className="w-3.5 h-3.5 text-neon-emerald animate-pulse" />
         <span className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-tighter">Forecast Engine: LIVE_STREAMING v4.1</span>
      </div>
    </div>
  );
};
