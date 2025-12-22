
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Box, Truck, HeartHandshake, Zap, Info, TrendingUp, Crosshair } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Product } from '../types';
import { calculateElasticity, calculateOptimalPath } from '../utils/MicroeconomicsEngine';
import { GlassCard } from './ui/GlassCard';
import { AnimatedCounter } from './ui/AnimatedCounter';

interface SkuSimulatorProps {
  product: Product;
  onBack: () => void;
  requirePro?: (action: () => void) => void;
}

export const SkuSimulator: React.FC<SkuSimulatorProps> = ({ product, onBack, requirePro }) => {
  const [markdown, setMarkdown] = useState(0);

  // Yield Calculations
  const newPrice = product.marketPrice * (1 - markdown / 100);
  const simResult = useMemo(() => 
    calculateElasticity(product.marketPrice, product.velocity * 4, newPrice, product.elasticityCoef),
  [product, newPrice]);

  const optimalPath = useMemo(() => 
    calculateOptimalPath(newPrice, product.costBasis, 5, 0.25),
  [newPrice, product]);

  const chartData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= 50; i += 5) {
       const price = product.marketPrice * (1 - i/100);
       const res = calculateElasticity(product.marketPrice, product.velocity * 4, price, product.elasticityCoef);
       data.push({
         name: `${i}%`,
         revenue: res.projectedRevenue,
         demand: res.newDemand,
       });
    }
    return data;
  }, [product]);

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-gray-600 hover:text-white transition-all uppercase tracking-[0.2em] group">
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to System Audit
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ASSET SPECIFICATIONS + 3D CARD */}
        <div className="lg:col-span-4 space-y-6">
            <motion.div 
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
               className="relative group"
            >
               <GlassCard className="p-0 overflow-hidden border-white/5 bg-[#121216]/90 relative z-10">
                  <div className="relative h-48 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-[#121216] to-transparent z-10" />
                     <img src={product.imageUrl} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" alt="" />
                     <div className="absolute top-4 right-4 z-20">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md ${product.liquidityScore > 50 ? 'text-neon-emerald' : 'text-neon-pink'}`}>
                          SCORE: {product.liquidityScore}
                        </span>
                     </div>
                  </div>
                  
                  <div className="p-8" style={{ transform: "translateZ(40px)" }}>
                     <h2 className="text-xl font-black uppercase tracking-tighter mb-1 text-white">{product.name}</h2>
                     <p className="text-[10px] text-gray-600 font-mono mb-8 uppercase tracking-widest">{product.sku}</p>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-neon-blue transition-colors group/stat">
                           <p className="text-[8px] font-mono text-gray-600 uppercase mb-1 tracking-widest group-hover/stat:text-neon-blue transition-colors">Elasticity Coef</p>
                           <p className="text-xl font-bold font-mono text-neon-blue">{product.elasticityCoef}</p>
                        </div>
                        <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-neon-emerald transition-colors group/stat">
                           <p className="text-[8px] font-mono text-gray-600 uppercase mb-1 tracking-widest group-hover/stat:text-neon-emerald transition-colors">Units Managed</p>
                           <p className="text-xl font-bold font-mono text-white">{product.stockLevel}</p>
                        </div>
                     </div>
                  </div>
               </GlassCard>
               {/* 3D Glow Effect */}
               <div className="absolute -inset-2 bg-neon-blue/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>

            <GlassCard className="space-y-6 border-white/5">
                <div className="flex justify-between items-center">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Yield Optimization Engine</h3>
                   <span className="text-neon-blue font-mono font-black text-2xl tracking-tighter">{markdown}% MARKDOWN</span>
                </div>
                <input type="range" min="0" max="50" step="1" value={markdown} onChange={(e) => setMarkdown(Number(e.target.value))} className="w-full accent-neon-blue h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer" />
                <div className="p-5 bg-black/60 rounded-xl border border-white/5 space-y-3">
                   <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-gray-600 uppercase tracking-widest">Projected Recovery Price</span>
                      <span className="text-white font-black">${newPrice.toFixed(2)}</span>
                   </div>
                   <div className="w-full h-px bg-white/5" />
                   <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-gray-600 uppercase tracking-widest">Simulated Demand Lift</span>
                      <span className="text-neon-emerald font-black">+{Math.round(simResult.demandChangePct * 100)}%</span>
                   </div>
                </div>
            </GlassCard>
        </div>

        {/* CAPITAL DECISION ENGINE */}
        <div className="lg:col-span-8 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { id: 'resale', label: 'B2C Markdown', icon: Box, val: optimalPath.resale.value * simResult.newDemand, sub: 'Consumer Exit Protocol', color: 'blue' },
                { id: 'bulk', label: 'B2B Clearing', icon: Truck, val: optimalPath.bulk.value * product.stockLevel, sub: 'Bulk Wholesale Liquidation', color: 'violet', pro: true },
                { id: 'donation', label: 'Tax Shield', icon: HeartHandshake, val: optimalPath.donation.value * product.stockLevel, sub: 'IRS-8283 Recovery', color: 'pink' }
              ].map(opt => (
                <GlassCard 
                  key={opt.id} 
                  onClick={opt.pro ? () => requirePro && requirePro(() => {}) : undefined}
                  className={`transition-all border-l-4 ${optimalPath[opt.id as keyof typeof optimalPath].recommended ? `border-l-neon-emerald bg-neon-emerald/5` : 'border-l-gray-800 opacity-40'} group cursor-pointer`}
                >
                   <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded bg-neon-${opt.color}/10 border border-neon-${opt.color}/20 text-neon-${opt.color}`}>
                        <opt.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 group-hover:text-white transition-colors">{opt.label}</span>
                   </div>
                   <AnimatedCounter value={opt.val} prefix="$" className="text-3xl font-black block mb-1 text-white tracking-tighter" />
                   <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">{opt.sub}</p>
                </GlassCard>
              ))}
           </div>

           <GlassCard className="h-[400px] flex flex-col p-10 border-white/5 relative overflow-hidden bg-void/60 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 blur-[100px] pointer-events-none" />
              
              <div className="flex justify-between items-center mb-10 shrink-0">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
                    <Crosshair className="w-4 h-4 text-neon-blue animate-pulse" />
                    Demand Elasticity Curve Simulation
                 </h3>
                 <div className="flex gap-6 text-[9px] font-mono uppercase font-black tracking-widest">
                    <span className="text-neon-emerald flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-neon-emerald shadow-[0_0_8px_#00FF94]" /> Revenue Potential</span>
                    <span className="text-neon-violet flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-neon-violet shadow-[0_0_8px_#8C1EFF]" /> Units Requested</span>
                 </div>
              </div>
              
              <div className="flex-1 w-full min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FF94" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#00FF94" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDem" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8C1EFF" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#8C1EFF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                      <XAxis dataKey="name" stroke="#333" tick={{fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 800}} />
                      <YAxis stroke="#333" tick={{fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 800}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#050505', border: '1px solid #1a1a1a', borderRadius: '8px', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                        itemStyle={{ fontWeight: 800 }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#00FF94" strokeWidth={3} fill="url(#colorRev)" />
                      <Area type="monotone" dataKey="demand" stroke="#8C1EFF" strokeWidth={3} fill="url(#colorDem)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};
