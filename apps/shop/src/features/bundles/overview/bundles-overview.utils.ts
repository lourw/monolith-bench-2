import { i18nName } from '../../../utils/i18n/i18n-name';
import { i18nDate } from '../../../utils/i18n/i18n-date';
import { mathText } from '../../../utils/math/math-text';
import {
  emptyBundlesOverviewTotals,
  type BundlesOverviewItem,
  type BundlesOverviewStatus,
  type BundlesOverviewTotals,
} from './bundles-overview.model';

export type BundlesOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesOverview(
  items: ReadonlyArray<BundlesOverviewItem>,
): BundlesOverviewTotals {
  const totals = emptyBundlesOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesOverviewByStatus(
  items: ReadonlyArray<BundlesOverviewItem>,
): Record<BundlesOverviewStatus, BundlesOverviewItem[]> {
  const grouped: Record<BundlesOverviewStatus, BundlesOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesOverview(
  items: ReadonlyArray<BundlesOverviewItem>,
  query: string,
): BundlesOverviewItem[] {
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

export function sortBundlesOverview(
  items: ReadonlyArray<BundlesOverviewItem>,
  key: BundlesOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesOverviewItem[] {
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

export function describeBundlesOverviewItem(item: BundlesOverviewItem): string {
  const amount = i18nName(item.amount);
  const name = mathText(i18nDate(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesOverviewAmount(amount: number): string {
  return i18nName(amount);
}

export function bundlesOverviewStatusTone(
  status: BundlesOverviewStatus,
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

export function pickBundlesOverviewHighlights(
  items: ReadonlyArray<BundlesOverviewItem>,
  limit = 3,
): BundlesOverviewItem[] {
  return sortBundlesOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
