import { asyncName } from '../../../utils/async/async-name';
import {
  emptyInventoryInsightsTotals,
  type InventoryInsightsItem,
  type InventoryInsightsStatus,
  type InventoryInsightsTotals,
} from './inventory-insights.model';

export type InventoryInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventoryInsights(
  items: ReadonlyArray<InventoryInsightsItem>,
): InventoryInsightsTotals {
  const totals = emptyInventoryInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventoryInsightsByStatus(
  items: ReadonlyArray<InventoryInsightsItem>,
): Record<InventoryInsightsStatus, InventoryInsightsItem[]> {
  const grouped: Record<InventoryInsightsStatus, InventoryInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventoryInsights(
  items: ReadonlyArray<InventoryInsightsItem>,
  query: string,
): InventoryInsightsItem[] {
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

export function sortInventoryInsights(
  items: ReadonlyArray<InventoryInsightsItem>,
  key: InventoryInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventoryInsightsItem[] {
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

export function describeInventoryInsightsItem(
  item: InventoryInsightsItem,
): string {
  const amount = asyncName(item.amount);
  const name = asyncName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventoryInsightsAmount(amount: number): string {
  return asyncName(amount);
}

export function inventoryInsightsStatusTone(
  status: InventoryInsightsStatus,
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

export function pickInventoryInsightsHighlights(
  items: ReadonlyArray<InventoryInsightsItem>,
  limit = 3,
): InventoryInsightsItem[] {
  return sortInventoryInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
