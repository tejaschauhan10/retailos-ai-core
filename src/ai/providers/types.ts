/**
 * AI Provider contract. Future providers (OpenAI, Anthropic, Google, or
 * self-hosted models via Lovable AI Gateway) implement this interface so
 * business modules can call `aiService.complete(...)` without knowing
 * which model answered.
 */

export type AiProviderId = "lovable-ai" | "openai" | "anthropic" | "google" | "custom";

export interface AiMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
}

export interface AiCompletionRequest {
  model?: string;
  messages: AiMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  signal?: AbortSignal;
}

export interface AiCompletionChunk {
  delta: string;
  done: boolean;
}

export interface AiCompletionResult {
  content: string;
  model: string;
  provider: AiProviderId;
  usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number };
}

export interface AiProvider {
  readonly id: AiProviderId;
  readonly displayName: string;
  complete(request: AiCompletionRequest): Promise<AiCompletionResult>;
  stream?(request: AiCompletionRequest): AsyncIterable<AiCompletionChunk>;
}