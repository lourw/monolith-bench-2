import { asyncPercent } from '../../../utils/async/async-percent';
import { mathSlug } from '../../../utils/math/math-slug';
import { validateDate } from '../../../utils/validate/validate-date';
import {
  emptyReturnsDetailsTotals,
  type ReturnsDetailsItem,
  type ReturnsDetailsStatus,
  type ReturnsDetailsTotals,
} from './returns-details.model';

export type ReturnsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalReturnsDetails(
  items: ReadonlyArray<ReturnsDetailsItem>,
): ReturnsDetailsTotals {
  const totals = emptyReturnsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupReturnsDetailsByStatus(
  items: ReadonlyArray<ReturnsDetailsItem>,
): Record<ReturnsDetailsStatus, ReturnsDetailsItem[]> {
  const grouped: Record<ReturnsDetailsStatus, ReturnsDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterReturnsDetails(
  items: ReadonlyArray<ReturnsDetailsItem>,
  query: string,
): ReturnsDetailsItem[] {
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

export function sortReturnsDetails(
  items: ReadonlyArray<ReturnsDetailsItem>,
  key: ReturnsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): ReturnsDetailsItem[] {
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

export function describeReturnsDetailsItem(item: ReturnsDetailsItem): string {
  const amount = asyncPercent(item.amount);
  const name = validateDate(mathSlug(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatReturnsDetailsAmount(amount: number): string {
  return asyncPercent(amount);
}

export function returnsDetailsStatusTone(
  status: ReturnsDetailsStatus,
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

export function pickReturnsDetailsHighlights(
  items: ReadonlyArray<ReturnsDetailsItem>,
  limit = 3,
): ReturnsDetailsItem[] {
  return sortReturnsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
