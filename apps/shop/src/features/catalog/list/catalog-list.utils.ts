import { formatDate } from '../../../utils/format/format-date';
import {
  emptyCatalogListTotals,
  type CatalogListItem,
  type CatalogListStatus,
  type CatalogListTotals,
} from './catalog-list.model';

export type CatalogListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogList(
  items: ReadonlyArray<CatalogListItem>,
): CatalogListTotals {
  const totals = emptyCatalogListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogListByStatus(
  items: ReadonlyArray<CatalogListItem>,
): Record<CatalogListStatus, CatalogListItem[]> {
  const grouped: Record<CatalogListStatus, CatalogListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogList(
  items: ReadonlyArray<CatalogListItem>,
  query: string,
): CatalogListItem[] {
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

export function sortCatalogList(
  items: ReadonlyArray<CatalogListItem>,
  key: CatalogListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogListItem[] {
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

export function describeCatalogListItem(item: CatalogListItem): string {
  const amount = formatDate(item.amount);
  const name = formatDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogListAmount(amount: number): string {
  return formatDate(amount);
}

export function catalogListStatusTone(
  status: CatalogListStatus,
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

export function pickCatalogListHighlights(
  items: ReadonlyArray<CatalogListItem>,
  limit = 3,
): CatalogListItem[] {
  return sortCatalogList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
