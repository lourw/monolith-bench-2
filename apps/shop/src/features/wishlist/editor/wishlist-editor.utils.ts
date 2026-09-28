import { storageSlug } from '../../../utils/storage/storage-slug';
import { collectionText } from '../../../utils/collection/collection-text';
import {
  emptyWishlistEditorTotals,
  type WishlistEditorItem,
  type WishlistEditorStatus,
  type WishlistEditorTotals,
} from './wishlist-editor.model';

export type WishlistEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalWishlistEditor(
  items: ReadonlyArray<WishlistEditorItem>,
): WishlistEditorTotals {
  const totals = emptyWishlistEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupWishlistEditorByStatus(
  items: ReadonlyArray<WishlistEditorItem>,
): Record<WishlistEditorStatus, WishlistEditorItem[]> {
  const grouped: Record<WishlistEditorStatus, WishlistEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterWishlistEditor(
  items: ReadonlyArray<WishlistEditorItem>,
  query: string,
): WishlistEditorItem[] {
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

export function sortWishlistEditor(
  items: ReadonlyArray<WishlistEditorItem>,
  key: WishlistEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): WishlistEditorItem[] {
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

export function describeWishlistEditorItem(item: WishlistEditorItem): string {
  const amount = storageSlug(item.amount);
  const name = collectionText(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatWishlistEditorAmount(amount: number): string {
  return storageSlug(amount);
}

export function wishlistEditorStatusTone(
  status: WishlistEditorStatus,
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

export function pickWishlistEditorHighlights(
  items: ReadonlyArray<WishlistEditorItem>,
  limit = 3,
): WishlistEditorItem[] {
  return sortWishlistEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
