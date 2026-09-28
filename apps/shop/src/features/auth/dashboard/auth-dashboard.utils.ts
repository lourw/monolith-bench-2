import { formatCode } from '../../../utils/format/format-code';
import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyAuthDashboardTotals,
  type AuthDashboardItem,
  type AuthDashboardStatus,
  type AuthDashboardTotals,
} from './auth-dashboard.model';

export type AuthDashboardSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthDashboard(
  items: ReadonlyArray<AuthDashboardItem>,
): AuthDashboardTotals {
  const totals = emptyAuthDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthDashboardByStatus(
  items: ReadonlyArray<AuthDashboardItem>,
): Record<AuthDashboardStatus, AuthDashboardItem[]> {
  const grouped: Record<AuthDashboardStatus, AuthDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthDashboard(
  items: ReadonlyArray<AuthDashboardItem>,
  query: string,
): AuthDashboardItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return Array.from(items);
  }
  return items.filter((item) => {
    if (item.name.toLowerCase().includes(needle)) {
      return true;
    }
    if (item.status.includes(needle)) {
      return true;
    }
    return item.tags.some((tag) => tag.includes(needle));
  });
}

export function sortAuthDashboard(
  items: ReadonlyArray<AuthDashboardItem>,
  key: AuthDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthDashboardItem[] {
  const factor = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (left === right) {
      return 0;
    }
    return left < right ? -factor : factor;
  });
}

export function describeAuthDashboardItem(item: AuthDashboardItem): string {
  const amount = formatCode(item.amount);
  const name = validateName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthDashboardAmount(amount: number): string {
  return formatCode(amount);
}

export function authDashboardStatusTone(
  status: AuthDashboardStatus,
): 'success' | 'warning' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function pickAuthDashboardHighlights(
  items: ReadonlyArray<AuthDashboardItem>,
  limit = 3,
): AuthDashboardItem[] {
  return sortAuthDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
