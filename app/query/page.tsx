'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Activity, 
  Clock, 
  Database, 
  ShieldCheck,
  Zap,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function UsageQuery() {
  const [keyInput, setKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleQuery = async () => {
    if (!keyInput.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // 获取所有 key 列表并筛选（后续可优化为精准 Get 接口）
      const response = await fetch('/api/v1/manage/keys');
      const allKeys = await response.json();
      
      if (allKeys[keyInput]) {
        const data = JSON.parse(allKeys[keyInput]);
        setResult({
          key: keyInput,
          ...data
        });
      } else {
        setError('Invalid Security Key. No record found in vault.');
      }
    } catch (err) {
      setError('Neural link timeout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 font-sans selection:bg-cyan-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[35%] bg-indigo-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/[0.03] border border-white/10 rounded-2xl mb-6">
            <ShieldCheck className="text-cyan-400 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Neural Key Inquiry</h1>
          <p className="text-slate-500 text-sm">Verify status and check neural traffic consumption</p>
        </div>

        {/* Search Box */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-2 mb-8 backdrop-blur-3xl focus-within:border-cyan-500/50 transition-all shadow-2xl">
          <div className="flex items-center">
            <div className="pl-4">
              <Search className="text-slate-500 w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Enter your sk-vault-xxxx key..."
              className="bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-700 w-full px-4 font-mono text-sm"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
            />
            <button 
              onClick={handleQuery}
              disabled={loading}
              className="px-6 py-3 bg-white text-black font-bold rounded-2xl text-xs hover:bg-cyan-50 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? 'ANALYZING...' : 'QUERY'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300 bg-red-500/5 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-xs font-medium">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Activity size={80} />
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${result.track === 'botearn' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    Track {result.track === 'botearn' ? 'A' : 'B'} • {result.name || 'Anonymous Agent'}
                  </span>
                  <div className="text-white font-mono text-xs mt-3 truncate max-w-[200px]">
                    {result.key}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white leading-none">{result.usage}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-tighter">Calls Count</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Created</span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <Zap size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-bold uppercase">
                    Authenticated
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database size={14} className="text-slate-600" />
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Neural Instance 01</span>
                </div>
                <button className="text-[10px] text-cyan-500 font-bold uppercase hover:text-white transition-colors">
                  View Specs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
