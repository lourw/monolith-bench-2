import { validateText } from '../../../utils/validate/validate-text';
import { validateCode } from '../../../utils/validate/validate-code';
import { formatPhone } from '../../../utils/format/format-phone';
import {
  emptyInventoryHistoryTotals,
  type InventoryHistoryItem,
  type InventoryHistoryStatus,
  type InventoryHistoryTotals,
} from './inventory-history.model';

export type InventoryHistorySortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalInventoryHistory(
  items: ReadonlyArray<InventoryHistoryItem>,
): InventoryHistoryTotals {
  const totals = emptyInventoryHistoryTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupInventoryHistoryByStatus(
  items: ReadonlyArray<InventoryHistoryItem>,
): Record<InventoryHistoryStatus, InventoryHistoryItem[]> {
  const grouped: Record<InventoryHistoryStatus, InventoryHistoryItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterInventoryHistory(
  items: ReadonlyArray<InventoryHistoryItem>,
  query: string,
): InventoryHistoryItem[] {
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

export function sortInventoryHistory(
  items: ReadonlyArray<InventoryHistoryItem>,
  key: InventoryHistorySortKey,
  direction: 'asc' | 'desc' = 'asc',
): InventoryHistoryItem[] {
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

export function describeInventoryHistoryItem(
  item: InventoryHistoryItem,
): string {
  const amount = validateText(item.amount);
  const name = formatPhone(validateCode(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatInventoryHistoryAmount(amount: number): string {
  return validateText(amount);
}

export function inventoryHistoryStatusTone(
  status: InventoryHistoryStatus,
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

export function pickInventoryHistoryHighlights(
  items: ReadonlyArray<InventoryHistoryItem>,
  limit = 3,
): InventoryHistoryItem[] {
  return sortInventoryHistory(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
