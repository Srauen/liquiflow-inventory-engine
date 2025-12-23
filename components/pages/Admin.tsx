
import React, { useState } from 'react';
import { Shield, User, MoreVertical, Ban, CheckCircle, Search, Briefcase, Activity, Key, Database, Cable, Settings } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { PageView } from '../../App';

interface AdminProps {
  onNavigate: (page: PageView, data?: any) => void;
}

const INITIAL_USERS = [
  { id: 1, name: 'Sarah Connor', role: 'Senior Analyst', department: 'Risk Mgmt', status: 'Active', access: 'Level 5', lastActive: '2m ago' },
  { id: 2, name: 'John Doe', role: 'Merchant', department: 'Sales', status: 'Active', access: 'Level 3', lastActive: '1h ago' },
  { id: 3, name: 'System Admin', role: 'Administrator', department: 'IT Core', status: 'Active', access: 'Level 10', lastActive: 'Now' },
  { id: 4, name: 'Marcus Wright', role: 'Junior Analyst', department: 'Operations', status: 'Suspended', access: 'Level 2', lastActive: '3d ago' },
  { id: 5, name: 'Elena Fisher', role: 'Merchant', department: 'Sales', status: 'Active', access: 'Level 3', lastActive: '5h ago' },
];

const ADMIN_TOOLS = [
  { id: 'integrations', label: 'API Connectors', icon: Cable, desc: 'Manage system-wide middleware integrations.' },
  { id: 'settings', label: 'Global Parameters', icon: Settings, desc: 'Configure default system-wide micro-economic constants.' },
  { id: 'reports', label: 'Governance Logs', icon: Database, desc: 'Full audit history of all SKU-level liquidation events.' },
  { id: 'security', label: 'Auth Protocols', icon: Key, desc: 'Manage Level 9/10 key rotation and biometric session locks.' },
];

export const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ));
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 italic tracking-tighter">
            <Shield className="w-8 h-8 text-neon-pink" />
            Control Hub
          </h1>
          <p className="text-gray-400 mt-2 font-mono text-[10px] uppercase tracking-widest">Personnel & Access Protocol Node</p>
        </div>
      </div>

      {/* Admin Tool Cards - Scattered Sub-features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {ADMIN_TOOLS.map(tool => (
            <GlassCard key={tool.id} glowColor="pink" className="flex flex-col p-6 hover:bg-white/[0.05] transition-all group">
               <div className="p-2 w-fit rounded bg-pink-500/10 border border-pink-500/20 mb-4 group-hover:border-neon-pink transition-all">
                  <tool.icon className="w-5 h-5 text-neon-pink" />
               </div>
               <h3 className="text-xs font-black uppercase tracking-widest mb-1">{tool.label}</h3>
               <p className="text-[10px] text-gray-500 leading-relaxed mb-6 flex-1">{tool.desc}</p>
               <button 
                 onClick={() => onNavigate(tool.id as PageView)}
                 className="text-[9px] font-black text-neon-pink uppercase hover:underline text-left"
               >
                  Access Controller
               </button>
            </GlassCard>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <GlassCard className="lg:col-span-3 p-0 overflow-hidden border-white/5 bg-black/40">
            <div className="p-6 border-b border-white/10 flex gap-6 items-center">
               <div className="relative flex-1">
                  <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    placeholder="Search personnel directory..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-void border border-white/10 rounded-lg py-3 pl-12 text-[11px] font-mono focus:border-neon-pink focus:outline-none transition-all"
                  />
               </div>
               <button className="px-6 py-3 bg-white text-black font-black text-[10px] tracking-widest uppercase rounded-lg hover:bg-neon-blue transition-colors">
                  Add Operator
               </button>
            </div>

            <table className="w-full text-sm text-left">
               <thead className="text-[9px] text-gray-600 uppercase bg-white/[0.02] font-mono">
                  <tr>
                     <th className="px-8 py-5 tracking-widest">User Identity</th>
                     <th className="px-8 py-5 tracking-widest">Access</th>
                     <th className="px-8 py-5 tracking-widest">Status</th>
                     <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/[0.03] transition-colors group">
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded bg-gray-900 border border-white/10 flex items-center justify-center font-black text-gray-500">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <div className="font-black text-white text-[11px] uppercase tracking-tight">{user.name}</div>
                                <div className="text-[9px] text-gray-600 font-mono uppercase">{user.role} // {user.department}</div>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-5 font-mono text-[10px] text-neon-violet font-bold">
                          {user.access}
                       </td>
                       <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-black tracking-widest border ${
                             user.status === 'Active' 
                             ? 'bg-neon-emerald/10 text-neon-emerald border-neon-emerald/20' 
                             : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                             {user.status === 'Active' ? <CheckCircle className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                             {user.status.toUpperCase()}
                          </span>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <button 
                             onClick={() => toggleStatus(user.id)}
                             className="p-2 hover:bg-white/10 rounded text-gray-700 hover:text-white transition-colors"
                          >
                             <MoreVertical className="w-4 h-4" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </GlassCard>

         <div className="space-y-8">
            <GlassCard glowColor="blue" className="bg-void/40 border-white/5">
               <h3 className="font-black mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gray-500">
                  <Activity className="w-4 h-4 text-neon-blue" />
                  System Health
               </h3>
               <div className="space-y-6">
                  <div>
                     <div className="flex justify-between items-center text-[10px] mb-2 font-mono text-gray-500 uppercase">
                        <span>Neural Compute</span>
                        <span className="text-neon-emerald">12%</span>
                     </div>
                     <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
                        <div className="bg-neon-emerald h-full" style={{ width: '12%' }}></div>
                     </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
                     <span>Thread Count</span>
                     <span className="text-white">1024</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
                     <span>Mem_Usage</span>
                     <span className="text-neon-blue">4.2GB</span>
                  </div>
               </div>
            </GlassCard>

            <GlassCard glowColor="pink" className="bg-void/40 border-white/5 p-8">
               <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-6 italic">Governance Log</h3>
               <div className="space-y-4 font-mono text-[9px]">
                  <div className="flex gap-4">
                     <span className="text-gray-700 shrink-0">10:42</span>
                     <span className="text-gray-400">ADMIN: PURGE_AUTH_CACHE initiated</span>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-gray-700 shrink-0">10:38</span>
                     <span className="text-gray-400">UID: S_CONNOR modified SKU_99_MD</span>
                  </div>
                  <div className="flex gap-4 border-l-2 border-l-red-500/40 pl-3 py-1">
                     <span className="text-red-900 shrink-0">09:15</span>
                     <span className="text-red-400 uppercase">Alert: Unrecognized IP Handshake</span>
                  </div>
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
};
