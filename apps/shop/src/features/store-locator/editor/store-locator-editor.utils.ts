import { validateDate } from '../../../utils/validate/validate-date';
import { mathName } from '../../../utils/math/math-name';
import { validateCode } from '../../../utils/validate/validate-code';
import {
  emptyStoreLocatorEditorTotals,
  type StoreLocatorEditorItem,
  type StoreLocatorEditorStatus,
  type StoreLocatorEditorTotals,
} from './store-locator-editor.model';

export type StoreLocatorEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalStoreLocatorEditor(
  items: ReadonlyArray<StoreLocatorEditorItem>,
): StoreLocatorEditorTotals {
  const totals = emptyStoreLocatorEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupStoreLocatorEditorByStatus(
  items: ReadonlyArray<StoreLocatorEditorItem>,
): Record<StoreLocatorEditorStatus, StoreLocatorEditorItem[]> {
  const grouped: Record<StoreLocatorEditorStatus, StoreLocatorEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterStoreLocatorEditor(
  items: ReadonlyArray<StoreLocatorEditorItem>,
  query: string,
): StoreLocatorEditorItem[] {
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

export function sortStoreLocatorEditor(
  items: ReadonlyArray<StoreLocatorEditorItem>,
  key: StoreLocatorEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): StoreLocatorEditorItem[] {
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

export function describeStoreLocatorEditorItem(
  item: StoreLocatorEditorItem,
): string {
  const amount = validateDate(item.amount);
  const name = validateCode(mathName(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatStoreLocatorEditorAmount(amount: number): string {
  return validateDate(amount);
}

export function storeLocatorEditorStatusTone(
  status: StoreLocatorEditorStatus,
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

export function pickStoreLocatorEditorHighlights(
  items: ReadonlyArray<StoreLocatorEditorItem>,
  limit = 3,
): StoreLocatorEditorItem[] {
  return sortStoreLocatorEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
