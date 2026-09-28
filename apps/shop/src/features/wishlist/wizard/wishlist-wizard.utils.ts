import { validateDate } from '../../../utils/validate/validate-date';
import { mathAddress } from '../../../utils/math/math-address';
import {
  emptyWishlistWizardTotals,
  type WishlistWizardItem,
  type WishlistWizardStatus,
  type WishlistWizardTotals,
} from './wishlist-wizard.model';

export type WishlistWizardSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistWizard(
  items: ReadonlyArray<WishlistWizardItem>,
): WishlistWizardTotals {
  const totals = emptyWishlistWizardTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistWizardByStatus(
  items: ReadonlyArray<WishlistWizardItem>,
): Record<WishlistWizardStatus, WishlistWizardItem[]> {
  const grouped: Record<WishlistWizardStatus, WishlistWizardItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistWizard(
  items: ReadonlyArray<WishlistWizardItem>,
  query: string,
): WishlistWizardItem[] {
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

export function sortWishlistWizard(
  items: ReadonlyArray<WishlistWizardItem>,
  key: WishlistWizardSortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistWizardItem[] {
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

export function describeWishlistWizardItem(item: WishlistWizardItem): string {
  const amount = validateDate(item.amount);
  const name = mathAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistWizardAmount(amount: number): string {
  return validateDate(amount);
}

export function wishlistWizardStatusTone(
  status: WishlistWizardStatus,
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

export function pickWishlistWizardHighlights(
  items: ReadonlyArray<WishlistWizardItem>,
  limit = 3,
): WishlistWizardItem[] {
  return sortWishlistWizard(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
