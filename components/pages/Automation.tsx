
import React, { useState } from 'react';
import { Plus, Play, Pause, Zap, Trash2, X, Check } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Workflow } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';

interface AutomationProps {
   workflows?: Workflow[];
   onCreateWorkflow?: (w: Workflow) => void;
}

export const Automation: React.FC<AutomationProps> = ({ workflows = [], onCreateWorkflow }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrigger, setNewTrigger] = useState('DOH > 90');
  const [newAction, setNewAction] = useState('Apply 10% Discount');

  const handleCreate = () => {
     if (onCreateWorkflow) {
        onCreateWorkflow({
           id: `wf-${Date.now()}`,
           name: `Auto Rule: ${newTrigger}`,
           trigger: newTrigger,
           action: newAction,
           active: true,
           executions: 0
        });
        setIsModalOpen(false);
     }
  };

  return (
    <div className="space-y-8 relative">
       
       <div className="flex justify-between items-center">
          <div>
             <h1 className="text-3xl font-bold mb-2">Automation Workflows</h1>
             <p className="text-gray-400">Logic-based rules to manage inventory 24/7 without human intervention.</p>
          </div>
          <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-black font-bold rounded hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
             <Plus className="w-5 h-5" /> New Workflow
          </button>
       </div>

       {/* Modal */}
       <AnimatePresence>
          {isModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0.9, opacity: 0 }}
                   className="w-full max-w-md"
                >
                   <GlassCard className="p-6 border-neon-blue/50 shadow-2xl">
                      <div className="flex justify-between items-center mb-6">
                         <h2 className="text-xl font-bold flex items-center gap-2">
                            <Zap className="w-5 h-5 text-neon-blue" /> Create Automation
                         </h2>
                         <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-500 hover:text-white" /></button>
                      </div>

                      <div className="space-y-4 mb-8">
                         <div>
                            <label className="block text-xs font-mono text-gray-400 mb-2">IF (TRIGGER)</label>
                            <select 
                               value={newTrigger} 
                               onChange={(e) => setNewTrigger(e.target.value)}
                               className="w-full bg-black/40 border border-white/20 rounded p-3 text-white focus:border-neon-blue outline-none"
                            >
                               <option>DOH &gt; 90 Days</option>
                               <option>Stock &gt; 1000 Units</option>
                               <option>Category == 'Seasonal'</option>
                               <option>Velocity &lt; 1.0</option>
                            </select>
                         </div>

                         <div className="flex justify-center">
                            <div className="h-4 w-0.5 bg-white/20"></div>
                         </div>

                         <div>
                            <label className="block text-xs font-mono text-gray-400 mb-2">THEN (ACTION)</label>
                            <select 
                               value={newAction} 
                               onChange={(e) => setNewAction(e.target.value)}
                               className="w-full bg-black/40 border border-white/20 rounded p-3 text-white focus:border-neon-emerald outline-none"
                            >
                               <option>Apply 10% Discount</option>
                               <option>Apply 25% Discount</option>
                               <option>List on eBay Auction</option>
                               <option>Notify Sales Team</option>
                            </select>
                         </div>
                      </div>

                      <button 
                         onClick={handleCreate}
                         className="w-full py-3 bg-neon-blue text-black font-bold rounded hover:bg-white transition-colors flex items-center justify-center gap-2"
                      >
                         <Check className="w-4 h-4" /> Activate Rule
                      </button>
                   </GlassCard>
                </motion.div>
             </div>
          )}
       </AnimatePresence>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {workflows.map((flow) => (
             <GlassCard key={flow.id} className="relative group border-l-4 border-l-neon-blue">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 rounded bg-neon-blue/10 text-neon-blue">
                      <Zap className="w-5 h-5" />
                   </div>
                   <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white">
                         {flow.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-red-500">
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>

                <h3 className="font-bold text-lg mb-4">{flow.name}</h3>

                <div className="space-y-3 text-sm">
                   <div className="flex items-center gap-2 p-2 bg-black/20 rounded border border-white/5">
                      <span className="text-gray-500 font-mono text-xs">IF</span>
                      <span className="text-neon-pink font-bold">{flow.trigger}</span>
                   </div>
                   <div className="flex justify-center">
                      <div className="h-4 w-0.5 bg-white/10"></div>
                   </div>
                   <div className="flex items-center gap-2 p-2 bg-black/20 rounded border border-white/5">
                      <span className="text-gray-500 font-mono text-xs">THEN</span>
                      <span className="text-neon-emerald font-bold">{flow.action}</span>
                   </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
                   <span>ID: {flow.id}</span>
                   <span>Executions: {flow.executions}</span>
                </div>
             </GlassCard>
          ))}

          {/* New Workflow Placeholer */}
          <button 
             onClick={() => setIsModalOpen(true)}
             className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-8 text-gray-500 hover:border-neon-blue hover:text-neon-blue transition-all bg-white/5 hover:bg-white/10"
          >
             <Plus className="w-12 h-12 mb-4" />
             <span className="font-bold">Build from Scratch</span>
             <span className="text-xs mt-2 opacity-60">or choose a template</span>
          </button>
       </div>
    </div>
  );
};
