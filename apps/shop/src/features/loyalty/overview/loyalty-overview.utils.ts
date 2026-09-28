import { validateAddress } from '../../../utils/validate/validate-address';
import { collectionPhone } from '../../../utils/collection/collection-phone';
import {
  emptyLoyaltyOverviewTotals,
  type LoyaltyOverviewItem,
  type LoyaltyOverviewStatus,
  type LoyaltyOverviewTotals,
} from './loyalty-overview.model';

export type LoyaltyOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltyOverview(
  items: ReadonlyArray<LoyaltyOverviewItem>,
): LoyaltyOverviewTotals {
  const totals = emptyLoyaltyOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltyOverviewByStatus(
  items: ReadonlyArray<LoyaltyOverviewItem>,
): Record<LoyaltyOverviewStatus, LoyaltyOverviewItem[]> {
  const grouped: Record<LoyaltyOverviewStatus, LoyaltyOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltyOverview(
  items: ReadonlyArray<LoyaltyOverviewItem>,
  query: string,
): LoyaltyOverviewItem[] {
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

export function sortLoyaltyOverview(
  items: ReadonlyArray<LoyaltyOverviewItem>,
  key: LoyaltyOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltyOverviewItem[] {
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

export function describeLoyaltyOverviewItem(item: LoyaltyOverviewItem): string {
  const amount = validateAddress(item.amount);
  const name = collectionPhone(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltyOverviewAmount(amount: number): string {
  return validateAddress(amount);
}

export function loyaltyOverviewStatusTone(
  status: LoyaltyOverviewStatus,
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

export function pickLoyaltyOverviewHighlights(
  items: ReadonlyArray<LoyaltyOverviewItem>,
  limit = 3,
): LoyaltyOverviewItem[] {
  return sortLoyaltyOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
