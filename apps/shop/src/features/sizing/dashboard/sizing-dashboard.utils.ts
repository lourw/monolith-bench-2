import { validateNumber } from '../../../utils/validate/validate-number';
import { mathCurrency } from '../../../utils/math/math-currency';
import { mathPhone } from '../../../utils/math/math-phone';
import {
  emptySizingDashboardTotals,
  type SizingDashboardItem,
  type SizingDashboardStatus,
  type SizingDashboardTotals,
} from './sizing-dashboard.model';

export type SizingDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingDashboard(
  items: ReadonlyArray<SizingDashboardItem>,
): SizingDashboardTotals {
  const totals = emptySizingDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingDashboardByStatus(
  items: ReadonlyArray<SizingDashboardItem>,
): Record<SizingDashboardStatus, SizingDashboardItem[]> {
  const grouped: Record<SizingDashboardStatus, SizingDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingDashboard(
  items: ReadonlyArray<SizingDashboardItem>,
  query: string,
): SizingDashboardItem[] {
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

export function sortSizingDashboard(
  items: ReadonlyArray<SizingDashboardItem>,
  key: SizingDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingDashboardItem[] {
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

export function describeSizingDashboardItem(item: SizingDashboardItem): string {
  const amount = validateNumber(item.amount);
  const name = mathPhone(mathCurrency(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingDashboardAmount(amount: number): string {
  return validateNumber(amount);
}

export function sizingDashboardStatusTone(
  status: SizingDashboardStatus,
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

export function pickSizingDashboardHighlights(
  items: ReadonlyArray<SizingDashboardItem>,
  limit = 3,
): SizingDashboardItem[] {
  return sortSizingDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
