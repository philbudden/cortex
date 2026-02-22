// Phase 0 stub — types for the pi-embedded runner interface.
// These are retained for compatibility while the runner is being replaced.

export interface EmbeddedPiAgentMeta {
  usage?: unknown;
  promptTokens?: number;
  model?: string;
  provider?: string;
  sessionId?: string;
  lastCallUsage?: unknown;
}

export interface EmbeddedPiRunMeta {
  error?: unknown;
  agentMeta?: EmbeddedPiAgentMeta;
  systemPromptReport?: unknown;
}

export interface EmbeddedPiRunResult {
  meta?: EmbeddedPiRunMeta;
  content?: string;
}

export interface EmbeddedPiCompactResult {
  success: boolean;
  error?: string;
}
