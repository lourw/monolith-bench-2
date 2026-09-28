import { mathCurrency } from '../../../utils/math/math-currency';
import { validateAddress } from '../../../utils/validate/validate-address';
import { formatPercent } from '../../../utils/format/format-percent';
import {
  emptyCatalogInsightsTotals,
  type CatalogInsightsItem,
  type CatalogInsightsStatus,
  type CatalogInsightsTotals,
} from './catalog-insights.model';

export type CatalogInsightsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogInsights(
  items: ReadonlyArray<CatalogInsightsItem>,
): CatalogInsightsTotals {
  const totals = emptyCatalogInsightsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogInsightsByStatus(
  items: ReadonlyArray<CatalogInsightsItem>,
): Record<CatalogInsightsStatus, CatalogInsightsItem[]> {
  const grouped: Record<CatalogInsightsStatus, CatalogInsightsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogInsights(
  items: ReadonlyArray<CatalogInsightsItem>,
  query: string,
): CatalogInsightsItem[] {
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

export function sortCatalogInsights(
  items: ReadonlyArray<CatalogInsightsItem>,
  key: CatalogInsightsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogInsightsItem[] {
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

export function describeCatalogInsightsItem(item: CatalogInsightsItem): string {
  const amount = mathCurrency(item.amount);
  const name = formatPercent(validateAddress(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogInsightsAmount(amount: number): string {
  return mathCurrency(amount);
}

export function catalogInsightsStatusTone(
  status: CatalogInsightsStatus,
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

export function pickCatalogInsightsHighlights(
  items: ReadonlyArray<CatalogInsightsItem>,
  limit = 3,
): CatalogInsightsItem[] {
  return sortCatalogInsights(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
