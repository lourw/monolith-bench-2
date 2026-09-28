import { asyncCode } from '../../../utils/async/async-code';
import { asyncNumber } from '../../../utils/async/async-number';
import {
  emptyCartHistoryTotals,
  type CartHistoryItem,
  type CartHistoryStatus,
  type CartHistoryTotals,
} from './cart-history.model';

export type CartHistorySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartHistory(
  items: ReadonlyArray<CartHistoryItem>,
): CartHistoryTotals {
  const totals = emptyCartHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartHistoryByStatus(
  items: ReadonlyArray<CartHistoryItem>,
): Record<CartHistoryStatus, CartHistoryItem[]> {
  const grouped: Record<CartHistoryStatus, CartHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartHistory(
  items: ReadonlyArray<CartHistoryItem>,
  query: string,
): CartHistoryItem[] {
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

export function sortCartHistory(
  items: ReadonlyArray<CartHistoryItem>,
  key: CartHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartHistoryItem[] {
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

export function describeCartHistoryItem(item: CartHistoryItem): string {
  const amount = asyncCode(item.amount);
  const name = asyncNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartHistoryAmount(amount: number): string {
  return asyncCode(amount);
}

export function cartHistoryStatusTone(
  status: CartHistoryStatus,
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

export function pickCartHistoryHighlights(
  items: ReadonlyArray<CartHistoryItem>,
  limit = 3,
): CartHistoryItem[] {
  return sortCartHistory(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
