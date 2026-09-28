import { i18nDate } from '../../../utils/i18n/i18n-date';
import { formatSlug } from '../../../utils/format/format-slug';
import { formatDate } from '../../../utils/format/format-date';
import {
  emptyPreordersDashboardTotals,
  type PreordersDashboardItem,
  type PreordersDashboardStatus,
  type PreordersDashboardTotals,
} from './preorders-dashboard.model';

export type PreordersDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPreordersDashboard(
  items: ReadonlyArray<PreordersDashboardItem>,
): PreordersDashboardTotals {
  const totals = emptyPreordersDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPreordersDashboardByStatus(
  items: ReadonlyArray<PreordersDashboardItem>,
): Record<PreordersDashboardStatus, PreordersDashboardItem[]> {
  const grouped: Record<PreordersDashboardStatus, PreordersDashboardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPreordersDashboard(
  items: ReadonlyArray<PreordersDashboardItem>,
  query: string,
): PreordersDashboardItem[] {
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

export function sortPreordersDashboard(
  items: ReadonlyArray<PreordersDashboardItem>,
  key: PreordersDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PreordersDashboardItem[] {
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

export function describePreordersDashboardItem(
  item: PreordersDashboardItem,
): string {
  const amount = i18nDate(item.amount);
  const name = formatDate(formatSlug(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPreordersDashboardAmount(amount: number): string {
  return i18nDate(amount);
}

export function preordersDashboardStatusTone(
  status: PreordersDashboardStatus,
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

export function pickPreordersDashboardHighlights(
  items: ReadonlyArray<PreordersDashboardItem>,
  limit = 3,
): PreordersDashboardItem[] {
  return sortPreordersDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
