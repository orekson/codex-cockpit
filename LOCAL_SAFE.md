# Local Safe build

This branch keeps Codex usage analysis local while removing credential and sync paths that are not required for the dashboard.

## Preserved

- Codex quota via the installed `codex app-server --stdio`
- Local Codex session/task scanning for token, model, project and task statistics
- Daily/history views and local cost estimates
- Daily recommended-usage calculation
- Reset-risk public data used by the recommendation UI
- Local preferences, local group labels, backups, notifications and autostart

## Removed or disabled

- Direct reading of `~/.codex/auth.json`
- Direct Bearer-token calls to ChatGPT quota endpoints
- Cloudflare cloud sync
- Legacy Git usage sync / push
- Task/project upload and peer snapshots
- Shared daily-plan transport
- Third-party AI provider credential/database readers (Qoder, Trae, WorkBuddy, Volcengine, Antigravity)
- Automatic update download/install and updater permissions
- Process/relaunch plugin

## Network boundary

The safe build still contacts the public reset-risk sources configured by the project and may open GitHub release pages when the user explicitly requests them. Codex quota itself is obtained through the locally installed Codex App Server. Local session contents are not sent by the safe-build code paths.

If the Codex App Server cannot provide quota data, the app reports quota as unavailable instead of falling back to `auth.json`.
