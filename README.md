# Arcanea Chat Template

A premium AI chat template with liquid glass UI, 12 Luminor personas, and BYOK key management. Built on [Vercel's AI Chatbot](https://github.com/vercel/ai-chatbot) with the Arcanea cosmic design system.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/frankxai/arcanea-chat-template&env=AUTH_SECRET&envDescription=Auth.js%20secret%20for%20authentication&envLink=https://authjs.dev/getting-started)

## What's Different

| Feature | Vercel Default | Arcanea |
|---------|---------------|---------|
| Theme | Generic shadcn light/dark | Cosmic dark glass (teal/gold) |
| Personas | None | 12 Luminor agents with distinct voices |
| API Keys | Server-only | BYOK — keys stay in browser |
| Motion | None | 6 Framer Motion primitives |
| Glass | None | LiquidGlass v2 (4-layer composition) |

## Stack

- **Framework:** Next.js 16 (App Router)
- **AI:** Vercel AI SDK with multi-model support
- **Auth:** Auth.js with guest sessions
- **Database:** Neon Serverless Postgres (Drizzle ORM)
- **UI:** shadcn/ui + Arcanea glass + 6 motion primitives
- **Styling:** Tailwind CSS v4

## Luminor Personas

12 specialized AI agents, each with a distinct voice and domain:

| Luminor | Gate | Domain |
|---------|------|--------|
| Lumina | All | General creative intelligence |
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

## Motion Primitives

6 Framer Motion primitives included:

- **LiquidGlass** — 4-layer glass with noise, sheen, tilt, outer glow
- **SplitText** — Character-by-character blur-to-focus reveal
- **GlowCard** — Cursor-following border glow
- **Magnetic** — Cursor attraction for CTAs
- **Reveal** — Scroll-triggered blur-to-focus reveal
- **GradientMesh** — Animated radial gradient background

## Quick Start

```bash
git clone https://github.com/frankxai/arcanea-chat-template.git
cd arcanea-chat-template
pnpm install
cp .env.example .env.local
# Add your database URL and auth secret to .env.local
pnpm db:migrate
pnpm dev
```

## BYOK (Bring Your Own Key)

API keys are stored in localStorage — never sent to or stored on the server. Users pay their own provider directly. No margin, no middleman, no vendor lock-in.

Supported providers: OpenAI, Anthropic, Google AI, OpenRouter, Groq.

## License

MIT — use commercially, modify freely, no attribution required.

---

Built by [Arcanea](https://arcanea.ai) · [GitHub](https://github.com/frankxai)
