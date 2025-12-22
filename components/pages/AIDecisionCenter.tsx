
import React, { useState } from 'react';
import { BrainCircuit, Send, Sparkles, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { solveComplexScenario } from '../../utils/gemini';

export const AIDecisionCenter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleAnalyze = async () => {
    if (!query) return;
    setIsThinking(true);
    const result = await solveComplexScenario(query);
    setResponse(result);
    setIsThinking(false);
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 uppercase tracking-tighter text-white">
            <Zap className="w-8 h-8 text-neon-gold" />
            Hybrid Neural Core
          </h1>
          <p className="text-gray-400 mt-2">
            Strategic reasoning powered by Gemini 3.5 & Local Edge Logic.
            <span className="block text-xs text-neon-emerald mt-1 font-mono uppercase flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> Status: Hybrid Uplink Active
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Input Console */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="h-full flex flex-col border-white/10 bg-black/40">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-4 text-neon-gold">Strategic Input</h3>
            <div className="flex-1">
              <textarea 
                className="w-full h-full bg-black/30 border border-white/10 rounded-lg p-4 text-sm text-gray-300 focus:border-neon-gold focus:outline-none resize-none font-mono"
                placeholder="Example: 'Analyze the risk of holding SKU-2077 sneakers vs bulk liquidation.'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-[10px] text-gray-500 flex items-center gap-2 font-mono uppercase">
                <Cpu className="w-3 h-3 text-neon-blue" />
                Dual-Mode Logic
              </span>
              <button 
                onClick={handleAnalyze}
                disabled={isThinking}
                className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded hover:bg-neon-gold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
              >
                {isThinking ? 'PROCESSING...' : 'EXECUTE ANALYSIS'} <Send className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Output Console */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-white/5 to-black/80 border-white/10">
            {isThinking && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl">
                <div className="w-12 h-12 border-4 border-neon-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-neon-gold font-mono animate-pulse uppercase tracking-[0.2em] text-[10px] font-black">Syncing Neural Weights...</p>
                <p className="text-[9px] text-gray-600 mt-2 font-mono uppercase">Running Cross-Variable Liquidity Matrix</p>
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <BrainCircuit className="w-5 h-5 text-neon-gold" />
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white">Consolidated Analysis</h3>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              {response ? (
                <div className="prose prose-invert max-w-none">
                  <p className="font-mono text-[9px] text-gray-600 mb-4 uppercase tracking-widest">
                    SESSION_ID: {Math.random().toString(16).slice(2, 10).toUpperCase()} // MODE: HYBRID_REMOTE_SYNC
                  </p>
                  <div className="whitespace-pre-wrap leading-relaxed text-gray-200 bg-white/[0.02] p-6 rounded border border-white/5 font-medium text-sm">
                    {response}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-800">
                  <Cpu className="w-16 h-16 mb-4 opacity-5" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-black">Awaiting system instructions...</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
