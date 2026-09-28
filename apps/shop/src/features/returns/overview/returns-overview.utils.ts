import { validateCurrency } from '../../../utils/validate/validate-currency';
import { storageDate } from '../../../utils/storage/storage-date';
import {
  emptyReturnsOverviewTotals,
  type ReturnsOverviewItem,
  type ReturnsOverviewStatus,
  type ReturnsOverviewTotals,
} from './returns-overview.model';

export type ReturnsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsOverview(
  items: ReadonlyArray<ReturnsOverviewItem>,
): ReturnsOverviewTotals {
  const totals = emptyReturnsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsOverviewByStatus(
  items: ReadonlyArray<ReturnsOverviewItem>,
): Record<ReturnsOverviewStatus, ReturnsOverviewItem[]> {
  const grouped: Record<ReturnsOverviewStatus, ReturnsOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsOverview(
  items: ReadonlyArray<ReturnsOverviewItem>,
  query: string,
): ReturnsOverviewItem[] {
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

export function sortReturnsOverview(
  items: ReadonlyArray<ReturnsOverviewItem>,
  key: ReturnsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsOverviewItem[] {
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

export function describeReturnsOverviewItem(item: ReturnsOverviewItem): string {
  const amount = validateCurrency(item.amount);
  const name = storageDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsOverviewAmount(amount: number): string {
  return validateCurrency(amount);
}

export function returnsOverviewStatusTone(
  status: ReturnsOverviewStatus,
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

export function pickReturnsOverviewHighlights(
  items: ReadonlyArray<ReturnsOverviewItem>,
  limit = 3,
): ReturnsOverviewItem[] {
  return sortReturnsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
