import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyPromotionsDetailsTotals,
  type PromotionsDetailsItem,
  type PromotionsDetailsStatus,
  type PromotionsDetailsTotals,
} from './promotions-details.model';

export type PromotionsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsDetails(
  items: ReadonlyArray<PromotionsDetailsItem>,
): PromotionsDetailsTotals {
  const totals = emptyPromotionsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsDetailsByStatus(
  items: ReadonlyArray<PromotionsDetailsItem>,
): Record<PromotionsDetailsStatus, PromotionsDetailsItem[]> {
  const grouped: Record<PromotionsDetailsStatus, PromotionsDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsDetails(
  items: ReadonlyArray<PromotionsDetailsItem>,
  query: string,
): PromotionsDetailsItem[] {
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

export function sortPromotionsDetails(
  items: ReadonlyArray<PromotionsDetailsItem>,
  key: PromotionsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsDetailsItem[] {
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

export function describePromotionsDetailsItem(
  item: PromotionsDetailsItem,
): string {
  const amount = validateName(item.amount);
  const name = validateName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsDetailsAmount(amount: number): string {
  return validateName(amount);
}

export function promotionsDetailsStatusTone(
  status: PromotionsDetailsStatus,
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

export function pickPromotionsDetailsHighlights(
  items: ReadonlyArray<PromotionsDetailsItem>,
  limit = 3,
): PromotionsDetailsItem[] {
  return sortPromotionsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
