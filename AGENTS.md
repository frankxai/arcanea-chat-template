# arcanea-chat-template — AGENTS.md

Starter template for Arcanea chat applications.

## Harness

- Manifest: `.agent-harness.json`
- Risk: template
- Deploy policy: none
- Health: `pnpm dev`
- Agent files: `AGENTS.md`, `CLAUDE.md`
- Global hooks: disabled.

## Operating Rules

1. Keep the starter generic and easy to fork.
2. Avoid embedding real provider keys, account IDs, or production URLs.
3. Prefer documented extension points over template-specific magic.
4. For code changes, run the lightest available local check; use `pnpm dev` only when a runtime check is needed.

