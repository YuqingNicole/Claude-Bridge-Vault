"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Share2, Zap, Database, Copy, Check, Lock, Globe, Layers } from 'lucide-react';

export default function ClaudeVault() {
  const [track, setTrack] = useState('private');
  const [result, setResult] = useState<{key:string, url: string} | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const mockKey = `sk-vault-${track}-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    const mockUrl = `${window.location.protocol}//${window.location.host}/api/v1/${track}`;
    setResult({ key: mockKey, url: mockUrl });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e2e8f0] selection:bg-cyan-500/30 font-mono relative overflow-hidden">
      {/* 背景装饰：电子流光感 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        {/* Header - 非线性布局 */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] tracking-[0.2em] uppercase font-bold">
              <Lock size={12}/> Secure API Refinery
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
              Claude <span className="text-cyan-500 not-italic">Vault</span>
            </h1>
            <p className="text-slate-500 max-w-sm leading-relaxed font-sans border-l-2 border-slate-800 pl-4">
              Dual-track isolation system for high-performance API distribution. Built for Nicole.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest leading-none">System Status</p>
            <p className="text-green-400 font-bold tracking-tighter text-lg uppercase">Core-Link Active</p>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左侧：炼制区 */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <Layers className="text-cyan-500" size={20}/> 
                <span className="tracking-tight uppercase text-slate-200">Refining Terminal</span>
              </h2>
              <div className="text-[10px] text-slate-500 font-bold border-b border-slate-800 pb-1">0x-VAULT-GEN-01</div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Select Distro-Track</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'botearn', label: 'BotEarn Net', icon: Globe },
                    { id: 'private', label: 'Private Core', icon: Shield }
                  ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setTrack(item.id)}
                      className={`flex items-center gap-3 py-4 px-6 rounded-2xl border transition-all duration-300 font-bold ${
                        track === item.id 
                        ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-[1.02]' 
                        : 'bg-black/40 border-white/5 text-slate-500 hover:border-white/20'
                      }`}
                    >
                      <item.icon size={18}/>
                      <span className="tracking-tight uppercase">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={generate}
                className="group w-full relative h-16 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-cyan-500/20 active:scale-[0.98] transition-all"
              >
                <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">Forge Distribution Credentials</span>
              </button>
            </div>
          </div>

          {/* 右侧：统计/预览 */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Asset Intelligence</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-400 font-bold">Master Claude Key</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-green-400 font-black">ENCRYPTED</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-400 font-bold">Active Sub-Keys</div>
                  <div className="text-lg font-black text-white leading-none">0</div>
                </div>
              </div>
            </div>

            {/* 结果显示区 - 极具个性的分享卡片 */}
            {result && (
              <div className="bg-cyan-500 text-black rounded-3xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-in zoom-in-95 fade-in duration-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 rotate-12 opacity-20">
                  <Share2 size={80}/>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Check size={12}/> Ready for Deployment
                </h4>
                <div className="space-y-6 relative z-10">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase opacity-60">Credentials (Key)</p>
                    <div className="flex gap-2">
                      <code className="text-xs font-black break-all flex-1">{result.key}</code>
                      <button onClick={() => copyToClipboard(result.key)} className="hover:opacity-60 transition-opacity">
                        {copied ? <Check size={16}/> : <Copy size={16}/>}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase opacity-60">Provisioned Endpoint</p>
                    <div className="flex gap-2">
                      <code className="text-[10px] font-bold break-all flex-1 italic">{result.url}</code>
                      <button onClick={() => copyToClipboard(result.url)} className="hover:opacity-60 transition-opacity">
                        <Share2 size={16}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </main>

        <footer className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center opacity-30 group hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Vault Engine v1.0.4 - Designed by Bao 💎</p>
          <div className="flex gap-4">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}
