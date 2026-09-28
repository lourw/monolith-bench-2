import { storageCurrency } from '../../../utils/storage/storage-currency';
import { collectionName } from '../../../utils/collection/collection-name';
import { mathNumber } from '../../../utils/math/math-number';
import {
  emptyPreordersDetailsTotals,
  type PreordersDetailsItem,
  type PreordersDetailsStatus,
  type PreordersDetailsTotals,
} from './preorders-details.model';

export type PreordersDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersDetails(
  items: ReadonlyArray<PreordersDetailsItem>,
): PreordersDetailsTotals {
  const totals = emptyPreordersDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersDetailsByStatus(
  items: ReadonlyArray<PreordersDetailsItem>,
): Record<PreordersDetailsStatus, PreordersDetailsItem[]> {
  const grouped: Record<PreordersDetailsStatus, PreordersDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersDetails(
  items: ReadonlyArray<PreordersDetailsItem>,
  query: string,
): PreordersDetailsItem[] {
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

export function sortPreordersDetails(
  items: ReadonlyArray<PreordersDetailsItem>,
  key: PreordersDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersDetailsItem[] {
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

export function describePreordersDetailsItem(
  item: PreordersDetailsItem,
): string {
  const amount = storageCurrency(item.amount);
  const name = mathNumber(collectionName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersDetailsAmount(amount: number): string {
  return storageCurrency(amount);
}

export function preordersDetailsStatusTone(
  status: PreordersDetailsStatus,
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

export function pickPreordersDetailsHighlights(
  items: ReadonlyArray<PreordersDetailsItem>,
  limit = 3,
): PreordersDetailsItem[] {
  return sortPreordersDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
