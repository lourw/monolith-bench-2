import { asyncAddress } from '../../../utils/async/async-address';
import { mathText } from '../../../utils/math/math-text';
import {
  emptyCatalogHistoryTotals,
  type CatalogHistoryItem,
  type CatalogHistoryStatus,
  type CatalogHistoryTotals,
} from './catalog-history.model';

export type CatalogHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogHistory(
  items: ReadonlyArray<CatalogHistoryItem>,
): CatalogHistoryTotals {
  const totals = emptyCatalogHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogHistoryByStatus(
  items: ReadonlyArray<CatalogHistoryItem>,
): Record<CatalogHistoryStatus, CatalogHistoryItem[]> {
  const grouped: Record<CatalogHistoryStatus, CatalogHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogHistory(
  items: ReadonlyArray<CatalogHistoryItem>,
  query: string,
): CatalogHistoryItem[] {
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

export function sortCatalogHistory(
  items: ReadonlyArray<CatalogHistoryItem>,
  key: CatalogHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogHistoryItem[] {
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

export function describeCatalogHistoryItem(item: CatalogHistoryItem): string {
  const amount = asyncAddress(item.amount);
  const name = mathText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogHistoryAmount(amount: number): string {
  return asyncAddress(amount);
}

export function catalogHistoryStatusTone(
  status: CatalogHistoryStatus,
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

export function pickCatalogHistoryHighlights(
  items: ReadonlyArray<CatalogHistoryItem>,
  limit = 3,
): CatalogHistoryItem[] {
  return sortCatalogHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
