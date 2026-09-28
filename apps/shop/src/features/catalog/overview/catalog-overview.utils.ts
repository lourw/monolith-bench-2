import { mathCode } from '../../../utils/math/math-code';
import { asyncPercent } from '../../../utils/async/async-percent';
import { validatePercent } from '../../../utils/validate/validate-percent';
import {
  emptyCatalogOverviewTotals,
  type CatalogOverviewItem,
  type CatalogOverviewStatus,
  type CatalogOverviewTotals,
} from './catalog-overview.model';

export type CatalogOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogOverview(
  items: ReadonlyArray<CatalogOverviewItem>,
): CatalogOverviewTotals {
  const totals = emptyCatalogOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogOverviewByStatus(
  items: ReadonlyArray<CatalogOverviewItem>,
): Record<CatalogOverviewStatus, CatalogOverviewItem[]> {
  const grouped: Record<CatalogOverviewStatus, CatalogOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogOverview(
  items: ReadonlyArray<CatalogOverviewItem>,
  query: string,
): CatalogOverviewItem[] {
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

export function sortCatalogOverview(
  items: ReadonlyArray<CatalogOverviewItem>,
  key: CatalogOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogOverviewItem[] {
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

export function describeCatalogOverviewItem(item: CatalogOverviewItem): string {
  const amount = mathCode(item.amount);
  const name = validatePercent(asyncPercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogOverviewAmount(amount: number): string {
  return mathCode(amount);
}

export function catalogOverviewStatusTone(
  status: CatalogOverviewStatus,
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

export function pickCatalogOverviewHighlights(
  items: ReadonlyArray<CatalogOverviewItem>,
  limit = 3,
): CatalogOverviewItem[] {
  return sortCatalogOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
