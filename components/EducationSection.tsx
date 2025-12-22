
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { PageView } from '../App';

const SmoothSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const EducationSection: React.FC<{onNavigate: (page: PageView) => void}> = ({ onNavigate }) => {
  return (
    <section className="py-40 px-6 bg-[#0c0c10]">
       <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
             
             <SmoothSection>
                <span className="text-neon-violet font-mono text-xs tracking-widest uppercase mb-6 block">Learning Mode</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                   Micro-economics <br/>while you work.
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                   Don't just use the tools—understand the strategy. Our built-in academy teaches you price elasticity, tax shield optimization, and demand forecasting in real-time.
                </p>
                <button 
                   onClick={() => onNavigate('auth')}
                   className="text-white font-bold border-b border-white hover:text-neon-violet hover:border-neon-violet transition-colors pb-1"
                >
                   Start Learning Free
                </button>
             </SmoothSection>

             <SmoothSection delay={0.2} className="relative">
                <div className="bg-[#1a1a20] rounded-2xl p-8 border border-white/5 relative z-10 hover:translate-y-[-10px] transition-transform duration-500">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-neon-violet/20 flex items-center justify-center text-neon-violet">
                         <PlayCircle className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-white">Price Elasticity 101</h4>
                         <p className="text-xs text-gray-500">Module 1 • 5 min read</p>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="h-2 w-full bg-white/5 rounded-full" />
                      <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                      <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                   </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-full h-full border border-white/5 rounded-2xl -z-10 translate-x-4 translate-y-4" />
             </SmoothSection>

          </div>
       </div>
    </section>
  );
};
