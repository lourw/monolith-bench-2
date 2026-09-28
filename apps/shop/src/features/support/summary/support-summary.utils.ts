import { i18nName } from '../../../utils/i18n/i18n-name';
import { validatePercent } from '../../../utils/validate/validate-percent';
import { asyncPhone } from '../../../utils/async/async-phone';
import {
  emptySupportSummaryTotals,
  type SupportSummaryItem,
  type SupportSummaryStatus,
  type SupportSummaryTotals,
} from './support-summary.model';

export type SupportSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportSummary(
  items: ReadonlyArray<SupportSummaryItem>,
): SupportSummaryTotals {
  const totals = emptySupportSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportSummaryByStatus(
  items: ReadonlyArray<SupportSummaryItem>,
): Record<SupportSummaryStatus, SupportSummaryItem[]> {
  const grouped: Record<SupportSummaryStatus, SupportSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportSummary(
  items: ReadonlyArray<SupportSummaryItem>,
  query: string,
): SupportSummaryItem[] {
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

export function sortSupportSummary(
  items: ReadonlyArray<SupportSummaryItem>,
  key: SupportSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportSummaryItem[] {
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

export function describeSupportSummaryItem(item: SupportSummaryItem): string {
  const amount = i18nName(item.amount);
  const name = asyncPhone(validatePercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportSummaryAmount(amount: number): string {
  return i18nName(amount);
}

export function supportSummaryStatusTone(
  status: SupportSummaryStatus,
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

export function pickSupportSummaryHighlights(
  items: ReadonlyArray<SupportSummaryItem>,
  limit = 3,
): SupportSummaryItem[] {
  return sortSupportSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
