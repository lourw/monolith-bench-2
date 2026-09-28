import { mathCode } from '../../../utils/math/math-code';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import {
  emptyCompareOverviewTotals,
  type CompareOverviewItem,
  type CompareOverviewStatus,
  type CompareOverviewTotals,
} from './compare-overview.model';

export type CompareOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareOverview(
  items: ReadonlyArray<CompareOverviewItem>,
): CompareOverviewTotals {
  const totals = emptyCompareOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareOverviewByStatus(
  items: ReadonlyArray<CompareOverviewItem>,
): Record<CompareOverviewStatus, CompareOverviewItem[]> {
  const grouped: Record<CompareOverviewStatus, CompareOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareOverview(
  items: ReadonlyArray<CompareOverviewItem>,
  query: string,
): CompareOverviewItem[] {
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

export function sortCompareOverview(
  items: ReadonlyArray<CompareOverviewItem>,
  key: CompareOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareOverviewItem[] {
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

export function describeCompareOverviewItem(item: CompareOverviewItem): string {
  const amount = mathCode(item.amount);
  const name = i18nAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareOverviewAmount(amount: number): string {
  return mathCode(amount);
}

export function compareOverviewStatusTone(
  status: CompareOverviewStatus,
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

export function pickCompareOverviewHighlights(
  items: ReadonlyArray<CompareOverviewItem>,
  limit = 3,
): CompareOverviewItem[] {
  return sortCompareOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
