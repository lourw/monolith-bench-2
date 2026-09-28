import { asyncSlug } from '../../../utils/async/async-slug';
import {
  emptyCartSummaryTotals,
  type CartSummaryItem,
  type CartSummaryStatus,
  type CartSummaryTotals,
} from './cart-summary.model';

export type CartSummarySortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCartSummary(
  items: ReadonlyArray<CartSummaryItem>,
): CartSummaryTotals {
  const totals = emptyCartSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCartSummaryByStatus(
  items: ReadonlyArray<CartSummaryItem>,
): Record<CartSummaryStatus, CartSummaryItem[]> {
  const grouped: Record<CartSummaryStatus, CartSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCartSummary(
  items: ReadonlyArray<CartSummaryItem>,
  query: string,
): CartSummaryItem[] {
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

export function sortCartSummary(
  items: ReadonlyArray<CartSummaryItem>,
  key: CartSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): CartSummaryItem[] {
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

export function describeCartSummaryItem(item: CartSummaryItem): string {
  const amount = asyncSlug(item.amount);
  const name = asyncSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCartSummaryAmount(amount: number): string {
  return asyncSlug(amount);
}

export function cartSummaryStatusTone(
  status: CartSummaryStatus,
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

export function pickCartSummaryHighlights(
  items: ReadonlyArray<CartSummaryItem>,
  limit = 3,
): CartSummaryItem[] {
  return sortCartSummary(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
