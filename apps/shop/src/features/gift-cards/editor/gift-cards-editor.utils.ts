import { mathName } from '../../../utils/math/math-name';
import { formatAddress } from '../../../utils/format/format-address';
import {
  emptyGiftCardsEditorTotals,
  type GiftCardsEditorItem,
  type GiftCardsEditorStatus,
  type GiftCardsEditorTotals,
} from './gift-cards-editor.model';

export type GiftCardsEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalGiftCardsEditor(
  items: ReadonlyArray<GiftCardsEditorItem>,
): GiftCardsEditorTotals {
  const totals = emptyGiftCardsEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupGiftCardsEditorByStatus(
  items: ReadonlyArray<GiftCardsEditorItem>,
): Record<GiftCardsEditorStatus, GiftCardsEditorItem[]> {
  const grouped: Record<GiftCardsEditorStatus, GiftCardsEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterGiftCardsEditor(
  items: ReadonlyArray<GiftCardsEditorItem>,
  query: string,
): GiftCardsEditorItem[] {
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

export function sortGiftCardsEditor(
  items: ReadonlyArray<GiftCardsEditorItem>,
  key: GiftCardsEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): GiftCardsEditorItem[] {
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

export function describeGiftCardsEditorItem(item: GiftCardsEditorItem): string {
  const amount = mathName(item.amount);
  const name = formatAddress(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatGiftCardsEditorAmount(amount: number): string {
  return mathName(amount);
}

export function giftCardsEditorStatusTone(
  status: GiftCardsEditorStatus,
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

export function pickGiftCardsEditorHighlights(
  items: ReadonlyArray<GiftCardsEditorItem>,
  limit = 3,
): GiftCardsEditorItem[] {
  return sortGiftCardsEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
