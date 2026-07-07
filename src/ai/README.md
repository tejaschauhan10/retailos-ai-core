# AI Layer (reserved)

This tree is a placeholder for the RetailOS AI Copilot. No implementation
lives here yet — only the architecture:

- `providers/` — model/gateway adapters (Lovable AI Gateway, custom LLMs).
- `context/` — request-scoped context builders (org, user, permissions).
- `prompts/` — prompt templates & versioned system instructions.
- `services/` — high-level use-case services consumed by feature modules.
- `types/` — shared AI types (messages, tool calls, streaming events).

A later sprint will wire this up. Do not add business logic here.