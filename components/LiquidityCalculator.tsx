
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertCircle, Settings2, Info, ArrowDownRight, ChevronRight, Activity } from 'lucide-react';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { GlassCard } from './ui/GlassCard';
import { PageView } from '../App';

interface LiquidityCalculatorProps {
  onNavigate?: (page: PageView) => void;
}

export const LiquidityCalculator: React.FC<LiquidityCalculatorProps> = ({ onNavigate }) => {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [revenue, setRevenue] = useState(1300000);
  const [inventory, setInventory] = useState(250000);
  const [carryingCostPct, setCarryingCostPct] = useState(28);
  const [agedInventoryPct, setAgedInventoryPct] = useState(22);
  const [liquidationYield, setLiquidationYield] = useState(45);
  const [opportunityCost, setOpportunityCost] = useState(12);

  const stats = useMemo(() => {
    const frozenPrincipal = inventory * (agedInventoryPct / 100);
    const annualCarryingDrain = frozenPrincipal * (carryingCostPct / 100);
    const immediateRecovery = frozenPrincipal * (liquidationYield / 100);
    const reinvestmentBenefit = immediateRecovery * (opportunityCost / 100);
    const totalPotential = immediateRecovery + annualCarryingDrain + reinvestmentBenefit;
    return { frozenPrincipal, annualCarryingDrain, immediateRecovery, reinvestmentBenefit, totalPotential };
  }, [inventory, agedInventoryPct, carryingCostPct, liquidationYield, opportunityCost]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Input Console */}
        <div className="flex-1 p-8 md:p-12 lg:border-r border-white/5 space-y-12">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white flex items-center gap-3">
              <Activity className="w-4 h-4 text-neon-blue" />
              Parameter Control
            </h3>
            <button 
              onClick={() => setIsAdvanced(!isAdvanced)}
              className={`px-4 py-2 rounded text-[9px] font-black tracking-widest transition-all uppercase border ${
                isAdvanced ? 'bg-white text-black border-white' : 'bg-black/40 text-gray-500 border-white/10 hover:text-white'
              }`}
            >
              {isAdvanced ? 'Show Standard' : 'Advanced Tuning'}
            </button>
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Gross Annual Revenue</span>
                <span className="text-sm font-mono font-black text-white">${revenue.toLocaleString()}</span>
              </div>
              <input type="range" min="100000" max="10000000" step="50000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full accent-white h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Inventory Asset Base (Cost)</span>
                <span className="text-sm font-mono font-black text-white">${inventory.toLocaleString()}</span>
              </div>
              <input type="range" min="50000" max="2000000" step="10000" value={inventory} onChange={(e) => setInventory(Number(e.target.value))} className="w-full accent-white h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer" />
            </div>

            <AnimatePresence>
              {isAdvanced && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">Aged Fraction ({" > "}180d)</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min="5" max="60" value={agedInventoryPct} onChange={(e) => setAgedInventoryPct(Number(e.target.value))} className="flex-1 accent-neon-pink h-1 bg-gray-900 rounded-lg" />
                        <span className="text-xs font-mono font-black text-white w-10">{agedInventoryPct}%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">Capital Yield %</label>
                      <input type="range" min="10" max="80" value={liquidationYield} onChange={(e) => setLiquidationYield(Number(e.target.value))} className="w-full accent-neon-emerald h-1 bg-gray-900 rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">Holding Drain Rate</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min="15" max="45" value={carryingCostPct} onChange={(e) => setCarryingCostPct(Number(e.target.value))} className="flex-1 accent-neon-violet h-1 bg-gray-900 rounded-lg" />
                        <span className="text-xs font-mono font-black text-white w-10">{carryingCostPct}%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">Reinvestment IR</label>
                      <input type="range" min="5" max="40" value={opportunityCost} onChange={(e) => setOpportunityCost(Number(e.target.value))} className="w-full accent-neon-blue h-1 bg-gray-900 rounded-lg" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 bg-black/40 rounded border border-white/5 flex gap-4">
            <Info className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-tight">
              Deterministic capital aging model active. Factors: storage, insurance, personnel overhead, and liquidity opportunity costs.
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-full lg:w-[450px] p-10 md:p-12 lg:p-16 bg-white text-black flex flex-col items-center justify-between">
          <div className="w-full text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-12">Recoverable Liquidity Forecast</p>
            
            <div className="flex flex-col items-center justify-center relative mb-16 px-4">
               <div className="w-full flex items-center justify-center text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tighter italic">
                 <span className="mr-1">$</span>
                 <AnimatedCounter value={stats.totalPotential} duration={1000} />
               </div>
               <div className="mt-8 text-[10px] font-black text-neon-emerald uppercase tracking-[0.3em] flex items-center gap-2">
                 <ArrowDownRight className="w-4 h-4" /> Annualized Net Recovery
               </div>
            </div>

            <div className="space-y-6 pt-12 border-t border-black/5 w-full">
               <div className="flex justify-between items-center text-[11px] font-black uppercase">
                  <span className="text-gray-400 tracking-widest">Locked Principal</span>
                  <span className="font-mono text-black">${Math.floor(stats.frozenPrincipal).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center text-[11px] font-black uppercase">
                  <span className="text-gray-400 tracking-widest">Annual Holding Burn</span>
                  <span className="font-mono text-neon-pink">-${Math.floor(stats.annualCarryingDrain).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center text-[11px] font-black uppercase">
                  <span className="text-gray-400 tracking-widest">Reinvestment Yield</span>
                  <span className="font-mono text-neon-blue">+${Math.floor(stats.reinvestmentBenefit).toLocaleString()}</span>
               </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate && onNavigate('auth')}
            className="w-full mt-16 py-6 bg-black text-white font-black text-xs uppercase tracking-[0.4em] rounded-sm hover:bg-neon-blue transition-all flex items-center justify-center gap-3 group shadow-2xl"
          >
            Execute Liquidity Plan
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
