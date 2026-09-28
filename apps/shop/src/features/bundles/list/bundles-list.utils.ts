import { mathText } from '../../../utils/math/math-text';
import { i18nCurrency } from '../../../utils/i18n/i18n-currency';
import { collectionAddress } from '../../../utils/collection/collection-address';
import {
  emptyBundlesListTotals,
  type BundlesListItem,
  type BundlesListStatus,
  type BundlesListTotals,
} from './bundles-list.model';

export type BundlesListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesList(
  items: ReadonlyArray<BundlesListItem>,
): BundlesListTotals {
  const totals = emptyBundlesListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesListByStatus(
  items: ReadonlyArray<BundlesListItem>,
): Record<BundlesListStatus, BundlesListItem[]> {
  const grouped: Record<BundlesListStatus, BundlesListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesList(
  items: ReadonlyArray<BundlesListItem>,
  query: string,
): BundlesListItem[] {
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

export function sortBundlesList(
  items: ReadonlyArray<BundlesListItem>,
  key: BundlesListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesListItem[] {
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

export function describeBundlesListItem(item: BundlesListItem): string {
  const amount = mathText(item.amount);
  const name = collectionAddress(i18nCurrency(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesListAmount(amount: number): string {
  return mathText(amount);
}

export function bundlesListStatusTone(
  status: BundlesListStatus,
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

export function pickBundlesListHighlights(
  items: ReadonlyArray<BundlesListItem>,
  limit = 3,
): BundlesListItem[] {
  return sortBundlesList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
