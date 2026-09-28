import { storageNumber } from '../../../utils/storage/storage-number';
import { storageAddress } from '../../../utils/storage/storage-address';
import {
  emptyPaymentsDashboardTotals,
  type PaymentsDashboardItem,
  type PaymentsDashboardStatus,
  type PaymentsDashboardTotals,
} from './payments-dashboard.model';

export type PaymentsDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsDashboard(
  items: ReadonlyArray<PaymentsDashboardItem>,
): PaymentsDashboardTotals {
  const totals = emptyPaymentsDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsDashboardByStatus(
  items: ReadonlyArray<PaymentsDashboardItem>,
): Record<PaymentsDashboardStatus, PaymentsDashboardItem[]> {
  const grouped: Record<PaymentsDashboardStatus, PaymentsDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsDashboard(
  items: ReadonlyArray<PaymentsDashboardItem>,
  query: string,
): PaymentsDashboardItem[] {
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

export function sortPaymentsDashboard(
  items: ReadonlyArray<PaymentsDashboardItem>,
  key: PaymentsDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsDashboardItem[] {
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

export function describePaymentsDashboardItem(
  item: PaymentsDashboardItem,
): string {
  const amount = storageNumber(item.amount);
  const name = storageAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsDashboardAmount(amount: number): string {
  return storageNumber(amount);
}

export function paymentsDashboardStatusTone(
  status: PaymentsDashboardStatus,
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

export function pickPaymentsDashboardHighlights(
  items: ReadonlyArray<PaymentsDashboardItem>,
  limit = 3,
): PaymentsDashboardItem[] {
  return sortPaymentsDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
