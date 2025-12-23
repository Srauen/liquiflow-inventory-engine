
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Cpu, Activity, ShieldCheck, Zap, Database, Terminal, Search, Globe, Target, BarChart3, PieChart, Network, Lock, Crosshair, Radio, Signal, Layers, BrainCircuit } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { GoogleGenAI } from "@google/genai";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

interface ModuleDetailViewProps {
  module: {
    id: string;
    label: string;
    icon: any;
    color: string;
    desc: string;
  };
  onBack: () => void;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- SPECIALIZED UI COMPONENTS ---

const YieldMatrixUI = () => {
  const data = Array.from({ length: 25 }, (_, i) => ({
    val: Math.floor(Math.random() * 100),
    id: i
  }));
  return (
    <div className="grid grid-cols-5 gap-2 h-full">
      {data.map(d => (
        <motion.div 
          key={d.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: d.id * 0.02 }}
          className="border border-white/5 bg-white/[0.02] rounded-md flex flex-col items-center justify-center p-2 group hover:bg-neon-blue/10 hover:border-neon-blue/40 transition-all cursor-crosshair"
        >
          <span className="text-[8px] text-gray-600 font-mono">NODE_{d.id}</span>
          <span className={`text-xs font-black font-mono ${d.val > 70 ? 'text-neon-emerald' : 'text-white'}`}>{d.val}%</span>
        </motion.div>
      ))}
    </div>
  );
};

const DemandForecastUI = () => {
  const data = Array.from({ length: 12 }, (_, i) => ({
    name: `M${i+1}`,
    proj: 4000 + Math.random() * 2000,
    actual: 3800 + Math.random() * 2400
  }));
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip contentStyle={{ backgroundColor: '#050505', border: 'none', fontSize: 10 }} />
          <Area type="monotone" dataKey="proj" stroke="#00F0FF" fill="#00F0FF22" />
          <Area type="step" dataKey="actual" stroke="#8C1EFF" fill="#8C1EFF11" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const RiskEnclaveUI = () => {
  const data = [
    { subject: 'Market', A: 120, B: 110, fullMark: 150 },
    { subject: 'Supply', A: 98, B: 130, fullMark: 150 },
    { subject: 'Capital', A: 86, B: 130, fullMark: 150 },
    { subject: 'Regulatory', A: 99, B: 100, fullMark: 150 },
    { subject: 'Logistics', A: 85, B: 90, fullMark: 150 },
    { subject: 'Credit', A: 65, B: 85, fullMark: 150 },
  ];
  return (
    <div className="h-full w-full flex items-center justify-center">
       <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
          <Radar name="Current" dataKey="A" stroke="#FF2975" fill="#FF2975" fillOpacity={0.6} />
          <Radar name="Target" dataKey="B" stroke="#00FF94" fill="#00FF94" fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const LogicOverrideUI = () => (
  <div className="h-full w-full bg-black/40 rounded-xl p-6 font-mono text-[11px] space-y-4 overflow-hidden border border-white/5">
    <div className="flex gap-4 text-neon-emerald">
      <span className="shrink-0">SYS_ADMIN_CMD:</span>
      <span className="animate-pulse">_</span>
    </div>
    <div className="text-gray-500 space-y-1">
      <p>&gt; Initializing core override sequence...</p>
      <p>&gt; Protocol: DETERMINISTIC_BYPASS_V4</p>
      <p>&gt; Identity: Alex Merchant [CEO/L10]</p>
      <p className="text-neon-pink">&gt; WARNING: Manual override will disable AI safeguards.</p>
      <p>&gt; Waiting for entropy handshake...</p>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-8">
      <button className="border border-neon-pink/20 bg-neon-pink/5 p-3 rounded text-[10px] font-black text-neon-pink hover:bg-neon-pink hover:text-black transition-all">FORCE_PURGE</button>
      <button className="border border-neon-blue/20 bg-neon-blue/5 p-3 rounded text-[10px] font-black text-neon-blue hover:bg-neon-blue hover:text-black transition-all">KERNEL_RELOAD</button>
    </div>
  </div>
);

const InstantSettlementUI = () => (
  <div className="h-full flex flex-col items-center justify-center space-y-10">
    <div className="relative">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-48 h-48 border-2 border-dashed border-neon-pink/30 rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="w-32 h-32 bg-neon-pink rounded-full shadow-[0_0_50px_#FF2975] flex flex-col items-center justify-center group active:scale-95 transition-all border-4 border-black">
          <Zap className="w-10 h-10 text-black group-hover:animate-bounce" />
          <span className="text-[10px] font-black text-black mt-2">SETTLE</span>
        </button>
      </div>
    </div>
    <div className="text-center">
      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">Pending Clearance</p>
      <p className="text-xl font-black text-white mt-1">$2.4M DISBURSEMENT</p>
    </div>
  </div>
);

const OperationalPulseUI = () => {
  const events = [
    { time: '14:02', node: 'EMEA', msg: 'Liquidation sequence 82% complete' },
    { time: '14:01', node: 'APAC', msg: 'Demand spike detected in SKU-X1' },
    { time: '13:58', node: 'NA_EAST', msg: 'NetSuite sync verified' },
    { time: '13:55', node: 'CORE', msg: 'Elasticity model recalibrated' }
  ];
  return (
    <div className="h-full space-y-4">
      {events.map((e, i) => (
        <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
          <span className="text-[9px] font-mono text-gray-600">{e.time}</span>
          <span className="text-[10px] font-black text-neon-blue">{e.node}</span>
          <span className="text-[10px] text-gray-400">{e.msg}</span>
        </div>
      ))}
      <div className="h-24 w-full flex items-end gap-1 px-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${20 + Math.random() * 80}%` }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            className="flex-1 bg-neon-blue/10 border-t border-neon-blue rounded-t-sm"
          />
        ))}
      </div>
    </div>
  );
};

// --- MAIN DETAIL COMPONENT ---

export const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({ module, onBack }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const fetchStrategicInsight = async () => {
      setIsAnalyzing(true);
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `You are the LiquiFlow Strategic AI Core. Generate a highly professional, tactical, 60-word analysis for the module: "${module.label}". 
          Context: Level 10 CEO interface. Current module ID is ${module.id}. 
          Focus on recovery yield and capital velocity. Format as short technical bullets.`,
          config: { temperature: 1, topP: 0.95 }
        });
        setAnalysis(response.text || 'Analysis sequence timed out.');
      } catch (err) {
        setAnalysis('DETERMINISTIC FAILURE: Telemetry link broken.');
      } finally {
        setIsAnalyzing(false);
      }
    };
    fetchStrategicInsight();
  }, [module]);

  const renderModuleUI = () => {
    switch(module.id) {
      case 'yield-matrix': return <YieldMatrixUI />;
      case 'demand-forecast': return <DemandForecastUI />;
      case 'risk-enclave': return <RiskEnclaveUI />;
      case 'logic-override': return <LogicOverrideUI />;
      case 'instant-settlement': return <InstantSettlementUI />;
      case 'ops-pulse': return <OperationalPulseUI />;
      default:
        // Default unique-ish UI for other modules
        return (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <div className={`p-10 rounded-full bg-neon-${module.color}/5 border border-neon-${module.color}/20 mb-8 relative overflow-hidden group`}>
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
               <module.icon className={`w-16 h-16 text-neon-${module.color}`} />
            </div>
            <p className="text-gray-500 font-mono text-[11px] uppercase tracking-[0.2em] max-w-sm">{module.desc}</p>
            <div className="mt-10 flex gap-4">
              <div className="w-1 h-8 bg-white/10 rounded-full" />
              <div className="w-1 h-8 bg-white/10 rounded-full animate-bounce" />
              <div className="w-1 h-8 bg-white/10 rounded-full" />
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 pb-20"
    >
      <header className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white transition-all uppercase tracking-[0.3em] group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Core
        </button>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-[8px] font-bold text-gray-500">{i}</div>)}
          </div>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <span className="text-[9px] font-mono text-neon-emerald">SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Module Controller Panel */}
        <div className="xl:col-span-8 space-y-6">
          <GlassCard glowColor={module.color as any} className="min-h-[500px] flex flex-col p-0 border-white/10 overflow-hidden bg-black/40">
            <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className={`p-3 rounded-xl bg-neon-${module.color}/10 border border-neon-${module.color}/30`}>
                  <module.icon className={`w-6 h-6 text-neon-${module.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic text-white">{module.label}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Live Interface Channel: 0{Math.floor(Math.random()*9)}</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex gap-2">
                {['M1', 'M2', 'M3'].map(m => (
                  <button key={m} className="px-3 py-1.5 rounded border border-white/5 bg-white/5 text-[9px] font-black text-gray-500 hover:text-white transition-colors">{m}</button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-8">
              {renderModuleUI()}
            </div>

            <div className="p-6 bg-black/40 border-t border-white/5 flex justify-between items-center">
              <div className="flex gap-8 text-[9px] font-mono font-bold text-gray-600 uppercase">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-neon-emerald/20" /> Integrity: 100%</div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-neon-blue/20" /> Sync: Stable</div>
              </div>
              <button className={`px-12 py-2.5 rounded-lg bg-neon-${module.color} text-black text-[10px] font-black uppercase tracking-widest hover:brightness-125 transition-all shadow-[0_0_30px_rgba(0,240,255,0.5)]`}>
                Deploy Optimization
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Intelligence Sidebar */}
        <div className="xl:col-span-4 space-y-6">
           <GlassCard className="p-8 border-white/10 bg-void/60 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-neon-violet/10 rounded border border-neon-violet/20">
                    <BrainCircuit className="w-4 h-4 text-neon-violet" />
                 </div>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Core Intel Stream</h3>
              </div>

              <div className="flex-1 font-mono text-[11px] leading-relaxed text-gray-400 space-y-6">
                 <AnimatePresence mode="wait">
                   {isAnalyzing ? (
                     <motion.div 
                       key="loading" 
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: 1 }} 
                       className="flex flex-col items-center justify-center h-40 space-y-4"
                     >
                       <Cpu className="w-8 h-8 text-neon-blue animate-spin" />
                       <p className="animate-pulse text-[9px] uppercase tracking-widest">Resolving data clusters...</p>
                     </motion.div>
                   ) : (
                     <motion.div 
                       key="content" 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }}
                       className="space-y-4"
                     >
                       <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg border-l-2 border-l-neon-blue">
                          <p className="text-gray-300 whitespace-pre-wrap">{analysis}</p>
                       </div>
                       
                       <div className="pt-4 space-y-3">
                          <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Recommended Actions:</p>
                          {['Increase regional allocation', 'Execute tiered exit sequence', 'Hedge inventory principal'].map((action, i) => (
                             <div key={i} className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded hover:border-white/20 transition-all cursor-pointer group">
                                <span className="text-neon-blue group-hover:text-white transition-colors">0{i+1}</span>
                                <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">{action}</span>
                             </div>
                          ))}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              <div className="mt-12 space-y-4">
                 <div className="flex justify-between items-center text-[9px] font-mono font-bold uppercase text-gray-600">
                    <span>Tactical_Efficiency</span>
                    <span className="text-neon-emerald">92.4%</span>
                 </div>
                 <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '92.4%' }}
                      className="h-full bg-neon-emerald" 
                    />
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};
