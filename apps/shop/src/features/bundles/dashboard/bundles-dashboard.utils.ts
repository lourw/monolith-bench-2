import { formatText } from '../../../utils/format/format-text';
import { collectionName } from '../../../utils/collection/collection-name';
import { mathName } from '../../../utils/math/math-name';
import {
  emptyBundlesDashboardTotals,
  type BundlesDashboardItem,
  type BundlesDashboardStatus,
  type BundlesDashboardTotals,
} from './bundles-dashboard.model';

export type BundlesDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalBundlesDashboard(
  items: ReadonlyArray<BundlesDashboardItem>,
): BundlesDashboardTotals {
  const totals = emptyBundlesDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupBundlesDashboardByStatus(
  items: ReadonlyArray<BundlesDashboardItem>,
): Record<BundlesDashboardStatus, BundlesDashboardItem[]> {
  const grouped: Record<BundlesDashboardStatus, BundlesDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterBundlesDashboard(
  items: ReadonlyArray<BundlesDashboardItem>,
  query: string,
): BundlesDashboardItem[] {
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

export function sortBundlesDashboard(
  items: ReadonlyArray<BundlesDashboardItem>,
  key: BundlesDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): BundlesDashboardItem[] {
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

export function describeBundlesDashboardItem(
  item: BundlesDashboardItem,
): string {
  const amount = formatText(item.amount);
  const name = mathName(collectionName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatBundlesDashboardAmount(amount: number): string {
  return formatText(amount);
}

export function bundlesDashboardStatusTone(
  status: BundlesDashboardStatus,
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

export function pickBundlesDashboardHighlights(
  items: ReadonlyArray<BundlesDashboardItem>,
  limit = 3,
): BundlesDashboardItem[] {
  return sortBundlesDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
