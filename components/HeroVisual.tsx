
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Activity, ArrowRight, Radio, DollarSign, Target, Shield } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

const COLORS = ['#FFFFFF', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'];
const AGING_DATA = [
  { name: '> 180 Days', value: 40 },
  { name: '90-180 Days', value: 30 },
  { name: '30-90 Days', value: 20 },
  { name: '< 30 Days', value: 10 },
];

const TICKER_ITEMS = [
  { text: "Logistics: Port of LA Congestion critical, 3-week delays Trans-Pacific.", type: "ALERT" },
  { text: "Semi: Taiwan Foundry halts production, Q4 yields impacted.", type: "SHOCK" },
  { text: "Retail: Record returns buildup for large-cap consumer electronics.", type: "RISK" },
  { text: "Forex: USD/CNY volatility triggering automated SKU repricing.", type: "MARGIN" }
];

const FEED_ITEMS = [
  { name: 'CyberRunner Sneakers', sku: 'SNK-2077', stock: 1500, doh: 45, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=150&q=80', status: 'ready' },
  { name: 'Holo-Visor Gen 3', sku: 'ACC-VIS-G3', stock: 8500, doh: 180, img: 'https://images.unsplash.com/photo-1625948515291-696131d10041?auto=format&fit=crop&w=150&q=80', status: 'critical' },
  { name: 'Quantum Core', sku: 'HW-CPU-QC', stock: 300, doh: 14, img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=150&q=80', status: 'ready' }
];

const TickerContent = () => (
  <div className="flex items-center gap-12 shrink-0 min-w-full justify-around pr-12">
    {TICKER_ITEMS.map((item, i) => (
      <div key={i} className="flex items-center gap-4">
         <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase whitespace-nowrap border ${
            item.type === 'ALERT' || item.type === 'SHOCK'
            ? 'bg-neon-pink/10 text-neon-pink border-neon-pink/20' 
            : 'bg-neon-blue/10 text-neon-blue border-neon-blue/20'
         }`}>
            {item.type}
         </span>
         <span className="text-gray-500 whitespace-nowrap text-[11px] font-bold tracking-tight font-mono">{item.text}</span>
      </div>
    ))}
  </div>
);

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full bg-void border border-white/5 rounded overflow-hidden select-none cursor-default">
       
       {/* Top Bar Ticker */}
       <div className="bg-black/80 border-b border-white/5 py-2.5 px-6 flex items-center gap-6 font-mono relative z-20">
          <div className="flex items-center gap-3 text-white bg-void z-10 pr-6 border-r border-white/5 shrink-0">
             <Radio className="w-3.5 h-3.5 text-neon-blue animate-pulse" />
             <span className="font-black text-[10px] tracking-[0.3em] uppercase">SYSTEMS_LIVE</span>
          </div>
          <div className="flex-1 overflow-hidden relative h-6 flex items-center">
             <div className="flex animate-marquee">
                <TickerContent />
                <TickerContent />
             </div>
          </div>
       </div>

       <div className="p-8 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { label: "Liquidity Recovered", val: "$318.8k", icon: DollarSign, color: "neon-emerald" },
               { label: "Capital at Risk", val: "$244.5k", icon: AlertTriangle, color: "neon-pink" },
               { label: "Forecasting Core", val: "94.2%", icon: Activity, color: "neon-violet" },
               { label: "Active Channels", val: "15", icon: Target, color: "neon-blue" }
             ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded relative overflow-hidden group">
                   <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                   <h3 className={`text-2xl font-black tracking-tighter text-white`}>{stat.val}</h3>
                   <div className="absolute right-4 bottom-4 opacity-5 group-hover:opacity-20 transition-opacity">
                      <stat.icon className={`w-8 h-8 text-white`} />
                   </div>
                </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             {/* Technical Aging View */}
             <div className="lg:col-span-4 p-8 bg-white/[0.02] border border-white/5 rounded flex flex-col min-h-[350px]">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-500">Aging Profile</h3>
                   <span className="text-[10px] font-mono text-neon-blue">DETERMINISTIC</span>
                </div>
                <div className="flex-1 relative">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie data={AGING_DATA} innerRadius={65} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                            {AGING_DATA.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                         </Pie>
                      </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-black text-white font-mono tracking-tighter">1,200</span>
                      <span className="text-[8px] text-gray-600 uppercase font-black tracking-[0.2em]">Total Units</span>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-y-3 mt-8">
                   {AGING_DATA.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-500">
                         <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                         {item.name}
                      </div>
                   ))}
                </div>
             </div>

             {/* Live Opportunity Stream */}
             <div className="lg:col-span-8 flex flex-col h-[350px]">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-500">Decision Engine Feed</h3>
                   <div className="flex items-center gap-2 text-[9px] font-mono text-neon-emerald">
                      <div className="w-1 h-1 bg-neon-emerald rounded-full animate-pulse" /> SCANNING_LIVE
                   </div>
                </div>
                
                <div className="flex-1 overflow-hidden space-y-4">
                   {FEED_ITEMS.map((item, i) => (
                      <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded flex items-center justify-between hover:bg-white/[0.05] transition-colors group">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black border border-white/5 rounded overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                               <img src={item.img} className="w-full h-full object-cover opacity-50 group-hover:opacity-100" alt="" />
                            </div>
                            <div>
                               <h4 className="font-black text-xs uppercase text-white tracking-tight">{item.name}</h4>
                               <p className="text-[9px] text-neon-blue font-mono font-bold mt-1">{item.sku}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-10">
                            <div className="text-right hidden sm:block">
                               <p className="text-[8px] text-gray-600 mb-1 uppercase font-black tracking-widest">Calculated Exit</p>
                               <span className={`inline-block px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                                  item.status === 'critical' 
                                  ? 'bg-neon-pink text-white' 
                                  : 'bg-white/5 text-gray-400 border border-white/10'
                               }`}>
                                  {item.status === 'critical' ? 'IMMEDIATE EXIT' : 'SIMULATION READY'}
                               </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
