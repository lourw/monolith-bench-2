import { storageText } from '../../../utils/storage/storage-text';
import { collectionCode } from '../../../utils/collection/collection-code';
import {
  emptyCheckoutHistoryTotals,
  type CheckoutHistoryItem,
  type CheckoutHistoryStatus,
  type CheckoutHistoryTotals,
} from './checkout-history.model';

export type CheckoutHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutHistory(
  items: ReadonlyArray<CheckoutHistoryItem>,
): CheckoutHistoryTotals {
  const totals = emptyCheckoutHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutHistoryByStatus(
  items: ReadonlyArray<CheckoutHistoryItem>,
): Record<CheckoutHistoryStatus, CheckoutHistoryItem[]> {
  const grouped: Record<CheckoutHistoryStatus, CheckoutHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutHistory(
  items: ReadonlyArray<CheckoutHistoryItem>,
  query: string,
): CheckoutHistoryItem[] {
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

export function sortCheckoutHistory(
  items: ReadonlyArray<CheckoutHistoryItem>,
  key: CheckoutHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutHistoryItem[] {
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

export function describeCheckoutHistoryItem(item: CheckoutHistoryItem): string {
  const amount = storageText(item.amount);
  const name = collectionCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutHistoryAmount(amount: number): string {
  return storageText(amount);
}

export function checkoutHistoryStatusTone(
  status: CheckoutHistoryStatus,
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

export function pickCheckoutHistoryHighlights(
  items: ReadonlyArray<CheckoutHistoryItem>,
  limit = 3,
): CheckoutHistoryItem[] {
  return sortCheckoutHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
