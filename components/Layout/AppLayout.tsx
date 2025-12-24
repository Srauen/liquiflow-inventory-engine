
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Box, BrainCircuit, Banknote, 
  Workflow, Settings, LogOut, Shield, 
  Hexagon, User, Menu, X, Bell, Cable, FileText, Search, FlaskConical,
  Grid3X3, Zap, Target, TrendingUp, Globe, Database, Cpu, Command,
  Terminal, Share2, Scan, Activity, Network, ShieldAlert, BarChart3
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

const LOGO_GRADIENTS = [
  'from-neon-blue via-neon-violet to-neon-pink',
  'from-neon-emerald via-neon-blue to-neon-violet',
  'from-neon-gold via-orange-500 to-red-500'
];

interface NavItemData {
  id: string;
  label: string;
  icon: any;
  level?: number;
  hideIfCEO?: boolean;
}

// Added missing MenuGroup interface to fix type inference errors in menuGroups array
interface MenuGroup {
  title: string;
  level: number;
  items: NavItemData[];
}

const NavItem = ({ icon: Icon, label, id, active, onClick, colorClass }: any) => (
  <motion.button
    layout
    onClick={() => onClick(id)}
    whileHover={{ x: 4 }}
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all mb-1 ${
      active 
      ? `bg-white/5 ${colorClass || 'text-neon-blue'} border-r-2 ${colorClass ? 'border-current' : 'border-neon-blue'} shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]` 
      : 'text-gray-500 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? 'animate-pulse' : ''}`} />
    <span className="font-mono text-[9px] uppercase tracking-wider font-black">{label}</span>
  </motion.button>
);

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, user, activePage, onNavigate, onLogout, notifications = [], onToggleSandbox, isSandbox
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = React.useState(false);
  const [logoGradient, setLogoGradient] = useState(LOGO_GRADIENTS[0]);

  const handleLogoHover = () => {
    const next = LOGO_GRADIENTS[(LOGO_GRADIENTS.indexOf(logoGradient) + 1) % LOGO_GRADIENTS.length];
    setLogoGradient(next);
  };

  const menuGroups: MenuGroup[] = [
    {
      title: "STRATEGIC CORE",
      level: 10,
      items: [
        { id: 'strategic-oversight', label: 'Command Matrix', icon: Command },
        { id: 'stress-test', label: 'Yield Matrix', icon: BarChart3 },
        { id: 'dashboard', label: 'Global Telemetry', icon: Activity },
      ]
    },
    {
      title: "INTELLIGENCE",
      level: 10,
      items: [
        { id: 'neural-data', label: 'Neural Data Lake', icon: Database },
        { id: 'ai-center', label: 'Strategic Lab', icon: BrainCircuit },
      ]
    },
    {
      title: "INFRASTRUCTURE",
      level: 10,
      items: [
        { id: 'market-ops', label: 'Market Ops', icon: Globe },
        { id: 'system-kernel', label: 'System Kernel', icon: Terminal },
      ]
    },
    {
      title: "OPERATIONS",
      level: 1,
      items: [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, level: 1, hideIfCEO: true },
        { id: 'stress-test', label: 'Yield Matrix', icon: BarChart3, level: 10 },
        { id: 'inventory', label: 'Inventory Engine', icon: Box, level: 2 },
        { id: 'marketplaces', label: 'Omnichannel Hub', icon: Hexagon, level: 2 },
      ]
    },
    {
      title: "CAPITAL EFFICIENCY",
      level: 1,
      items: [
        { id: 'automation', label: 'Exit Automations', icon: Workflow, level: 2 },
        { id: 'finance', label: 'Finance & Tax', icon: Banknote, level: 1 },
        { id: 'reports', label: 'Liquidity Audits', icon: FileText, level: 1 },
      ]
    },
    {
      title: "ADMINISTRATION",
      level: 9,
      items: [
        { id: 'admin', label: 'Access Control', icon: Shield },
        { id: 'integrations', label: 'Integrations', icon: Cable },
        { id: 'settings', label: 'Configuration', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050507] flex relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="scanlines"></div>
      </div>

      <NotificationPanel isOpen={notifPanelOpen} onClose={() => setNotifPanelOpen(false)} notifications={notifications} />

      <motion.aside 
        layout
        initial={{ x: -280 }}
        animate={{ x: 0 }} 
        className={`fixed md:relative z-50 w-64 h-screen bg-black/90 backdrop-blur-3xl border-r border-white/5 flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-500`}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate('dashboard')} onMouseEnter={handleLogoHover}>
            <div className={`w-9 h-9 bg-neon-blue rounded-lg flex items-center justify-center transition-all duration-700 group-hover:bg-gradient-to-tr group-hover:${logoGradient} group-hover:rotate-[360deg] shadow-[0_0_25px_rgba(0,240,255,0.1)] group-hover:shadow-[0_0_35px_rgba(140,30,255,0.3)]`}>
               <span className="font-black font-mono text-lg text-black group-hover:text-white">L</span>
            </div>
            <h1 className="font-black tracking-tighter text-md text-white group-hover:text-neon-blue transition-colors">LiquiFlow</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
          <nav className="space-y-6">
            {menuGroups
              .filter(group => user.accessLevel >= group.level)
              .map((group, idx) => (
              <motion.div 
                layout 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="px-4 text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] mb-3 font-mono">{group.title}</h3>
                <div className="space-y-0.5">
                  {group.items
                    .filter(item => (!item.level || user.accessLevel >= item.level))
                    .filter(item => !(item.hideIfCEO && user.accessLevel === 10))
                    .map(item => (
                    <NavItem 
                      key={item.id} 
                      {...item} 
                      active={activePage === item.id} 
                      colorClass={item.id === 'stress-test' ? 'text-[#00FFFF]' : ''}
                      onClick={(id: any) => { onNavigate(id); setMobileMenuOpen(false); }} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </nav>
        </div>

        <div className="p-5 border-t border-white/5 bg-black/40">
           <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl mb-4 border border-white/5 group hover:border-white/10 transition-colors">
             <div className={`w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center transition-all ${user.accessLevel === 10 ? 'border border-neon-violet shadow-[0_0_12px_rgba(140,30,255,0.2)]' : ''}`}>
                <User className={`w-4 h-4 ${user.accessLevel === 10 ? 'text-neon-violet' : 'text-gray-500'}`} />
             </div>
             <div className="min-w-0">
                <p className="text-xs font-black truncate text-white uppercase tracking-tight">{user.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <Shield className={`w-2.5 h-2.5 ${user.accessLevel === 10 ? 'text-neon-violet' : user.accessLevel === 9 ? 'text-neon-pink' : 'text-neon-blue'}`} />
                   <p className="text-[8px] text-gray-500 uppercase tracking-widest font-black">LVL {user.accessLevel} // {user.role}</p>
                </div>
             </div>
          </div>
          <NavItem icon={LogOut} label="Disconnect" id="logout" active={false} onClick={onLogout} />
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl z-40">
           <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white"><Menu /></button>
              {user.accessLevel >= 2 && (
                <button onClick={onToggleSandbox} className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all font-black text-[9px] tracking-[0.2em] ${isSandbox ? 'bg-neon-violet border-neon-violet shadow-[0_0_20px_rgba(140,30,255,0.3)] text-white' : 'border-white/10 text-gray-400 hover:border-neon-violet hover:text-white'}`}>
                  <FlaskConical className={`w-3.5 h-3.5 ${isSandbox ? 'animate-bounce' : ''}`} />
                  {isSandbox ? 'SANDBOX ACTIVE' : 'OPEN LIQUIDITY SANDBOX™'}
                </button>
              )}
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-4 text-[8px] font-mono font-black text-gray-600 uppercase tracking-widest">
                 <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" /> Consensus: Valid</div>
                 <div className="w-px h-3 bg-white/10 mx-1" />
                 <div className="flex items-center gap-1.5"><Cpu className="w-2.5 h-2.5" /> Ops: Stable</div>
              </div>
              <button onClick={() => setNotifPanelOpen(true)} className="relative p-2.5 text-gray-500 hover:text-white transition-colors bg-white/[0.02] rounded-lg border border-white/5">
                 <Bell className="w-4 h-4" />
                 {notifications.length > 0 && <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-neon-pink rounded-full shadow-[0_0_8px_#FF2975]"></span>}
              </button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
           {children}
        </div>
      </main>
    </div>
  );
};
