import { asyncSlug } from '../../../utils/async/async-slug';
import {
  emptyInventorySummaryTotals,
  type InventorySummaryItem,
  type InventorySummaryStatus,
  type InventorySummaryTotals,
} from './inventory-summary.model';

export type InventorySummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventorySummary(
  items: ReadonlyArray<InventorySummaryItem>,
): InventorySummaryTotals {
  const totals = emptyInventorySummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventorySummaryByStatus(
  items: ReadonlyArray<InventorySummaryItem>,
): Record<InventorySummaryStatus, InventorySummaryItem[]> {
  const grouped: Record<InventorySummaryStatus, InventorySummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventorySummary(
  items: ReadonlyArray<InventorySummaryItem>,
  query: string,
): InventorySummaryItem[] {
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

export function sortInventorySummary(
  items: ReadonlyArray<InventorySummaryItem>,
  key: InventorySummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventorySummaryItem[] {
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

export function describeInventorySummaryItem(
  item: InventorySummaryItem,
): string {
  const amount = asyncSlug(item.amount);
  const name = asyncSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventorySummaryAmount(amount: number): string {
  return asyncSlug(amount);
}

export function inventorySummaryStatusTone(
  status: InventorySummaryStatus,
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

export function pickInventorySummaryHighlights(
  items: ReadonlyArray<InventorySummaryItem>,
  limit = 3,
): InventorySummaryItem[] {
  return sortInventorySummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
