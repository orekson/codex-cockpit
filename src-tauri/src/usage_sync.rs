//! Local-only Codex project/task usage bridge for the safe build.
use crate::codex_project_usage;

#[tauri::command]
pub async fn get_codex_project_usage(
    _app: tauri::AppHandle,
) -> Result<codex_project_usage::ProjectUsageSnapshot, String> {
    codex_project_usage::get_codex_project_usage().await
}
