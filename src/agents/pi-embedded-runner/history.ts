// Phase 0 stub — history limit utilities not implemented.

export function getHistoryLimitFromSessionKey(_sessionKey: string): number | undefined {
  return undefined;
}

export function getDmHistoryLimitFromSessionKey(_sessionKey: string): number | undefined {
  return undefined;
}

export function limitHistoryTurns<T>(turns: T[], _limit: number): T[] {
  return turns;
}
