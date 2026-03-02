'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, type Lang, type T } from '@/lib/i18n';

const STORAGE_KEY = 'vault:lang';

interface LangContextValue {
  lang: Lang;
  t: T;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  t: translations.en,
  toggle: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'zh' || stored === 'en') setLang(stored);
  }, []);

  const toggle = () => {
    setLang((l) => {
      const next: Lang = l === 'en' ? 'zh' : 'en';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang] as T, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function LangToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className={className ?? 'px-3 py-1.5 border border-black/20 rounded-lg text-xs font-medium hover:bg-black hover:text-white hover:border-black transition-colors'}
      title={lang === 'en' ? 'Switch to Chinese' : '切换为英文'}
    >
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  );
}
