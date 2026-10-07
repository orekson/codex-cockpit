import { useCallback } from "react";
import type { SharedPlanBasis } from "../lib/sharedDailyPlan";

type ChangeKind = "person" | "risk";

// Local-safe build: daily recommendations remain fully local.
// The shape is kept compatible with the existing UI, but no cloud scope is read
// and no plan data is uploaded or downloaded.
export function useSharedDailyPlan(_basis: SharedPlanBasis | null, _initialRisk: number | null = null) {
  const change = useCallback((_kind: ChangeKind, _value: number | null, _personId?: string) => {
    // Intentionally local-only; App persists its local preference path separately.
  }, []);
  return {
    plan: null,
    deviceId: null,
    connected: false,
    scopeReady: true,
    error: false,
    conflict: false,
    pending: false,
    change,
  };
}
