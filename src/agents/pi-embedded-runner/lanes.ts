// Phase 0 stub — session lane resolution.

export function resolveEmbeddedSessionLane(sessionKey: string): string {
  return `session:${sessionKey.trim() || "main"}`;
}
