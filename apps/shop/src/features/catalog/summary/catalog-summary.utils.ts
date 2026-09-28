import { storageDate } from '../../../utils/storage/storage-date';
import { formatPhone } from '../../../utils/format/format-phone';
import {
  emptyCatalogSummaryTotals,
  type CatalogSummaryItem,
  type CatalogSummaryStatus,
  type CatalogSummaryTotals,
} from './catalog-summary.model';

export type CatalogSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogSummary(
  items: ReadonlyArray<CatalogSummaryItem>,
): CatalogSummaryTotals {
  const totals = emptyCatalogSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogSummaryByStatus(
  items: ReadonlyArray<CatalogSummaryItem>,
): Record<CatalogSummaryStatus, CatalogSummaryItem[]> {
  const grouped: Record<CatalogSummaryStatus, CatalogSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogSummary(
  items: ReadonlyArray<CatalogSummaryItem>,
  query: string,
): CatalogSummaryItem[] {
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

export function sortCatalogSummary(
  items: ReadonlyArray<CatalogSummaryItem>,
  key: CatalogSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogSummaryItem[] {
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

export function describeCatalogSummaryItem(item: CatalogSummaryItem): string {
  const amount = storageDate(item.amount);
  const name = formatPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogSummaryAmount(amount: number): string {
  return storageDate(amount);
}

export function catalogSummaryStatusTone(
  status: CatalogSummaryStatus,
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

export function pickCatalogSummaryHighlights(
  items: ReadonlyArray<CatalogSummaryItem>,
  limit = 3,
): CatalogSummaryItem[] {
  return sortCatalogSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
