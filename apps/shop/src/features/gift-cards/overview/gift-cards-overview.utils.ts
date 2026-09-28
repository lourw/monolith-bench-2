import { i18nName } from '../../../utils/i18n/i18n-name';
import { validateCode } from '../../../utils/validate/validate-code';
import { validatePhone } from '../../../utils/validate/validate-phone';
import {
  emptyGiftCardsOverviewTotals,
  type GiftCardsOverviewItem,
  type GiftCardsOverviewStatus,
  type GiftCardsOverviewTotals,
} from './gift-cards-overview.model';

export type GiftCardsOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsOverview(
  items: ReadonlyArray<GiftCardsOverviewItem>,
): GiftCardsOverviewTotals {
  const totals = emptyGiftCardsOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsOverviewByStatus(
  items: ReadonlyArray<GiftCardsOverviewItem>,
): Record<GiftCardsOverviewStatus, GiftCardsOverviewItem[]> {
  const grouped: Record<GiftCardsOverviewStatus, GiftCardsOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsOverview(
  items: ReadonlyArray<GiftCardsOverviewItem>,
  query: string,
): GiftCardsOverviewItem[] {
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

export function sortGiftCardsOverview(
  items: ReadonlyArray<GiftCardsOverviewItem>,
  key: GiftCardsOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsOverviewItem[] {
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

export function describeGiftCardsOverviewItem(
  item: GiftCardsOverviewItem,
): string {
  const amount = i18nName(item.amount);
  const name = validatePhone(validateCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsOverviewAmount(amount: number): string {
  return i18nName(amount);
}

export function giftCardsOverviewStatusTone(
  status: GiftCardsOverviewStatus,
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

export function pickGiftCardsOverviewHighlights(
  items: ReadonlyArray<GiftCardsOverviewItem>,
  limit = 3,
): GiftCardsOverviewItem[] {
  return sortGiftCardsOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
