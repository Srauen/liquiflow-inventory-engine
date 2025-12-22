
import React, { useState } from 'react';
import { BrainCircuit, Check, X, ArrowRight, Award } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface QuizProps {
  onComplete: (xp: number) => void;
  onBack: () => void;
}

const QUIZ_DATA = [
  {
    question: "If price elasticity is -2.5, a 10% price drop will likely result in:",
    options: [
      "A 10% increase in demand",
      "A 2.5% increase in demand",
      "A 25% increase in demand",
      "No change in demand"
    ],
    correct: 2,
    explanation: "Elasticity (-2.5) * Price Change (-10%) = +25% Change in Quantity."
  },
  {
    question: "Which tax form is used to claim deductions for charitable inventory donations?",
    options: [
      "Form 1040",
      "Form 8283",
      "Form W-2",
      "Form 1099"
    ],
    correct: 1,
    explanation: "IRS Form 8283 is required for non-cash charitable contributions over $500."
  },
  {
    question: "What is 'Dead Stock' typically defined as?",
    options: [
      "Inventory that has expired",
      "Inventory with no sales in the last 12 months",
      "Inventory that is damaged",
      "Inventory sold at a loss"
    ],
    correct: 1,
    explanation: "While definitions vary, standard accounting often flags items with 0 velocity for 12 months as dead stock."
  }
];

export const Quiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    if (idx === QUIZ_DATA[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUIZ_DATA.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      const xpEarned = score * 100 + (selected === QUIZ_DATA[currentQ].correct ? 100 : 0);
      onComplete(xpEarned);
    }
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center">
        <GlassCard glowColor="emerald" className="p-12 w-full">
           <div className="w-20 h-20 bg-neon-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-neon-emerald" />
           </div>
           <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
           <p className="text-gray-400 mb-8">You scored {score} out of {QUIZ_DATA.length}</p>
           
           <div className="text-4xl font-mono font-bold text-neon-emerald mb-2">
              +<AnimatedCounter value={score * 100} /> XP
           </div>
           <p className="text-xs text-gray-500 mb-8">Experience added to your profile.</p>

           <button 
             onClick={onBack}
             className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
           >
             Return to Academy
           </button>
        </GlassCard>
      </div>
    );
  }

  const question = QUIZ_DATA[currentQ];

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col justify-center">
       <div className="mb-8 flex justify-between items-center">
          <span className="text-gray-400 font-mono">Question {currentQ + 1}/{QUIZ_DATA.length}</span>
          <span className="text-neon-pink font-bold">Liquidity Basics</span>
       </div>

       <GlassCard className="p-8">
          <h2 className="text-2xl font-bold mb-8 leading-relaxed">{question.question}</h2>

          <div className="space-y-4 mb-8">
             {question.options.map((opt, idx) => {
                let stateClass = "border-white/10 hover:bg-white/5";
                if (isAnswered) {
                   if (idx === question.correct) stateClass = "border-neon-emerald bg-neon-emerald/10 text-neon-emerald";
                   else if (idx === selected) stateClass = "border-red-500 bg-red-500/10 text-red-500";
                   else stateClass = "border-white/5 opacity-50";
                } else if (selected === idx) {
                   stateClass = "border-neon-blue bg-neon-blue/10";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center group ${stateClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === question.correct && <Check className="w-5 h-5" />}
                    {isAnswered && idx === selected && idx !== question.correct && <X className="w-5 h-5" />}
                  </button>
                );
             })}
          </div>

          {isAnswered && (
             <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="p-4 bg-white/5 rounded-lg mb-6 text-sm text-gray-300">
                   <strong className="text-white block mb-1">Explanation:</strong>
                   {question.explanation}
                </div>
                <div className="flex justify-end">
                   <button 
                     onClick={nextQuestion}
                     className="px-6 py-3 bg-neon-blue text-black font-bold rounded flex items-center gap-2 hover:bg-white transition-colors"
                   >
                      {currentQ === QUIZ_DATA.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
          )}
       </GlassCard>
    </div>
  );
};
