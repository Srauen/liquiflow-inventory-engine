
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Fingerprint, ArrowLeft, Info, Activity, Globe, Database, Server, Zap, Layers, ShieldAlert, Cpu, Radio, Scan } from 'lucide-react';

interface AuthProps {
  onLogin: (level: 1 | 2 | 9 | 10) => void;
  onBack: () => void;
}

const ACCESS_KEYS: Record<string, 1 | 2 | 9 | 10> = {
  'guest2025': 1,
  'operator2025': 2,
  'admin2025': 9,
  'ceo2025': 10
};

const LiquidityCoreBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020204] flex items-center justify-center z-0">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Dynamic Grid Layer */}
      <div className="absolute inset-0" 
         style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            transform: 'perspective(800px) rotateX(45deg) translateY(-100px)',
            maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)'
         }}
      />
      
      {/* Central Tech Orbs */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
         <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute w-[800px] h-[800px] bg-neon-blue/10 blur-[150px] rounded-full" 
         />
         <div className="absolute w-[500px] h-[500px] bg-neon-violet/5 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }} />
         
         <svg viewBox="0 0 800 800" className="w-full h-full max-w-[1400px] opacity-20">
            <g className="origin-center animate-[spin_180s_linear_infinite]">
               <circle cx="400" cy="400" r="390" fill="none" stroke="#00F0FF" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="1 15" />
               <circle cx="400" cy="400" r="350" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            </g>
            <g className="origin-center animate-[spin_120s_linear_infinite_reverse]">
               <path d="M 400 50 A 350 350 0 0 1 750 400" fill="none" stroke="#FF2975" strokeWidth="1" strokeOpacity="0.3" />
               <path d="M 400 750 A 350 350 0 0 1 50 400" fill="none" stroke="#8C1EFF" strokeWidth="1" strokeOpacity="0.3" />
            </g>
         </svg>
      </div>

      {/* Ticker HUD Elements */}
      <div className="absolute bottom-10 left-10 text-[8px] font-mono text-gray-700 uppercase tracking-[0.4em] space-y-2">
         <div className="flex items-center gap-2"><div className="w-1 h-1 bg-neon-blue rounded-full" /> SECURE_UPLINK_READY</div>
         <div className="flex items-center gap-2"><div className="w-1 h-1 bg-neon-emerald rounded-full animate-pulse" /> CORE_LOAD: 0.04ms</div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020204_95%)] pointer-events-none" />
    </div>
  );
};

export const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('admin@liquiflow.ai');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [grantedLevel, setGrantedLevel] = useState<1|2|9|10|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const level = ACCESS_KEYS[password.toLowerCase()];
    if (level) {
      setGrantedLevel(level);
      setStep(2);
      setTimeout(() => onLogin(level), 1500);
    } else {
      setError('INVALID_SECURITY_TOKEN');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden font-sans">
      <LiquidityCoreBackground />

      <button onClick={onBack} className="absolute top-10 left-10 flex items-center gap-3 text-gray-500 hover:text-white transition-all z-50 group">
        <div className="p-2.5 rounded-xl border border-white/5 bg-black/40 backdrop-blur group-hover:border-white/20 transition-all">
           <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase font-bold opacity-50 group-hover:opacity-100 transition-opacity">Abort Connection</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] relative z-20"
      >
        <div className="backdrop-blur-3xl bg-[#08080a]/90 border border-white/10 rounded-3xl p-14 shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-10 relative group-hover:border-neon-blue/40 transition-all duration-700">
               <div className="absolute inset-0 bg-neon-blue/10 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
               <Fingerprint className={`w-7 h-7 ${step === 1 ? 'text-neon-blue' : 'text-neon-emerald'} relative z-10 transition-colors duration-700`} />
            </div>
            <h1 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase italic">
              {step === 1 ? 'Identity Shield' : 'Access Verified'}
            </h1>
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.5em] font-mono font-bold">
              {step === 1 ? 'Deterministic Enclave v4.1' : `Level ${grantedLevel} Clearance Granted`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative group">
                      <Mail className="absolute left-5 top-5 w-4 h-4 text-gray-700 group-focus-within:text-neon-blue transition-colors" />
                      <input 
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Personnel Email"
                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-5 pl-14 text-sm text-white placeholder:text-gray-800 focus:border-neon-blue/40 focus:outline-none transition-all font-medium"
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-5 w-4 h-4 text-gray-700 group-focus-within:text-neon-blue transition-colors" />
                      <input 
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Access Key"
                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-5 pl-14 text-sm text-white placeholder:text-gray-800 focus:border-neon-blue/40 focus:outline-none transition-all font-mono"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                       <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                       <span className="text-[10px] text-red-400 font-black uppercase tracking-[0.2em]">{error}</span>
                    </motion.div>
                  )}

                  <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-start gap-4">
                    <Info className="w-5 h-5 text-neon-blue/50 shrink-0 mt-0.5" />
                    <div className="text-[9px] text-gray-500 font-mono leading-relaxed font-bold uppercase tracking-tight">
                      Admin: <span className="text-neon-gold">admin2025</span><br/>
                      CEO: <span className="text-neon-violet">ceo2025</span>
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full bg-white text-black font-black text-[12px] py-5 rounded-2xl hover:bg-neon-blue transition-all flex items-center justify-center gap-4 mt-4 shadow-2xl uppercase tracking-[0.3em]">
                    Establish Link <Scan className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                  <div className="flex justify-center gap-2 mb-10">
                     {[1,2,3,4,5,6].map(i => (
                       <motion.div 
                         key={i} 
                         animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                         transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                         className="w-10 h-14 bg-neon-emerald/10 border border-neon-emerald/30 rounded-xl flex items-center justify-center text-neon-emerald text-2xl font-mono"
                       >*</motion.div>
                     ))}
                  </div>
                  <div className="flex items-center justify-center gap-3 text-neon-emerald mb-4">
                     <ShieldCheck className="w-6 h-6" />
                     <span className="font-black text-xs uppercase tracking-[0.4em]">Handshaking Core...</span>
                  </div>
                  <p className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">Constructing Neural Dashboard v4.1</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
        
        <div className="mt-12 text-center opacity-40">
           <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em] font-bold">
              <Activity className="w-4 h-4 text-neon-emerald" /> UPLINK_ENCRYPTED_AES256
           </div>
        </div>
      </motion.div>
    </div>
  );
};
