import { formatName } from '../../../utils/format/format-name';
import { asyncCode } from '../../../utils/async/async-code';
import {
  emptyLoyaltyDetailsTotals,
  type LoyaltyDetailsItem,
  type LoyaltyDetailsStatus,
  type LoyaltyDetailsTotals,
} from './loyalty-details.model';

export type LoyaltyDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltyDetails(
  items: ReadonlyArray<LoyaltyDetailsItem>,
): LoyaltyDetailsTotals {
  const totals = emptyLoyaltyDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltyDetailsByStatus(
  items: ReadonlyArray<LoyaltyDetailsItem>,
): Record<LoyaltyDetailsStatus, LoyaltyDetailsItem[]> {
  const grouped: Record<LoyaltyDetailsStatus, LoyaltyDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltyDetails(
  items: ReadonlyArray<LoyaltyDetailsItem>,
  query: string,
): LoyaltyDetailsItem[] {
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

export function sortLoyaltyDetails(
  items: ReadonlyArray<LoyaltyDetailsItem>,
  key: LoyaltyDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltyDetailsItem[] {
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

export function describeLoyaltyDetailsItem(item: LoyaltyDetailsItem): string {
  const amount = formatName(item.amount);
  const name = asyncCode(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltyDetailsAmount(amount: number): string {
  return formatName(amount);
}

export function loyaltyDetailsStatusTone(
  status: LoyaltyDetailsStatus,
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

export function pickLoyaltyDetailsHighlights(
  items: ReadonlyArray<LoyaltyDetailsItem>,
  limit = 3,
): LoyaltyDetailsItem[] {
  return sortLoyaltyDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
