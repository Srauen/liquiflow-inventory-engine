
import React, { useState } from 'react';
import { FileText, Download, DollarSign, PieChart, ShieldAlert, AlertCircle, Check } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { MOCK_TAX_DOCS } from '../../utils/MockData';
import { AnimatePresence, motion } from 'framer-motion';

export const Finance: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const handleDownloadClick = (doc: any) => {
    setSelectedDoc(doc);
  };

  const confirmDownload = () => {
    // Simulate download
    console.log(`Downloading ${selectedDoc.type}...`);
    setSelectedDoc(null);
  };

  return (
    <div className="space-y-8 relative">
       
       {/* Legal Disclaimer Modal */}
       <AnimatePresence>
         {selectedDoc && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            >
               <GlassCard className="max-w-xl w-full border-neon-pink/30 shadow-[0_0_50px_rgba(255,41,117,0.2)]">
                  <div className="flex items-center gap-3 mb-6 text-neon-pink border-b border-white/10 pb-4">
                     <ShieldAlert className="w-8 h-8" />
                     <h2 className="text-xl font-bold">Liability Disclaimer</h2>
                  </div>
                  
                  <div className="space-y-4 text-sm text-gray-300 leading-relaxed mb-8 h-48 overflow-y-auto custom-scrollbar p-2 bg-black/20 rounded">
                     <p className="font-bold text-white">Please read carefully before downloading:</p>
                     <p>1. <strong>LiquiFlow AI is not a registered tax advisor</strong>, accounting firm, or legal counsel. The "Form 8283" generated is a data aggregation based on your inventory inputs.</p>
                     <p>2. <strong>Fair Market Value (FMV) Accuracy:</strong> While our AI estimates FMV based on market data, you are solely responsible for verifying these values with a qualified appraiser for deductions over $5,000.</p>
                     <p>3. <strong>Indemnification:</strong> By downloading this document, you agree to indemnify LiquiFlow AI Inc. from any penalties, audits, or interest levied by the IRS or relevant tax authorities.</p>
                     <p>4. <strong>Verification:</strong> You verify that the inventory items listed have physically been donated to the 501(c)(3) charity indicated.</p>
                  </div>

                  <div className="flex justify-end gap-4">
                     <button 
                        onClick={() => setSelectedDoc(null)} 
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                     >
                        Cancel
                     </button>
                     <button 
                        onClick={confirmDownload} 
                        className="px-6 py-2 bg-neon-pink text-white font-bold rounded hover:bg-white hover:text-black transition-colors flex items-center gap-2"
                     >
                        <Check className="w-4 h-4" /> I Agree & Download
                     </button>
                  </div>
               </GlassCard>
            </motion.div>
         )}
       </AnimatePresence>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="p-8 bg-gradient-to-br from-neon-emerald/5 to-transparent">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neon-emerald/20 rounded-full text-neon-emerald">
                   <DollarSign className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-400">Total Tax Write-off Value (YTD)</p>
                   <h2 className="text-3xl font-bold text-white">$42,590.00</h2>
                </div>
             </div>
             <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-neon-emerald w-[65%]"></div>
             </div>
             <p className="text-xs text-gray-500 mt-2">65% of annual limit reached</p>
          </GlassCard>

          <GlassCard className="p-8">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neon-blue/20 rounded-full text-neon-blue">
                   <PieChart className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm text-gray-400">Liquidated Cash (YTD)</p>
                   <h2 className="text-3xl font-bold text-white">$128,400.00</h2>
                </div>
             </div>
             <div className="flex gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-neon-blue rounded-full"></div> Markdowns</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-neon-violet rounded-full"></div> B2B Auctions</span>
             </div>
          </GlassCard>
       </div>

       <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
             <FileText className="w-5 h-5 text-neon-pink" />
             Tax Documentation Center
          </h2>
          <GlassCard className="p-0 overflow-hidden">
             <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-gray-400 font-mono text-xs uppercase">
                   <tr>
                      <th className="px-6 py-4">Document Type</th>
                      <th className="px-6 py-4">Date Generated</th>
                      <th className="px-6 py-4">Value</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {MOCK_TAX_DOCS.map(doc => (
                      <tr key={doc.id} className="hover:bg-white/5">
                         <td className="px-6 py-4 font-bold text-white">{doc.type}</td>
                         <td className="px-6 py-4 text-gray-400">{doc.date}</td>
                         <td className="px-6 py-4 font-mono">${doc.amount.toLocaleString()}</td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${
                               doc.status === 'Ready' 
                               ? 'bg-neon-emerald/10 text-neon-emerald border-neon-emerald/20' 
                               : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            }`}>
                               {doc.status.toUpperCase()}
                            </span>
                         </td>
                         <td className="px-6 py-4">
                            <button 
                               onClick={() => handleDownloadClick(doc)}
                               className="flex items-center gap-2 text-neon-blue hover:text-white transition-colors text-xs font-bold"
                            >
                               <Download className="w-4 h-4" /> DOWNLOAD
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </GlassCard>
       </div>
    </div>
  );
};
