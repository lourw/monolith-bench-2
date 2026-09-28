import { collectionPhone } from '../../../utils/collection/collection-phone';
import { mathDate } from '../../../utils/math/math-date';
import {
  emptySizingListTotals,
  type SizingListItem,
  type SizingListStatus,
  type SizingListTotals,
} from './sizing-list.model';

export type SizingListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSizingList(
  items: ReadonlyArray<SizingListItem>,
): SizingListTotals {
  const totals = emptySizingListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSizingListByStatus(
  items: ReadonlyArray<SizingListItem>,
): Record<SizingListStatus, SizingListItem[]> {
  const grouped: Record<SizingListStatus, SizingListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSizingList(
  items: ReadonlyArray<SizingListItem>,
  query: string,
): SizingListItem[] {
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

export function sortSizingList(
  items: ReadonlyArray<SizingListItem>,
  key: SizingListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SizingListItem[] {
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

export function describeSizingListItem(item: SizingListItem): string {
  const amount = collectionPhone(item.amount);
  const name = mathDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSizingListAmount(amount: number): string {
  return collectionPhone(amount);
}

export function sizingListStatusTone(
  status: SizingListStatus,
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

export function pickSizingListHighlights(
  items: ReadonlyArray<SizingListItem>,
  limit = 3,
): SizingListItem[] {
  return sortSizingList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
