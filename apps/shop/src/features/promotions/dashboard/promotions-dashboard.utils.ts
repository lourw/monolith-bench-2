import { formatName } from '../../../utils/format/format-name';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import { i18nName } from '../../../utils/i18n/i18n-name';
import {
  emptyPromotionsDashboardTotals,
  type PromotionsDashboardItem,
  type PromotionsDashboardStatus,
  type PromotionsDashboardTotals,
} from './promotions-dashboard.model';

export type PromotionsDashboardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPromotionsDashboard(
  items: ReadonlyArray<PromotionsDashboardItem>,
): PromotionsDashboardTotals {
  const totals = emptyPromotionsDashboardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPromotionsDashboardByStatus(
  items: ReadonlyArray<PromotionsDashboardItem>,
): Record<PromotionsDashboardStatus, PromotionsDashboardItem[]> {
  const grouped: Record<PromotionsDashboardStatus, PromotionsDashboardItem[]> =
    {
      active: [],
      pending: [],
      archived: [],
    };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPromotionsDashboard(
  items: ReadonlyArray<PromotionsDashboardItem>,
  query: string,
): PromotionsDashboardItem[] {
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

export function sortPromotionsDashboard(
  items: ReadonlyArray<PromotionsDashboardItem>,
  key: PromotionsDashboardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PromotionsDashboardItem[] {
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

export function describePromotionsDashboardItem(
  item: PromotionsDashboardItem,
): string {
  const amount = formatName(item.amount);
  const name = i18nName(i18nCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPromotionsDashboardAmount(amount: number): string {
  return formatName(amount);
}

export function promotionsDashboardStatusTone(
  status: PromotionsDashboardStatus,
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

export function pickPromotionsDashboardHighlights(
  items: ReadonlyArray<PromotionsDashboardItem>,
  limit = 3,
): PromotionsDashboardItem[] {
  return sortPromotionsDashboard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
