
import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, BarChart, Loader2, Plus, Check } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const INITIAL_REPORTS = [
  { id: 1, name: 'Q3 Liquidity Analysis', type: 'PDF', date: 'Oct 1, 2024', size: '2.4 MB' },
  { id: 2, name: 'Annual Tax Write-off Summary (Form 8283)', type: 'CSV', date: 'Jan 15, 2024', size: '450 KB' },
  { id: 3, name: 'Dead Stock Aging Report', type: 'XLSX', date: 'Today', size: '1.2 MB' },
  { id: 4, name: 'Marketplace Velocity Audit', type: 'PDF', date: 'Yesterday', size: '3.8 MB' },
];

export const Reports: React.FC = () => {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filterType, setFilterType] = useState('ALL');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        name: `Custom Liquidity Audit #${Math.floor(Math.random() * 1000)}`,
        type: 'PDF',
        date: 'Just now',
        size: '1.5 MB'
      };
      setReports([newReport, ...reports]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      // alert("Download finished!"); // Optional: Don't interrupt flow with alert, just reset state
    }, 1500);
  };

  const filteredReports = filterType === 'ALL' 
    ? reports 
    : reports.filter(r => r.type === filterType);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-bold mb-2">Reports Center</h1>
            <p className="text-gray-400">Export financial data, tax documents, and inventory audits.</p>
         </div>
         <button 
           onClick={handleGenerateReport}
           disabled={isGenerating}
           className="flex items-center gap-2 px-4 py-2 bg-neon-violet text-white font-bold rounded hover:bg-violet-500 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(140,30,255,0.3)]"
         >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <BarChart className="w-4 h-4" />} 
            {isGenerating ? 'Analyzing Data...' : 'Generate New Report'}
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Featured Report */}
         <GlassCard className="lg:col-span-3 p-8 bg-gradient-to-r from-neon-blue/10 to-transparent border-neon-blue/30">
            <div className="flex justify-between items-start">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-xs font-bold mb-4 border border-neon-blue/30">
                     READY FOR DOWNLOAD
                  </div>
                  <h2 className="text-2xl font-bold mb-2">End of Month Valuation</h2>
                  <p className="text-gray-400 max-w-xl">
                     Your comprehensive inventory valuation report for October is ready. It includes updated FMV calculations based on recent AI market analysis.
                  </p>
               </div>
               <button 
                 onClick={() => handleDownload(9999)}
                 className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center gap-2"
               >
                  {downloadingId === 9999 ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} 
                  {downloadingId === 9999 ? 'Downloading...' : 'Download PDF'}
               </button>
            </div>
         </GlassCard>

         {/* Filters */}
         <GlassCard className="lg:col-span-1 space-y-6">
            <h3 className="font-bold flex items-center gap-2">
               <Filter className="w-4 h-4 text-neon-pink" /> Filters
            </h3>
            
            <div className="space-y-4">
               <div>
                  <label className="block text-xs text-gray-500 mb-2">DATE RANGE</label>
                  <div className="flex items-center gap-2 bg-black/20 p-2 rounded border border-white/10">
                     <Calendar className="w-4 h-4 text-gray-400" />
                     <span className="text-sm">Last 30 Days</span>
                  </div>
               </div>

               <div>
                  <label className="block text-xs text-gray-500 mb-2">FILE TYPE</label>
                  <div className="flex gap-2">
                     <button 
                       onClick={() => setFilterType(filterType === 'PDF' ? 'ALL' : 'PDF')}
                       className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${filterType === 'PDF' ? 'bg-neon-blue text-black border-neon-blue' : 'bg-white/5 text-gray-400 hover:bg-white/10 border-transparent'}`}
                     >
                       PDF
                     </button>
                     <button 
                       onClick={() => setFilterType(filterType === 'CSV' ? 'ALL' : 'CSV')}
                       className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${filterType === 'CSV' ? 'bg-neon-blue text-black border-neon-blue' : 'bg-white/5 text-gray-400 hover:bg-white/10 border-transparent'}`}
                     >
                       CSV
                     </button>
                     <button 
                       onClick={() => setFilterType(filterType === 'XLSX' ? 'ALL' : 'XLSX')}
                       className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${filterType === 'XLSX' ? 'bg-neon-blue text-black border-neon-blue' : 'bg-white/5 text-gray-400 hover:bg-white/10 border-transparent'}`}
                     >
                       XLS
                     </button>
                  </div>
               </div>
            </div>
         </GlassCard>

         {/* List */}
         <GlassCard className="lg:col-span-2 p-0 overflow-hidden">
            <table className="w-full text-sm text-left">
               <thead className="text-xs text-gray-500 uppercase bg-white/5 font-mono">
                  <tr>
                     <th className="px-6 py-4">Report Name</th>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4">Size</th>
                     <th className="px-6 py-4">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No reports match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((rpt) => (
                     <tr key={rpt.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-white/5 rounded text-gray-300">
                                 <FileText className="w-4 h-4" />
                              </div>
                              <div>
                                 <div className="font-bold text-white">{rpt.name}</div>
                                 <div className="text-xs text-gray-500">{rpt.type}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{rpt.date}</td>
                        <td className="px-6 py-4 font-mono text-xs">{rpt.size}</td>
                        <td className="px-6 py-4">
                           <button 
                             onClick={() => handleDownload(rpt.id)}
                             className={`text-neon-blue hover:text-white transition-colors ${downloadingId === rpt.id ? 'animate-pulse' : ''}`}
                           >
                              {downloadingId === rpt.id ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                           </button>
                        </td>
                     </tr>
                  )))}
               </tbody>
            </table>
         </GlassCard>
      </div>
    </div>
  );
};
