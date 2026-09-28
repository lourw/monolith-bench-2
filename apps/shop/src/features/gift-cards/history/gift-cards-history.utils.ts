import { asyncNumber } from '../../../utils/async/async-number';
import { formatCode } from '../../../utils/format/format-code';
import { mathText } from '../../../utils/math/math-text';
import {
  emptyGiftCardsHistoryTotals,
  type GiftCardsHistoryItem,
  type GiftCardsHistoryStatus,
  type GiftCardsHistoryTotals,
} from './gift-cards-history.model';

export type GiftCardsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsHistory(
  items: ReadonlyArray<GiftCardsHistoryItem>,
): GiftCardsHistoryTotals {
  const totals = emptyGiftCardsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsHistoryByStatus(
  items: ReadonlyArray<GiftCardsHistoryItem>,
): Record<GiftCardsHistoryStatus, GiftCardsHistoryItem[]> {
  const grouped: Record<GiftCardsHistoryStatus, GiftCardsHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsHistory(
  items: ReadonlyArray<GiftCardsHistoryItem>,
  query: string,
): GiftCardsHistoryItem[] {
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

export function sortGiftCardsHistory(
  items: ReadonlyArray<GiftCardsHistoryItem>,
  key: GiftCardsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsHistoryItem[] {
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

export function describeGiftCardsHistoryItem(
  item: GiftCardsHistoryItem,
): string {
  const amount = asyncNumber(item.amount);
  const name = mathText(formatCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsHistoryAmount(amount: number): string {
  return asyncNumber(amount);
}

export function giftCardsHistoryStatusTone(
  status: GiftCardsHistoryStatus,
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

export function pickGiftCardsHistoryHighlights(
  items: ReadonlyArray<GiftCardsHistoryItem>,
  limit = 3,
): GiftCardsHistoryItem[] {
  return sortGiftCardsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
