import { formatPercent } from '../../../utils/format/format-percent';
import { validateCode } from '../../../utils/validate/validate-code';
import {
  emptyShippingListTotals,
  type ShippingListItem,
  type ShippingListStatus,
  type ShippingListTotals,
} from './shipping-list.model';

export type ShippingListSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingList(
  items: ReadonlyArray<ShippingListItem>,
): ShippingListTotals {
  const totals = emptyShippingListTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingListByStatus(
  items: ReadonlyArray<ShippingListItem>,
): Record<ShippingListStatus, ShippingListItem[]> {
  const grouped: Record<ShippingListStatus, ShippingListItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingList(
  items: ReadonlyArray<ShippingListItem>,
  query: string,
): ShippingListItem[] {
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

export function sortShippingList(
  items: ReadonlyArray<ShippingListItem>,
  key: ShippingListSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingListItem[] {
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

export function describeShippingListItem(item: ShippingListItem): string {
  const amount = formatPercent(item.amount);
  const name = validateCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingListAmount(amount: number): string {
  return formatPercent(amount);
}

export function shippingListStatusTone(
  status: ShippingListStatus,
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

export function pickShippingListHighlights(
  items: ReadonlyArray<ShippingListItem>,
  limit = 3,
): ShippingListItem[] {
  return sortShippingList(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
