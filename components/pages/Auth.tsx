
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Fingerprint, ArrowLeft, Info, Activity, Globe, Database, Server, Zap, Layers } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
  onBack: () => void;
}

// --- FINANCIAL TICKER COMPONENT (Kept as it fits the brand) ---
const FinancialTicker = () => {
  return (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-10 pointer-events-none overflow-hidden py-2 z-0 mix-blend-overlay">
       <div className="flex whitespace-nowrap animate-marquee">
          {Array(10).fill(0).map((_, i) => (
             <React.Fragment key={i}>
                <span className="mx-8 font-mono text-4xl font-bold text-white">BTC +2.4%</span>
                <span className="mx-8 font-mono text-4xl font-bold text-transparent" style={{ WebkitTextStroke: '1px white' }}>LIQ -0.1%</span>
                <span className="mx-8 font-mono text-4xl font-bold text-white">ETH +1.8%</span>
                <span className="mx-8 font-mono text-4xl font-bold text-transparent" style={{ WebkitTextStroke: '1px white' }}>VOL 14M</span>
             </React.Fragment>
          ))}
       </div>
    </div>
  );
};

// --- DIGITAL LIQUIDITY CORE ---
const LiquidityCoreBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] flex items-center justify-center z-0">
      
      {/* 1. Deep Space Grid */}
      <div className="absolute inset-0" 
         style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
         }}
      />
      
      <FinancialTicker />

      {/* 2. THE CORE ENGINE */}
      <div className="relative w-[800px] h-[800px] flex items-center justify-center select-none pointer-events-none opacity-80">
         <svg viewBox="0 0 800 800" className="w-full h-full">
            <defs>
               <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
               </radialGradient>
               <filter id="glow-blur">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                  </feMerge>
               </filter>
            </defs>

            {/* Central Glow */}
            <circle cx="400" cy="400" r="300" fill="url(#core-glow)" />

            {/* Rotating Data Rings */}
            <g className="origin-center animate-[spin_60s_linear_infinite]">
               <circle cx="400" cy="400" r="280" fill="none" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="10 20" />
               <circle cx="400" cy="400" r="320" fill="none" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.05" />
            </g>

            <g className="origin-center animate-[spin_40s_linear_infinite_reverse]">
               <circle cx="400" cy="400" r="240" fill="none" stroke="#00F0FF" strokeWidth="2" strokeOpacity="0.1" strokeDasharray="50 150" />
               {/* Data Packet on Ring */}
               <circle cx="400" cy="160" r="4" fill="#00FF94" filter="url(#glow-blur)" />
               <circle cx="400" cy="640" r="4" fill="#00FF94" filter="url(#glow-blur)" />
            </g>

            {/* Inner Holographic Sphere Structure */}
            <g className="origin-center animate-[spin_20s_linear_infinite]">
               {[0, 45, 90, 135].map((deg) => (
                  <ellipse key={deg} cx="400" cy="400" rx="180" ry="60" fill="none" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.15" transform={`rotate(${deg} 400 400)`} />
               ))}
               <circle cx="400" cy="400" r="100" fill="none" stroke="#00F0FF" strokeWidth="2" strokeOpacity="0.3" />
            </g>

            {/* Core Pulse */}
            <circle cx="400" cy="400" r="60" fill="#001020" stroke="#00F0FF" strokeWidth="2">
               <animate attributeName="r" values="60;65;60" dur="4s" repeatCount="indefinite" />
               <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Connecting Lines to Orbitals */}
            <g stroke="#00F0FF" strokeOpacity="0.1" strokeWidth="1">
               <line x1="400" y1="400" x2="150" y2="250" />
               <line x1="400" y1="400" x2="650" y2="250" />
               <line x1="400" y1="400" x2="150" y2="550" />
               <line x1="400" y1="400" x2="650" y2="550" />
            </g>
         </svg>

         {/* Orbiting Satellite Nodes (HTML Overlay for crisp icons) */}
         <div className="absolute inset-0 animate-[spin_120s_linear_infinite]">
            {/* Top Left: Database */}
            <div className="absolute top-[25%] left-[15%] -translate-x-1/2 -translate-y-1/2 animate-[spin_120s_linear_infinite_reverse]">
               <div className="w-12 h-12 bg-black/50 border border-neon-blue/30 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <Database className="w-5 h-5 text-neon-blue" />
               </div>
               <div className="text-[10px] text-neon-blue/70 font-mono text-center mt-2">INVENTORY_DB</div>
            </div>

            {/* Top Right: Global */}
            <div className="absolute top-[25%] right-[15%] translate-x-1/2 -translate-y-1/2 animate-[spin_120s_linear_infinite_reverse]">
               <div className="w-12 h-12 bg-black/50 border border-neon-emerald/30 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                  <Globe className="w-5 h-5 text-neon-emerald" />
               </div>
               <div className="text-[10px] text-neon-emerald/70 font-mono text-center mt-2">MARKETS_API</div>
            </div>

            {/* Bottom Left: Server */}
            <div className="absolute bottom-[25%] left-[15%] -translate-x-1/2 translate-y-1/2 animate-[spin_120s_linear_infinite_reverse]">
               <div className="w-12 h-12 bg-black/50 border border-neon-pink/30 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(255,41,117,0.2)]">
                  <Server className="w-5 h-5 text-neon-pink" />
               </div>
               <div className="text-[10px] text-neon-pink/70 font-mono text-center mt-2">AI_CLUSTER</div>
            </div>

            {/* Bottom Right: Layers */}
            <div className="absolute bottom-[25%] right-[15%] translate-x-1/2 translate-y-1/2 animate-[spin_120s_linear_infinite_reverse]">
               <div className="w-12 h-12 bg-black/50 border border-neon-violet/30 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(140,30,255,0.2)]">
                  <Layers className="w-5 h-5 text-neon-violet" />
               </div>
               <div className="text-[10px] text-neon-violet/70 font-mono text-center mt-2">LIQUIDITY_LAYER</div>
            </div>
         </div>
      </div>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)] pointer-events-none" />
    </div>
  );
};

export const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('demo@liquiflow.ai');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsSuccess(true);
      setTimeout(onLogin, 1200); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden font-sans">
      
      {/* --- BACKGROUND ENGINE --- */}
      <LiquidityCoreBackground />

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-3 text-gray-500 hover:text-white transition-colors z-50 group"
      >
        <div className="p-2 rounded-full border border-gray-800 bg-black/50 group-hover:border-gray-500 transition-colors">
           <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="font-mono text-xs tracking-widest uppercase">Return to Terminal</span>
      </button>

      {/* --- LOGIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
           opacity: isSuccess ? 0 : 1, 
           scale: isSuccess ? 0.95 : 1,
           y: isSuccess ? 20 : 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] relative z-20"
      >
        {/* Glassmorphism Container */}
        <div className="backdrop-blur-xl bg-[#0f0f12]/60 border border-white/10 rounded-xl p-10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          
          {/* Scanning Line Effect on Card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent opacity-0 group-hover:opacity-100 animate-[shimmer_2s_infinite] pointer-events-none" />

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10 mb-6 shadow-inner relative overflow-hidden">
               <div className="absolute inset-0 bg-neon-blue/10 animate-pulse"></div>
               <Zap className="w-5 h-5 text-neon-blue relative z-10" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2 tracking-tight">
              {step === 1 ? (isLogin ? 'Command Center' : 'Initialize Node') : 'Biometric Link'}
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-mono">
              {step === 1 ? 'Secure Connection Required' : 'Multi-Factor Auth'}
            </p>
          </div>

          {/* Credentials Hint */}
          {step === 1 && (
            <div className="mb-8 p-3 bg-white/[0.03] border border-white/5 rounded flex items-start gap-3">
              <Info className="w-4 h-4 text-neon-blue/80 shrink-0 mt-0.5" />
              <div className="text-[10px] text-gray-400 font-mono leading-relaxed">
                <span className="text-neon-blue">DEBUG MODE:</span> Credentials pre-filled for demo access level 4.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                <div className="space-y-4">
                  <div className="group relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-[#050505]/80 border border-white/10 rounded-lg py-3 pl-11 text-sm text-white placeholder:text-gray-700 focus:border-neon-blue/50 focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="group relative">
                    <Fingerprint className="absolute left-4 top-3.5 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Access Key"
                      className="w-full bg-[#050505]/80 border border-white/10 rounded-lg py-3 pl-11 text-sm text-white placeholder:text-gray-700 focus:border-neon-blue/50 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-white text-black font-bold text-sm py-3.5 rounded-lg hover:bg-neon-blue transition-all flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  {isLogin ? 'Establish Link' : 'Register Node'} <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div className="flex justify-center gap-3 my-8">
                   {[1,2,3,4].map(i => (
                     <input 
                        key={i} 
                        type="text" 
                        defaultValue={Math.floor(Math.random() * 9)} 
                        maxLength={1} 
                        className="w-12 h-16 text-center text-2xl font-mono bg-[#050505] border border-white/10 rounded-lg focus:border-neon-emerald focus:text-neon-emerald focus:outline-none transition-all" 
                     />
                   ))}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-neon-emerald text-black font-bold text-sm py-3.5 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,148,0.2)]"
                >
                  Verify Session <ShieldCheck className="w-4 h-4" />
                </button>
              </>
            )}
          </form>

          {step === 1 && (
            <div className="mt-8 text-center pt-6 border-t border-white/5">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-500 hover:text-white text-xs transition-colors font-mono"
              >
                {isLogin ? "Lost Credentials?" : "Return to Login"}
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center opacity-40 hover:opacity-100 transition-opacity">
           <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono uppercase">
              <Activity className="w-3 h-3 text-neon-emerald" /> Uplink Status: Stable (12ms)
           </div>
        </div>
      </motion.div>
    </div>
  );
};
