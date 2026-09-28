import { mathPercent } from '../../../utils/math/math-percent';
import { formatCode } from '../../../utils/format/format-code';
import { i18nDate } from '../../../utils/i18n/i18n-date';
import {
  emptyShippingOverviewTotals,
  type ShippingOverviewItem,
  type ShippingOverviewStatus,
  type ShippingOverviewTotals,
} from './shipping-overview.model';

export type ShippingOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalShippingOverview(
  items: ReadonlyArray<ShippingOverviewItem>,
): ShippingOverviewTotals {
  const totals = emptyShippingOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupShippingOverviewByStatus(
  items: ReadonlyArray<ShippingOverviewItem>,
): Record<ShippingOverviewStatus, ShippingOverviewItem[]> {
  const grouped: Record<ShippingOverviewStatus, ShippingOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterShippingOverview(
  items: ReadonlyArray<ShippingOverviewItem>,
  query: string,
): ShippingOverviewItem[] {
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

export function sortShippingOverview(
  items: ReadonlyArray<ShippingOverviewItem>,
  key: ShippingOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ShippingOverviewItem[] {
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

export function describeShippingOverviewItem(
  item: ShippingOverviewItem,
): string {
  const amount = mathPercent(item.amount);
  const name = i18nDate(formatCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatShippingOverviewAmount(amount: number): string {
  return mathPercent(amount);
}

export function shippingOverviewStatusTone(
  status: ShippingOverviewStatus,
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

export function pickShippingOverviewHighlights(
  items: ReadonlyArray<ShippingOverviewItem>,
  limit = 3,
): ShippingOverviewItem[] {
  return sortShippingOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
