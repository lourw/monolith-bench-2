import { i18nCode } from '../../../utils/i18n/i18n-code';
import { validateText } from '../../../utils/validate/validate-text';
import {
  emptySubscriptionsListTotals,
  type SubscriptionsListItem,
  type SubscriptionsListStatus,
  type SubscriptionsListTotals,
} from './subscriptions-list.model';

export type SubscriptionsListSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSubscriptionsList(
  items: ReadonlyArray<SubscriptionsListItem>,
): SubscriptionsListTotals {
  const totals = emptySubscriptionsListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSubscriptionsListByStatus(
  items: ReadonlyArray<SubscriptionsListItem>,
): Record<SubscriptionsListStatus, SubscriptionsListItem[]> {
  const grouped: Record<SubscriptionsListStatus, SubscriptionsListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSubscriptionsList(
  items: ReadonlyArray<SubscriptionsListItem>,
  query: string,
): SubscriptionsListItem[] {
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

export function sortSubscriptionsList(
  items: ReadonlyArray<SubscriptionsListItem>,
  key: SubscriptionsListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SubscriptionsListItem[] {
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

export function describeSubscriptionsListItem(
  item: SubscriptionsListItem,
): string {
  const amount = i18nCode(item.amount);
  const name = validateText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSubscriptionsListAmount(amount: number): string {
  return i18nCode(amount);
}

export function subscriptionsListStatusTone(
  status: SubscriptionsListStatus,
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

export function pickSubscriptionsListHighlights(
  items: ReadonlyArray<SubscriptionsListItem>,
  limit = 3,
): SubscriptionsListItem[] {
  return sortSubscriptionsList(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
