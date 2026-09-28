import { asyncSlug } from '../../../utils/async/async-slug';
import { validateSlug } from '../../../utils/validate/validate-slug';
import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyCompareDashboardTotals,
  type CompareDashboardItem,
  type CompareDashboardStatus,
  type CompareDashboardTotals,
} from './compare-dashboard.model';

export type CompareDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareDashboard(
  items: ReadonlyArray<CompareDashboardItem>,
): CompareDashboardTotals {
  const totals = emptyCompareDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareDashboardByStatus(
  items: ReadonlyArray<CompareDashboardItem>,
): Record<CompareDashboardStatus, CompareDashboardItem[]> {
  const grouped: Record<CompareDashboardStatus, CompareDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareDashboard(
  items: ReadonlyArray<CompareDashboardItem>,
  query: string,
): CompareDashboardItem[] {
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

export function sortCompareDashboard(
  items: ReadonlyArray<CompareDashboardItem>,
  key: CompareDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareDashboardItem[] {
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

export function describeCompareDashboardItem(
  item: CompareDashboardItem,
): string {
  const amount = asyncSlug(item.amount);
  const name = validateName(validateSlug(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareDashboardAmount(amount: number): string {
  return asyncSlug(amount);
}

export function compareDashboardStatusTone(
  status: CompareDashboardStatus,
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

export function pickCompareDashboardHighlights(
  items: ReadonlyArray<CompareDashboardItem>,
  limit = 3,
): CompareDashboardItem[] {
  return sortCompareDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
