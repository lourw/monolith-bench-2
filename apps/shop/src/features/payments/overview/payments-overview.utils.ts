import { i18nPhone } from '../../../utils/i18n/i18n-phone';
import { storageNumber } from '../../../utils/storage/storage-number';
import {
  emptyPaymentsOverviewTotals,
  type PaymentsOverviewItem,
  type PaymentsOverviewStatus,
  type PaymentsOverviewTotals,
} from './payments-overview.model';

export type PaymentsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsOverview(
  items: ReadonlyArray<PaymentsOverviewItem>,
): PaymentsOverviewTotals {
  const totals = emptyPaymentsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsOverviewByStatus(
  items: ReadonlyArray<PaymentsOverviewItem>,
): Record<PaymentsOverviewStatus, PaymentsOverviewItem[]> {
  const grouped: Record<PaymentsOverviewStatus, PaymentsOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsOverview(
  items: ReadonlyArray<PaymentsOverviewItem>,
  query: string,
): PaymentsOverviewItem[] {
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

export function sortPaymentsOverview(
  items: ReadonlyArray<PaymentsOverviewItem>,
  key: PaymentsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsOverviewItem[] {
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

export function describePaymentsOverviewItem(
  item: PaymentsOverviewItem,
): string {
  const amount = i18nPhone(item.amount);
  const name = storageNumber(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsOverviewAmount(amount: number): string {
  return i18nPhone(amount);
}

export function paymentsOverviewStatusTone(
  status: PaymentsOverviewStatus,
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

export function pickPaymentsOverviewHighlights(
  items: ReadonlyArray<PaymentsOverviewItem>,
  limit = 3,
): PaymentsOverviewItem[] {
  return sortPaymentsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
