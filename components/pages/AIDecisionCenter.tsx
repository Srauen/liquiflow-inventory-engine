
import React, { useState } from 'react';
import { BrainCircuit, Send, Sparkles, AlertTriangle, Cpu } from 'lucide-react';
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
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Cpu className="w-8 h-8 text-neon-blue" />
            Local Strategic Engine
          </h1>
          <p className="text-gray-400 mt-2">
            Advanced inventory reasoning using LiquiFlow's built-in Micro-Economics Core.
            <span className="block text-xs text-neon-emerald mt-1 font-mono uppercase">Status: Zero-Cost Edge Processing Active</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Input Console */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="h-full flex flex-col">
            <h3 className="font-bold text-lg mb-4 text-neon-blue">Analysis Parameters</h3>
            <div className="flex-1">
              <textarea 
                className="w-full h-full bg-black/30 border border-white/10 rounded-lg p-4 text-sm text-gray-300 focus:border-neon-blue focus:outline-none resize-none font-mono"
                placeholder="Describe a complex scenario, e.g.: 'Analyze the impact on our margin if we hold until January vs liquidating now.'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-neon-emerald" />
                Deterministic Local Model
              </span>
              <button 
                onClick={handleAnalyze}
                disabled={isThinking}
                className="px-6 py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-white transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isThinking ? 'Processing...' : 'Run Simulation'} <Send className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Output Console */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-white/5 to-black/80">
            {isThinking && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-neon-blue font-mono animate-pulse uppercase tracking-tighter">Running Multi-Variable Scenario Analysis...</p>
                <p className="text-xs text-gray-500 mt-2 font-mono">Simulating 10,000 market iterations locally</p>
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <BrainCircuit className="w-5 h-5 text-neon-violet" />
              <h3 className="font-bold text-lg">System Insights</h3>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              {response ? (
                <div className="prose prose-invert max-w-none">
                  <p className="font-mono text-xs text-gray-500 mb-4 uppercase">
                    ID: {Math.random().toString(16).slice(2, 10)} // Engine: LIQUIFLOW-LOCAL-CORE
                  </p>
                  <div className="whitespace-pre-wrap leading-relaxed text-gray-200 bg-white/5 p-4 rounded-lg border border-white/10">
                    {response}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600">
                  <Cpu className="w-16 h-16 mb-4 opacity-10" />
                  <p className="font-mono text-sm">Awaiting simulation parameters...</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
