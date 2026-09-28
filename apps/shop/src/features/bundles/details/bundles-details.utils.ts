import { storageCurrency } from '../../../utils/storage/storage-currency';
import { asyncPhone } from '../../../utils/async/async-phone';
import {
  emptyBundlesDetailsTotals,
  type BundlesDetailsItem,
  type BundlesDetailsStatus,
  type BundlesDetailsTotals,
} from './bundles-details.model';

export type BundlesDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesDetails(
  items: ReadonlyArray<BundlesDetailsItem>,
): BundlesDetailsTotals {
  const totals = emptyBundlesDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesDetailsByStatus(
  items: ReadonlyArray<BundlesDetailsItem>,
): Record<BundlesDetailsStatus, BundlesDetailsItem[]> {
  const grouped: Record<BundlesDetailsStatus, BundlesDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesDetails(
  items: ReadonlyArray<BundlesDetailsItem>,
  query: string,
): BundlesDetailsItem[] {
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

export function sortBundlesDetails(
  items: ReadonlyArray<BundlesDetailsItem>,
  key: BundlesDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesDetailsItem[] {
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

export function describeBundlesDetailsItem(item: BundlesDetailsItem): string {
  const amount = storageCurrency(item.amount);
  const name = asyncPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesDetailsAmount(amount: number): string {
  return storageCurrency(amount);
}

export function bundlesDetailsStatusTone(
  status: BundlesDetailsStatus,
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

export function pickBundlesDetailsHighlights(
  items: ReadonlyArray<BundlesDetailsItem>,
  limit = 3,
): BundlesDetailsItem[] {
  return sortBundlesDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
