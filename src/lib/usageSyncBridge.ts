export interface UsageSyncSettings {
  enabled: boolean;
  intervalSeconds: number;
  deviceId: string;
  remote: string;
  branch: string;
}
export interface UsageSyncStatus {
  settings: UsageSyncSettings | null;
  imported: boolean;
  phase: string;
  lastAttemptAt: string | null;
  lastSuccessAt: string | null;
  lastCollectedAt: string | null;
  lastError: string | null;
  lastCommit: string | null;
  collectorStatus: string | null;
}

const LOCAL_SAFE_STATUS: UsageSyncStatus = {
  settings: null,
  imported: false,
  phase: "disabled-local-safe",
  lastAttemptAt: null,
  lastSuccessAt: null,
  lastCollectedAt: null,
  lastError: null,
  lastCommit: null,
  collectorStatus: "local-only",
};

export async function getUsageSyncStatus(): Promise<UsageSyncStatus> {
  return structuredClone(LOCAL_SAFE_STATUS);
}
export async function saveUsageSyncSettings(_settings: UsageSyncSettings): Promise<UsageSyncStatus> {
  throw new Error("Usage sync is disabled in the local-safe build.");
}
export async function syncUsageNow(): Promise<UsageSyncStatus> {
  throw new Error("Usage sync is disabled in the local-safe build.");
}
export async function getSyncedComfortFeedback(): Promise<unknown[]> {
  return [];
}
