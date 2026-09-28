import { mathSlug } from '../../../utils/math/math-slug';
import {
  emptyCompareDetailsTotals,
  type CompareDetailsItem,
  type CompareDetailsStatus,
  type CompareDetailsTotals,
} from './compare-details.model';

export type CompareDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCompareDetails(
  items: ReadonlyArray<CompareDetailsItem>,
): CompareDetailsTotals {
  const totals = emptyCompareDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCompareDetailsByStatus(
  items: ReadonlyArray<CompareDetailsItem>,
): Record<CompareDetailsStatus, CompareDetailsItem[]> {
  const grouped: Record<CompareDetailsStatus, CompareDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCompareDetails(
  items: ReadonlyArray<CompareDetailsItem>,
  query: string,
): CompareDetailsItem[] {
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

export function sortCompareDetails(
  items: ReadonlyArray<CompareDetailsItem>,
  key: CompareDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CompareDetailsItem[] {
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

export function describeCompareDetailsItem(item: CompareDetailsItem): string {
  const amount = mathSlug(item.amount);
  const name = mathSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCompareDetailsAmount(amount: number): string {
  return mathSlug(amount);
}

export function compareDetailsStatusTone(
  status: CompareDetailsStatus,
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

export function pickCompareDetailsHighlights(
  items: ReadonlyArray<CompareDetailsItem>,
  limit = 3,
): CompareDetailsItem[] {
  return sortCompareDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
