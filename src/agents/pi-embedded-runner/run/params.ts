// Phase 0 stub — client tool definition type.

export interface ClientToolDefinition {
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
}
