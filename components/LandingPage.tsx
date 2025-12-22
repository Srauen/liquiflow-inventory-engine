
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Play, Zap, Globe, BarChart3, ChevronRight, Box, Hexagon, Layers, TrendingUp, Radio, Activity, Target, FlaskConical } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { SyncEngineVisual } from './SyncEngineVisual';
import { 
  ProblemSection, PricingSection, FAQSection, FinalCTASection, 
  FeatureOverviewSection, WalkthroughSection, TechStackSection,
  DecisionStateSection, StorySection, RoleSection, SmoothSection
} from './LandingSections';
import { TrustSection } from './TrustSection';
import { EducationSection } from './EducationSection';
import { LiquidityCalculator } from './LiquidityCalculator';
import { ComparisonSection } from './ComparisonSection';
import { PageView } from '../App';
import { Footer } from './Footer';

interface LandingPageProps {
  onLaunchApp: () => void;
  onNavigate: (page: PageView) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full overflow-hidden bg-void text-white font-sans selection:bg-neon-gold selection:text-black">
      
      {/* --- PROGRESS BAR --- */}
      <motion.div className="fixed top-0 left-0 right-0 h-[1px] bg-neon-gold z-[110] origin-left" style={{ scaleX }} />

      {/* --- PREMIUM NAV --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? 'bg-void/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-8 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold text-lg tracking-tighter">L</div>
            <span className="font-bold text-sm tracking-tight uppercase text-white">Liquidora</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            <button onClick={() => scrollTo('problem')} className="hover:text-white transition-colors">Economics</button>
            <button onClick={() => scrollTo('calculator')} className="hover:text-white transition-colors">ROI</button>
            <button onClick={() => scrollTo('walkthrough')} className="hover:text-white transition-colors">Tour</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-neon-gold transition-colors">Pricing</button>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('auth')} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Sign In</button>
            <button 
              onClick={() => onNavigate('auth')}
              className="px-6 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-neon-gold transition-all"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <SmoothSection>
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-12">
              <span className="text-[9px] font-mono text-gray-400 tracking-[0.3em] uppercase font-bold">Protocol v4.1 Active</span>
            </div>
            
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight leading-[1.05] mb-10 text-white max-w-5xl mx-auto px-4">
              Inventory Liquidity. <br/>
              <span 
                className="bg-gradient-to-r from-neon-gold via-white to-neon-gold bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
              >
                Solved by Economics.
              </span>
            </h1>
          </SmoothSection>

          <SmoothSection>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium mb-12 px-6">
              The operating system for modern brands. Turn stagnant inventory into liquid capital with automated elasticity engines and B2B clearing networks.
            </p>
          </SmoothSection>

          <SmoothSection>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32">
              <button 
                onClick={() => onNavigate('auth')}
                className="px-10 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-neon-gold transition-all"
              >
                Start Recovery
              </button>
              <button 
                onClick={() => scrollTo('walkthrough')} 
                className="px-10 py-4 bg-transparent border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-white/5 transition-all flex items-center gap-2"
              >
                Watch Simulation
              </button>
            </div>
          </SmoothSection>

          <SmoothSection className="relative mx-auto max-w-6xl px-4">
             <div className="rounded-xl overflow-hidden border border-white/5 bg-black shadow-2xl relative p-1">
                <HeroVisual />
             </div>
          </SmoothSection>
        </div>
      </section>

      <TechStackSection />

      <section id="problem">
         <ProblemSection />
      </section>

      <SmoothSection className="container mx-auto max-w-7xl py-48 px-8 text-center" id="partner">
         <div className="inline-flex p-4 bg-white/5 border border-white/10 rounded mb-8">
            <Activity className="w-6 h-6 text-white" />
         </div>
         <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white max-w-4xl mx-auto">Your AI-Powered Liquidity Partner</h2>
         <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Liquidora transforms static inventory data into active capital flow. By connecting directly to your ERP, we identify friction before it impacts your bottom line.
         </p>
      </SmoothSection>

      <WalkthroughSection />

      <DecisionStateSection />

      <section id="calculator" className="py-60 px-6 relative overflow-hidden bg-[#08080a] border-y border-white/5">
         <div className="container mx-auto">
            <SmoothSection>
               <div className="text-center mb-24 px-4">
                  <span className="text-neon-gold font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block font-bold">ROI ENGINE</span>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">Quantify Your Opportunity</h2>
                  <p className="text-gray-400 text-lg max-w-xl mx-auto font-medium">Identify the hidden cost of holding stagnant assets.</p>
               </div>
               <LiquidityCalculator onNavigate={onNavigate} />
            </SmoothSection>
         </div>
      </section>

      <StorySection />

      <RoleSection />

      <section className="py-60 px-8 border-t border-white/5 bg-void">
        <div className="container mx-auto max-w-7xl space-y-80">
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                 <div className="relative z-10 bg-[#0c0c10] border border-white/5 rounded-2xl p-12 h-[500px] flex flex-col items-center justify-center overflow-hidden">
                    <div className="text-center relative z-10">
                       <div className="text-8xl font-bold text-white leading-none font-mono tracking-tighter">$14,205</div>
                       <div className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold mt-8">Revenue Recovered / Daily Average</div>
                       <p className="text-[9px] font-mono text-gray-600 mt-12 uppercase tracking-widest">Real-time Operational Telemetry</p>
                    </div>
                 </div>
              </div>
              <div>
                 <div className="inline-flex p-3 bg-neon-blue/5 border border-neon-blue/20 rounded mb-8">
                    <Target className="w-5 h-5 text-neon-blue" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white leading-[1.1]">Price Elasticity, <br/><span className="text-neon-blue">Automated.</span></h2>
                 <p className="text-lg text-gray-400 leading-relaxed mb-10 font-medium max-w-lg">
                    Eliminate guesswork in markdown strategy. Our deterministic models simulate demand curves against real-world competitor data to find the intersection of margin and velocity.
                 </p>
                 <button onClick={() => onNavigate('auth')} className="group text-neon-blue font-bold text-[10px] uppercase tracking-[0.3em] hover:text-white flex items-center gap-3 transition-colors">
                    View Logic Core <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                 <div className="inline-flex p-3 bg-neon-gold/5 border border-neon-gold/20 rounded mb-8">
                    <Globe className="w-5 h-5 text-neon-gold" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white leading-[1.1]">Omnichannel <br/><span className="text-neon-gold">Sync Engine.</span></h2>
                 <p className="text-lg text-gray-400 leading-relaxed mb-10 font-medium max-w-lg">
                    One inventory, everywhere. Automatic delisting and cross-platform reconciliation ensures zero overselling while maximizing channel exposure.
                 </p>
                 <div className="flex flex-wrap gap-2">
                     {['Shopify Plus', 'Amazon FBA', 'StockX', 'NetSuite'].map(plat => (
                        <span key={plat} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded text-[9px] font-bold uppercase tracking-widest text-gray-500">{plat}</span>
                     ))}
                 </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                 <div className="bg-black/20 rounded-2xl p-1 border border-white/5">
                    <SyncEngineVisual />
                 </div>
              </div>
           </div>
        </div>
      </section>

      <div id="features">
         <FeatureOverviewSection />
      </div>

      <ComparisonSection />

      <PricingSection onNavigate={onNavigate} />

      <EducationSection onNavigate={onNavigate} />

      <TrustSection />

      <FAQSection />

      <FinalCTASection onNavigate={onNavigate} />

      <Footer onNavigate={onNavigate} />

    </div>
  );
};
