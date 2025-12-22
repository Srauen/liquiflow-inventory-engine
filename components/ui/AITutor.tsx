
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, GraduationCap, Cpu } from 'lucide-react';
import { explainTerm } from '../../utils/gemini';
import { GlassCard } from './GlassCard';

export const AITutor: React.FC = () => {
  const [selection, setSelection] = useState<{ text: string; rect: DOMRect } | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const tutorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const activeSelection = window.getSelection();
      if (activeSelection && activeSelection.toString().length > 2 && !showExplanation) {
        const range = activeSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelection({ text: activeSelection.toString(), rect });
      } else if (!showExplanation) {
        setSelection(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [showExplanation]);

  const handleExplain = async () => {
    if (!selection) return;
    
    setLoading(true);
    setShowExplanation(true);
    
    const context = document.title;
    const result = await explainTerm(selection.text, context);
    
    setExplanation(result);
    setLoading(false);
  };

  const closeTutor = () => {
    setShowExplanation(false);
    setSelection(null);
    setExplanation('');
    window.getSelection()?.removeAllRanges();
  };

  return (
    <AnimatePresence>
      {/* Floating Trigger Button */}
      {selection && !showExplanation && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            position: 'fixed',
            top: selection.rect.top - 50,
            left: selection.rect.left + (selection.rect.width / 2) - 20,
            zIndex: 9999
          }}
          onClick={handleExplain}
          className="flex items-center gap-2 px-3 py-2 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
        >
          <Cpu className="w-3 h-3" /> ANALYZE
        </motion.button>
      )}

      {/* Explanation Modal */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            position: 'fixed',
            top: selection ? selection.rect.bottom + 10 : '50%',
            left: selection ? Math.min(window.innerWidth - 320, Math.max(20, selection.rect.left)) : '50%',
            zIndex: 9999
          }}
          className="w-80"
          ref={tutorRef}
        >
          <GlassCard glowColor="blue" className="bg-black/95 backdrop-blur-2xl border-white/10 shadow-2xl">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2 text-neon-blue">
                <GraduationCap className="w-5 h-5" />
                <span className="font-black text-[10px] uppercase tracking-widest">Strategic Advisor</span>
              </div>
              <button onClick={closeTutor} className="text-gray-600 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm text-gray-200 leading-relaxed font-medium">
              {loading ? (
                <div className="flex items-center justify-center py-4 gap-3 text-neon-blue">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-black">Connecting Live Core...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">TERM_DEF: "{selection?.text}"</p>
                  <p className="animate-in fade-in text-sm">{explanation}</p>
                </div>
              )}
            </div>
            
            {!loading && (
              <div className="mt-4 pt-3 border-t border-white/5 text-[8px] text-gray-700 flex justify-between uppercase font-mono font-black tracking-widest">
                <span>Gemini API Node</span>
                <span className="text-neon-emerald">State: Synced</span>
              </div>
            )}
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
