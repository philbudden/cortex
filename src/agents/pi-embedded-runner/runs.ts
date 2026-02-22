// Phase 0 stub — pi-embedded run-state management not implemented.

export function isEmbeddedPiRunActive(_sessionKey: string): boolean {
  return false;
}

export function isEmbeddedPiRunStreaming(_sessionKey: string): boolean {
  return false;
}

export function abortEmbeddedPiRun(_sessionKey: string): boolean {
  return false;
}

export function queueEmbeddedPiMessage(_sessionKey: string, _message: unknown): void {
  // no-op
}

export async function waitForEmbeddedPiRunEnd(_sessionKey: string): Promise<void> {
  // no-op
}
