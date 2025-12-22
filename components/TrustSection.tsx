
import React from 'react';
import { ShieldCheck, Lock, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SmoothSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const TrustSection: React.FC = () => {
  return (
    <section className="py-32 px-6 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <SmoothSection className="grid grid-cols-2 md:grid-cols-4 gap-12">
           <div className="flex flex-col items-center text-center gap-4">
              <ShieldCheck className="w-8 h-8 text-gray-500" />
              <div>
                 <h4 className="font-bold text-white mb-1">SOC2 Compliant</h4>
                 <p className="text-xs text-gray-500">Certified Security</p>
              </div>
           </div>
           <div className="flex flex-col items-center text-center gap-4">
              <Lock className="w-8 h-8 text-gray-500" />
              <div>
                 <h4 className="font-bold text-white mb-1">AES-256</h4>
                 <p className="text-xs text-gray-500">Bank-Grade Encryption</p>
              </div>
           </div>
           <div className="flex flex-col items-center text-center gap-4">
              <Globe className="w-8 h-8 text-gray-500" />
              <div>
                 <h4 className="font-bold text-white mb-1">Global Scale</h4>
                 <p className="text-xs text-gray-500">99.99% Uptime</p>
              </div>
           </div>
           <div className="flex flex-col items-center text-center gap-4">
              <CheckCircle className="w-8 h-8 text-gray-500" />
              <div>
                 <h4 className="font-bold text-white mb-1">Verified</h4>
                 <p className="text-xs text-gray-500">Shopify Plus Partner</p>
              </div>
           </div>
        </SmoothSection>
      </div>
    </section>
  );
};
