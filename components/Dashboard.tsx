
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Zap, Target, DollarSign, Package, 
  ArrowRight, TrendingUp, AlertTriangle, 
  ArrowUpRight, Shield, Globe, Clock, Box, ShieldAlert
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
// Corrected: Import PageView from types.ts
import { Product, UserPreferences, UserProfile, PageView } from '../types';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { LiquidityNodeGraph } from './pages/LiquidityNodeGraph';

interface DashboardProps {
  user: UserProfile;
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

export const Dashboard: React.FC<DashboardProps> = ({ 
  user,
  products, 
  onNavigate, 
  userPrefs, 
  addNotification,
  onExecuteLiquidation 
}) => {
  const [selectedDashboardProduct, setSelectedDashboardProduct] = useState<Product | null>(null);

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

  // 🟦 DYNAMIC KPI HUD LOGIC
  const kpis = useMemo(() => {
    const data = [
      {
        id: 'liquidity-cushion',
        label: 'Aggregate Liquidity Index',
        value: avgLiquidity,
        sub: '2.1%',
        icon: Activity,
        color: 'neon-blue',
        type: 'counter',
        target: 'inventory' as PageView
      },
      {
        id: 'total-aged-inventory-value',
        label: 'Capital Frozen In Aging SKUs',
        value: totalFrozenVal,
        prefix: '$',
        icon: Package,
        color: 'neon-pink',
        type: 'animated',
        target: 'reports' as PageView
      },
      {
        id: 'margin-erosion-rate',
        label: 'Global Asset Velocity',
        value: 4.8,
        suffix: '/wk Avg',
        icon: Globe,
        color: 'white',
        type: 'static',
        target: 'marketplaces' as PageView
      },
      {
        id: 'capital-at-risk',
        label: 'Recoverable Yield Target',
        value: totalFrozenVal * 0.45,
        prefix: '$',
        icon: Target,
        color: 'neon-emerald',
        type: 'animated',
        target: 'finance' as PageView
      }
    ];

    const isCEO = user.accessLevel === 10;
    const priorityMetric = userPrefs?.criticalMetric || '';

    // Map userPrefs to KPI ID
    const metricMapping: Record<string, string> = {
      'Liquidity Cushion': 'liquidity-cushion',
      'Total Aged Inventory Value': 'total-aged-inventory-value',
      'Margin Erosion Rate': 'margin-erosion-rate',
      'Capital at Risk': 'capital-at-risk'
    };

    const targetId = metricMapping[priorityMetric];
    
    if (isCEO || !targetId) return data;

    // Put priority first
    const priorityKpi = data.find(k => k.id === targetId);
    const others = data.filter(k => k.id !== targetId);
    return priorityKpi ? [priorityKpi, ...others] : data;
  }, [user.accessLevel, userPrefs, avgLiquidity, totalFrozenVal]);

  const isCEO = user.accessLevel === 10;

  return (
    <div className="space-y-8 pb-20">
      
      {/* 🟦 TOP LEVEL STRATEGIC KPI HUD - REFACTORED FOR DYNAMIC LAYOUT */}
      <div className={`grid gap-5 ${isCEO ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
        {kpis.map((kpi, idx) => {
          const isPriority = !isCEO && idx === 0;
          return (
            <GlassCard 
              key={kpi.id} 
              className={`p-6 border-l-4 border-l-${kpi.color} bg-${kpi.color}/[0.02] ${isPriority ? 'md:col-span-2' : ''}`} 
              onClick={() => onNavigate(kpi.target)}
            >
              <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em] flex items-center gap-2">
                {isPriority && <Zap className="w-3 h-3 text-neon-gold animate-pulse" />}
                {kpi.label}
              </p>
              
              <div className="flex items-end gap-3">
                {kpi.type === 'counter' && (
                  <>
                    <span className="text-4xl font-black font-mono text-white">{kpi.value}</span>
                    {kpi.sub && (
                      <span className="text-xs text-neon-emerald mb-2 font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> {kpi.sub}
                      </span>
                    )}
                  </>
                )}
                {kpi.type === 'animated' && (
                  <AnimatedCounter 
                    value={Number(kpi.value)} 
                    prefix={kpi.prefix} 
                    className={`font-black text-white tracking-tighter ${isPriority ? 'text-4xl' : 'text-2xl'}`} 
                  />
                )}
                {kpi.type === 'static' && (
                  <div className="text-2xl font-black text-white tracking-tighter">
                    {kpi.value}
                    <span className="text-sm font-normal text-gray-500 uppercase ml-1">{kpi.suffix}</span>
                  </div>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* 🟦 CENTERPIECE: LIQUIDITY NODE GRAPH */}
         <div className="lg:col-span-8">
            <GlassCard className="p-0 h-[600px] flex flex-col border-white/5 relative overflow-hidden bg-void/40">
               <div className="absolute top-8 left-8 z-20">
                  <h3 className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter text-white">
                    <Target className="w-6 h-6 text-neon-emerald" />
                    Capital Flow Pathing
                  </h3>
                  <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mt-1">Deterministic Exit Analysis</p>
               </div>
               
               <div className="absolute top-8 right-8 z-20 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
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
                    { id: 'stress-test', label: 'STRESS TEST', color: 'text-[#00FFFF]' }
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
         </div>

         {/* 🟦 RIGHT: INTEL & OPPORTUNITIES */}
         <div className="lg:col-span-4 space-y-6">
            
            <GlassCard className="p-6 border-white/10 bg-[#FF00FF]/5 hover:bg-[#FF00FF]/10 transition-all cursor-pointer" onClick={() => onNavigate('stress-test')}>
               <div className="flex items-center justify-between mb-4">
                  <ShieldAlert className="w-6 h-6 text-[#FF00FF]" />
                  <div className="px-2 py-0.5 bg-[#FF00FF]/10 rounded border border-[#FF00FF]/20 text-[8px] font-black text-[#FF00FF] uppercase tracking-widest">Action Required</div>
               </div>
               <h4 className="text-sm font-black text-white uppercase mb-2">Execute Stress Protocol</h4>
               <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Model your survival runway against supply chain disruptions and market shocks.</p>
               <div className="mt-4 flex items-center gap-2 text-[9px] font-mono text-[#00FFFF] uppercase font-bold tracking-widest">
                  Run Liquidity Sandbox <ArrowRight className="w-3 h-3" />
               </div>
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
               <h3 className="font-black mb-6 flex items-center gap-3 uppercase text-[11px] tracking-[0.2em] text-gray-500">
                  <Zap className="w-4 h-4 text-neon-blue" />
                  Exit Path Analysis
               </h3>
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
