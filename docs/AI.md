# AI Platform

Do not couple business modules to any AI vendor. Modules import
`getAiProvider()` from `src/ai/providers/registry.ts` and speak to the
returned `AiProvider`.

Planned providers:

* Lovable AI Gateway (default)
* OpenAI
* Anthropic
* Google
* Open-source models via custom adapter

Prompt templates live in `src/ai/prompts/`; request-scoped context builders
in `src/ai/context/`; high-level use-case services in `src/ai/services/`.
