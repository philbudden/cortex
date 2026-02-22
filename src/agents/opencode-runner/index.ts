/**
 * OpenCode Runner Adapter
 *
 * This module replaces the Pi embedded runner and provides integration
 * with OpenCode for agent execution.
 *
 * Phase 0: Hardcoded response stub
 * Phase 1: Will implement actual OpenCode Server integration (Mode A)
 * Phase 4: Will add ephemeral container mode (Mode B)
 */

export interface OpencodeRunnerConfig {
  mode?: "server" | "ephemeral";
  serverUrl?: string;
  sessionId?: string;
}

export interface AgentRequest {
  message: string;
  sessionId: string;
  threadId?: string;
}

export interface AgentResponse {
  content: string;
  sessionId: string;
}

/**
 * Phase 0 stub: Returns a hardcoded response for testing
 *
 * @param request - The agent request
 * @param config - Runner configuration (unused in Phase 0)
 * @returns A hardcoded response
 */
export async function runOpencodeAgent(
  request: AgentRequest,
  _config?: OpencodeRunnerConfig,
): Promise<AgentResponse> {
  // Phase 0: Hardcoded response for testing
  return {
    content: `Hello from Cortex! I received your message: "${request.message}" (Phase 0 stub)`,
    sessionId: request.sessionId,
  };
}

/**
 * Initialize the OpenCode runner
 * Phase 0: No-op
 */
export async function initializeOpencodeRunner(_config?: OpencodeRunnerConfig): Promise<void> {
  // Phase 0: No initialization needed
}

/**
 * Cleanup the OpenCode runner
 * Phase 0: No-op
 */
export async function shutdownOpencodeRunner(): Promise<void> {
  // Phase 0: No cleanup needed
}
