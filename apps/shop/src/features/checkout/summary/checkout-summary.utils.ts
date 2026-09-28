import { collectionNumber } from '../../../utils/collection/collection-number';
import { mathSlug } from '../../../utils/math/math-slug';
import { asyncSlug } from '../../../utils/async/async-slug';
import {
  emptyCheckoutSummaryTotals,
  type CheckoutSummaryItem,
  type CheckoutSummaryStatus,
  type CheckoutSummaryTotals,
} from './checkout-summary.model';

export type CheckoutSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutSummary(
  items: ReadonlyArray<CheckoutSummaryItem>,
): CheckoutSummaryTotals {
  const totals = emptyCheckoutSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutSummaryByStatus(
  items: ReadonlyArray<CheckoutSummaryItem>,
): Record<CheckoutSummaryStatus, CheckoutSummaryItem[]> {
  const grouped: Record<CheckoutSummaryStatus, CheckoutSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutSummary(
  items: ReadonlyArray<CheckoutSummaryItem>,
  query: string,
): CheckoutSummaryItem[] {
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

export function sortCheckoutSummary(
  items: ReadonlyArray<CheckoutSummaryItem>,
  key: CheckoutSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutSummaryItem[] {
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

export function describeCheckoutSummaryItem(item: CheckoutSummaryItem): string {
  const amount = collectionNumber(item.amount);
  const name = asyncSlug(mathSlug(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutSummaryAmount(amount: number): string {
  return collectionNumber(amount);
}

export function checkoutSummaryStatusTone(
  status: CheckoutSummaryStatus,
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

export function pickCheckoutSummaryHighlights(
  items: ReadonlyArray<CheckoutSummaryItem>,
  limit = 3,
): CheckoutSummaryItem[] {
  return sortCheckoutSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
