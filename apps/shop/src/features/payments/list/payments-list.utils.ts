import { mathNumber } from '../../../utils/math/math-number';
import { mathName } from '../../../utils/math/math-name';
import { validateCurrency } from '../../../utils/validate/validate-currency';
import {
  emptyPaymentsListTotals,
  type PaymentsListItem,
  type PaymentsListStatus,
  type PaymentsListTotals,
} from './payments-list.model';

export type PaymentsListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsList(
  items: ReadonlyArray<PaymentsListItem>,
): PaymentsListTotals {
  const totals = emptyPaymentsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsListByStatus(
  items: ReadonlyArray<PaymentsListItem>,
): Record<PaymentsListStatus, PaymentsListItem[]> {
  const grouped: Record<PaymentsListStatus, PaymentsListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsList(
  items: ReadonlyArray<PaymentsListItem>,
  query: string,
): PaymentsListItem[] {
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

export function sortPaymentsList(
  items: ReadonlyArray<PaymentsListItem>,
  key: PaymentsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsListItem[] {
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

export function describePaymentsListItem(item: PaymentsListItem): string {
  const amount = mathNumber(item.amount);
  const name = validateCurrency(mathName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsListAmount(amount: number): string {
  return mathNumber(amount);
}

export function paymentsListStatusTone(
  status: PaymentsListStatus,
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

export function pickPaymentsListHighlights(
  items: ReadonlyArray<PaymentsListItem>,
  limit = 3,
): PaymentsListItem[] {
  return sortPaymentsList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
