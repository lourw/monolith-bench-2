import { i18nName } from '../../../utils/i18n/i18n-name';
import { validateName } from '../../../utils/validate/validate-name';
import {
  emptyGiftCardsSummaryTotals,
  type GiftCardsSummaryItem,
  type GiftCardsSummaryStatus,
  type GiftCardsSummaryTotals,
} from './gift-cards-summary.model';

export type GiftCardsSummarySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsSummary(
  items: ReadonlyArray<GiftCardsSummaryItem>,
): GiftCardsSummaryTotals {
  const totals = emptyGiftCardsSummaryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsSummaryByStatus(
  items: ReadonlyArray<GiftCardsSummaryItem>,
): Record<GiftCardsSummaryStatus, GiftCardsSummaryItem[]> {
  const grouped: Record<GiftCardsSummaryStatus, GiftCardsSummaryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsSummary(
  items: ReadonlyArray<GiftCardsSummaryItem>,
  query: string,
): GiftCardsSummaryItem[] {
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

export function sortGiftCardsSummary(
  items: ReadonlyArray<GiftCardsSummaryItem>,
  key: GiftCardsSummarySortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsSummaryItem[] {
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

export function describeGiftCardsSummaryItem(
  item: GiftCardsSummaryItem,
): string {
  const amount = i18nName(item.amount);
  const name = validateName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsSummaryAmount(amount: number): string {
  return i18nName(amount);
}

export function giftCardsSummaryStatusTone(
  status: GiftCardsSummaryStatus,
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

export function pickGiftCardsSummaryHighlights(
  items: ReadonlyArray<GiftCardsSummaryItem>,
  limit = 3,
): GiftCardsSummaryItem[] {
  return sortGiftCardsSummary(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
