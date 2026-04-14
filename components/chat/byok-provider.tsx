'use client';

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';

interface ProviderKey {
  provider: string;
  key: string;
  label: string;
}

interface BYOKContextType {
  keys: ProviderKey[];
  activeKey: ProviderKey | null;
  setActiveProvider: (provider: string) => void;
  addKey: (provider: string, key: string) => void;
  removeKey: (provider: string) => void;
  hasKey: (provider: string) => boolean;
}

const STORAGE_KEY = 'arcanea-byok-keys';
const ACTIVE_KEY = 'arcanea-byok-active';

const PROVIDERS = [
  { provider: 'openai', label: 'OpenAI', placeholder: 'sk-...' },
  { provider: 'anthropic', label: 'Anthropic', placeholder: 'sk-ant-...' },
  { provider: 'google', label: 'Google AI', placeholder: 'AI...' },
  { provider: 'openrouter', label: 'OpenRouter', placeholder: 'sk-or-...' },
  { provider: 'groq', label: 'Groq', placeholder: 'gsk_...' },
];

const BYOKContext = createContext<BYOKContextType | null>(null);

export function BYOKProvider({ children }: { children: ReactNode }) {
  const [keys, setKeys] = useState<ProviderKey[]>([]);
  const [activeProvider, setActiveProvider] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProviderKey[];
        setKeys(parsed);
        const persistedActive = localStorage.getItem(ACTIVE_KEY);
        const initial = persistedActive && parsed.find((k) => k.provider === persistedActive)
          ? persistedActive
          : parsed[0]?.provider ?? '';
        setActiveProvider(initial);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (activeProvider) localStorage.setItem(ACTIVE_KEY, activeProvider);
  }, [activeProvider]);

  function persistKeys(updated: ProviderKey[]) {
    setKeys(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function addKey(provider: string, key: string) {
    const label = PROVIDERS.find((p) => p.provider === provider)?.label ?? provider;
    const updated = [...keys.filter((k) => k.provider !== provider), { provider, key, label }];
    persistKeys(updated);
    if (!activeProvider) setActiveProvider(provider);
  }

  function removeKey(provider: string) {
    const updated = keys.filter((k) => k.provider !== provider);
    persistKeys(updated);
    if (activeProvider === provider) {
      setActiveProvider(updated[0]?.provider ?? '');
    }
  }

  function hasKey(provider: string) {
    return keys.some((k) => k.provider === provider);
  }

  const activeKey = keys.find((k) => k.provider === activeProvider) ?? null;

  return (
    <BYOKContext.Provider value={{
      keys,
      activeKey,
      setActiveProvider,
      addKey,
      removeKey,
      hasKey,
    }}>
      {children}
    </BYOKContext.Provider>
  );
}

export function useBYOK() {
  const ctx = useContext(BYOKContext);
  if (!ctx) throw new Error('useBYOK must be used within BYOKProvider');
  return ctx;
}

export { PROVIDERS };
