import { asyncPhone } from '../../../utils/async/async-phone';
import { asyncAddress } from '../../../utils/async/async-address';
import {
  emptyCatalogDashboardTotals,
  type CatalogDashboardItem,
  type CatalogDashboardStatus,
  type CatalogDashboardTotals,
} from './catalog-dashboard.model';

export type CatalogDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCatalogDashboard(
  items: ReadonlyArray<CatalogDashboardItem>,
): CatalogDashboardTotals {
  const totals = emptyCatalogDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCatalogDashboardByStatus(
  items: ReadonlyArray<CatalogDashboardItem>,
): Record<CatalogDashboardStatus, CatalogDashboardItem[]> {
  const grouped: Record<CatalogDashboardStatus, CatalogDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCatalogDashboard(
  items: ReadonlyArray<CatalogDashboardItem>,
  query: string,
): CatalogDashboardItem[] {
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

export function sortCatalogDashboard(
  items: ReadonlyArray<CatalogDashboardItem>,
  key: CatalogDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CatalogDashboardItem[] {
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

export function describeCatalogDashboardItem(
  item: CatalogDashboardItem,
): string {
  const amount = asyncPhone(item.amount);
  const name = asyncAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCatalogDashboardAmount(amount: number): string {
  return asyncPhone(amount);
}

export function catalogDashboardStatusTone(
  status: CatalogDashboardStatus,
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

export function pickCatalogDashboardHighlights(
  items: ReadonlyArray<CatalogDashboardItem>,
  limit = 3,
): CatalogDashboardItem[] {
  return sortCatalogDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
