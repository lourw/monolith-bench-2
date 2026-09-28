import { asyncNumber } from '../../../utils/async/async-number';
import { storagePercent } from '../../../utils/storage/storage-percent';
import {
  emptyGiftCardsWizardTotals,
  type GiftCardsWizardItem,
  type GiftCardsWizardStatus,
  type GiftCardsWizardTotals,
} from './gift-cards-wizard.model';

export type GiftCardsWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsWizard(
  items: ReadonlyArray<GiftCardsWizardItem>,
): GiftCardsWizardTotals {
  const totals = emptyGiftCardsWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsWizardByStatus(
  items: ReadonlyArray<GiftCardsWizardItem>,
): Record<GiftCardsWizardStatus, GiftCardsWizardItem[]> {
  const grouped: Record<GiftCardsWizardStatus, GiftCardsWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsWizard(
  items: ReadonlyArray<GiftCardsWizardItem>,
  query: string,
): GiftCardsWizardItem[] {
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

export function sortGiftCardsWizard(
  items: ReadonlyArray<GiftCardsWizardItem>,
  key: GiftCardsWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsWizardItem[] {
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

export function describeGiftCardsWizardItem(item: GiftCardsWizardItem): string {
  const amount = asyncNumber(item.amount);
  const name = storagePercent(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsWizardAmount(amount: number): string {
  return asyncNumber(amount);
}

export function giftCardsWizardStatusTone(
  status: GiftCardsWizardStatus,
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

export function pickGiftCardsWizardHighlights(
  items: ReadonlyArray<GiftCardsWizardItem>,
  limit = 3,
): GiftCardsWizardItem[] {
  return sortGiftCardsWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
