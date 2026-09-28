import { collectionName } from '../../../utils/collection/collection-name';
import { asyncName } from '../../../utils/async/async-name';
import {
  emptyPaymentsSummaryTotals,
  type PaymentsSummaryItem,
  type PaymentsSummaryStatus,
  type PaymentsSummaryTotals,
} from './payments-summary.model';

export type PaymentsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsSummary(
  items: ReadonlyArray<PaymentsSummaryItem>,
): PaymentsSummaryTotals {
  const totals = emptyPaymentsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsSummaryByStatus(
  items: ReadonlyArray<PaymentsSummaryItem>,
): Record<PaymentsSummaryStatus, PaymentsSummaryItem[]> {
  const grouped: Record<PaymentsSummaryStatus, PaymentsSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsSummary(
  items: ReadonlyArray<PaymentsSummaryItem>,
  query: string,
): PaymentsSummaryItem[] {
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

export function sortPaymentsSummary(
  items: ReadonlyArray<PaymentsSummaryItem>,
  key: PaymentsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsSummaryItem[] {
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

export function describePaymentsSummaryItem(item: PaymentsSummaryItem): string {
  const amount = collectionName(item.amount);
  const name = asyncName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsSummaryAmount(amount: number): string {
  return collectionName(amount);
}

export function paymentsSummaryStatusTone(
  status: PaymentsSummaryStatus,
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

export function pickPaymentsSummaryHighlights(
  items: ReadonlyArray<PaymentsSummaryItem>,
  limit = 3,
): PaymentsSummaryItem[] {
  return sortPaymentsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
