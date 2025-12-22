
import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, TrendingUp, RefreshCw, Wand2, Info,
  TrendingDown, MoreVertical, Settings2, ArrowRight,
  Upload, Database, Check, AlertCircle, X, ChevronDown, Loader2, Download, FileText,
  DollarSign, Activity, PieChart, ShieldAlert, Zap, Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Product } from '../../types';
import { enhanceProductDetails } from '../../utils/gemini';
import { parseCSV } from '../../utils/csvParser';
import { calculateHoldingCost, calculateInventoryTurnover } from '../../utils/MicroeconomicsEngine';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface InventoryProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onLiquidate: (id: string) => void;
  onDelete: (id: string) => void;
  addNotification: (title: string, message: string, type?: 'success' | 'alert' | 'info') => void;
}

export const Inventory: React.FC<InventoryProps> = ({ products, setProducts, addNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHealth, setFilterHealth] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showIngestModal, setShowIngestModal] = useState(false);
  
  // Economics Toggles
  const [isLiquidationSim, setIsLiquidationSim] = useState(false);
  const [isAccountingView, setIsAccountingView] = useState(false);

  const filteredProducts = useMemo(() => products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const healthLabel = p.stockLevel > p.lowStockThreshold * 5 ? 'Overstock' : p.stockLevel < p.lowStockThreshold ? 'Low Stock' : 'Healthy';
    const matchesHealth = filterHealth === 'All' || filterHealth === healthLabel || 
      (filterHealth === 'At Risk' && p.liquidityScore < 40);
    return matchesSearch && matchesHealth;
  }), [products, searchTerm, filterHealth]);

  // Macro-Economic Stats
  const macroStats = useMemo(() => {
    const workingCapital = products.reduce((acc, p) => acc + (p.marketPrice * p.stockLevel), 0);
    const avgTurnover = products.length ? products.reduce((acc, p) => acc + calculateInventoryTurnover(p.velocity, p.stockLevel), 0) / products.length : 0;
    const projectedMonthly = products.reduce((acc, p) => acc + (p.marketPrice * p.velocity * 4), 0);
    return { workingCapital, avgTurnover, projectedMonthly };
  }, [products]);

  const downloadTemplate = () => {
    const headers = "sku,product_name,quantity_on_hand,unit_cost,target_margin,liquidity_index,status\n";
    const rows = [
      "SNK-2077-NEON,Cyberrunner 2077 Sneakers,1500,120.00,0.40,88,active",
      "ACC-VIS-G3,Holo-Visor Gen 3,8500,55.00,0.30,42,active"
    ].join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'LIQUIFLOW_ECONOMICS_TEMPLATE.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addNotification('Economic Template Ready', 'Schema with target_margin exported.', 'info');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const items = await parseCSV(file);
        const newProducts: Product[] = items.map((item, idx) => ({
          id: `csv-${Date.now()}-${idx}`,
          name: item.title,
          sku: item.sku,
          category: item.category,
          imageUrl: 'https://images.unsplash.com/photo-1555527833-2863920959f2?auto=format&fit=crop&w=400&q=80',
          costBasis: item.cost_price || 0,
          marketPrice: item.selling_price || 0,
          stockLevel: item.qty_on_hand || 0,
          lowStockThreshold: Math.floor((item.qty_on_hand || 100) * 0.1),
          velocity: 1.0,
          daysOnHand: 90,
          seasonalityIndex: 1.0,
          elasticityCoef: -1.5,
          liquidityScore: item.liquidity_score || 50,
          status: (item.status as any) || 'active'
        }));
        setProducts(prev => [...newProducts, ...prev]);
        addNotification('Batch Ingested', `Imported ${newProducts.length} items to Engine.`, 'success');
        setShowIngestModal(false);
      } catch (err) {
        addNotification('Ingest Error', 'Data format violation in CSV.', 'alert');
      }
    }
  };

  return (
    <div className="space-y-8">
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden" />
      
      {/* 🟦 SYSTEM INGESTION PROTOCOL MODAL */}
      <AnimatePresence>
        {showIngestModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-xl">
              <GlassCard className="p-10 border-neon-blue shadow-[0_0_100px_rgba(0,240,255,0.2)]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                      <Database className="text-neon-blue w-6 h-6" />
                      System Ingestion Protocol
                    </h2>
                    <p className="text-[10px] text-gray-500 font-mono mt-1 tracking-widest">GATEWAY_VERSION: 4.1.0-STRICT</p>
                  </div>
                  <button onClick={() => setShowIngestModal(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500"><X /></button>
                </div>
                <div className="space-y-6 mb-10 text-sm text-gray-400">
                  <p>To prevent data corruption and valuation errors, your CSV file must adhere to the standard schema.</p>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-6 space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-neon-blue tracking-[0.2em]">Strict Requirements</h4>
                    <ul className="space-y-3">
                      {["Do not include currency symbols (e.g. 1500, not $1,500).", "SKU must be unique across context.", "Liquidity Index must be an integer 0-100.", "Download strict schema below to begin."].map((req, i) => (
                        <li key={i} className="flex gap-3 text-xs text-gray-500"><Check className="w-4 h-4 text-neon-emerald shrink-0" />{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={downloadTemplate} className="flex items-center justify-center gap-2 px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                    <Download className="w-4 h-4" /> DOWNLOAD_SCHEMA.csv
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 px-4 py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neon-blue transition-all">
                    <Upload className="w-4 h-4" /> INITIALIZE UPLOAD
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tighter uppercase flex items-center gap-4">
             <Calculator className="w-8 h-8 text-neon-emerald" />
             Inventory Engine
           </h1>
           <p className="text-gray-600 text-xs font-mono uppercase mt-1 tracking-[0.2em]">Economic Oversight & Capital Flow Node</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsLiquidationSim(!isLiquidationSim)} 
             className={`px-5 py-2.5 rounded font-black text-[10px] tracking-widest flex items-center gap-2 transition-all border ${isLiquidationSim ? 'bg-neon-pink text-white border-neon-pink shadow-[0_0_20px_rgba(255,41,117,0.4)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
           >
              <Zap className="w-3.5 h-3.5" /> {isLiquidationSim ? 'SIMULATING 20% DISCOUNT' : 'QUICK LIQUIDATION SIM'}
           </button>
           <button onClick={() => setShowIngestModal(true)} className="px-5 py-2.5 bg-white text-black rounded font-black text-[10px] tracking-widest flex items-center gap-2 hover:bg-neon-blue transition-colors">
              <Upload className="w-3.5 h-3.5" /> BULK INGEST (CSV)
           </button>
        </div>
      </div>

      {/* 🟦 MACRO-ECONOMIC HEADER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
         <GlassCard className="p-6 border-l-4 border-l-neon-blue bg-neon-blue/[0.01]">
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Total Working Capital</p>
            <div className="text-3xl font-black text-white font-mono tracking-tighter">
               $<AnimatedCounter value={macroStats.workingCapital} />
            </div>
            <p className="text-[9px] text-gray-600 font-mono mt-2 uppercase">Aggregate valuation of all assets</p>
         </GlassCard>
         <GlassCard className="p-6 border-l-4 border-l-neon-violet bg-neon-violet/[0.01]">
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Avg Inventory Turnover</p>
            <div className="text-3xl font-black text-white font-mono tracking-tighter">
               {macroStats.avgTurnover.toFixed(2)}<span className="text-sm font-normal text-gray-500 ml-1">x/yr</span>
            </div>
            <p className="text-[9px] text-gray-600 font-mono mt-2 uppercase">Annual efficiency benchmark</p>
         </GlassCard>
         <GlassCard className="p-6 border-l-4 border-l-neon-emerald bg-neon-emerald/[0.01]">
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Projected Monthly Revenue</p>
            <div className="text-3xl font-black text-neon-emerald font-mono tracking-tighter">
               $<AnimatedCounter value={macroStats.projectedMonthly} />
            </div>
            <p className="text-[9px] text-gray-600 font-mono mt-2 uppercase">Real-time demand projection</p>
         </GlassCard>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-white/5 p-5 rounded-xl border border-white/5">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-3 w-4 h-4 text-gray-600" />
          <input type="text" placeholder="FILTER SYSTEM BY SKU, NAME, OR STATUS..." className="w-full bg-void border border-white/10 rounded-lg py-2.5 pl-12 text-[11px] font-mono focus:border-neon-blue outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['All', 'Healthy', 'Low Stock', 'Overstock', 'At Risk'].map(label => (
            <button key={label} onClick={() => setFilterHealth(label)} className={`px-5 py-2 rounded text-[10px] font-black tracking-widest transition-all border ${filterHealth === label ? 'bg-white text-black border-white' : 'bg-black/40 text-gray-600 border-white/10 hover:border-white/30'}`}>{label.toUpperCase()}</button>
          ))}
        </div>
        <div className="h-6 w-px bg-white/10 mx-2" />
        <button 
           onClick={() => setIsAccountingView(!isAccountingView)}
           className={`px-5 py-2 rounded text-[10px] font-black tracking-widest transition-all border ${isAccountingView ? 'bg-neon-blue text-black border-neon-blue' : 'bg-black/40 text-gray-600 border-white/10 hover:text-white'}`}
        >
           {isAccountingView ? 'ACCOUNTING: BOOK VALUE' : 'MARKET VALUE VIEW'}
        </button>
      </div>

      <GlassCard className="p-0 overflow-hidden border-white/5">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="text-[9px] text-gray-600 uppercase font-mono border-b border-white/5 bg-black/20">
                  <tr>
                     <th className="px-6 py-5 w-10">
                        <input type="checkbox" checked={selectedIds.size === filteredProducts.length && products.length > 0} onChange={() => setSelectedIds(selectedIds.size === filteredProducts.length ? new Set() : new Set(filteredProducts.map(p => p.id)))} />
                     </th>
                     <th className="px-6 py-5 tracking-widest">Identity & Health</th>
                     <th className="px-6 py-5 tracking-widest">Liquidity Index</th>
                     <th className="px-6 py-5 tracking-widest">Cash Drag</th>
                     <th className="px-6 py-5 text-right tracking-widest">Valuation</th>
                     <th className="px-6 py-5 tracking-widest">System Signal</th>
                     <th className="px-6 py-5"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((p) => {
                  const healthLabel = p.stockLevel < p.lowStockThreshold ? 'Buy Signal' : p.stockLevel > p.lowStockThreshold * 5 ? 'Overstock' : 'Healthy';
                  const healthColor = healthLabel === 'Healthy' ? 'text-neon-emerald' : healthLabel === 'Buy Signal' ? 'text-neon-blue animate-pulse' : 'text-neon-pink';
                  
                  // Economic Transformations
                  const currentPrice = isLiquidationSim ? p.marketPrice * 0.8 : p.marketPrice;
                  const displayPrice = isAccountingView ? p.costBasis : currentPrice;
                  const valuation = displayPrice * p.stockLevel;
                  const holdingCost = calculateHoldingCost(p.costBasis, p.daysOnHand);
                  const priceDelta = (Math.random() * 5 - 2).toFixed(1);

                  return (
                  <tr key={p.id} className={`hover:bg-white/5 transition-colors group ${selectedIds.has(p.id) ? 'bg-neon-blue/5' : ''}`}>
                     <td className="px-6 py-5">
                        <input type="checkbox" checked={selectedIds.has(p.id)} onChange={() => {
                        const next = new Set(selectedIds);
                        if (next.has(p.id)) next.delete(p.id); else next.add(p.id);
                        setSelectedIds(next);
                        }} />
                     </td>
                     <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                           <div className="relative">
                              <img src={p.imageUrl} className="w-10 h-10 rounded bg-gray-900 border border-white/10 grayscale group-hover:grayscale-0 transition-all" alt="" />
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#121216] ${p.liquidityScore > 70 ? 'bg-neon-emerald' : 'bg-neon-pink'}`} />
                           </div>
                           <div>
                              <div className="text-[11px] font-black text-white uppercase tracking-tight">{p.name}</div>
                              <div className="flex gap-2 items-center">
                                 <span className="text-[9px] text-gray-600 font-mono">{p.sku}</span>
                                 <span className={`text-[9px] font-black font-mono ${Number(priceDelta) > 0 ? 'text-neon-emerald' : 'text-neon-pink'}`}>
                                    {Number(priceDelta) > 0 ? '↑' : '↓'} {priceDelta}%
                                 </span>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-5">
                        <div className="flex items-center gap-4 group/liq">
                           <div className="flex-1 w-32 h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5 relative">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${p.liquidityScore}%` }}
                                className={`h-full ${p.liquidityScore > 70 ? 'bg-neon-emerald' : p.liquidityScore > 40 ? 'bg-neon-blue' : 'bg-neon-pink'}`}
                              />
                           </div>
                           <span className={`text-xs font-mono font-black ${p.liquidityScore > 70 ? 'text-neon-emerald' : 'text-neon-blue'}`}>{p.liquidityScore}</span>
                           
                           {/* Liquidity Velocity Tooltip */}
                           <div className="absolute hidden group-hover/liq:block z-50 bg-black border border-white/10 p-3 rounded shadow-2xl -mt-12">
                              <p className="text-[9px] text-gray-400 font-mono uppercase">Sales Velocity</p>
                              <p className="text-xs font-black text-white whitespace-nowrap">Moving {p.velocity} units / week</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-5">
                        <div className="text-[11px] font-mono text-neon-pink font-bold">
                           -${holdingCost.toFixed(2)}
                        </div>
                        <p className="text-[8px] text-gray-600 uppercase">Est. Total Hold Burn</p>
                     </td>
                     <td className="px-6 py-5 text-right font-mono text-[11px]">
                        <div className="text-white font-black">
                          ${valuation.toLocaleString()}
                        </div>
                        <div className="text-[9px] text-gray-600 uppercase tracking-tighter">{p.stockLevel} UNITS @ ${displayPrice.toFixed(2)}</div>
                     </td>
                     <td className="px-6 py-5">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border border-white/5 bg-white/5 ${healthColor}`}>
                          {healthLabel}
                        </span>
                     </td>
                     <td className="px-6 py-5 text-right">
                        <button onClick={() => addNotification('Analysis Node', `Detailed economics for ${p.sku} available in Strategic Lab.`, 'info')} className="p-2 text-gray-700 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  )})}
               </tbody>
            </table>
         </div>
      </GlassCard>
    </div>
  );
};
