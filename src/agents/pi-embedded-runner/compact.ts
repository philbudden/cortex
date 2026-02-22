// Phase 0 stub — session compaction not implemented.
import type { EmbeddedPiCompactResult } from "./types.js";

export async function compactEmbeddedPiSession(
  _params: Record<string, unknown>,
): Promise<EmbeddedPiCompactResult> {
  return { success: false, error: "compaction not implemented in Phase 0" };
}
