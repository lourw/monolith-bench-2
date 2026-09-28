import { mathPhone } from '../../../utils/math/math-phone';
import {
  emptyLoyaltyDashboardTotals,
  type LoyaltyDashboardItem,
  type LoyaltyDashboardStatus,
  type LoyaltyDashboardTotals,
} from './loyalty-dashboard.model';

export type LoyaltyDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltyDashboard(
  items: ReadonlyArray<LoyaltyDashboardItem>,
): LoyaltyDashboardTotals {
  const totals = emptyLoyaltyDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltyDashboardByStatus(
  items: ReadonlyArray<LoyaltyDashboardItem>,
): Record<LoyaltyDashboardStatus, LoyaltyDashboardItem[]> {
  const grouped: Record<LoyaltyDashboardStatus, LoyaltyDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltyDashboard(
  items: ReadonlyArray<LoyaltyDashboardItem>,
  query: string,
): LoyaltyDashboardItem[] {
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

export function sortLoyaltyDashboard(
  items: ReadonlyArray<LoyaltyDashboardItem>,
  key: LoyaltyDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltyDashboardItem[] {
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

export function describeLoyaltyDashboardItem(
  item: LoyaltyDashboardItem,
): string {
  const amount = mathPhone(item.amount);
  const name = mathPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltyDashboardAmount(amount: number): string {
  return mathPhone(amount);
}

export function loyaltyDashboardStatusTone(
  status: LoyaltyDashboardStatus,
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

export function pickLoyaltyDashboardHighlights(
  items: ReadonlyArray<LoyaltyDashboardItem>,
  limit = 3,
): LoyaltyDashboardItem[] {
  return sortLoyaltyDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
