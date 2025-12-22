
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertTriangle, Workflow, User, Palette, ArrowRight, Check, Target, TrendingUp, ShieldAlert, Edit3 } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { UserPreferences } from '../types';

interface OnboardingProps {
  onComplete: (prefs: UserPreferences) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  
  const [prefs, setPrefs] = useState<UserPreferences>({
    superpower: '',
    customSuperpower: '',
    criticalMetric: 'Capital at Risk',
    criticalThreshold: '',
    workflowAreas: [],
    customWorkflow: '',
    role: 'Merchant',
    experience: 'Intermediate',
    themeColor: 'blue'
  });

  const [customInputVisible, setCustomInputVisible] = useState(false);

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setCustomInputVisible(false);
    } else {
      onComplete(prefs);
    }
  };

  const updatePref = (key: keyof UserPreferences, value: any) => {
    setPrefs(prev => ({ ...prev, [key]: value }));
  };

  const toggleWorkflow = (area: string) => {
    setPrefs(prev => {
      const areas = prev.workflowAreas.includes(area)
        ? prev.workflowAreas.filter(a => a !== area)
        : [...prev.workflowAreas, area];
      return { ...prev, workflowAreas: areas };
    });
  };

  // --- STEP RENDERERS ---

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-2">Select Your Data Superpower</h2>
      <p className="text-gray-400 text-center mb-8">What is the one capability you need most right now?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'forecast', label: 'Predict Demand', icon: TrendingUp, desc: 'See the future of your inventory velocity.' },
          { id: 'liquidate', label: 'Liquidate Instantly', icon: Zap, desc: 'Turn dead stock into cash in 24h.' },
          { id: 'risk', label: 'Eliminate Risk', icon: ShieldAlert, desc: 'Never hold a bag again.' }
        ].map((card) => (
          <GlassCard 
            key={card.id}
            onClick={() => { updatePref('superpower', card.id); setCustomInputVisible(false); }}
            className={`cursor-pointer transition-all hover:scale-105 ${prefs.superpower === card.id ? 'border-neon-blue bg-neon-blue/10' : 'opacity-70 hover:opacity-100'}`}
          >
            <card.icon className={`w-8 h-8 mb-4 ${prefs.superpower === card.id ? 'text-neon-blue' : 'text-gray-400'}`} />
            <h3 className="font-bold mb-2">{card.label}</h3>
            <p className="text-xs text-gray-500">{card.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div className="flex flex-col items-center mt-4">
        <button 
           onClick={() => { updatePref('superpower', 'other'); setCustomInputVisible(true); }}
           className={`text-sm font-mono border-b border-dashed border-gray-600 hover:text-white pb-1 ${prefs.superpower === 'other' ? 'text-neon-blue border-neon-blue' : 'text-gray-500'}`}
        >
           Other / Custom Request
        </button>
        
        <AnimatePresence>
           {customInputVisible && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="w-full max-w-md mt-4">
                 <input 
                    type="text" 
                    placeholder="Type your custom superpower..." 
                    className="w-full bg-black/40 border border-neon-blue/50 rounded p-3 text-white focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    value={prefs.customSuperpower}
                    onChange={(e) => updatePref('customSuperpower', e.target.value)}
                 />
              </motion.div>
           )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-md mx-auto space-y-8">
       <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Set Critical Thresholds</h2>
          <p className="text-gray-400">We'll alert you when this metric is breached.</p>
       </div>

       <div className="space-y-4">
          <label className="block text-xs font-mono text-neon-blue uppercase tracking-wider mb-2">Monitor Metric</label>
          <div className="flex flex-col gap-2">
             {['Capital at Risk', 'Total Aged Inventory Value', 'Liquidity Cushion', 'Margin Erosion Rate'].map((metric) => (
                <button 
                   key={metric}
                   onClick={() => updatePref('criticalMetric', metric)}
                   className={`group flex items-center justify-between px-4 py-4 rounded-xl text-sm font-bold text-left transition-all border ${
                      prefs.criticalMetric === metric
                      ? 'bg-neon-blue/10 border-neon-blue text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                   }`}
                >
                   <span className="flex items-center gap-3">
                      <Target className={`w-4 h-4 ${prefs.criticalMetric === metric ? 'text-neon-blue' : 'text-gray-600 group-hover:text-gray-400'}`} />
                      {metric}
                   </span>
                   {prefs.criticalMetric === metric && <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_#00F0FF]"></div>}
                </button>
             ))}
          </div>
       </div>

       <div className="space-y-4 pt-4 border-t border-white/5">
          <label className="block text-xs font-mono text-neon-pink uppercase tracking-wider">Trigger Value</label>
          <div className="relative group">
             <AlertTriangle className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-neon-pink transition-colors" />
             <input 
               type="text" 
               placeholder="e.g. $50,000 or 15%"
               value={prefs.criticalThreshold}
               onChange={(e) => updatePref('criticalThreshold', e.target.value)}
               className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,41,117,0.2)] outline-none transition-all placeholder:text-gray-700"
             />
          </div>
       </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-center mb-2">Workflow Automation</h2>
       <p className="text-gray-400 text-center mb-8">Select areas to put on autopilot.</p>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
             { id: 'trade', label: 'Trade Execution', desc: 'Auto-list on StockX/eBay' },
             { id: 'alerts', label: 'Smart Alerts', desc: 'Notify Slack on price drops' },
             { id: 'report', label: 'Reporting', desc: 'Weekly PDF generation' }
          ].map(item => (
             <GlassCard 
               key={item.id}
               onClick={() => toggleWorkflow(item.id)}
               className={`cursor-pointer transition-all ${prefs.workflowAreas.includes(item.id) ? 'border-neon-emerald bg-neon-emerald/10' : 'opacity-70'}`}
             >
                <div className="flex justify-between items-start mb-2">
                   <Workflow className={`w-6 h-6 ${prefs.workflowAreas.includes(item.id) ? 'text-neon-emerald' : 'text-gray-400'}`} />
                   {prefs.workflowAreas.includes(item.id) && <Check className="w-4 h-4 text-neon-emerald" />}
                </div>
                <h3 className="font-bold mb-1">{item.label}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
             </GlassCard>
          ))}
       </div>

       <div className="max-w-md mx-auto mt-6">
          <label className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-2">
             <Edit3 className="w-3 h-3" /> Custom Automation (Optional)
          </label>
          <textarea 
             placeholder="Describe a custom rule..." 
             className="w-full h-24 bg-black/40 border border-white/10 rounded p-3 text-sm focus:border-neon-emerald outline-none resize-none"
             value={prefs.customWorkflow}
             onChange={(e) => updatePref('customWorkflow', e.target.value)}
          />
       </div>
    </div>
  );

  const renderStep4 = () => (
     <div className="max-w-lg mx-auto space-y-8">
        <div className="text-center">
           <h2 className="text-2xl font-bold mb-2">Context & Experience</h2>
           <p className="text-gray-400">We'll adapt the dashboard complexity to you.</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-3">
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Your Role</label>
              <div className="flex flex-col gap-2">
                 {['Merchant', 'Analyst', 'Operations', 'CEO / Founder'].map((roleOption) => (
                    <button 
                       key={roleOption}
                       onClick={() => updatePref('role', roleOption)}
                       className={`px-4 py-3 rounded text-sm font-bold text-left transition-all border ${
                          prefs.role === roleOption 
                          ? 'bg-neon-violet/20 border-neon-violet text-white shadow-[0_0_15px_rgba(140,30,255,0.2)]' 
                          : 'bg-white/5 border-transparent text-gray-500 hover:bg-white/10 hover:text-gray-300'
                       }`}
                    >
                       {roleOption}
                    </button>
                 ))}
              </div>
           </div>
           
           <div className="space-y-3">
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Experience Level</label>
              <div className="flex flex-col gap-2">
                 {['Beginner', 'Intermediate', 'Expert'].map((level) => (
                    <button 
                       key={level}
                       onClick={() => updatePref('experience', level)}
                       className={`px-4 py-3 rounded text-sm font-bold text-left transition-all border ${
                          prefs.experience === level 
                          ? 'bg-neon-violet/20 border-neon-violet text-white shadow-[0_0_15px_rgba(140,30,255,0.2)]' 
                          : 'bg-white/5 border-transparent text-gray-500 hover:bg-white/10 hover:text-gray-300'
                       }`}
                    >
                       {level}
                    </button>
                 ))}
              </div>
           </div>
        </div>
     </div>
  );

  const renderStep5 = () => (
     <div className="max-w-md mx-auto text-center space-y-8">
        <div>
           <h2 className="text-2xl font-bold mb-2">Interface Personalization</h2>
           <p className="text-gray-400">Choose your system accent color.</p>
        </div>

        <div className="flex justify-center gap-6">
           {[
              { id: 'blue', hex: '#00F0FF', name: 'Cyan' },
              { id: 'pink', hex: '#FF2975', name: 'Magenta' },
              { id: 'emerald', hex: '#00FF94', name: 'Emerald' },
              { id: 'violet', hex: '#8C1EFF', name: 'Violet' }
           ].map(color => (
              <button
                 key={color.id}
                 onClick={() => updatePref('themeColor', color.id)}
                 className={`group relative w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${prefs.themeColor === color.id ? 'scale-110 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
                 style={{ backgroundColor: color.hex }}
              >
                 {prefs.themeColor === color.id && <Check className="w-8 h-8 text-black" />}
                 <span className="absolute -bottom-8 text-xs font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{color.name}</span>
              </button>
           ))}
        </div>

        <div className="pt-8">
           <p className="text-xs text-gray-500 font-mono mb-4">PREVIEW MODE ACTIVE</p>
           <div className={`w-full h-2 rounded-full overflow-hidden bg-gray-800`}>
              <div className={`h-full w-2/3 animate-pulse bg-neon-${prefs.themeColor}`}></div>
           </div>
        </div>
     </div>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-[#050508] flex flex-col items-center justify-center p-6 text-white font-sans">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] bg-neon-blue/10 rounded-full blur-[100px] animate-pulse-slow" />
         <div className="absolute bottom-[10%] right-[20%] w-[30vw] h-[30vw] bg-neon-violet/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
         <div className="scanlines opacity-30" />
      </div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col h-full max-h-[800px]">
         {/* Progress Header */}
         <div className="flex justify-between items-center mb-8 px-4">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                  <span className="font-bold text-sm">L</span>
               </div>
               <span className="font-bold tracking-tight text-lg">System Initialization</span>
            </div>
            <div className="flex gap-1">
               {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i + 1 <= step ? `bg-neon-${prefs.themeColor}` : 'bg-white/10'}`} />
               ))}
            </div>
            <div className="text-xs font-mono text-gray-500">STEP {step} / {totalSteps}</div>
         </div>

         {/* Content Area */}
         <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
               <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
               >
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
                  {step === 5 && renderStep5()}
               </motion.div>
            </AnimatePresence>
         </div>

         {/* Footer Actions */}
         <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/5 px-4">
            <button 
               onClick={() => step > 1 && setStep(step - 1)}
               className={`text-gray-500 hover:text-white transition-colors text-sm font-bold ${step === 1 ? 'invisible' : ''}`}
            >
               Back
            </button>
            <button 
               onClick={nextStep}
               className={`px-8 py-3 rounded-full font-bold text-black flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-neon-${prefs.themeColor === 'blue' ? 'blue' : prefs.themeColor === 'pink' ? 'pink' : prefs.themeColor === 'emerald' ? 'emerald' : 'violet'}`}
            >
               {step === totalSteps ? 'Launch Dashboard' : 'Next Step'} <ArrowRight className="w-4 h-4" />
            </button>
         </div>
      </div>
    </div>
  );
};
