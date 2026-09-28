import { collectionNumber } from '../../../utils/collection/collection-number';
import { i18nDate } from '../../../utils/i18n/i18n-date';
import {
  emptyGiftCardsListTotals,
  type GiftCardsListItem,
  type GiftCardsListStatus,
  type GiftCardsListTotals,
} from './gift-cards-list.model';

export type GiftCardsListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsList(
  items: ReadonlyArray<GiftCardsListItem>,
): GiftCardsListTotals {
  const totals = emptyGiftCardsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsListByStatus(
  items: ReadonlyArray<GiftCardsListItem>,
): Record<GiftCardsListStatus, GiftCardsListItem[]> {
  const grouped: Record<GiftCardsListStatus, GiftCardsListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsList(
  items: ReadonlyArray<GiftCardsListItem>,
  query: string,
): GiftCardsListItem[] {
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

export function sortGiftCardsList(
  items: ReadonlyArray<GiftCardsListItem>,
  key: GiftCardsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsListItem[] {
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

export function describeGiftCardsListItem(item: GiftCardsListItem): string {
  const amount = collectionNumber(item.amount);
  const name = i18nDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsListAmount(amount: number): string {
  return collectionNumber(amount);
}

export function giftCardsListStatusTone(
  status: GiftCardsListStatus,
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

export function pickGiftCardsListHighlights(
  items: ReadonlyArray<GiftCardsListItem>,
  limit = 3,
): GiftCardsListItem[] {
  return sortGiftCardsList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
