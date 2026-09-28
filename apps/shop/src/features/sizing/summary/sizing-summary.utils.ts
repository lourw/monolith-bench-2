import { i18nCode } from '../../../utils/i18n/i18n-code';
import { storageCurrency } from '../../../utils/storage/storage-currency';
import { collectionSlug } from '../../../utils/collection/collection-slug';
import {
  emptySizingSummaryTotals,
  type SizingSummaryItem,
  type SizingSummaryStatus,
  type SizingSummaryTotals,
} from './sizing-summary.model';

export type SizingSummarySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingSummary(
  items: ReadonlyArray<SizingSummaryItem>,
): SizingSummaryTotals {
  const totals = emptySizingSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingSummaryByStatus(
  items: ReadonlyArray<SizingSummaryItem>,
): Record<SizingSummaryStatus, SizingSummaryItem[]> {
  const grouped: Record<SizingSummaryStatus, SizingSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingSummary(
  items: ReadonlyArray<SizingSummaryItem>,
  query: string,
): SizingSummaryItem[] {
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

export function sortSizingSummary(
  items: ReadonlyArray<SizingSummaryItem>,
  key: SizingSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingSummaryItem[] {
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

export function describeSizingSummaryItem(item: SizingSummaryItem): string {
  const amount = i18nCode(item.amount);
  const name = collectionSlug(storageCurrency(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingSummaryAmount(amount: number): string {
  return i18nCode(amount);
}

export function sizingSummaryStatusTone(
  status: SizingSummaryStatus,
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

export function pickSizingSummaryHighlights(
  items: ReadonlyArray<SizingSummaryItem>,
  limit = 3,
): SizingSummaryItem[] {
  return sortSizingSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
