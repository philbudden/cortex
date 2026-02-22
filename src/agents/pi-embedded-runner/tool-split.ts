// Phase 0 stub — tool split not implemented.

export function splitSdkTools<T>(tools: T[]): { sdkTools: T[]; clientTools: T[] } {
  return { sdkTools: tools, clientTools: [] };
}
