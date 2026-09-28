import { validateCode } from '../../../utils/validate/validate-code';
import { mathPhone } from '../../../utils/math/math-phone';
import { collectionPercent } from '../../../utils/collection/collection-percent';
import {
  emptyInventoryEditorTotals,
  type InventoryEditorItem,
  type InventoryEditorStatus,
  type InventoryEditorTotals,
} from './inventory-editor.model';

export type InventoryEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventoryEditor(
  items: ReadonlyArray<InventoryEditorItem>,
): InventoryEditorTotals {
  const totals = emptyInventoryEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventoryEditorByStatus(
  items: ReadonlyArray<InventoryEditorItem>,
): Record<InventoryEditorStatus, InventoryEditorItem[]> {
  const grouped: Record<InventoryEditorStatus, InventoryEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventoryEditor(
  items: ReadonlyArray<InventoryEditorItem>,
  query: string,
): InventoryEditorItem[] {
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

export function sortInventoryEditor(
  items: ReadonlyArray<InventoryEditorItem>,
  key: InventoryEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventoryEditorItem[] {
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

export function describeInventoryEditorItem(item: InventoryEditorItem): string {
  const amount = validateCode(item.amount);
  const name = collectionPercent(mathPhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventoryEditorAmount(amount: number): string {
  return validateCode(amount);
}

export function inventoryEditorStatusTone(
  status: InventoryEditorStatus,
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

export function pickInventoryEditorHighlights(
  items: ReadonlyArray<InventoryEditorItem>,
  limit = 3,
): InventoryEditorItem[] {
  return sortInventoryEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
