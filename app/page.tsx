'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Activity, 
  Database, 
  Server, 
  Lock,
  ChevronRight,
  Plus,
  X,
  Copy,
  Check
} from 'lucide-react';

export default function VaultDashboard() {
  const [activeModal, setActiveModal] = useState<null | 'trackA' | 'trackB'>(null);
  const [copied, setCopied] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");

  const generateSubKey = (prefix: string) => {
    const random = Math.random().toString(36).substring(2, 10);
    const key = `sk-vault-${prefix}-${random}`;
    setGeneratedKey(key);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          </div>
        </header>

        {/* Tracks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Track A: BotEarn */}
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all">
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
                Collaborative neural distribution. Click below to generate new Sub-Keys for external agents.
              </p>
              <button 
                onClick={() => { setActiveModal('trackA'); generateSubKey('botearn'); }}
                className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-cyan-50 transition-colors flex items-center gap-2"
              >
                Launch Manager <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Track B: Internal */}
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
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
                Isolated neural instance. Secured Master Key access for internal R&D nodes.
              </p>
              <button 
                onClick={() => { setActiveModal('trackB'); generateSubKey('private'); }}
                className="px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl text-sm hover:bg-purple-500 transition-colors flex items-center gap-2"
              >
                Enter Vault <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#121215] border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {activeModal === 'trackA' ? <Database className="w-4 h-4 text-cyan-400"/> : <Lock className="w-4 h-4 text-purple-400"/>}
                  {activeModal === 'trackA' ? 'BotEarn Key Generator' : 'Private Key Access'}
                </h3>
                <button onClick={() => setActiveModal(null)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">New Neural Sub-Key</label>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-cyan-400 flex-1 truncate">{generatedKey}</code>
                    <button onClick={copyToClipboard} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="text-[11px] text-slate-500 leading-relaxed bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                  <p>💡 Use this key in your target agent's header as <code className="text-slate-300">x-api-key</code>. All traffic will be routed through the {activeModal === 'trackA' ? 'BotEarn' : 'Private'} track.</p>
                </div>

                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-all"
                >
                  Close & Deploy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
