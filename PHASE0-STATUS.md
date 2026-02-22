# Phase 0 - Completion Status

## Requirements from PLAN.md

### Completed ✅

1. **Fork OpenClaw and remove unused components** ✅
   - Copied OpenClaw source to repository root
   - Removed all mobile apps (iOS, Android, macOS)
   - Removed all channel extensions except Matrix
   - Removed Pi embedded runner
   - Removed UI, packages, and cloud deployment configs
   - Removed OpenClaw-specific files

2. **Stub opencode-runner/index.ts** ✅
   - Created `src/agents/opencode-runner/index.ts`
   - Implements `runOpencodeAgent()` returning hardcoded response
   - Returns: `Hello from Cortex! I received your message: "{message}" (Phase 0 stub)`

3. **Add Python FastEmbed service scaffold** ✅
   - Created `services/fastembed/main.py`
   - Implemented health endpoints: `/`, `/health`, `/ready`
   - Added `Dockerfile` for FastEmbed service
   - Added `requirements.txt` (fastapi, uvicorn)

4. **Add docker-compose.yml** ✅
   - Created `docker-compose.yml` with gateway + fastembed
   - Configured cortex network
   - Added environment variables and health checks
   - No OpenCode service yet (as per Phase 0 spec)

5. **Set up CI** ✅
   - Created `.github/workflows/cortex-ci.yml`
   - Lint job (format check + oxlint)
   - Typecheck job (build)
   - Test job (unit tests)
   - Docker build job (both images)

### Remaining Tasks ⚠️

1. **Verify remaining TypeScript compiles with Matrix extension only**
   - Need to test: `pnpm install && pnpm build`
   - Expected: Build succeeds with only Matrix extension active
   - **Blocker**: Requires Node.js 22+ environment

2. **Test Exit Criteria**
   - Run `docker compose up`
   - Verify gateway starts successfully
   - Verify Matrix connects to homeserver
   - Verify hardcoded reply arrives in Matrix DM
   - **Blocker**: Requires Matrix homeserver configuration

## Exit Criteria (from PLAN.md)

> `docker compose up` → gateway starts, Matrix connects, hardcoded reply arrives in Matrix DM

### What's Needed

To complete Phase 0, the following must be verified:

1. **Build Verification**
   ```bash
   pnpm install
   pnpm build
   # Should succeed with no errors
   ```

2. **Docker Compose Test**
   ```bash
   docker compose build
   docker compose up -d
   docker compose logs -f
   # Should see:
   # - cortex-gateway starting
   # - cortex-fastembed health endpoint responding
   # - No critical errors
   ```

3. **Matrix Integration Test**
   - Configure Matrix credentials in `.env`
   - Gateway connects to Matrix homeserver
   - Send a message to the bot in a DM
   - Receive hardcoded response:
     `Hello from Cortex! I received your message: "{your message}" (Phase 0 stub)`

## Next Steps

1. Set up Node.js 22+ environment
2. Run `pnpm install && pnpm build` to verify compilation
3. Fix any TypeScript compilation errors
4. Configure Matrix credentials
5. Test `docker compose up`
6. Verify Matrix connection and hardcoded response
7. Mark Phase 0 as complete

## Notes

- All code changes are committed to `phase-0-scaffold` branch
- No push to remote yet (as per AGENTS.md)
- OpenClaw reference clone in `openclaw/` is gitignored
- Project renamed to "cortex" throughout codebase
