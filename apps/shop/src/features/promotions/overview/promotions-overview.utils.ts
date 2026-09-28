import { validateText } from '../../../utils/validate/validate-text';
import { collectionPhone } from '../../../utils/collection/collection-phone';
import { validateCode } from '../../../utils/validate/validate-code';
import {
  emptyPromotionsOverviewTotals,
  type PromotionsOverviewItem,
  type PromotionsOverviewStatus,
  type PromotionsOverviewTotals,
} from './promotions-overview.model';

export type PromotionsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsOverview(
  items: ReadonlyArray<PromotionsOverviewItem>,
): PromotionsOverviewTotals {
  const totals = emptyPromotionsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsOverviewByStatus(
  items: ReadonlyArray<PromotionsOverviewItem>,
): Record<PromotionsOverviewStatus, PromotionsOverviewItem[]> {
  const grouped: Record<PromotionsOverviewStatus, PromotionsOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsOverview(
  items: ReadonlyArray<PromotionsOverviewItem>,
  query: string,
): PromotionsOverviewItem[] {
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

export function sortPromotionsOverview(
  items: ReadonlyArray<PromotionsOverviewItem>,
  key: PromotionsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsOverviewItem[] {
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

export function describePromotionsOverviewItem(
  item: PromotionsOverviewItem,
): string {
  const amount = validateText(item.amount);
  const name = validateCode(collectionPhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsOverviewAmount(amount: number): string {
  return validateText(amount);
}

export function promotionsOverviewStatusTone(
  status: PromotionsOverviewStatus,
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

export function pickPromotionsOverviewHighlights(
  items: ReadonlyArray<PromotionsOverviewItem>,
  limit = 3,
): PromotionsOverviewItem[] {
  return sortPromotionsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
