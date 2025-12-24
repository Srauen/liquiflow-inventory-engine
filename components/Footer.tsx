
import React from 'react';
// Corrected: Import PageView from types.ts
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black text-center md:text-left">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
         
         <div className="col-span-1">
            <h2 className="text-xl font-bold tracking-tight mb-6">LiquiFlow</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
               The operating system for modern inventory liquidity.
            </p>
         </div>
         
         <div className="col-span-1">
            <h4 className="font-bold text-sm text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
               <li onClick={() => onNavigate('landing')} className="hover:text-white cursor-pointer transition-colors">Features</li>
               <li onClick={() => onNavigate('pricing')} className="hover:text-white cursor-pointer transition-colors">Pricing</li>
               {/* Fixed: 'feature-tax' was not in the PageView union. Pointing to 'finance' which contains the tax documentation. */}
               <li onClick={() => onNavigate('finance')} className="hover:text-white cursor-pointer transition-colors">Tax Shield</li>
            </ul>
         </div>

         <div className="col-span-1">
            <h4 className="font-bold text-sm text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
               <li className="hover:text-white cursor-pointer transition-colors">About</li>
               <li className="hover:text-white cursor-pointer transition-colors">Manifesto</li>
               <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
            </ul>
         </div>

         <div className="col-span-1">
             <h4 className="font-bold text-sm text-white mb-6">Legal</h4>
             <ul className="space-y-4 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
                <li className="hover:text-white cursor-pointer transition-colors">Security</li>
             </ul>
         </div>
      </div>
      <div className="container mx-auto px-6 max-w-7xl mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600 font-mono tracking-wider">
         © 2025–2026 LiquiFlow Inc. | Designed & Developed by Srirama Vathsan
      </div>
    </footer>
  );
};
