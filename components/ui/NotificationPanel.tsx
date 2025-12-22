
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: any[];
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, notifications }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0f0f13] border-l border-white/10 z-[101] shadow-2xl p-6 overflow-y-auto"
          >
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                   <Bell className="w-5 h-5 text-neon-blue" /> Notifications
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                   <X className="w-5 h-5" />
                </button>
             </div>

             <div className="space-y-4">
                {notifications.length === 0 ? (
                   <div className="text-center text-gray-500 py-10">No new notifications</div>
                ) : (
                   notifications.map((notif) => (
                      <GlassCard key={notif.id} className="p-4 border-l-4 border-l-neon-blue">
                         <div className="flex items-start gap-3">
                            <div className="mt-1">
                               {notif.type === 'alert' && <AlertTriangle className="w-4 h-4 text-neon-pink" />}
                               {notif.type === 'success' && <CheckCircle className="w-4 h-4 text-neon-emerald" />}
                               {notif.type === 'info' && <Info className="w-4 h-4 text-neon-blue" />}
                            </div>
                            <div>
                               <h4 className="font-bold text-sm mb-1">{notif.title}</h4>
                               <p className="text-xs text-gray-400 mb-2">{notif.message}</p>
                               <span className="text-[10px] text-gray-600 font-mono">{notif.time}</span>
                            </div>
                         </div>
                      </GlassCard>
                   ))
                )}
             </div>

             <div className="mt-8 pt-6 border-t border-white/10">
                <button className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors">
                   Mark all as read
                </button>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
