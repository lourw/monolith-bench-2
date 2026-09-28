import { mathNumber } from '../../../utils/math/math-number';
import { storageSlug } from '../../../utils/storage/storage-slug';
import {
  emptyReturnsDashboardTotals,
  type ReturnsDashboardItem,
  type ReturnsDashboardStatus,
  type ReturnsDashboardTotals,
} from './returns-dashboard.model';

export type ReturnsDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsDashboard(
  items: ReadonlyArray<ReturnsDashboardItem>,
): ReturnsDashboardTotals {
  const totals = emptyReturnsDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsDashboardByStatus(
  items: ReadonlyArray<ReturnsDashboardItem>,
): Record<ReturnsDashboardStatus, ReturnsDashboardItem[]> {
  const grouped: Record<ReturnsDashboardStatus, ReturnsDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsDashboard(
  items: ReadonlyArray<ReturnsDashboardItem>,
  query: string,
): ReturnsDashboardItem[] {
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

export function sortReturnsDashboard(
  items: ReadonlyArray<ReturnsDashboardItem>,
  key: ReturnsDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsDashboardItem[] {
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

export function describeReturnsDashboardItem(
  item: ReturnsDashboardItem,
): string {
  const amount = mathNumber(item.amount);
  const name = storageSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsDashboardAmount(amount: number): string {
  return mathNumber(amount);
}

export function returnsDashboardStatusTone(
  status: ReturnsDashboardStatus,
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

export function pickReturnsDashboardHighlights(
  items: ReadonlyArray<ReturnsDashboardItem>,
  limit = 3,
): ReturnsDashboardItem[] {
  return sortReturnsDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
