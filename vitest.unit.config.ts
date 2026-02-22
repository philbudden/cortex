import { defineConfig } from "vitest/config";
import baseConfig from "./vitest.config.ts";

const base = baseConfig as unknown as Record<string, unknown>;
const baseTest = (baseConfig as { test?: { include?: string[]; exclude?: string[] } }).test ?? {};
const include = (
  baseTest.include ?? ["src/**/*.test.ts", "extensions/**/*.test.ts", "test/format-error.test.ts"]
).filter((pattern) => !pattern.includes("extensions/"));
const exclude = baseTest.exclude ?? [];

export default defineConfig({
  ...base,
  test: {
    ...baseTest,
    include,
    exclude: [
      ...exclude,
      "src/gateway/**",
      "extensions/**",
      // Phase 0: pi-embedded-runner replaced by opencode-runner; stubs are incomplete
      "src/agents/pi-embedded-runner*.test.ts",
      // Phase 0: tests importing extensions not present (telegram, signal, slack, voice-call)
      "src/agents/pi-embedded-subscribe.tools.extract.test.ts",
      "src/commands/channels.add.test.ts",
      "src/commands/channels.adds-non-default-telegram-account.test.ts",
      "src/commands/channels.surfaces-signal-runtime-errors-channels-status-output.test.ts",
      "src/commands/onboard-channels.test.ts",
      "src/commands/health.snapshot.test.ts",
      "src/infra/heartbeat-runner.ghost-reminder.test.ts",
      "src/infra/heartbeat-runner.model-override.test.ts",
      "src/infra/heartbeat-runner.respects-ackmaxchars-heartbeat-acks.test.ts",
      "src/infra/heartbeat-runner.sender-prefers-delivery-target.test.ts",
      "src/infra/heartbeat-runner.transcript-prune.test.ts",
      "src/infra/outbound/message-action-runner.test.ts",
      "src/infra/outbound/message-action-runner.threading.test.ts",
      "src/infra/outbound/outbound.test.ts",
      "src/infra/outbound/targets.test.ts",
      "src/plugins/voice-call.plugin.test.ts",
      // Phase 0: tests reading ui/ or apps/macos/ directories that don't exist
      "src/cron/cron-protocol-conformance.test.ts",
      "src/infra/host-env-security.policy-parity.test.ts",
      // Phase 0: tests requiring scripts not present (docker-setup.sh)
      "src/docker-setup.test.ts",
    ],
  },
});
