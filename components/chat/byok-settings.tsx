"use client";

import { useEffect, useState } from "react";
import { KeyIcon, TrashIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBYOK, PROVIDERS } from "./byok-provider";

/**
 * BYOK settings — the sovereign key manager.
 * Keys are stored in localStorage only, NEVER sent to our servers.
 * At request time, the active key flows via x-byok-* headers and is
 * discarded after the provider call.
 */
export function BYOKSettings() {
  const [open, setOpen] = useState(false);
  const { keys, activeKey, setActiveProvider, addKey, removeKey } = useBYOK();
  const [selectedProvider, setSelectedProvider] = useState(PROVIDERS[0].provider);
  const [keyInput, setKeyInput] = useState("");

  useEffect(() => {
    if (!open) setKeyInput("");
  }, [open]);

  const currentProvider = PROVIDERS.find((p) => p.provider === selectedProvider);

  return (
    <>
      <Button
        className="h-8 gap-1.5 rounded-lg text-[12px]"
        onClick={() => setOpen(true)}
        size="sm"
        variant="ghost"
      >
        <KeyIcon className="size-3.5" />
        {activeKey ? (
          <span className="text-[#00bcd4]">{activeKey.label}</span>
        ) : (
          <span className="text-muted-foreground">Add API key</span>
        )}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0e16]/95 backdrop-blur-2xl p-6 shadow-[0_0_80px_rgba(0,188,212,0.12)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[#00bcd4]">✦</span>
              <h2 className="text-lg font-semibold">BYOK — Your Keys, Your Keep</h2>
            </div>
            <p className="mb-5 text-[12px] text-muted-foreground leading-relaxed">
              Keys live in your browser&apos;s localStorage. They travel via request headers
              only at send time and are never stored or logged on the server.
            </p>

            {/* Active keys list */}
            {keys.length > 0 && (
              <div className="mb-4 space-y-1.5">
                <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
                  Active keys
                </p>
                {keys.map((k) => (
                  <div
                    key={k.provider}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2"
                  >
                    <button
                      className="flex-1 text-left text-[13px]"
                      onClick={() => setActiveProvider(k.provider)}
                      type="button"
                    >
                      <span className={k.provider === activeKey?.provider ? "text-[#00bcd4]" : ""}>
                        {k.label}
                      </span>
                      <span className="ml-2 font-mono text-[10px] text-muted-foreground/60">
                        ••••{k.key.slice(-4)}
                      </span>
                    </button>
                    {k.provider === activeKey?.provider && (
                      <CheckIcon className="size-3.5 text-[#00bcd4]" />
                    )}
                    <button
                      aria-label={`Remove ${k.label} key`}
                      className="rounded p-1 text-muted-foreground/60 hover:bg-white/[0.05] hover:text-red-400"
                      onClick={() => removeKey(k.provider)}
                      type="button"
                    >
                      <TrashIcon className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new key */}
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
                Add key
              </p>
              <div className="flex gap-2">
                <select
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 text-[12px] outline-none focus:border-[#00bcd4]/50"
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  value={selectedProvider}
                >
                  {PROVIDERS.map((p) => (
                    <option key={p.provider} value={p.provider}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <input
                  className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12px] font-mono outline-none focus:border-[#00bcd4]/50"
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder={currentProvider?.placeholder ?? "sk-..."}
                  type="password"
                  value={keyInput}
                />
                <Button
                  className="h-auto"
                  disabled={!keyInput.trim()}
                  onClick={() => {
                    if (keyInput.trim()) {
                      addKey(selectedProvider, keyInput.trim());
                      setKeyInput("");
                    }
                  }}
                  size="sm"
                >
                  Save
                </Button>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <Button onClick={() => setOpen(false)} size="sm" variant="ghost">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
