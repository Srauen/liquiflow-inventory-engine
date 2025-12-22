
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Box, BrainCircuit, Banknote, 
  Workflow, Settings, LogOut, Shield, 
  Hexagon, User, Menu, X, Bell, Cable, FileText, Search, FlaskConical
} from 'lucide-react';
import { UserProfile } from '../../types';
import { NotificationPanel } from '../ui/NotificationPanel';

interface AppLayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  notifications?: any[];
  onToggleSandbox: () => void;
  isSandbox: boolean;
}

const NavItem = ({ icon: Icon, label, id, active, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all mb-1 ${
      active 
      ? 'bg-neon-blue/10 text-neon-blue border-r-2 border-neon-blue' 
      : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
  </button>
);

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, user, activePage, onNavigate, onLogout, notifications = [], onToggleSandbox, isSandbox
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = React.useState(false);

  const menuGroups = [
    {
      title: "OPERATIONS",
      items: [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'inventory', label: 'Inventory Engine', icon: Box },
        { id: 'ai-center', label: 'Strategic Lab', icon: BrainCircuit },
        { id: 'marketplaces', label: 'Omnichannel Hub', icon: Hexagon },
      ]
    },
    {
      title: "CAPITAL EFFICIENCY",
      items: [
        { id: 'automation', label: 'Exit Automations', icon: Workflow },
        { id: 'finance', label: 'Finance & Tax', icon: Banknote },
        { id: 'reports', label: 'Liquidity Audits', icon: FileText },
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { id: 'integrations', label: 'Integrations', icon: Cable },
        { id: 'admin', label: 'Access Control', icon: Shield },
        { id: 'settings', label: 'Configuration', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f13] flex relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="scanlines"></div>
      </div>

      <NotificationPanel 
        isOpen={notifPanelOpen} 
        onClose={() => setNotifPanelOpen(false)} 
        notifications={notifications} 
      />

      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: 0 }} 
        className={`fixed md:relative z-50 w-64 h-screen bg-black/90 backdrop-blur-xl border-r border-white/5 flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-300`}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-blue rounded flex items-center justify-center">
               <span className="font-bold font-mono text-lg text-black">L</span>
            </div>
            <h1 className="font-bold tracking-tighter text-white">LiquiFlow</h1>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-gray-400"><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          <nav className="space-y-6">
            {menuGroups.map((group, idx) => (
              <div key={idx}>
                <h3 className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2 font-mono">{group.title}</h3>
                <div className="space-y-0.5">
                  {group.items.map(item => (
                    <NavItem key={item.id} {...item} active={activePage === item.id} onClick={(id: any) => { onNavigate(id); setMobileMenuOpen(false); }} />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
           <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-4">
             <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center"><User className="w-4 h-4 text-gray-400" /></div>
             <div className="min-w-0">
                <p className="text-xs font-bold truncate text-white">{user.name}</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">{user.role}</p>
             </div>
          </div>
          <NavItem icon={LogOut} label="Disconnect" id="logout" active={false} onClick={onLogout} />
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur z-40">
           <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white"><Menu /></button>
              
              <button 
                onClick={onToggleSandbox}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all font-bold text-[10px] tracking-widest ${
                  isSandbox ? 'bg-neon-violet border-neon-violet' : 'border-white/10 hover:border-neon-violet'
                }`}
              >
                <FlaskConical className={`w-3.5 h-3.5 ${isSandbox ? 'animate-pulse' : ''}`} />
                {isSandbox ? 'SANDBOX ACTIVE' : 'OPEN LIQUIDITY SANDBOX™'}
              </button>
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden md:block relative w-64">
                 <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-600" />
                 <input type="text" placeholder="GLOBAL SKILL SEARCH..." className="w-full bg-white/5 border border-white/10 rounded py-1.5 pl-9 text-[10px] font-mono focus:border-neon-blue outline-none" />
              </div>

              <button onClick={() => setNotifPanelOpen(true)} className="relative p-2 text-gray-500 hover:text-white transition-colors">
                 <Bell className="w-4.5 h-4.5" />
                 {notifications.length > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-neon-pink rounded-full"></span>}
              </button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
           {children}
        </div>
      </main>
    </div>
  );
};
