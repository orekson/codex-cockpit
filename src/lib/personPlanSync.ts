import type { WidgetPreferences } from "../types";

export type PersonPlan = Partial<Pick<WidgetPreferences, "dailyBudgetPercent" | "resetRiskOverridePercent">>;
/** Planning follows Beijing midnight; the usage ledger retains its historical 04:00 day. */
export function planDateKey(now: Date): string {
  return new Date(now.getTime() + 8 * 3_600_000).toISOString().slice(0, 10);
}
export function planPreferences(current: WidgetPreferences, plan: PersonPlan, day: string): WidgetPreferences | null {
  const next = { ...current };
  if (typeof plan.dailyBudgetPercent === "number" && Number.isFinite(plan.dailyBudgetPercent) && plan.dailyBudgetPercent >= 1 && plan.dailyBudgetPercent <= 100) {
    next.dailyBudgetPercent = plan.dailyBudgetPercent; next.dailyBudgetLocalDate = day;
  }
  if (Object.hasOwn(plan, "resetRiskOverridePercent") && (plan.resetRiskOverridePercent === null || (typeof plan.resetRiskOverridePercent === "number" && Number.isFinite(plan.resetRiskOverridePercent) && plan.resetRiskOverridePercent >= 0 && plan.resetRiskOverridePercent <= 100))) {
    next.resetRiskOverridePercent = plan.resetRiskOverridePercent;
    next.resetRiskManualEnabled = plan.resetRiskOverridePercent !== null;
  }
  return next.dailyBudgetPercent !== current.dailyBudgetPercent || next.dailyBudgetLocalDate !== current.dailyBudgetLocalDate || next.resetRiskOverridePercent !== current.resetRiskOverridePercent || next.resetRiskManualEnabled !== current.resetRiskManualEnabled ? next : null;
}
export async function getPersonPlan(_localDate: string): Promise<PersonPlan> {
  return {};
}
export async function savePersonPlan(_localDate: string, _field: keyof PersonPlan, _value: number | null): Promise<void> {
  // Local-safe build: App persists the active plan in local preferences.
  return;
}
