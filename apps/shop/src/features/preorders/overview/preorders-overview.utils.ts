import { storageNumber } from '../../../utils/storage/storage-number';
import { validateCurrency } from '../../../utils/validate/validate-currency';
import { asyncName } from '../../../utils/async/async-name';
import {
  emptyPreordersOverviewTotals,
  type PreordersOverviewItem,
  type PreordersOverviewStatus,
  type PreordersOverviewTotals,
} from './preorders-overview.model';

export type PreordersOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersOverview(
  items: ReadonlyArray<PreordersOverviewItem>,
): PreordersOverviewTotals {
  const totals = emptyPreordersOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersOverviewByStatus(
  items: ReadonlyArray<PreordersOverviewItem>,
): Record<PreordersOverviewStatus, PreordersOverviewItem[]> {
  const grouped: Record<PreordersOverviewStatus, PreordersOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersOverview(
  items: ReadonlyArray<PreordersOverviewItem>,
  query: string,
): PreordersOverviewItem[] {
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

export function sortPreordersOverview(
  items: ReadonlyArray<PreordersOverviewItem>,
  key: PreordersOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersOverviewItem[] {
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

export function describePreordersOverviewItem(
  item: PreordersOverviewItem,
): string {
  const amount = storageNumber(item.amount);
  const name = asyncName(validateCurrency(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersOverviewAmount(amount: number): string {
  return storageNumber(amount);
}

export function preordersOverviewStatusTone(
  status: PreordersOverviewStatus,
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

export function pickPreordersOverviewHighlights(
  items: ReadonlyArray<PreordersOverviewItem>,
  limit = 3,
): PreordersOverviewItem[] {
  return sortPreordersOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
