// Phase 0 stub — pi-embedded runner not implemented; replaced by opencode-runner.
import type { EmbeddedPiRunResult } from "./types.js";

export async function runEmbeddedPiAgent(
  _params: Record<string, unknown>,
): Promise<EmbeddedPiRunResult> {
  throw new Error("pi-embedded runner not implemented in Phase 0; use opencode-runner");
}
