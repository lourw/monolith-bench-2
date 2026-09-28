import { mathName } from '../../../utils/math/math-name';
import {
  emptyBundlesSummaryTotals,
  type BundlesSummaryItem,
  type BundlesSummaryStatus,
  type BundlesSummaryTotals,
} from './bundles-summary.model';

export type BundlesSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesSummary(
  items: ReadonlyArray<BundlesSummaryItem>,
): BundlesSummaryTotals {
  const totals = emptyBundlesSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesSummaryByStatus(
  items: ReadonlyArray<BundlesSummaryItem>,
): Record<BundlesSummaryStatus, BundlesSummaryItem[]> {
  const grouped: Record<BundlesSummaryStatus, BundlesSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesSummary(
  items: ReadonlyArray<BundlesSummaryItem>,
  query: string,
): BundlesSummaryItem[] {
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

export function sortBundlesSummary(
  items: ReadonlyArray<BundlesSummaryItem>,
  key: BundlesSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesSummaryItem[] {
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

export function describeBundlesSummaryItem(item: BundlesSummaryItem): string {
  const amount = mathName(item.amount);
  const name = mathName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesSummaryAmount(amount: number): string {
  return mathName(amount);
}

export function bundlesSummaryStatusTone(
  status: BundlesSummaryStatus,
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

export function pickBundlesSummaryHighlights(
  items: ReadonlyArray<BundlesSummaryItem>,
  limit = 3,
): BundlesSummaryItem[] {
  return sortBundlesSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
