import { formatCode } from '../../../utils/format/format-code';
import { asyncPercent } from '../../../utils/async/async-percent';
import { mathText } from '../../../utils/math/math-text';
import {
  emptyLoyaltySummaryTotals,
  type LoyaltySummaryItem,
  type LoyaltySummaryStatus,
  type LoyaltySummaryTotals,
} from './loyalty-summary.model';

export type LoyaltySummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalLoyaltySummary(
  items: ReadonlyArray<LoyaltySummaryItem>,
): LoyaltySummaryTotals {
  const totals = emptyLoyaltySummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupLoyaltySummaryByStatus(
  items: ReadonlyArray<LoyaltySummaryItem>,
): Record<LoyaltySummaryStatus, LoyaltySummaryItem[]> {
  const grouped: Record<LoyaltySummaryStatus, LoyaltySummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterLoyaltySummary(
  items: ReadonlyArray<LoyaltySummaryItem>,
  query: string,
): LoyaltySummaryItem[] {
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

export function sortLoyaltySummary(
  items: ReadonlyArray<LoyaltySummaryItem>,
  key: LoyaltySummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): LoyaltySummaryItem[] {
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

export function describeLoyaltySummaryItem(item: LoyaltySummaryItem): string {
  const amount = formatCode(item.amount);
  const name = mathText(asyncPercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatLoyaltySummaryAmount(amount: number): string {
  return formatCode(amount);
}

export function loyaltySummaryStatusTone(
  status: LoyaltySummaryStatus,
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

export function pickLoyaltySummaryHighlights(
  items: ReadonlyArray<LoyaltySummaryItem>,
  limit = 3,
): LoyaltySummaryItem[] {
  return sortLoyaltySummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
