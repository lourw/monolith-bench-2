import { collectionSlug } from '../../../utils/collection/collection-slug';
import {
  emptySupportListTotals,
  type SupportListItem,
  type SupportListStatus,
  type SupportListTotals,
} from './support-list.model';

export type SupportListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportList(
  items: ReadonlyArray<SupportListItem>,
): SupportListTotals {
  const totals = emptySupportListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportListByStatus(
  items: ReadonlyArray<SupportListItem>,
): Record<SupportListStatus, SupportListItem[]> {
  const grouped: Record<SupportListStatus, SupportListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportList(
  items: ReadonlyArray<SupportListItem>,
  query: string,
): SupportListItem[] {
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

export function sortSupportList(
  items: ReadonlyArray<SupportListItem>,
  key: SupportListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportListItem[] {
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

export function describeSupportListItem(item: SupportListItem): string {
  const amount = collectionSlug(item.amount);
  const name = collectionSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportListAmount(amount: number): string {
  return collectionSlug(amount);
}

export function supportListStatusTone(
  status: SupportListStatus,
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

export function pickSupportListHighlights(
  items: ReadonlyArray<SupportListItem>,
  limit = 3,
): SupportListItem[] {
  return sortSupportList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
