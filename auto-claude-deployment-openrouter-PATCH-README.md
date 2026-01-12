# Auto Claude Deployment & OpenRouter Patch

This patch file contains all changes needed to add **custom Claude deployment configuration** and **OpenRouter/Qwen3-8B embedding support** to Auto Claude.

## Files Modified

The patch includes changes to **14 files**:

### Backend Changes
1. `apps/backend/core/auth.py` - SDK environment variable pass-through
2. `apps/backend/integrations/graphiti/config.py` - OpenRouter provider support

### Frontend Changes
3. `apps/frontend/src/renderer/components/settings/DeploymentSettings.tsx` (NEW) - Deployment UI
4. `apps/frontend/src/renderer/components/settings/AppSettings.tsx` - Navigation integration
5. `apps/frontend/src/main/ipc-handlers/env-handlers.ts` - .env file generation
6. `apps/frontend/src/main/memory-env-builder.ts` - Memory provider configuration
7. `apps/frontend/src/renderer/components/onboarding/MemoryStep.tsx` - Onboarding UI
8. `apps/frontend/src/shared/constants/config.ts` - Default settings
9. `apps/frontend/src/shared/types/settings.ts` - Type definitions
10. `apps/frontend/src/shared/types/project.ts` - Project types

### Internationalization
11. `apps/frontend/src/shared/i18n/locales/en/settings.json` - English translations
12. `apps/frontend/src/shared/i18n/locales/en/onboarding.json` - English onboarding
13. `apps/frontend/src/shared/i18n/locales/fr/settings.json` - French translations
14. `apps/frontend/src/shared/i18n/locales/fr/onboarding.json` - French onboarding

## Features Added

### 1. Custom Claude Deployment
- **Anthropic Base URL** - Configure custom API endpoint (local proxies, enterprise)
- **Anthropic API Key** - Support for authenticated custom deployments
- **Max Output Tokens** - Set per-session token limits
- **Custom Command** - Override default claude CLI invocation

**Usage:** Settings → Deployment → Configure your endpoint

### 2. OpenRouter + Qwen3-8B Embedding
- **OpenRouter Provider** - Multi-provider aggregator for embeddings
- **Qwen3-8B (2026)** - Default embedding model with 4096 dimensions
- **Model Selection** - Support for Qwen3-8B, 4B, 0.6B variants
- **Configuration** - Onboarding flow & per-project settings

**Usage:** Onboarding → Memory → Select OpenRouter provider

## How to Apply

### Option 1: Using git apply (Recommended)
```bash
cd /path/to/Auto-Claude
git apply auto-claude-deployment-openrouter.patch
```

### Option 2: Using patch command
```bash
cd /path/to/Auto-Claude
patch -p1 < auto-claude-deployment-openrouter.patch
```

### Option 3: Manual application
If patch fails due to code drift, manually apply changes from the diff file.

## After Applying

1. **Rebuild the frontend:**
   ```bash
   cd apps/frontend
   npm install  # If any new dependencies
   npm run build
   ```

2. **Rebuild the Electron app:**
   ```bash
   npm run package  # Creates .dmg/.app
   ```

3. **Configure your deployment:**
   - Open Auto Claude
   - Go to Settings → Deployment
   - Enter your custom base URL and API key
   - Set custom command if needed

4. **Configure OpenRouter for memory:**
   - Start onboarding or go to Settings
   - Select OpenRouter as memory provider
   - Enter your OpenRouter API key
   - Use default `qwen/qwen3-embedding-8b` or specify another

## Environment Variables

The patch enables these environment variables to be passed through to Claude sessions:

- `ANTHROPIC_BASE_URL` - Custom API endpoint
- `ANTHROPIC_API_KEY` - Authentication key
- `CLAUDE_CODE_MAX_OUTPUT_TOKENS` - Token limit
- `CUSTOM_CLAUDE_DEPLOYMENT_COMMAND` - Full command override

For Graphiti memory:
- `OPENROUTER_API_KEY` - OpenRouter authentication
- `OPENROUTER_EMBEDDING_MODEL` - Embedding model (default: qwen/qwen3-embedding-8b)

## Compatibility

This patch is designed to work with the current Auto Claude codebase. If you encounter conflicts when applying to future updates:

1. The patch uses standard unified diff format
2. All changes are clearly commented in the code
3. No core functionality is removed, only extended
4. Backward compatibility is maintained

## Troubleshooting

**Patch fails to apply:**
- The codebase may have been updated since this patch was created
- Use `git apply --check` to test first
- Manually apply individual hunks from the diff file

**Build errors after patch:**
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run type-check`
- Clear caches: `npm run clean`

**Deployment settings not appearing:**
- Rebuild the frontend completely
- Check browser console for errors
- Verify the patch was applied to all files

## DMG vs App Folder

The generated DMG contains:
- Full Electron app bundle
- Frontend assets
- Backend Python code
- All dependencies bundled

**Benefits of DMG:**
- Standard macOS distribution format
- Easy installation (drag to Applications)
- Code signing ready
- Automatic updates support

**Benefits of App folder:**
- Portable, can run from anywhere
- Easier to inspect/debug
- Faster to build for testing

Both contain the same functionality. The DMG is recommended for distribution.

## Questions or Issues?

For patch-specific issues, check:
1. All 14 files were modified successfully
2. No merge conflicts in the patch
3. TypeScript compilation succeeds
4. Translation keys are all present

The patch preserves all existing functionality while adding the requested features.