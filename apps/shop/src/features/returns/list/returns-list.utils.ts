import { collectionText } from '../../../utils/collection/collection-text';
import { mathSlug } from '../../../utils/math/math-slug';
import {
  emptyReturnsListTotals,
  type ReturnsListItem,
  type ReturnsListStatus,
  type ReturnsListTotals,
} from './returns-list.model';

export type ReturnsListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsList(
  items: ReadonlyArray<ReturnsListItem>,
): ReturnsListTotals {
  const totals = emptyReturnsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsListByStatus(
  items: ReadonlyArray<ReturnsListItem>,
): Record<ReturnsListStatus, ReturnsListItem[]> {
  const grouped: Record<ReturnsListStatus, ReturnsListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsList(
  items: ReadonlyArray<ReturnsListItem>,
  query: string,
): ReturnsListItem[] {
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

export function sortReturnsList(
  items: ReadonlyArray<ReturnsListItem>,
  key: ReturnsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsListItem[] {
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

export function describeReturnsListItem(item: ReturnsListItem): string {
  const amount = collectionText(item.amount);
  const name = mathSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsListAmount(amount: number): string {
  return collectionText(amount);
}

export function returnsListStatusTone(
  status: ReturnsListStatus,
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

export function pickReturnsListHighlights(
  items: ReadonlyArray<ReturnsListItem>,
  limit = 3,
): ReturnsListItem[] {
  return sortReturnsList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
