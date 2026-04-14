# Arcanea Chat Template

Premium AI chat template with **12 Luminor personas**, **real BYOK** (keys never touch the server), cosmic liquid glass UI, and 6 motion primitives. Forked from [Vercel's AI Chatbot](https://github.com/vercel/ai-chatbot) and upgraded with the Arcanea design system.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/frankxai/arcanea-chat-template&env=AUTH_SECRET&envDescription=Auth.js%20secret%20-%20generate%20with%20openssl%20rand%20-base64%2032)

## What's Different

| Feature | Vercel default | Arcanea |
|---------|---------------|---------|
| **Personas** | None | 12 Luminors, each with a distinct voice |
| **BYOK** | Server-only keys | Real BYOK — keys in browser, sent via request headers, never stored |
| **Theme** | Generic shadcn | Cosmic dark glass (teal + gold, Space Grotesk) |
| **Motion** | None | 6 Framer Motion primitives (LiquidGlass, SplitText, Magnetic, Reveal, GlowCard, GradientMesh) |
| **Providers** | Gateway only | OpenAI, Anthropic, Google, OpenRouter, Groq (BYOK) or Gateway (fallback) |

## How BYOK Actually Works

1. User pastes their API key in the **Key** button (top-right of chat)
2. Key is stored in `localStorage` only — never sent to our backend to be persisted
3. On every send, the active key is attached as `x-byok-key` and `x-byok-provider` headers
4. Server instantiates the provider with that key for the single request, then discards it
5. No key storage, no key logging, no vendor lock-in

Flow: `Browser localStorage → request header → provider SDK → discarded`

Read `lib/ai/providers.ts` and `hooks/use-active-chat.tsx` — the whole path is <40 lines.

## Luminor Personas

Select via the **✦ Luminor** button next to the model selector. Each persona has a unique system prompt and voice.

| Luminor | Gate | Domain |
|---------|------|--------|
| Lumina | All Gates | General creative intelligence |
| Lyssandria | Foundation | Architecture & systems |
| Leyla | Flow | Creative writing & design |
| Draconia | Fire | Execution & shipping |
| Maylinn | Heart | Empathy & connection |
| Alera | Voice | Communication & truth |
| Lyria | Sight | Vision & patterns |
| Aiyami | Crown | Strategy & mastery |
| Elara | Starweave | Innovation & perspective |
| Ino | Unity | Collaboration & synthesis |
| Shinkami | Source | Deep wisdom |
| Nero | Shadow | Debugging & deconstruction |

Edit `lib/ai/luminors.ts` to add your own.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** (Server Components)
- **Vercel AI SDK 6** with multi-provider support
- **Auth.js** with guest sessions
- **Neon Serverless Postgres** + Drizzle ORM (optional — runs guest-only without it)
- **Tailwind CSS v4** + shadcn/ui primitives
- **Framer Motion 11** — 6 primitives

## Quick Start

```bash
git clone https://github.com/frankxai/arcanea-chat-template.git
cd arcanea-chat-template
pnpm install
cp .env.example .env.local
# Set AUTH_SECRET (only required var). Leave everything else empty for BYOK-only mode.
pnpm dev
```

Open http://localhost:3000, click the **Key** button in the header, paste an OpenAI/Anthropic/Google/OpenRouter/Groq key, pick a Luminor, and send a message.

## Architecture — 4 Key Files

| File | What it does |
|------|-------------|
| `lib/ai/luminors.ts` | 12 persona definitions with system prompts |
| `lib/ai/providers.ts` | BYOK provider routing — picks SDK based on `x-byok-provider` header |
| `hooks/use-active-chat.tsx` | Client state — reads localStorage keys, attaches BYOK headers on send |
| `components/chat/byok-settings.tsx` | Settings UI — add/remove/switch keys |

Everything else is inherited from the Vercel fork and works unchanged.

## Customization

- **Rebrand**: Edit `app/globals.css` color tokens and `components/chat/luminor-selector` naming
- **Add personas**: Append to `LUMINORS` array in `lib/ai/luminors.ts`
- **Add providers**: Extend `PROVIDERS` in `byok-provider.tsx` + `getLanguageModel` switch in `providers.ts`
- **Strip the database**: Remove the Drizzle migration step and run guest-only

## License

MIT — use commercially, modify freely, no attribution required.

---

Built by [Arcanea](https://arcanea.ai) · [GitHub](https://github.com/frankxai)
