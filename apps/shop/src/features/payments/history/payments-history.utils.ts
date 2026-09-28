import { formatPercent } from '../../../utils/format/format-percent';
import { i18nPercent } from '../../../utils/i18n/i18n-percent';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import {
  emptyPaymentsHistoryTotals,
  type PaymentsHistoryItem,
  type PaymentsHistoryStatus,
  type PaymentsHistoryTotals,
} from './payments-history.model';

export type PaymentsHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsHistory(
  items: ReadonlyArray<PaymentsHistoryItem>,
): PaymentsHistoryTotals {
  const totals = emptyPaymentsHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsHistoryByStatus(
  items: ReadonlyArray<PaymentsHistoryItem>,
): Record<PaymentsHistoryStatus, PaymentsHistoryItem[]> {
  const grouped: Record<PaymentsHistoryStatus, PaymentsHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsHistory(
  items: ReadonlyArray<PaymentsHistoryItem>,
  query: string,
): PaymentsHistoryItem[] {
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

export function sortPaymentsHistory(
  items: ReadonlyArray<PaymentsHistoryItem>,
  key: PaymentsHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsHistoryItem[] {
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

export function describePaymentsHistoryItem(item: PaymentsHistoryItem): string {
  const amount = formatPercent(item.amount);
  const name = i18nCode(i18nPercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsHistoryAmount(amount: number): string {
  return formatPercent(amount);
}

export function paymentsHistoryStatusTone(
  status: PaymentsHistoryStatus,
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

export function pickPaymentsHistoryHighlights(
  items: ReadonlyArray<PaymentsHistoryItem>,
  limit = 3,
): PaymentsHistoryItem[] {
  return sortPaymentsHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
