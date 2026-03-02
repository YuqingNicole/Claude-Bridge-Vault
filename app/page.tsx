import React from 'react';
import { 
  Shield, 
  Key, 
  Activity, 
  Database, 
  Server, 
  Lock,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function VaultDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 font-sans selection:bg-cyan-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                CLAUDE BRIDGE VAULT <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-cyan-400">RC-1</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium">Enterprise Neural Gateway</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-slate-900/50 border border-white/5 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">SYSTEM READY</span>
            </div>
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Tracks', value: '2', icon: Server, color: 'text-cyan-400' },
            { label: 'Neural Traffic', value: '1.4GB', icon: Activity, color: 'text-blue-400' },
            { label: 'Master Keys', value: '1', icon: Key, color: 'text-purple-400' },
            { label: 'Sub-Keys', value: '24', icon: Database, color: 'text-indigo-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/[0.07] transition-all group">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Live</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tracks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Track A: BotEarn */}
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Database size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                  <Database className="text-cyan-400 w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Track A: BotEarn Warehouse</h3>
              </div>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-sm">
                Collaborative neural distribution for production. Shared capacity with automated sub-key rotation and usage billing.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-cyan-50 transition-colors flex items-center gap-2">
                  Launch Manager <ChevronRight size={16} />
                </button>
                <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-colors">
                  API Specs
                </button>
              </div>
            </div>
          </div>

          {/* Track B: Internal */}
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Lock size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                  <Lock className="text-purple-400 w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Track B: Private Vault</h3>
              </div>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-sm">
                Isolated neural instance for internal R&D. Direct Master Key pass-through with zero-log security protocols.
              </p>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl text-sm hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-lg shadow-purple-900/20">
                  Enter Vault <ChevronRight size={16} />
                </button>
                <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-colors">
                  Network Logs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Traffic Table Area */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white tracking-tight uppercase text-sm">Neural Activity Feed</h3>
            <span className="text-xs text-slate-500 font-mono">ID: 0x92...F2</span>
          </div>
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">POST</div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-tight">/api/v1/botearn/messages</div>
                    <div className="text-[10px] text-slate-500 font-mono">LATENCY: 482ms</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-indigo-400">200 OK</div>
                  <div className="text-[10px] text-slate-600 font-mono">12:04:22 UTC</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
