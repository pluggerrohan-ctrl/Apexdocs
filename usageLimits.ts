export const FREE_MONTHLY_LIMIT = 2;
const STORAGE_KEY = 'apexdoc_usage';
const PRO_KEY = 'apexdoc_pro';
const PLAN_KEY = 'apexdoc_plan';

interface UsageData {
  count: number;
  month: string; // e.g. "2026-09" — resets monthly
}

function getMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function getUsage(): UsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, month: getMonthKey() };
    const data = JSON.parse(raw) as UsageData;
    if (data.month !== getMonthKey()) {
      return { count: 0, month: getMonthKey() };
    }
    return data;
  } catch {
    return { count: 0, month: getMonthKey() };
  }
}

export function incrementUsage(): void {
  const current = getUsage();
  const updated: UsageData = { count: current.count + 1, month: getMonthKey() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getRemainingConversions(): number {
  if (isProUser()) return Infinity;
  const usage = getUsage();
  return Math.max(0, FREE_MONTHLY_LIMIT - usage.count);
}

export function isLimitReached(): boolean {
  if (isProUser()) return false;
  return getUsage().count >= FREE_MONTHLY_LIMIT;
}

export function canConvert(): boolean {
  return !isLimitReached();
}

export function isProUser(): boolean {
  try {
    return localStorage.getItem(PRO_KEY) === 'true';
  } catch {
    return false;
  }
}

export function getPlan(): string | null {
  try {
    return localStorage.getItem(PLAN_KEY);
  } catch {
    return null;
  }
}

export function unlockPro(plan: 'pro' | 'enterprise'): void {
  localStorage.setItem(PRO_KEY, 'true');
  localStorage.setItem(PLAN_KEY, plan);
  // Reset usage counter since user is now unlimited
  localStorage.removeItem(STORAGE_KEY);
}

export function getUsagePercent(): number {
  if (isProUser()) return 0;
  const usage = getUsage();
  return Math.min(100, (usage.count / FREE_MONTHLY_LIMIT) * 100);
}
