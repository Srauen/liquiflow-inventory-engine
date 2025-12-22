
import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, TrendingUp, RefreshCw, Wand2, Info,
  TrendingDown, MoreVertical, Settings2, ArrowRight,
  Upload, Database, Check, AlertCircle, X, ChevronDown, Loader2, Download, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Product } from '../../types';
import { enhanceProductDetails } from '../../utils/gemini';
import { parseCSV } from '../../utils/csvParser';

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
  
  // Bulk Actions
  const [bulkPricePct, setBulkPricePct] = useState(0);
  const [bulkStockAdj, setBulkStockAdj] = useState(0);

  // AI Enrichment
  const [isEnriching, setIsEnriching] = useState(false);
  const [previewItems, setPreviewItems] = useState<any[]>([]);
  const [showEnrichPreview, setShowEnrichPreview] = useState(false);

  const filteredProducts = useMemo(() => products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const healthLabel = p.stockLevel > p.lowStockThreshold * 5 ? 'Overstock' : p.stockLevel < p.lowStockThreshold ? 'Low Stock' : 'Healthy';
    const matchesHealth = filterHealth === 'All' || filterHealth === healthLabel || 
      (filterHealth === 'At Risk' && p.liquidityScore < 40);
    return matchesSearch && matchesHealth;
  }), [products, searchTerm, filterHealth]);

  const downloadTemplate = () => {
    const headers = "sku,product_name,quantity_on_hand,unit_cost,liquidity_index,status\n";
    const rows = [
      "SNK-2077-NEON,Cyberrunner 2077 Sneakers,1500,120.00,88,active",
      "ACC-VIS-G3,Holo-Visor Gen 3,8500,55.00,42,active",
      "HW-CPU-QCORE,Quantum Core Processor,300,499.00,94,active",
      "OLD-HW-V2,Legacy Hardware V2,5,150.00,15,at-risk"
    ].join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'LIQUIFLOW_SCHEMA_TEMPLATE.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addNotification('Template Exported', 'Schema template ready for local editing.', 'info');
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
        addNotification('Bulk Ingest Complete', `Imported ${newProducts.length} items from CSV.`, 'success');
        setShowIngestModal(false);
      } catch (err) {
        addNotification('Ingest Error', 'Failed to parse CSV file structure.', 'alert');
      }
    }
  };

  const handleERPSync = () => {
    setIsSyncing(true);
    addNotification('Sync Pipeline Opening', 'Establishing secure link to NetSuite/SAP...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      addNotification('Ecosystem Reconciled', '241 records updated from source systems.', 'success');
    }, 2500);
  };

  const applyBulkActions = (status?: Product['status']) => {
    setProducts(prev => prev.map(p => {
      if (selectedIds.has(p.id)) {
        return {
          ...p,
          marketPrice: bulkPricePct !== 0 ? p.marketPrice * (1 + bulkPricePct / 100) : p.marketPrice,
          stockLevel: Math.max(0, p.stockLevel + bulkStockAdj),
          status: status || p.status
        };
      }
      return p;
    }));
    setSelectedIds(new Set());
    addNotification('Batch Complete', 'Applied adjustments to selected SKUs.', 'success');
  };

  const handleEnrich = async (targetProducts: Product[]) => {
    setIsEnriching(true);
    try {
      const enrichments = await Promise.all(targetProducts.map(async p => ({
          original: p,
          enhanced: await enhanceProductDetails(p)
      })));
      setPreviewItems(enrichments);
      setShowEnrichPreview(true);
    } finally {
      setIsEnriching(false);
    }
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden" />
      
      {/* 🟦 INGESTION PROTOCOL MODAL */}
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

                <div className="space-y-6 mb-10">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    To prevent data corruption and valuation errors, your CSV file must adhere to the standard schema.
                  </p>
                  
                  <div className="bg-black/40 border border-white/5 rounded-xl p-6 space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-neon-blue tracking-[0.2em]">Requirements</h4>
                    <ul className="space-y-3">
                      {[
                        "Do not include currency symbols (e.g., use 1500, not $1,500).",
                        "SKU must be unique across the system context.",
                        "Liquidity must be an integer between 0-100.",
                        "Download the strict schema below to begin."
                      ].map((req, i) => (
                        <li key={i} className="flex gap-3 text-xs text-gray-500">
                          <Check className="w-4 h-4 text-neon-emerald shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={downloadTemplate}
                    className="flex items-center justify-center gap-2 px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                  >
                    <Download className="w-4 h-4" /> DOWNLOAD_SCHEMA.csv
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 px-4 py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neon-blue transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    <Upload className="w-4 h-4" /> INITIALIZE UPLOAD
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🟦 FLOATING BULK CONSOLE */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4">
            <GlassCard className="flex flex-col md:flex-row items-center justify-between p-6 bg-void/95 border-neon-blue shadow-[0_0_50px_rgba(0,240,255,0.2)] gap-6">
              <div className="flex items-center gap-6">
                <div className="px-4 py-2 bg-neon-blue text-black rounded font-black text-[10px] tracking-tighter">
                  {selectedIds.size} SKUs SELECTED
                </div>
                <div className="h-10 w-px bg-white/10 hidden md:block" />
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-1">
                    <p className="text-[8px] font-mono text-gray-500 uppercase">Batch Price Adjustment</p>
                    <div className="flex items-center gap-2">
                       <input type="number" value={bulkPricePct} onChange={(e) => setBulkPricePct(Number(e.target.value))} className="w-16 bg-black/40 border border-white/10 rounded px-2 py-1 text-xs outline-none focus:border-neon-blue" />
                       <span className="text-[10px] text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-mono text-gray-500 uppercase">Stock Adjustment</p>
                    <input type="number" value={bulkStockAdj} onChange={(e) => setBulkStockAdj(Number(e.target.value))} className="w-16 bg-black/40 border border-white/10 rounded px-2 py-1 text-xs outline-none focus:border-neon-emerald" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => handleEnrich(products.filter(p => selectedIds.has(p.id)))} className="px-4 py-2 bg-white/5 border border-white/10 rounded text-[10px] font-bold hover:bg-neon-blue hover:text-black transition-all flex items-center gap-2">
                   <Wand2 className="w-3.5 h-3.5" /> AI ENRICH
                </button>
                <button onClick={() => applyBulkActions()} className="px-4 py-2 bg-neon-blue text-black rounded text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                   COMMIT BATCH
                </button>
                <button onClick={() => applyBulkActions('liquidating')} className="px-4 py-2 bg-neon-pink text-white rounded text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                   FORCE EXIT
                </button>
                <button onClick={() => setSelectedIds(new Set())} className="p-2 text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tighter uppercase">Inventory Engine</h1>
           <p className="text-gray-600 text-xs font-mono uppercase mt-1 tracking-[0.2em]">Operational Oversight Node</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setShowIngestModal(true)} className="px-5 py-2.5 bg-white text-black rounded font-black text-[10px] tracking-widest flex items-center gap-2 hover:bg-neon-blue transition-colors">
              <Upload className="w-3.5 h-3.5" /> BULK INGEST (CSV)
           </button>
           <button onClick={handleERPSync} disabled={isSyncing} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded font-bold text-[10px] tracking-widest flex items-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50">
              {isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5 text-neon-blue" />}
              ERP SYNC
           </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-white/5 p-5 rounded-xl border border-white/5">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-3 w-4 h-4 text-gray-600" />
          <input type="text" placeholder="FILTER SYSTEM BY SKU, NAME, OR STATUS..." className="w-full bg-void border border-white/10 rounded-lg py-2.5 pl-12 text-[11px] font-mono focus:border-neon-blue outline-none transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['All', 'Healthy', 'Low Stock', 'Overstock', 'At Risk'].map(label => (
            <button key={label} onClick={() => setFilterHealth(label)} className={`px-5 py-2 rounded text-[10px] font-black tracking-widest transition-all border ${filterHealth === label ? 'bg-white text-black border-white' : 'bg-black/40 text-gray-600 border-white/10 hover:border-white/30'}`}>{label.toUpperCase()}</button>
          ))}
        </div>
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
                     <th className="px-6 py-5 text-right tracking-widest">Valuation</th>
                     <th className="px-6 py-5 tracking-widest">Status</th>
                     <th className="px-6 py-5 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((p) => {
                  const healthLabel = p.stockLevel > p.lowStockThreshold * 5 ? 'Overstock' : p.stockLevel < p.lowStockThreshold ? 'Low Stock' : 'Healthy';
                  const healthColor = healthLabel === 'Healthy' ? 'text-neon-emerald' : healthLabel === 'Low Stock' ? 'text-neon-pink' : 'text-neon-blue';
                  const valuation = p.marketPrice * p.stockLevel;
                  
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
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#121216] ${healthLabel === 'Healthy' ? 'bg-neon-emerald' : healthLabel === 'Low Stock' ? 'bg-neon-pink' : 'bg-neon-blue'}`} />
                           </div>
                           <div>
                              <div className="text-[11px] font-black text-white uppercase tracking-tight">{p.name}</div>
                              <div className="flex gap-2 items-center">
                                 <span className="text-[9px] text-gray-600 font-mono">{p.sku}</span>
                                 <span className={`text-[8px] font-black uppercase ${healthColor}`}>{healthLabel}</span>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                           <div className="flex-1 w-32 h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${p.liquidityScore}%` }}
                                className={`h-full ${p.liquidityScore > 70 ? 'bg-neon-emerald' : p.liquidityScore > 40 ? 'bg-neon-blue' : 'bg-neon-pink'}`}
                              />
                           </div>
                           <span className={`text-xs font-mono font-black ${p.liquidityScore > 70 ? 'text-neon-emerald' : p.liquidityScore > 40 ? 'text-neon-blue' : 'text-neon-pink'}`}>{p.liquidityScore}</span>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-right font-mono text-[11px]">
                        <div className="text-white font-black">
                          {isNaN(valuation) ? "$ERR" : `$${valuation.toLocaleString()}`}
                        </div>
                        <div className="text-[9px] text-gray-600 uppercase tracking-tighter">{p.stockLevel} UNITS</div>
                     </td>
                     <td className="px-6 py-5">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                          p.status === 'active' ? 'border-neon-emerald/20 text-neon-emerald' : 'border-neon-pink/20 text-neon-pink'
                        }`}>
                          {p.status}
                        </span>
                     </td>
                     <td className="px-6 py-5 text-right">
                        <button onClick={() => addNotification('System Context', `Extended options for SKU: ${p.sku} coming soon.`, 'info')} className="p-2 text-gray-700 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                     </td>
                  </tr>
                  )})}
               </tbody>
            </table>
         </div>
      </GlassCard>

      {/* 🟦 AI ENRICHMENT MODAL (Side-by-Side) */}
      <AnimatePresence>
        {showEnrichPreview && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
            <GlassCard className="w-full max-w-6xl h-[85vh] flex flex-col p-10 border-neon-blue shadow-[0_0_100px_rgba(0,240,255,0.15)]">
              <div className="flex justify-between items-center mb-10 shrink-0">
                <div>
                   <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                     <Wand2 className="text-neon-blue" />
                     Intelligent Enrichment
                   </h2>
                   <p className="text-[11px] text-gray-600 font-mono uppercase mt-1 tracking-widest">Predictive Outcome: Average DOH reduction of 12.4% across batch</p>
                </div>
                <button onClick={() => setShowEnrichPreview(false)} className="p-3 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
                {previewItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-white/[0.02] rounded-2xl border border-white/5 relative group">
                    {/* Comparison Divider */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-void border border-white/10 rounded-full">
                       <ArrowRight className="w-4 h-4 text-neon-blue" />
                    </div>

                    {/* Original */}
                    <div className="opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-gray-500" />
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Legacy State</span>
                      </div>
                      <h4 className="font-black text-lg text-white mb-2 uppercase">{item.original.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.original.description || "No description provided."}</p>
                    </div>

                    {/* Enhanced */}
                    <div className="bg-neon-blue/5 p-6 rounded-xl border border-neon-blue/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse shadow-[0_0_10px_#00F0FF]" />
                           <span className="text-[9px] font-black text-neon-blue uppercase tracking-[0.2em]">Optimized State</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-neon-emerald">
                          <TrendingDown className="w-3 h-3" /> -12% DOH
                        </div>
                      </div>
                      <h4 className="font-black text-lg text-white mb-2 uppercase tracking-tight">{item.enhanced.name}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">{item.enhanced.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {item.enhanced.seoKeywords?.map((kw: string, i: number) => (
                          <span key={i} className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">#{kw}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/5 flex justify-end gap-6 items-center shrink-0">
                <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest hidden lg:block">System Verification complete: All updates align with exit protocol v4.1</p>
                <div className="flex gap-4">
                  <button onClick={() => setShowEnrichPreview(false)} className="px-8 py-3 rounded-full text-[10px] font-black text-gray-500 tracking-widest uppercase hover:text-white transition-colors">Discard Analysis</button>
                  <button onClick={() => {
                    setProducts(prev => prev.map(p => {
                      const enhancement = previewItems.find(item => item.original.id === p.id);
                      return enhancement ? { ...p, ...enhancement.enhanced } : p;
                    }));
                    setShowEnrichPreview(false);
                    setPreviewItems([]);
                    setSelectedIds(new Set());
                  }} className="bg-neon-blue text-black px-10 py-3 rounded-full text-[11px] font-black tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                    DEPLOY TO LIVE ENGINE
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
