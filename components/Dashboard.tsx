
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Zap, Target, DollarSign, Package, 
  ArrowRight, TrendingUp, AlertTriangle, 
  ArrowUpRight, Shield, Globe, Clock, Box, Info,
  TrendingDown, CheckCircle, Database, FileText
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Product, UserPreferences, AuditEntry } from '../types';
import { PageView } from '../App';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { LiquidityNodeGraph } from './pages/LiquidityNodeGraph';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';

interface DashboardProps {
  onSelectProduct: (product: Product) => void;
  products: Product[];
  isDemo?: boolean;
  onEnableDemo?: () => void;
  onSyncData?: () => void;
  onNavigate: (page: PageView) => void;
  userPrefs?: UserPreferences | null;
  addNotification: (title: string, message: string, type?: 'success' | 'alert' | 'info') => void;
  onExecuteLiquidation: (productId: string, path: string) => void;
}

const CRITICAL_ALERTS = [
  { label: 'Logistics', msg: 'Port congestion likely to extend DOH for Apparel SKUs by 14d.', type: 'risk' },
  { label: 'Demand', msg: 'Softening interest in Midwest for Electronics; pricing adjustment recommended.', type: 'info' },
  { label: 'Capital', msg: 'SKU-902 is optimized for immediate B2B clearing. Value: $14k.', type: 'success' }
];

const MOCK_AUDIT_LOG: AuditEntry[] = [
  { id: '1', action: 'B2B Clearing SKU-209', timestamp: '2024-10-24 14:22', assumptions: ['Market Price > $120', 'Shipping < 5%'] },
  { id: '2', action: 'Markdown Applied SKU-114', timestamp: '2024-10-24 10:05', assumptions: ['Elasticity Coef -2.4'] },
  { id: '3', action: 'No Action Taken SKU-402', timestamp: '2024-10-23 16:45', assumptions: ['Seasonality Hold Policy'] }
];

export const Dashboard: React.FC<DashboardProps> = ({ 
  products, 
  onNavigate, 
  userPrefs, 
  addNotification,
  onExecuteLiquidation 
}) => {
  const [selectedDashboardProduct, setSelectedDashboardProduct] = useState<Product | null>(null);

  // Capital Decay Data
  const decayData = useMemo(() => [
    { day: 'D0', val: 100 },
    { day: 'D7', val: 92 },
    { day: 'D14', val: 84 },
    { day: 'D30', val: 72 },
    { day: 'D60', val: 54 },
    { day: 'D90', val: 38 }
  ], []);

  // Aggregate Liquidity Score
  const avgLiquidity = products.length > 0 
    ? Math.round(products.reduce((acc, p) => acc + p.liquidityScore, 0) / products.length)
    : 0;

  const totalFrozenVal = products
    .filter(p => p.liquidityScore < 50)
    .reduce((acc, p) => acc + (p.marketPrice * p.stockLevel), 0);

  const handleRunAudit = () => {
    addNotification('Audit Initiated', 'Scanning all nodes for capital friction...', 'info');
    setTimeout(() => onNavigate('inventory'), 800);
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* 🟦 TOP LEVEL STRATEGIC KPI HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
         <GlassCard className="p-6 border-l-4 border-l-neon-blue bg-neon-blue/[0.02]" onClick={() => onNavigate('inventory')}>
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Aggregate Liquidity Index</p>
            <div className="flex items-end gap-3">
               <span className="text-4xl font-black font-mono text-white">{avgLiquidity}</span>
               <span className="text-xs text-neon-emerald mb-2 font-bold flex items-center gap-1">
                 <ArrowUpRight className="w-3 h-3" /> 2.1%
               </span>
            </div>
         </GlassCard>
         <GlassCard className="p-6 border-l-4 border-l-neon-pink bg-neon-pink/[0.02]" onClick={() => onNavigate('reports')}>
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Capital Frozen In Aging SKUs</p>
            <AnimatedCounter value={totalFrozenVal} prefix="$" className="text-2xl font-black text-white tracking-tighter" />
         </GlassCard>
         <GlassCard className="p-6 border-l-4 border-l-white bg-white/[0.02]" onClick={() => onNavigate('marketplaces')}>
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Global Asset Velocity</p>
            <div className="text-2xl font-black text-white tracking-tighter">4.8<span className="text-sm font-normal text-gray-500 uppercase ml-1">/wk Avg</span></div>
         </GlassCard>
         <GlassCard className="p-6 border-l-4 border-l-neon-emerald bg-neon-emerald/[0.02]" onClick={() => onNavigate('finance')}>
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Recoverable Yield Target</p>
            <AnimatedCounter value={totalFrozenVal * 0.45} prefix="$" className="text-2xl font-black text-neon-emerald tracking-tighter" />
         </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* 🟦 CENTERPIECE: LIQUIDITY NODE GRAPH */}
         <div className="lg:col-span-8 space-y-8">
            <GlassCard className="p-0 h-[600px] flex flex-col border-white/5 relative overflow-hidden bg-void/40">
               <div className="absolute top-8 left-8 z-20">
                  <h3 className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
                    <Target className="w-6 h-6 text-neon-emerald" />
                    Capital Flow Pathing
                  </h3>
                  <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mt-1">Deterministic Exit Analysis</p>
               </div>
               
               <div className="absolute top-8 right-8 z-20 flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                     <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-neon-emerald shadow-[0_0_8px_#00FF94]" />
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Liquid</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#00F0FF]" />
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Market</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_8px_#FF2975]" />
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Aged</span>
                     </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                     CONFIDENCE: HIGH (DENSE DATA)
                  </div>
               </div>

               <div className="flex-1 w-full relative z-10">
                  <LiquidityNodeGraph 
                    products={products} 
                    selectedProduct={selectedDashboardProduct} 
                    onExecute={(id, path) => onExecuteLiquidation(id, path)}
                  />
               </div>

               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl">
                  {[
                    { id: 'inventory', label: 'PRICING', color: 'text-neon-blue' },
                    { id: 'marketplaces', label: 'CHANNELS', color: 'text-neon-emerald' },
                    { id: 'automation', label: 'TIMING', color: 'text-neon-violet' },
                    { id: 'ai-center', label: 'RISK', color: 'text-neon-pink' }
                  ].map(btn => (
                    <button 
                      key={btn.id}
                      onClick={() => onNavigate(btn.id as PageView)}
                      className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all hover:bg-white/10 ${btn.color}`}
                    >
                      {btn.label}
                    </button>
                  ))}
               </div>
            </GlassCard>

            {/* 🟦 DECISION & COMMIT LOG */}
            <GlassCard className="p-8 border-white/5 bg-void/40">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-3">
                     <FileText className="w-4 h-4 text-neon-blue" />
                     Commit Audit Trail
                  </h3>
                  <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">READ_ONLY SYSTEM_OF_RECORD</span>
               </div>
               <div className="space-y-4">
                  {MOCK_AUDIT_LOG.map((log) => (
                    <div key={log.id} className="grid grid-cols-4 gap-4 py-3 border-b border-white/5 items-center">
                       <div className="text-[10px] font-mono text-gray-600">{log.timestamp}</div>
                       <div className="text-[11px] font-bold text-white uppercase truncate">{log.action}</div>
                       <div className="flex gap-2">
                          {log.assumptions.map((asm, i) => (
                            <span key={i} className="text-[8px] bg-white/5 px-2 py-0.5 rounded border border-white/10 text-gray-500">{asm}</span>
                          ))}
                       </div>
                       <div className="text-right">
                          <CheckCircle className="w-3 h-3 text-neon-emerald inline" />
                       </div>
                    </div>
                  ))}
               </div>
            </GlassCard>
         </div>

         {/* 🟦 RIGHT: INTEL & OPPORTUNITIES */}
         <div className="lg:col-span-4 space-y-6">
            
            {/* 🟦 CAPITAL DECAY CHART */}
            <GlassCard className="p-6 border-white/5 bg-void/40 h-48 flex flex-col">
               <div className="flex justify-between items-start mb-4">
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Capital Erosion Forecast</p>
                  <span className="text-[9px] text-neon-pink font-bold">-% Decay</span>
               </div>
               <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={decayData}>
                        <Area type="monotone" dataKey="val" stroke="#FF2975" fill="#FF2975" fillOpacity={0.05} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <p className="text-[8px] text-gray-600 mt-2 font-mono uppercase tracking-widest">No Action Scenario: -62% Recovery Over 90d</p>
            </GlassCard>

            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2 px-1">Deterministic Intel</h3>
               {CRITICAL_ALERTS.map((alert, i) => (
                  <GlassCard key={i} className={`p-5 border-l-2 flex items-start gap-4 transition-all hover:scale-[1.02] ${alert.type === 'risk' ? 'border-l-neon-pink bg-neon-pink/[0.01]' : alert.type === 'success' ? 'border-l-neon-emerald bg-neon-emerald/[0.01]' : 'border-l-neon-blue bg-neon-blue/[0.01]'}`}>
                     {alert.type === 'risk' ? <AlertTriangle className="w-5 h-5 text-neon-pink shrink-0" /> : <Activity className="w-5 h-5 text-neon-blue shrink-0" />}
                     <div className="flex-1">
                        <div className="flex justify-between items-start mb-1.5">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-white uppercase tracking-tighter">{alert.label} SENSING</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
                           </div>
                           <button onClick={() => onNavigate('ai-center')} className="text-[8px] font-black uppercase text-neon-blue hover:underline">Simulate</button>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">{alert.msg}</p>
                     </div>
                  </GlassCard>
               ))}
            </div>

            <GlassCard className="p-8 border-white/5 bg-void/40">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black flex items-center gap-3 uppercase text-[11px] tracking-[0.2em] text-gray-500">
                     <Zap className="w-4 h-4 text-neon-blue" />
                     Exit Path Analysis
                  </h3>
               </div>
               <div className="space-y-4">
                  {products.filter(p => p.liquidityScore < 60).slice(0, 4).map(p => (
                     <div 
                        key={p.id} 
                        onClick={() => {
                          setSelectedDashboardProduct(p);
                          addNotification('Path Focused', `Calculating exit metrics for ${p.name}...`, 'info');
                        }} 
                        className={`flex items-center justify-between p-4 bg-white/[0.02] border rounded-xl hover:bg-white/[0.05] transition-all cursor-pointer group ${
                          selectedDashboardProduct?.id === p.id ? 'border-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'border-white/5'
                        }`}
                     >
                        <div className="flex items-center gap-4">
                           <img src={p.imageUrl} className="w-10 h-10 rounded-lg border border-white/10 grayscale group-hover:grayscale-0 transition-all" alt="" />
                           <div>
                              <p className="text-xs font-black text-white uppercase tracking-tight group-hover:text-neon-blue transition-colors">{p.name}</p>
                              <p className="text-[9px] text-neon-pink font-mono font-bold mt-0.5">LIQUIDITY_INDEX: {p.liquidityScore}</p>
                           </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-all group-hover:translate-x-1" />
                     </div>
                  ))}

                  {/* Explicit No Action State */}
                  <div className="p-4 bg-white/[0.01] border border-dashed border-white/10 rounded-xl opacity-60">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black border border-white/5 rounded-lg flex items-center justify-center">
                           <Shield className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                           <p className="text-xs font-black text-gray-600 uppercase tracking-tight">System Hold: SKU-402</p>
                           <p className="text-[8px] text-gray-700 font-mono mt-0.5">NO ACTION RECOMMENDED</p>
                        </div>
                     </div>
                  </div>
               </div>
               <button 
                  onClick={handleRunAudit}
                  className="w-full mt-8 py-4 bg-white text-black rounded-full font-black text-[11px] tracking-[0.2em] hover:bg-neon-blue transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
               >
                  RUN FULL AUDIT <Activity className="w-3.5 h-3.5" />
               </button>
            </GlassCard>

         </div>

      </div>
    </div>
  );
};
