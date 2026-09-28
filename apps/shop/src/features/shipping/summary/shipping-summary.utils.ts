import { validatePhone } from '../../../utils/validate/validate-phone';
import { validateCurrency } from '../../../utils/validate/validate-currency';
import {
  emptyShippingSummaryTotals,
  type ShippingSummaryItem,
  type ShippingSummaryStatus,
  type ShippingSummaryTotals,
} from './shipping-summary.model';

export type ShippingSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingSummary(
  items: ReadonlyArray<ShippingSummaryItem>,
): ShippingSummaryTotals {
  const totals = emptyShippingSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingSummaryByStatus(
  items: ReadonlyArray<ShippingSummaryItem>,
): Record<ShippingSummaryStatus, ShippingSummaryItem[]> {
  const grouped: Record<ShippingSummaryStatus, ShippingSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingSummary(
  items: ReadonlyArray<ShippingSummaryItem>,
  query: string,
): ShippingSummaryItem[] {
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

export function sortShippingSummary(
  items: ReadonlyArray<ShippingSummaryItem>,
  key: ShippingSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingSummaryItem[] {
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

export function describeShippingSummaryItem(item: ShippingSummaryItem): string {
  const amount = validatePhone(item.amount);
  const name = validateCurrency(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingSummaryAmount(amount: number): string {
  return validatePhone(amount);
}

export function shippingSummaryStatusTone(
  status: ShippingSummaryStatus,
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

export function pickShippingSummaryHighlights(
  items: ReadonlyArray<ShippingSummaryItem>,
  limit = 3,
): ShippingSummaryItem[] {
  return sortShippingSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
