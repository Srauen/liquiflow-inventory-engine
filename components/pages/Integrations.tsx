
import React, { useState } from 'react';
import { Check, Plus, RefreshCcw, ExternalLink, AlertCircle, Search, Filter } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { triggerEasterEgg } from '../../utils/easterEggs';

const INTEGRATIONS_DATA = [
  // E-commerce
  { id: 'shopify', name: 'Shopify Plus', category: 'E-commerce', status: 'connected', icon: '🛍️', desc: 'Sync inventory levels and pull order data.' },
  { id: 'woo', name: 'WooCommerce', category: 'E-commerce', status: 'disconnected', icon: '🟣', desc: 'Open source e-commerce plugin for WordPress.' },
  { id: 'magento', name: 'Adobe Commerce', category: 'E-commerce', status: 'disconnected', icon: '🟧', desc: 'Enterprise e-commerce platform sync.' },
  { id: 'bigcomm', name: 'BigCommerce', category: 'E-commerce', status: 'disconnected', icon: '🅱️', desc: 'SaaS e-commerce solution.' },
  
  // Marketplaces
  { id: 'ebay', name: 'eBay API', category: 'Marketplace', status: 'connected', icon: '🔨', desc: 'Cross-list dead stock automatically.' },
  { id: 'amazon', name: 'Amazon Seller', category: 'Marketplace', status: 'connected', icon: '📦', desc: 'FBA inventory tracking and reconciliation.' },
  { id: 'stockx', name: 'StockX', category: 'Marketplace', status: 'disconnected', icon: '👟', desc: 'Real-time valuation for sneaker inventory.' },
  { id: 'posh', name: 'Poshmark', category: 'Marketplace', status: 'disconnected', icon: '👗', desc: 'Social commerce automation.' },
  
  // Finance & ERP
  { id: 'qb', name: 'QuickBooks Online', category: 'Finance', status: 'connected', icon: '📊', desc: 'Push sales data and generate invoices.' },
  { id: 'xero', name: 'Xero', category: 'Finance', status: 'disconnected', icon: '🔵', desc: 'Cloud-based accounting software sync.' },
  { id: 'netsuite', name: 'Oracle NetSuite', category: 'ERP', status: 'disconnected', icon: '🏢', desc: 'Enterprise resource planning sync.' },
  { id: 'sap', name: 'SAP S/4HANA', category: 'ERP', status: 'disconnected', icon: '🇩🇪', desc: 'Enterprise inventory management.' },
  
  // Marketing & Comms
  { id: 'slack', name: 'Slack', category: 'Communication', status: 'disconnected', icon: '💬', desc: 'Receive liquidation alerts in #inventory-ops.' },
  { id: 'klaviyo', name: 'Klaviyo', category: 'Marketing', status: 'disconnected', icon: '✉️', desc: 'Trigger flows based on stock levels.' },
  { id: 'mailchimp', name: 'Mailchimp', category: 'Marketing', status: 'disconnected', icon: '🐵', desc: 'Email marketing automation.' },
];

export const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState(INTEGRATIONS_DATA);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const btnClick = (cb?: () => void) => (e: React.MouseEvent<any>) => {
    triggerEasterEgg(e);
    if (cb) cb();
  };

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'connected' ? 'disconnected' : 'connected' }
        : item
    ));
  };

  const filtered = integrations.filter(i => 
    (filter === 'All' || i.category === filter) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ['All', 'E-commerce', 'Marketplace', 'Finance', 'ERP', 'Communication', 'Marketing'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
            <h1 className="text-3xl font-bold mb-2">Integration Hub</h1>
            <p className="text-gray-400">Connect LiquiFlow to your existing tech stack (20+ supported services).</p>
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
               <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
               <input 
                 type="text" 
                 placeholder="Search tools..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 text-sm focus:border-neon-blue focus:outline-none"
               />
            </div>
         </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/10">
         {categories.map(cat => (
            <button 
               key={cat}
               onClick={btnClick(() => setFilter(cat))}
               className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  filter === cat ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'
               }`}
            >
               {cat}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filtered.map(item => (
            <GlassCard key={item.id} className="relative group flex flex-col h-full" glowColor={item.status === 'connected' ? 'emerald' : 'blue'}>
               <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl border border-white/10">
                     {item.icon}
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                     item.status === 'connected' 
                     ? 'bg-neon-emerald/10 text-neon-emerald border-neon-emerald/20' 
                     : 'bg-white/5 text-gray-500 border-white/10'
                  }`}>
                     {item.status}
                  </div>
               </div>

               <h3 className="font-bold text-lg mb-1">{item.name}</h3>
               <p className="text-xs text-neon-blue mb-4">{item.category}</p>
               <p className="text-sm text-gray-400 mb-6 flex-1">
                  {item.desc}
               </p>

               <div className="pt-4 border-t border-white/5 mt-auto">
                  <button 
                     onClick={btnClick(() => toggleConnection(item.id))}
                     className={`w-full py-2 rounded font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        item.status === 'connected'
                        ? 'bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-gray-300'
                        : 'bg-white text-black hover:bg-neon-blue'
                     }`}
                  >
                     {item.status === 'connected' ? 'Manage Connection' : 'Connect'}
                  </button>
               </div>
            </GlassCard>
         ))}

         {/* Request Card */}
         <button className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-8 text-gray-500 hover:border-neon-pink hover:text-neon-pink transition-all bg-white/5 hover:bg-white/10 min-h-[200px]">
            <Plus className="w-10 h-10 mb-4" />
            <span className="font-bold">Request Integration</span>
            <span className="text-xs mt-2 opacity-60">Don't see your tool? Let us know.</span>
         </button>
      </div>
    </div>
  );
};
