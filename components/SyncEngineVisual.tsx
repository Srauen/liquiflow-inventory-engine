
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Globe, TrendingUp, Package, RefreshCw, Zap, ShieldCheck, BarChart3, Lock, ArrowLeftRight } from 'lucide-react';

const Node = ({ icon: Icon, label, color, x, y, delay }: any) => (
  <motion.div 
    className="absolute flex flex-col items-center justify-center z-20"
    style={{ left: x, top: y }}
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className={`w-12 h-12 rounded-xl bg-[#0f0f13] border border-${color} flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] relative group`}>
       <div className={`absolute inset-0 bg-${color} opacity-10 rounded-xl animate-pulse`}></div>
       <Icon className={`w-6 h-6 text-${color}`} />
       
       {/* Status Dot */}
       <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center border border-white/10">
          <div className="w-1.5 h-1.5 bg-neon-emerald rounded-full"></div>
       </div>
    </div>
    <div className="mt-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold tracking-wider border border-white/5 uppercase text-gray-300">
       {label}
    </div>
  </motion.div>
);

const FeatureCard = ({ top, left, right, bottom, icon: Icon, label, subtext, color, children, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.6, type: 'spring' }}
    className="absolute z-40 bg-[#1a1a20]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 min-w-[200px]"
    style={{ top, left, right, bottom }}
  >
    <div className={`p-2 rounded-lg bg-${color}/10 border border-${color}/20 text-${color} relative overflow-hidden`}>
       <div className={`absolute inset-0 bg-${color}/20 blur-lg animate-pulse`}></div>
       <Icon className="w-4 h-4 relative z-10" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-xs font-bold text-white leading-tight mb-1 truncate">{subtext}</div>
      {children}
    </div>
  </motion.div>
);

export const SyncEngineVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] bg-[#0f0f13] overflow-hidden rounded-3xl border border-white/10 flex items-center justify-center">
       {/* Grid Background */}
       <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:40px_40px]" />
       <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent" />

       {/* Central Hub */}
       <div className="relative z-30 flex flex-col items-center">
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="w-48 h-48 border border-dashed border-white/20 rounded-full absolute -top-12"
          />
          <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="w-32 h-32 border border-dotted border-neon-blue/30 rounded-full absolute -top-4"
          />
          
          <div className="w-24 h-24 bg-black border border-neon-blue rounded-full shadow-[0_0_50px_rgba(0,240,255,0.2)] flex items-center justify-center relative z-20">
             <RefreshCw className="w-10 h-10 text-neon-blue animate-spin-slow" style={{ animationDuration: '8s' }} />
             <div className="absolute inset-0 bg-neon-blue/10 rounded-full animate-ping-slow"></div>
          </div>
          <div className="mt-6 text-center bg-black/50 backdrop-blur px-4 py-1 rounded-full border border-white/5">
             <div className="text-neon-blue font-bold tracking-widest text-sm">LIQUIFLOW CORE</div>
             <div className="text-[10px] text-gray-500 font-mono">SYNC ENGINE ACTIVE</div>
          </div>
       </div>

       {/* Nodes Positioning */}
       <Node icon={ShoppingCart} label="Shopify" color="neon-emerald" x="10%" y="15%" delay={0.2} />
       <Node icon={Package} label="Amazon FBA" color="orange-400" x="80%" y="15%" delay={0.4} />
       <Node icon={TrendingUp} label="StockX" color="neon-emerald" x="10%" y="75%" delay={0.6} />
       <Node icon={Globe} label="eBay" color="neon-violet" x="80%" y="75%" delay={0.8} />

       {/* Connecting Lines */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
             <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
             </linearGradient>
          </defs>
          
          <motion.path d="M 15% 20% L 50% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <motion.path d="M 85% 20% L 50% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <motion.path d="M 15% 80% L 50% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <motion.path d="M 85% 80% L 50% 50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />

          {/* Data Packets */}
          <motion.circle r="3" fill="#00FF94">
             <animateMotion dur="2s" repeatCount="indefinite" path="M 15% 20% L 50% 50%" />
          </motion.circle>
          <motion.circle r="3" fill="#FFA500">
             <animateMotion dur="3s" repeatCount="indefinite" path="M 85% 20% L 50% 50%" />
          </motion.circle>
          <motion.circle r="3" fill="#8C1EFF">
             <animateMotion dur="2.5s" repeatCount="indefinite" path="M 50% 50% L 85% 80%" />
          </motion.circle>
       </svg>

       {/* --- FEATURE CARD 1: ARBITRAGE (Left) --- */}
       <FeatureCard 
          top="45%" left="5%" 
          icon={BarChart3} 
          label="Price Arbitrage" 
          subtext="Margin Normalized" 
          color="neon-pink"
          delay={1.0}
       >
          <div className="flex items-end gap-1 h-6 w-full mt-1">
             <motion.div 
               className="w-1.5 bg-gray-600 rounded-sm"
               animate={{ height: ['40%', '60%', '40%'] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
             <motion.div 
               className="w-1.5 bg-gray-600 rounded-sm"
               animate={{ height: ['70%', '50%', '70%'] }}
               transition={{ duration: 3, repeat: Infinity }}
             />
             <div className="w-1.5 h-full bg-neon-pink rounded-sm opacity-50"></div>
             <motion.div 
               className="w-1.5 bg-neon-pink rounded-sm"
               initial={{ height: '30%' }}
               animate={{ height: '90%' }}
               transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
             />
          </div>
       </FeatureCard>

       {/* --- FEATURE CARD 2: BOT SHIELD (Top Right) --- */}
       <FeatureCard 
          top="25%" right="15%" 
          icon={ShieldCheck} 
          label="Security" 
          subtext="Bot Traffic Blocked" 
          color="neon-blue"
          delay={1.2}
       >
          <div className="relative h-6 w-full mt-1 overflow-hidden flex items-center">
             <div className="absolute left-0 w-2 h-2 bg-red-500 rounded-full animate-[ping_1s_infinite]" />
             <motion.div 
               className="h-full w-1 bg-neon-blue absolute left-8 rounded-full shadow-[0_0_10px_#00F0FF]"
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 0.5, repeat: Infinity }}
             />
             <span className="text-[9px] text-gray-500 ml-12">Threat neutralized</span>
          </div>
       </FeatureCard>

       {/* --- FEATURE CARD 3: INVENTORY LOCK (Bottom Left) --- */}
       <FeatureCard 
          bottom="25%" left="15%" 
          icon={Lock} 
          label="Consistency" 
          subtext="Global Stock Lock" 
          color="neon-violet"
          delay={1.4}
       >
          <div className="flex items-center gap-2 mt-2">
             <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                   className="h-full bg-neon-violet"
                   animate={{ width: ['0%', '100%'] }}
                   transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
             </div>
             <Lock className="w-3 h-3 text-neon-violet" />
          </div>
       </FeatureCard>

       {/* --- FEATURE CARD 4: SYNC EVENT (Bottom Right) --- */}
       <FeatureCard 
          bottom="10%" right="10%" 
          icon={Zap} 
          label="Real-time" 
          subtext="Instant Delisting" 
          color="neon-emerald"
          delay={1.6}
       >
          <div className="flex justify-between items-center mt-1 text-[9px] text-gray-400">
             <span>Shopify</span>
             <ArrowLeftRight className="w-3 h-3 text-neon-emerald animate-pulse" />
             <span>StockX</span>
          </div>
          <div className="mt-1 flex gap-0.5">
             {[1,2,3,4,5].map(i => (
                <motion.div 
                   key={i}
                   className="h-1 flex-1 bg-neon-emerald rounded-full"
                   initial={{ opacity: 0.2 }}
                   animate={{ opacity: [0.2, 1, 0.2] }}
                   transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                />
             ))}
          </div>
       </FeatureCard>

    </div>
  );
};
