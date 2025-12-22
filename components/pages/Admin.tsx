
import React, { useState } from 'react';
import { Shield, User, MoreVertical, Ban, CheckCircle, Search, Briefcase, Activity } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const INITIAL_USERS = [
  { id: 1, name: 'Sarah Connor', role: 'Senior Analyst', department: 'Risk Mgmt', status: 'Active', access: 'Level 5', lastActive: '2m ago' },
  { id: 2, name: 'John Doe', role: 'Merchant', department: 'Sales', status: 'Active', access: 'Level 3', lastActive: '1h ago' },
  { id: 3, name: 'System Admin', role: 'Administrator', department: 'IT Core', status: 'Active', access: 'Level 10', lastActive: 'Now' },
  { id: 4, name: 'Marcus Wright', role: 'Junior Analyst', department: 'Operations', status: 'Suspended', access: 'Level 2', lastActive: '3d ago' },
  { id: 5, name: 'Elena Fisher', role: 'Merchant', department: 'Sales', status: 'Active', access: 'Level 3', lastActive: '5h ago' },
];

export const Admin: React.FC = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ));
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-neon-pink" />
            Admin & HR Console
          </h1>
          <p className="text-gray-400 mt-2">Manage personnel access, roles, and security clearances.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-neon-blue text-black font-bold rounded hover:bg-white transition-colors">
              + Add Personnel
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <GlassCard className="lg:col-span-3 p-0 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex gap-4">
               <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search personnel directory..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 text-sm focus:border-neon-pink focus:outline-none"
                  />
               </div>
            </div>

            <table className="w-full text-sm text-left">
               <thead className="text-xs text-gray-500 uppercase bg-white/5 font-mono">
                  <tr>
                     <th className="px-6 py-4">User Identity</th>
                     <th className="px-6 py-4">Department</th>
                     <th className="px-6 py-4">Access</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Last Active</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/10 font-bold">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <div className="font-bold text-white">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.role}</div>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-gray-300">
                          <div className="flex items-center gap-2">
                             <Briefcase className="w-3 h-3 text-neon-blue" /> {user.department}
                          </div>
                       </td>
                       <td className="px-6 py-4 font-mono text-xs text-neon-violet">
                          {user.access}
                       </td>
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold border ${
                             user.status === 'Active' 
                             ? 'bg-neon-emerald/10 text-neon-emerald border-neon-emerald/20' 
                             : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                             {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                             {user.status.toUpperCase()}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-gray-500 text-xs">
                          {user.lastActive}
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button 
                             onClick={() => toggleStatus(user.id)}
                             className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                             title={user.status === 'Active' ? "Suspend User" : "Activate User"}
                          >
                             {user.status === 'Active' ? <Ban className="w-4 h-4 text-red-400" /> : <CheckCircle className="w-4 h-4 text-neon-emerald" />}
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </GlassCard>

         <div className="space-y-6">
            <GlassCard glowColor="blue">
               <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neon-blue" />
                  System Health
               </h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-400">Server Load</span>
                     <span className="text-neon-emerald font-mono">12%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1 rounded-full">
                     <div className="bg-neon-emerald h-full rounded-full" style={{ width: '12%' }}></div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-400">Security Threats</span>
                     <span className="text-neon-blue font-mono">0 Detected</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-400">Active Sessions</span>
                     <span className="text-white font-mono">42</span>
                  </div>
               </div>
            </GlassCard>

            <GlassCard glowColor="pink">
               <h3 className="font-bold mb-4">Audit Log</h3>
               <div className="space-y-3 text-xs">
                  <div className="flex gap-2">
                     <span className="text-gray-500 font-mono">10:42</span>
                     <span className="text-gray-300">Admin purged cache</span>
                  </div>
                  <div className="flex gap-2">
                     <span className="text-gray-500 font-mono">10:38</span>
                     <span className="text-gray-300">Sarah Connor updated SKU-99</span>
                  </div>
                  <div className="flex gap-2">
                     <span className="text-gray-500 font-mono">09:15</span>
                     <span className="text-red-400">Failed login attempt (IP: 192...)</span>
                  </div>
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
};
