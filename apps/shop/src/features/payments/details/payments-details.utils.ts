import { asyncNumber } from '../../../utils/async/async-number';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import {
  emptyPaymentsDetailsTotals,
  type PaymentsDetailsItem,
  type PaymentsDetailsStatus,
  type PaymentsDetailsTotals,
} from './payments-details.model';

export type PaymentsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsDetails(
  items: ReadonlyArray<PaymentsDetailsItem>,
): PaymentsDetailsTotals {
  const totals = emptyPaymentsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsDetailsByStatus(
  items: ReadonlyArray<PaymentsDetailsItem>,
): Record<PaymentsDetailsStatus, PaymentsDetailsItem[]> {
  const grouped: Record<PaymentsDetailsStatus, PaymentsDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsDetails(
  items: ReadonlyArray<PaymentsDetailsItem>,
  query: string,
): PaymentsDetailsItem[] {
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

export function sortPaymentsDetails(
  items: ReadonlyArray<PaymentsDetailsItem>,
  key: PaymentsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsDetailsItem[] {
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

export function describePaymentsDetailsItem(item: PaymentsDetailsItem): string {
  const amount = asyncNumber(item.amount);
  const name = i18nCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsDetailsAmount(amount: number): string {
  return asyncNumber(amount);
}

export function paymentsDetailsStatusTone(
  status: PaymentsDetailsStatus,
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

export function pickPaymentsDetailsHighlights(
  items: ReadonlyArray<PaymentsDetailsItem>,
  limit = 3,
): PaymentsDetailsItem[] {
  return sortPaymentsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
