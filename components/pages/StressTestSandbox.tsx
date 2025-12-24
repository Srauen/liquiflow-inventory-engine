
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, AlertTriangle, Activity, TrendingDown, 
  ShieldAlert, Radio, Binary, Info, Crosshair, 
  Layers, ArrowUpRight, BarChart3, Clock, Lock,
  ChevronDown, Cpu
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { GlassCard } from '../ui/GlassCard';

// Real-time volatility data generator for sparklines
const generateRiskData = () => Array.from({ length: 15 }, (_, i) => ({
  val: 40 + Math.random() * 50,
  i
}));

const MiniSparkline = ({ color }: { color: string }) => {
  const data = useMemo(() => generateRiskData(), []);
  return (
    <div className="h-6 w-12 opacity-50">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area type="monotone" dataKey="val" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StressTestSandbox: React.FC = () => {
  const [latency, setLatency] = useState(15);
  const [volatility, setVolatility] = useState(25);
  const [riskPulse, setRiskPulse] = useState(generateRiskData());

  useEffect(() => {
    const timer = setInterval(() => {
      setRiskPulse(prev => [...prev.slice(1), { val: 40 + Math.random() * 50, i: Date.now() }]);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const survivalDays = useMemo(() => {
    // Deterministic heuristic for survival modeling
    const base = 120;
    const latencyImpact = latency * 1.6;
    const volatilityImpact = (volatility / 100) * 65;
    return Math.max(7, Math.floor(base - latencyImpact - volatilityImpact));
  }, [latency, volatility]);

  const scenarioData = useMemo(() => {
    const baseRevenue = 1450000;
    const adverseFactor = (latency / 100) + (volatility / 100);
    return {
      base: {
        rev: baseRevenue,
        margin: 42.5,
        gap: 0
      },
      adverse: {
        rev: baseRevenue * (1 - adverseFactor * 0.82),
        margin: 42.5 * (1 - adverseFactor * 0.45),
        gap: baseRevenue * adverseFactor * 0.55
      }
    };
  }, [latency, volatility]);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-end pb-2 border-b border-white/5">
        <div className="space-y-1">
           <div className="flex items-center gap-2 text-[#00FFFF]">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-[9px] font-mono font-black uppercase tracking-[0.6em]">Deterministic Enclave v4.1 // Risk Sandbox</span>
           </div>
           <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">Liquidity Stress Test</h1>
           <p className="text-gray-500 font-mono text-[9px] uppercase tracking-widest">Real-time parameter injection for survival modeling</p>
        </div>
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
           <div className="text-right">
              <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">Risk Entropy</p>
              <p className="text-sm font-black text-[#00FFFF] font-mono">STABLE_SIGNAL</p>
           </div>
           <div className="h-10 w-px bg-white/10" />
           <div className="p-2 bg-white/[0.02] border border-white/5 rounded flex items-center gap-3">
              <Cpu className="w-4 h-4 text-gray-500" />
              <MiniSparkline color="#00FFFF" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 h-full min-h-[650px]">
        
        {/* 1) Vertical Sliders Sidebar */}
        <div className="xl:col-span-3 flex flex-col gap-5">
           <GlassCard className="flex-1 bg-black/40 border-white/10 p-6 flex flex-col">
              <div className="mb-8 border-b border-white/5 pb-4">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                   <Binary className="w-3.5 h-3.5 text-[#00FFFF]" /> Param Injection
                 </h3>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-4">
                 {/* Latency Slider */}
                 <div className="flex flex-col items-center justify-between py-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-[#00FFFF]/30 transition-all">
                    <span className="text-[10px] font-mono font-bold text-[#00FFFF]">{latency}d</span>
                    <div className="h-64 w-8 relative flex justify-center py-2">
                       <div className="absolute inset-0 flex justify-center px-3.5">
                          <div className="w-px h-full bg-white/10 rounded-full" />
                       </div>
                       <input 
                         type="range" 
                         min="0" max="60" 
                         value={latency} 
                         onChange={(e) => setLatency(Number(e.target.value))}
                         style={{ appearance: 'slider-vertical' as any }}
                         className="h-full w-4 appearance-none bg-transparent cursor-pointer relative z-10 accent-[#00FFFF]"
                       />
                       <div className="absolute bottom-2 w-1.5 bg-[#00FFFF] rounded-full shadow-[0_0_15px_#00FFFF]" style={{ height: `${(latency/60)*100}%` }} />
                    </div>
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-tighter text-center px-1">
                       Chain Latency
                    </label>
                 </div>

                 {/* Volatility Slider */}
                 <div className="flex flex-col items-center justify-between py-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-[#FF00FF]/30 transition-all">
                    <span className="text-[10px] font-mono font-bold text-[#FF00FF]">{volatility}%</span>
                    <div className="h-64 w-8 relative flex justify-center py-2">
                       <div className="absolute inset-0 flex justify-center px-3.5">
                          <div className="w-px h-full bg-white/10 rounded-full" />
                       </div>
                       <input 
                         type="range" 
                         min="0" max="100" 
                         value={volatility} 
                         onChange={(e) => setVolatility(Number(e.target.value))}
                         style={{ appearance: 'slider-vertical' as any }}
                         className="h-full w-4 appearance-none bg-transparent cursor-pointer relative z-10 accent-[#FF00FF]"
                       />
                       <div className="absolute bottom-2 w-1.5 bg-[#FF00FF] rounded-full shadow-[0_0_15px_#FF00FF]" style={{ height: `${volatility}%` }} />
                    </div>
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-tighter text-center px-1">
                       Mkt Volatility
                    </label>
                 </div>
              </div>
              
              <div className="mt-8 p-3 bg-black/60 rounded border border-white/5">
                 <p className="text-[8px] font-mono text-gray-600 leading-relaxed uppercase">
                    Adjust nodes to simulate extreme supply chain friction or macroeconomic shifts.
                 </p>
              </div>
           </GlassCard>
        </div>

        {/* 2) Central Survival Gauge */}
        <div className="xl:col-span-6 flex flex-col gap-5">
           <GlassCard className="relative flex-1 flex flex-col items-center justify-center border-white/10 bg-black/60 overflow-hidden group shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
              {/* Grid Overlays */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

              <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                 {/* Gauge Background */}
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" strokeDasharray="6 8" />
                    <motion.circle 
                      cx="200" cy="200" r="180" fill="none" 
                      stroke="#00FFFF" strokeWidth="14" 
                      strokeDasharray="1130"
                      initial={{ strokeDashoffset: 1130 }}
                      animate={{ strokeDashoffset: 1130 - (1130 * (survivalDays / 120)) }}
                      transition={{ duration: 1.2, ease: "circOut" }}
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]"
                    />
                 </svg>

                 <div className="text-center relative z-10 select-none">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] mb-4">Survival Runway</p>
                    <motion.div 
                      key={survivalDays}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[160px] font-black text-white leading-none font-mono tracking-tighter italic drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    >
                      {survivalDays}
                    </motion.div>
                    <div className="flex flex-col items-center gap-2 mt-4">
                       <p className="text-[12px] font-black text-[#00FFFF] uppercase tracking-[0.4em]">DAYS REMAINING</p>
                       <div className="w-12 h-0.5 bg-[#00FFFF]/40 rounded-full" />
                    </div>
                 </div>
              </div>

              {/* Telemetry Footer */}
              <div className="absolute bottom-8 left-0 right-0 px-10 flex justify-between items-center text-[9px] font-mono font-black text-gray-600 uppercase tracking-widest">
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] animate-pulse" />
                       NODE_ALPHA_READY
                    </div>
                    <div className="w-px h-3 bg-white/10" />
                    <span>SYNC: 100%</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF00FF] shadow-[0_0_8px_#FF00FF]" />
                    DRIFT_DETECTED: TRUE
                 </div>
              </div>
           </GlassCard>

           {/* Real-time Risk Feed Charts */}
           <div className="grid grid-cols-2 gap-5 h-32">
              <GlassCard className="p-5 border-white/5 bg-void/40 flex flex-col justify-between overflow-hidden">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Inventory Burn Rate</h3>
                    <TrendingDown className="w-3 h-3 text-[#FF00FF]" />
                 </div>
                 <div className="flex items-end gap-1 h-12">
                   {riskPulse.map((p, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${p.val}%` }}
                        className="flex-1 bg-[#FF00FF]/20 border-t border-[#FF00FF] rounded-t-sm"
                     />
                   ))}
                 </div>
              </GlassCard>
              <GlassCard className="p-5 border-white/5 bg-void/40 flex flex-col justify-between overflow-hidden">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Elasticity Shift</h3>
                    <Layers className="w-3 h-3 text-[#00FFFF]" />
                 </div>
                 <div className="flex items-end gap-1 h-12">
                   {riskPulse.map((p, i) => (
                     <motion.div 
                        key={i+10} 
                        initial={{ height: 0 }}
                        animate={{ height: `${100 - p.val}%` }}
                        className="flex-1 bg-[#00FFFF]/20 border-t border-[#00FFFF] rounded-t-sm"
                     />
                   ))}
                 </div>
              </GlassCard>
           </div>
        </div>

        {/* 3) Scenario Matrix Sidebar */}
        <div className="xl:col-span-3 flex flex-col gap-5">
           <div className="flex flex-col gap-5 flex-1">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-1 italic">Outcome Matrix</h3>
              
              {/* Base Case Card */}
              <GlassCard className="flex-1 p-6 border-l-4 border-l-[#00FFFF] bg-[#00FFFF]/[0.02] flex flex-col justify-between">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-[#00FFFF] uppercase tracking-widest">BASE_CASE_STATE</span>
                    <Lock className="w-3 h-3 text-gray-700" />
                 </div>
                 <div className="space-y-4 py-4">
                    <div>
                       <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">PROJ_REVENUE</p>
                       <p className="text-3xl font-black text-white font-mono tracking-tighter">${scenarioData.base.rev.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                       <div>
                          <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">MARGIN</p>
                          <p className="text-sm font-bold text-white font-mono">{scenarioData.base.margin}%</p>
                       </div>
                       <div>
                          <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">CAP_GAP</p>
                          <p className="text-sm font-bold text-gray-500 font-mono">$0</p>
                       </div>
                    </div>
                 </div>
              </GlassCard>

              <div className="flex items-center justify-center gap-4 py-1">
                 <div className="h-px flex-1 bg-white/5" />
                 <Binary className="w-4 h-4 text-gray-800" />
                 <div className="h-px flex-1 bg-white/5" />
              </div>

              {/* Severe Adverse Card */}
              <GlassCard className="flex-1 p-6 border-l-4 border-l-[#FF00FF] bg-[#FF00FF]/[0.02] relative overflow-hidden flex flex-col justify-between">
                 <div className="absolute top-0 right-0 p-2 bg-[#FF00FF]/10 text-[#FF00FF] rounded-bl border-l border-b border-[#FF00FF]/20">
                    <Radio className="w-3 h-3 animate-pulse" />
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-[#FF00FF] uppercase tracking-widest italic">SEVERE_ADVERSE</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-[#FF00FF]" />
                 </div>
                 <div className="space-y-4 py-4">
                    <div>
                       <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">PROJ_REV_EROSION</p>
                       <p className="text-3xl font-black text-[#FF00FF] font-mono tracking-tighter">${Math.floor(scenarioData.adverse.rev).toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                       <div>
                          <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">RESD_MARGIN</p>
                          <p className="text-sm font-bold text-white font-mono">{scenarioData.adverse.margin.toFixed(1)}%</p>
                       </div>
                       <div>
                          <p className="text-[8px] font-mono text-red-900 uppercase mb-1">LIQ_DEFICIT</p>
                          <p className="text-sm font-bold text-red-500 font-mono tracking-tighter">${Math.floor(scenarioData.adverse.gap).toLocaleString()}</p>
                       </div>
                    </div>
                 </div>
              </GlassCard>
           </div>

           {/* Insight Button Card */}
           <GlassCard className="p-6 border-white/10 bg-void/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <h4 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Zap className="w-3.5 h-3.5 animate-pulse" /> Intelligence Summary
              </h4>
              <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                 Model predicts high sensitivity to Supply Chain Latency. Recommendation: Execute immediate buffer expansion hedge.
              </p>
              <button className="w-full mt-6 py-4 bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#00FFFF] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                 Commit Hedge Plan <ArrowUpRight className="w-4 h-4" />
              </button>
           </GlassCard>
        </div>
      </div>

      {/* Industrial Grid Overlay Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.03)_0%,transparent_100%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(255,0,255,0.02)_0%,transparent_50%)]" />
      </div>
    </div>
  );
};
