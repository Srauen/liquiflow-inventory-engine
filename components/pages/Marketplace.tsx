
import React, { useState } from 'react';
import { ShoppingCart, Globe, RefreshCcw, Loader2, CheckCircle, ShieldCheck, Database, Zap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
// Corrected: Import PageView from types.ts
import { PageView } from '../../types';

interface MarketplaceProps {
  isDemo?: boolean;
  onNavigate: (page: PageView) => void;
  addNotification: (title: string, message: string, type?: 'success' | 'alert' | 'info') => void;
}

const CHANNELS = [
  { id: 'shopify', name: 'Shopify Plus', type: 'DTC Gateway', status: 'Synced', health: 'Healthy', lastSync: '2m ago' },
  { id: 'ebay', name: 'eBay Secondary', type: 'Auction Engine', status: 'Conflict', health: 'Attention', lastSync: '14m ago' },
  { id: 'amazon', name: 'Amazon FBA', type: 'Retail Proxy', status: 'Delayed', health: 'Critical', lastSync: '4h ago' },
  { id: 'stockx', name: 'StockX Resale', type: 'Market Pulse', status: 'Simulated', health: 'Healthy', lastSync: 'N/A' },
];

export const Marketplace: React.FC<MarketplaceProps> = ({ isDemo, onNavigate, addNotification }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSync = () => {
    setIsSyncing(true);
    addNotification('Reconciliation Process', 'Auditing all external channel payloads...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('System State Re-Aligned');
      addNotification('Integrity Restored', 'Inventory conflicts resolved across 4 channels.', 'success');
    }, 1800);
  };

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tighter">Omnichannel Hub</h1>
            <p className="text-xs text-gray-600 font-mono uppercase mt-1 tracking-widest">Inventory Integrity Verification: Active</p>
          </div>
          <button onClick={handleSync} disabled={isSyncing} className="flex items-center gap-2 px-5 py-2 border border-white/10 rounded font-bold text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:opacity-50">
             {isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCcw className="w-3.5 h-3.5" />} 
             RECONCILE ECOSYSTEM
          </button>
       </div>

       {syncStatus && (
          <GlassCard className="p-4 border-neon-emerald/30 bg-neon-emerald/5 flex items-center gap-3 animate-in slide-in-from-top-4">
             <CheckCircle className="w-4 h-4 text-neon-emerald" />
             <p className="text-[10px] font-black text-neon-emerald uppercase tracking-widest">{syncStatus}</p>
          </GlassCard>
       )}

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map(m => (
             <GlassCard key={m.id} className="relative group border-white/5 hover:bg-white/[0.02] transition-colors" onClick={() => onNavigate('integrations')}>
                <div className="flex justify-between items-start mb-6">
                   <div className={`p-2 rounded bg-black/40 border border-white/10`}>
                      <ShoppingCart className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                   </div>
                   <div className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-tighter ${
                      m.status === 'Synced' ? 'text-neon-emerald border-neon-emerald/20' : 
                      m.status === 'Conflict' ? 'text-neon-pink border-neon-pink/20' : 
                      m.status === 'Simulated' ? 'text-neon-blue border-neon-blue/20' : 'text-gray-600 border-white/10'
                   }`}>
                      {m.status}
                   </div>
                </div>
                
                <h3 className="font-bold text-sm mb-1 uppercase tracking-tighter text-white">{m.name}</h3>
                <p className="text-[9px] text-gray-600 font-mono mb-6 uppercase tracking-widest">{m.type}</p>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <ShieldCheck className={`w-3.5 h-3.5 ${m.health === 'Healthy' ? 'text-neon-emerald' : m.health === 'Attention' ? 'text-yellow-500' : 'text-neon-pink'}`} />
                      <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">{m.health}</span>
                   </div>
                   <span className="text-[8px] text-gray-700 font-mono">{m.lastSync}</span>
                </div>
             </GlassCard>
          ))}
       </div>

       <GlassCard className="p-12 border-dashed border-white/10 text-center flex flex-col items-center bg-transparent hover:bg-white/[0.01] transition-all">
          <Database className="w-10 h-10 text-gray-800 mb-6" />
          <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-tighter">Expansion Node Hub</h3>
          <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed font-medium">Connect 20+ additional marketplaces including Alibaba, Poshmark, and TikTok Shop. Aggregate global demand into a single liquidity layer.</p>
          <button onClick={() => onNavigate('integrations')} className="mt-8 px-6 py-2.5 bg-white text-black font-bold text-[10px] tracking-widest rounded-full hover:bg-neon-blue transition-colors">
            BROWSE INTEGRATIONS
          </button>
       </GlassCard>
    </div>
  );
};
