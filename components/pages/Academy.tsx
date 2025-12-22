
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle, Award, BrainCircuit } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { MOCK_LESSONS } from '../../utils/MockData';

export const Academy: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const startQuiz = () => {
     // Trigger navigation via custom event listened by App.tsx
     window.dispatchEvent(new CustomEvent('nav-change', { detail: 'quiz' }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
         <div>
            <h1 className="text-3xl font-bold text-white mb-2">LiquiFlow Academy</h1>
            <p className="text-gray-400">Master the economics of inventory liquidity. Earn XP.</p>
         </div>
         <div className="flex items-center gap-2 px-4 py-2 bg-neon-violet/10 rounded-full border border-neon-violet/30">
            <Award className="w-5 h-5 text-neon-violet" />
            <span className="text-neon-violet font-bold font-mono">LVL 4 SCHOLAR</span>
         </div>
      </div>

      <div className="flex gap-4 border-b border-white/10 pb-4 overflow-x-auto">
         {['All', 'Economics', 'Tax', 'Liquidity'].map(cat => (
           <button 
             key={cat}
             onClick={() => setActiveCategory(cat)}
             className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
               activeCategory === cat 
               ? 'bg-white text-black' 
               : 'bg-white/5 text-gray-400 hover:bg-white/10'
             }`}
           >
             {cat}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {MOCK_LESSONS.filter(l => activeCategory === 'All' || l.category === activeCategory).map((lesson) => (
           <GlassCard 
             key={lesson.id} 
             className="relative group hover:border-neon-blue/50"
             glowColor={lesson.category === 'Economics' ? 'blue' : lesson.category === 'Tax' ? 'emerald' : 'violet'}
           >
              <div className="flex justify-between items-start mb-4">
                 <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded bg-white/5 border border-white/10 ${
                   lesson.completed ? 'text-neon-emerald border-neon-emerald/30' : 'text-gray-400'
                 }`}>
                   {lesson.category}
                 </span>
                 {lesson.completed && <CheckCircle className="w-5 h-5 text-neon-emerald" />}
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">{lesson.title}</h3>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">{lesson.content}</p>
              
              <div className="flex items-center justify-between mt-auto">
                 <span className="text-xs font-mono text-neon-pink">+{lesson.xpReward} XP</span>
                 <button className="flex items-center gap-2 text-sm font-bold hover:text-white text-gray-300">
                    <PlayCircle className="w-4 h-4" /> Start Lesson
                 </button>
              </div>
           </GlassCard>
         ))}

         {/* Quiz Card - Clickable now */}
         <GlassCard 
           onClick={startQuiz}
           className="border-dashed border-white/20 flex flex-col items-center justify-center text-center p-8 opacity-80 hover:opacity-100 hover:border-neon-pink hover:bg-neon-pink/5 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-neon-pink group-hover:text-black transition-colors">
               <BrainCircuit className="w-6 h-6 text-white group-hover:text-black" />
            </div>
            <h3 className="font-bold mb-2 text-white">Weekly Quiz</h3>
            <p className="text-xs text-gray-400 mb-4">Test your knowledge on Elasticity to earn a rare badge.</p>
            <span className="px-3 py-1 bg-neon-pink text-black text-xs font-bold rounded shadow-[0_0_10px_rgba(255,41,117,0.5)]">
               START CHALLENGE
            </span>
         </GlassCard>
      </div>
    </div>
  );
};
