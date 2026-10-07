import { isTauri } from "./bridge";
import type { UpdateChannel } from "../types";

export const RELEASE_URL = import.meta.env.VITE_RELEASE_URL || "";

export type AppUpdatePlatform = "windows" | "macos";

export interface AppUpdateInfo {
  version: string;
  body: string | null;
  date: string | null;
  platform: AppUpdatePlatform;
  channel: UpdateChannel;
  releaseUrl: string;
  automaticInstall: boolean;
}

export interface AppUpdateProgress {
  downloadedBytes: number;
  totalBytes: number | null;
  percent: number | null;
}

// Local-safe build: automatic updater transport is intentionally disabled.
// Releases may still be opened manually in the browser for user-controlled updates.
export function getPendingAppUpdate(): AppUpdateInfo | null { return null; }
export function checkForAppUpdate(_channel: UpdateChannel = "stable"): Promise<AppUpdateInfo | null> {
  return Promise.resolve(null);
}
export async function downloadAppUpdate(_onProgress: (progress: AppUpdateProgress) => void): Promise<void> {
  throw new Error("Automatic updates are disabled in the local-safe build.");
}
export async function installAppUpdate(): Promise<void> {
  throw new Error("Automatic updates are disabled in the local-safe build.");
}
export async function discardAppUpdate(): Promise<void> {
  return;
}
export async function openReleasePage(_url = RELEASE_URL): Promise<void> {
  if (!RELEASE_URL.startsWith("https://github.com/")) return;
  if (!isTauri()) { window.open(RELEASE_URL, "_blank", "noopener,noreferrer"); return; }
  const { openUrl } = await import("@tauri-apps/plugin-opener");
  await openUrl(RELEASE_URL);
}
