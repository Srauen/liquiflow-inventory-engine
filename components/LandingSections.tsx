
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, ChevronDown, ArrowRight, Zap, Shield, BarChart2, 
  ScanLine, DollarSign, Activity, Target, Layers, 
  Search, Info, Database, Box, User, Briefcase, 
  FlaskConical, CheckCircle, Clock, TrendingUp, Cpu,
  Network, ArrowUpRight, BarChart3, Binary
} from 'lucide-react';
import { PageView } from '../App';
import { GlassCard } from './ui/GlassCard';

export const SmoothSection: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <motion.div 
    id={id} 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ProblemSection: React.FC = () => (
  <section className="py-48 px-6 container mx-auto max-w-5xl text-center">
     <SmoothSection>
        <span className="text-neon-pink font-mono text-[10px] tracking-[0.4em] uppercase mb-10 block font-bold">THE PROBLEM</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10 leading-[1.15] text-white">
          Inventory is <span className="text-neon-gold">frozen capital.</span>
        </h2>
        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-medium">
           Every day a product sits on a shelf, its liquidity degrades. Spreadsheets can't track velocity. Humans can't predict demand curves. You are bleeding cashflow silently.
        </p>
     </SmoothSection>
  </section>
);

// --- VECTOR VISUALS FOR STORY STEPS ---
const StepVisual: React.FC<{ step: number; color: string; icon: any }> = ({ step, color, icon: Icon }) => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1 } }
  };

  const renderVisualContent = () => {
    switch (step) {
      case 0: // Identify Friction
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className={`w-48 h-48 border border-dashed border-white/10 rounded-full flex items-center justify-center`}
            >
              <div className={`w-36 h-36 border border-dotted border-white/20 rounded-full`} />
            </motion.div>
            <div className="absolute flex gap-6">
               {[1, 2, 3].map(i => (
                 <motion.div 
                   key={i}
                   animate={{ height: [20, 60, 20], opacity: [0.2, 0.8, 0.2] }}
                   transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                   className={`w-1 bg-white rounded-full`}
                 />
               ))}
            </div>
          </div>
        );
      case 1: // Model Resilience
        return (
          <div className="relative w-full h-full flex items-center justify-center p-16">
            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
               <motion.path 
                 d="M 0 80 Q 50 10 100 80 T 200 40" 
                 fill="none" 
                 stroke="white" 
                 strokeWidth="1.5"
                 initial={{ pathLength: 0 }}
                 whileInView={{ pathLength: 1 }}
                 transition={{ duration: 2.5 }}
               />
               {[40, 100, 160].map((x, i) => (
                 <circle key={i} cx={x} cy="50" r="2" fill="white" className="animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
               ))}
            </svg>
          </div>
        );
      case 2: // Execute Protocol
        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
             <div className="grid grid-cols-6 gap-3 opacity-10">
                {Array(24).fill(0).map((_, i) => (
                   <div key={i} className={`w-8 h-8 border border-white/40 flex items-center justify-center font-mono text-[8px]`}>
                      {Math.random() > 0.5 ? '1' : '0'}
                   </div>
                ))}
             </div>
             <motion.div 
               animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 3, repeat: Infinity }}
               className={`absolute w-24 h-24 bg-white/5 rounded border border-white/20 flex items-center justify-center`}
             >
                <Zap className={`w-10 h-10 text-white`} />
             </motion.div>
          </div>
        );
      case 3: // Recover Capital
        return (
          <div className="relative w-full h-full flex items-center justify-center">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               className={`w-32 h-32 rounded-full border border-white/20 flex items-center justify-center relative`}
             >
                <DollarSign className="w-12 h-12 text-white" />
             </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      className="w-full h-full relative"
    >
      {renderVisualContent()}
    </motion.div>
  );
};

export const WalkthroughSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    { label: 'Command Center', desc: 'Aggregate health metrics and critical liquidity alerts.', icon: Activity },
    { label: 'Strategic Lab', icon: FlaskConical, desc: 'Simulate price elasticity and exit path yields.' },
    { label: 'Omnichannel Hub', icon: Layers, desc: 'Real-time synchronization across DTC and secondary markets.' },
    { label: 'Exit Automations', icon: Zap, desc: 'Rule-based liquidation protocols running on autopilot.' }
  ];

  const CurrentIcon = features[activeFeature].icon;

  return (
    <section id="walkthrough" className="py-48 px-6 bg-[#08080a] border-y border-white/5">
      <div className="container mx-auto max-w-7xl">
        <SmoothSection className="text-center mb-24 px-4">
           <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white leading-tight">Engineered for Precision</h2>
           <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">A guided view into the Liquidora interface. Professional controls for enterprise decision making.</p>
        </SmoothSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
           <div className="lg:col-span-4 space-y-3">
              {features.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`w-full text-left p-6 rounded transition-all flex items-start gap-5 ${
                    activeFeature === i 
                    ? 'bg-white text-black shadow-2xl' 
                    : 'bg-transparent border border-white/5 text-gray-500 hover:border-white/20'
                  }`}
                >
                  <f.icon className={`w-5 h-5 mt-1 ${activeFeature === i ? 'text-black' : 'text-gray-600'}`} />
                  <div>
                    <h3 className="font-bold uppercase tracking-widest text-[10px] mb-1.5">{f.label}</h3>
                    <p className={`text-xs font-medium leading-relaxed ${activeFeature === i ? 'text-black/80' : 'text-gray-500'}`}>{f.desc}</p>
                  </div>
                </button>
              ))}
           </div>
           
           <div className="lg:col-span-8">
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black aspect-video flex items-center justify-center p-8">
                 <div className="relative w-full h-full border border-white/5 rounded bg-void flex flex-col backdrop-blur-md overflow-hidden">
                    <div className="flex justify-between items-center border-b border-white/5 p-4 shrink-0">
                       <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-white text-black rounded flex items-center justify-center font-bold text-xs">L</div>
                          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">SYSTEM_{features[activeFeature].label.toUpperCase()}</span>
                       </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-12 opacity-40">
                       <CurrentIcon size={64} className="text-white mb-6" />
                       <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                             key={activeFeature}
                             initial={{ width: 0 }}
                             animate={{ width: '100%' }}
                             transition={{ duration: 1 }}
                             className="h-full bg-white/40"
                          />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export const DecisionStateSection: React.FC = () => {
  const [isSimulated, setIsSimulated] = useState(true);

  return (
    <section className="py-48 px-6 container mx-auto max-w-7xl">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <SmoothSection>
             <span className="text-neon-blue font-mono text-[10px] tracking-[0.4em] uppercase mb-8 block font-bold">SIMULATION CORE</span>
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white leading-[1.1]">Predict Before <br/>You Commit</h2>
             <p className="text-lg text-gray-400 leading-relaxed mb-12 font-medium max-w-lg">
                Evaluate outcomes before commitment. Liquidora separates live operational data from sandbox scenarios, allowing for zero-risk price experimentation.
             </p>
             <div className="flex items-center gap-4 p-1.5 bg-white/5 border border-white/10 rounded w-fit">
                <button 
                  onClick={() => setIsSimulated(false)}
                  className={`px-8 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${!isSimulated ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
                >
                  Live Mode
                </button>
                <button 
                  onClick={() => setIsSimulated(true)}
                  className={`px-8 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${isSimulated ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  Sandbox
                </button>
             </div>
          </SmoothSection>

          <SmoothSection>
             <div className={`p-10 border rounded transition-all duration-700 bg-void/50 ${isSimulated ? 'border-white/30 shadow-2xl' : 'border-white/5'}`}>
                <div className="flex justify-between items-center mb-10">
                   <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">
                     {isSimulated ? 'SANDBOX_PROJECTION_01' : 'LIVE_PRODUCTION_01'}
                   </span>
                   <div className={`w-2 h-2 rounded-full ${isSimulated ? 'bg-neon-blue animate-pulse' : 'bg-neon-emerald'}`} />
                </div>
                <div className="space-y-8">
                   <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">ASSET BASE VALUATION</p>
                      <div className="text-4xl font-bold font-mono tracking-tighter text-white">
                         {isSimulated ? '$1,402,000' : '$840,250'}
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                         <p className="text-[9px] font-bold text-gray-600 uppercase mb-2 tracking-widest">EST. RECOVERY</p>
                         <p className={`text-xl font-bold font-mono text-white`}>
                            {isSimulated ? '42.4%' : 'N/A'}
                         </p>
                      </div>
                      <div>
                         <p className="text-[9px] font-bold text-gray-600 uppercase mb-2 tracking-widest">LIQUIDITY HORIZON</p>
                         <p className={`text-xl font-bold font-mono text-white`}>
                            {isSimulated ? '14 Days' : '45 Days'}
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </SmoothSection>
       </div>
    </section>
  );
};

export const StorySection: React.FC = () => {
  const steps = [
    { title: "Identify Friction", desc: "System sensors flag SKU-2077 with 180+ Days on Hand and high carrying costs.", icon: Target },
    { title: "Model Resilience", desc: "Elasticity engine calculates a 12% markdown maximizes margin vs bulk clearing.", icon: BarChart2 },
    { title: "Execute Protocol", desc: "Automation hub initiates tiered B2C exit while listing on secondary B2B channels.", icon: Zap },
    { title: "Recover Capital", desc: "$14.2k in capital returned to cash-on-hand within 7 days.", icon: DollarSign },
  ];

  return (
    <section className="py-60 px-6 bg-void relative">
       <div className="container mx-auto max-w-6xl">
          <SmoothSection className="text-center mb-40">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">The Recovery Cycle</h2>
             <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">The architectural flow of capital mobilization from stagnant to liquid assets.</p>
          </SmoothSection>

          <div className="space-y-40">
             {steps.map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                   <div className="flex-1 px-4">
                      <span className="text-neon-gold font-mono text-[9px] tracking-[0.4em] uppercase mb-4 block font-bold">STAGE 0{i + 1}</span>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">{step.title}</h3>
                      <p className="text-lg text-gray-400 leading-relaxed font-medium">{step.desc}</p>
                   </div>
                   
                   <div className="flex-1 w-full px-4">
                      <div className="relative rounded-lg overflow-hidden border border-white/5 aspect-video bg-[#0c0c10] flex items-center justify-center p-8">
                         <StepVisual step={i} color="white" icon={step.icon} />
                         <div className="absolute bottom-6 left-6 px-3 py-1 bg-black/40 border border-white/10 rounded text-[8px] font-mono text-gray-500 uppercase tracking-widest">NODE_TYPE_{step.title.toUpperCase().replace(' ', '_')}</div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

export const RoleSection: React.FC = () => {
  const roles = [
    { label: "Operators", focus: "Velocity & Logistics", task: "Manage auto-markdowns and cross-channel sync." },
    { label: "Analysts", focus: "Elasticity & Trends", task: "Identify demand curves and mitigate SKU risk." },
    { label: "Executives", focus: "Capital & Yield", task: "Maximize ROI on inventory principal and tax shields." }
  ];

  return (
    <section className="py-48 px-6 container mx-auto max-w-7xl">
      <SmoothSection className="text-center mb-24 px-4">
         <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white">Platform Perspectives</h2>
         <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">One system of record. Deterministic views optimized for every stakeholder.</p>
      </SmoothSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {roles.map((role, i) => (
            <SmoothSection key={i}>
               <div className="p-10 border border-white/5 bg-[#0c0c10] rounded h-full hover:border-white/20 transition-colors">
                  <h3 className="text-xl font-bold tracking-tight mb-2 text-white">{role.label}</h3>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-10 font-bold">{role.focus}</div>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{role.task}</p>
               </div>
            </SmoothSection>
         ))}
      </div>
    </section>
  );
};

export const TechStackSection: React.FC = () => (
   <section className="py-32 border-y border-white/5 bg-void overflow-hidden relative">
      <div className="flex animate-marquee gap-32 min-w-full items-center opacity-20">
         {['Shopify Plus', 'NetSuite', 'SAP', 'Salesforce', 'QuickBooks', 'Amazon FBA', 'StockX', 'Flexport'].map((tech, i) => (
            <span key={i} className="text-xl font-bold uppercase text-white whitespace-nowrap tracking-[0.4em]">{tech}</span>
         ))}
         {['Shopify Plus', 'NetSuite', 'SAP', 'Salesforce', 'QuickBooks', 'Amazon FBA', 'StockX', 'Flexport'].map((tech, i) => (
            <span key={`dup-${i}`} className="text-xl font-bold uppercase text-white whitespace-nowrap tracking-[0.4em]">{tech}</span>
         ))}
      </div>
   </section>
);

export const FeatureOverviewSection: React.FC = () => (
   <section className="py-48 px-6 container mx-auto max-w-7xl" id="features">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4 md:px-0">
         {[
            { icon: Zap, title: "Instant Velocity", desc: "Real-time demand sensing and automated price floors for every SKU." },
            { icon: Shield, title: "Risk Mitigation", desc: "Identify dead stock early with deterministic health scoring." },
            { icon: BarChart2, title: "Profit Maximization", desc: "Dynamic pricing engines driven by real-world price elasticity." }
         ].map((item, i) => (
            <SmoothSection key={i} className="group">
               <item.icon className="w-5 h-5 text-gray-600 group-hover:text-white mb-8 transition-colors" />
               <h3 className="text-xl font-bold tracking-tight mb-4 text-white">{item.title}</h3>
               <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
            </SmoothSection>
         ))}
      </div>
   </section>
);

export const PricingSection: React.FC<{onNavigate: (p: PageView) => void}> = ({ onNavigate }) => {
  const plans = [
    { name: "Starter", price: "$25", sub: "For emerging brands.", feats: ['Up to 5,000 SKUs', 'Smart Markdowns', 'Basic ERP Link'], btn: "Get Started", delay: 0.1 },
    { name: "Growth", price: "$100", sub: "For high-velocity teams.", feats: ['Up to 25,000 SKUs', 'Omnichannel Sync', 'B2B Clearing Access'], btn: "Start Free Trial", hot: true, delay: 0.2 },
    { name: "Enterprise", price: "Custom", sub: "Global scale.", feats: ['Unlimited SKUs', 'Dedicated Account Mgr', 'SLA Guarantees'], btn: "Contact Sales", delay: 0.3 }
  ];

  return (
    <section className="py-60 px-6 container mx-auto max-w-7xl" id="pricing">
       <SmoothSection className="text-center mb-32 max-w-3xl mx-auto px-4">
          <span className="text-neon-gold font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block font-bold">TRANSPARENT VALUE</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white leading-tight">Investment in Recovery</h2>
          <p className="text-lg text-gray-400 font-medium">Recover 10x your subscription cost in 72 hours, guaranteed.</p>
       </SmoothSection>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded overflow-hidden">
          {plans.map((plan, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: plan.delay }}
               className={`p-12 flex flex-col bg-void relative ${plan.hot ? 'z-10' : ''}`}
             >
                <div className="mb-16">
                   <h3 className={`font-bold text-[10px] uppercase tracking-[0.3em] mb-6 ${plan.hot ? 'text-neon-gold' : 'text-gray-500'}`}>
                      {plan.name}
                   </h3>
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tighter text-white font-mono">
                         {plan.price}
                      </span>
                      {plan.price !== 'Custom' && <span className="text-xs font-bold opacity-30 tracking-widest uppercase">/mo</span>}
                   </div>
                   <p className="text-xs text-gray-500 mt-6 font-medium">{plan.sub}</p>
                </div>

                <ul className="space-y-6 mb-20 flex-1">
                   {plan.feats.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                         <div className="w-1 h-1 bg-white/40 rounded-full" />
                         {f}
                      </li>
                   ))}
                </ul>

                <button 
                  onClick={() => onNavigate('auth')} 
                  className={`w-full py-4 rounded font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
                    plan.hot 
                    ? 'bg-white text-black shadow-2xl' 
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {plan.btn}
                </button>
             </motion.div>
          ))}
       </div>
    </section>
  );
};

export const FAQSection: React.FC = () => {
  const [open, setOpen] = React.useState<number | null>(null);
  const faqs = [
    { q: "Is my data secure?", a: "Yes. We use AES-256 bank-grade encryption and are SOC2 compliant." },
    { q: "Does it integrate with Shopify?", a: "Seamlessly. Our 1-click integration pulls your catalog instantly." },
    { q: "Can I cancel anytime?", a: "Yes. No long-term contracts for standard plans." },
    { q: "How fast is the setup?", a: "Most brands are live and analyzing inventory within 15 minutes." },
  ];

  return (
    <section className="py-48 px-6 max-w-4xl mx-auto border-t border-white/5" id="faq">
       <SmoothSection>
         <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-24 text-center text-white leading-tight">Common Questions</h2>
         <div className="space-y-px bg-white/5 border border-white/5">
            {faqs.map((faq, i) => (
               <div key={i} className="bg-void">
                  <button 
                    className="w-full p-8 flex justify-between items-center text-left hover:text-white transition-colors text-gray-400 group"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                     <span className="font-bold text-sm uppercase tracking-widest pr-8 leading-tight">{faq.q}</span>
                     <div className={`transition-transform duration-500 ${open === i ? 'rotate-180 text-white' : ''}`}>
                       <ChevronDown className="w-4 h-4" />
                     </div>
                  </button>
                  <motion.div 
                    initial={false}
                    animate={{ height: open === i ? "auto" : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                     <div className="p-8 pt-0 text-gray-500 text-sm leading-relaxed max-w-2xl font-medium">
                        {faq.a}
                     </div>
                  </motion.div>
               </div>
            ))}
         </div>
       </SmoothSection>
    </section>
  );
};

export const FinalCTASection: React.FC<{onNavigate: (p: PageView) => void}> = ({ onNavigate }) => {
  return (
    <section className="py-80 px-6 relative overflow-hidden bg-void text-center border-t border-white/5">
       <div className="container mx-auto relative z-10 max-w-4xl">
          <SmoothSection>
            <h2 className="text-4xl md:text-7xl font-bold mb-16 tracking-tight text-white leading-tight">
               Liquidora. <br/>
               Ready to flow?
            </h2>
            <button 
               onClick={() => onNavigate('auth')}
               className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.3em] rounded hover:bg-neon-gold transition-all shadow-2xl"
            >
               Get Started
            </button>
            <p className="mt-12 text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em]">No credit card required for demo access.</p>
          </SmoothSection>
       </div>
    </section>
  );
};
