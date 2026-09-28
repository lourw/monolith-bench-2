import { i18nName } from '../../../utils/i18n/i18n-name';
import { validatePercent } from '../../../utils/validate/validate-percent';
import { asyncName } from '../../../utils/async/async-name';
import {
  emptyGiftCardsDetailsTotals,
  type GiftCardsDetailsItem,
  type GiftCardsDetailsStatus,
  type GiftCardsDetailsTotals,
} from './gift-cards-details.model';

export type GiftCardsDetailsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsDetails(
  items: ReadonlyArray<GiftCardsDetailsItem>,
): GiftCardsDetailsTotals {
  const totals = emptyGiftCardsDetailsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsDetailsByStatus(
  items: ReadonlyArray<GiftCardsDetailsItem>,
): Record<GiftCardsDetailsStatus, GiftCardsDetailsItem[]> {
  const grouped: Record<GiftCardsDetailsStatus, GiftCardsDetailsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsDetails(
  items: ReadonlyArray<GiftCardsDetailsItem>,
  query: string,
): GiftCardsDetailsItem[] {
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

export function sortGiftCardsDetails(
  items: ReadonlyArray<GiftCardsDetailsItem>,
  key: GiftCardsDetailsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsDetailsItem[] {
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

export function describeGiftCardsDetailsItem(
  item: GiftCardsDetailsItem,
): string {
  const amount = i18nName(item.amount);
  const name = asyncName(validatePercent(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsDetailsAmount(amount: number): string {
  return i18nName(amount);
}

export function giftCardsDetailsStatusTone(
  status: GiftCardsDetailsStatus,
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

export function pickGiftCardsDetailsHighlights(
  items: ReadonlyArray<GiftCardsDetailsItem>,
  limit = 3,
): GiftCardsDetailsItem[] {
  return sortGiftCardsDetails(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
