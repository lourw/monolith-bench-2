import { storageSlug } from '../../../utils/storage/storage-slug';
import {
  emptyLoyaltyListTotals,
  type LoyaltyListItem,
  type LoyaltyListStatus,
  type LoyaltyListTotals,
} from './loyalty-list.model';

export type LoyaltyListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltyList(
  items: ReadonlyArray<LoyaltyListItem>,
): LoyaltyListTotals {
  const totals = emptyLoyaltyListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltyListByStatus(
  items: ReadonlyArray<LoyaltyListItem>,
): Record<LoyaltyListStatus, LoyaltyListItem[]> {
  const grouped: Record<LoyaltyListStatus, LoyaltyListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltyList(
  items: ReadonlyArray<LoyaltyListItem>,
  query: string,
): LoyaltyListItem[] {
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

export function sortLoyaltyList(
  items: ReadonlyArray<LoyaltyListItem>,
  key: LoyaltyListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltyListItem[] {
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

export function describeLoyaltyListItem(item: LoyaltyListItem): string {
  const amount = storageSlug(item.amount);
  const name = storageSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltyListAmount(amount: number): string {
  return storageSlug(amount);
}

export function loyaltyListStatusTone(
  status: LoyaltyListStatus,
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

export function pickLoyaltyListHighlights(
  items: ReadonlyArray<LoyaltyListItem>,
  limit = 3,
): LoyaltyListItem[] {
  return sortLoyaltyList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
