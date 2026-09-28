import { formatPhone } from '../../../utils/format/format-phone';
import { i18nDate } from '../../../utils/i18n/i18n-date';
import {
  emptySubscriptionsDetailsTotals,
  type SubscriptionsDetailsItem,
  type SubscriptionsDetailsStatus,
  type SubscriptionsDetailsTotals,
} from './subscriptions-details.model';

export type SubscriptionsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsDetails(
  items: ReadonlyArray<SubscriptionsDetailsItem>,
): SubscriptionsDetailsTotals {
  const totals = emptySubscriptionsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsDetailsByStatus(
  items: ReadonlyArray<SubscriptionsDetailsItem>,
): Record<SubscriptionsDetailsStatus, SubscriptionsDetailsItem[]> {
  const grouped: Record<
    SubscriptionsDetailsStatus,
    SubscriptionsDetailsItem[]
  > = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSubscriptionsDetails(
  items: ReadonlyArray<SubscriptionsDetailsItem>,
  query: string,
): SubscriptionsDetailsItem[] {
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

export function sortSubscriptionsDetails(
  items: ReadonlyArray<SubscriptionsDetailsItem>,
  key: SubscriptionsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsDetailsItem[] {
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

export function describeSubscriptionsDetailsItem(
  item: SubscriptionsDetailsItem,
): string {
  const amount = formatPhone(item.amount);
  const name = i18nDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsDetailsAmount(amount: number): string {
  return formatPhone(amount);
}

export function subscriptionsDetailsStatusTone(
  status: SubscriptionsDetailsStatus,
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

export function pickSubscriptionsDetailsHighlights(
  items: ReadonlyArray<SubscriptionsDetailsItem>,
  limit = 3,
): SubscriptionsDetailsItem[] {
  return sortSubscriptionsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
