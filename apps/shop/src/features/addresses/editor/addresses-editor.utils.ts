import { validatePercent } from '../../../utils/validate/validate-percent';
import { storageNumber } from '../../../utils/storage/storage-number';
import { collectionPhone } from '../../../utils/collection/collection-phone';
import {
  emptyAddressesEditorTotals,
  type AddressesEditorItem,
  type AddressesEditorStatus,
  type AddressesEditorTotals,
} from './addresses-editor.model';

export type AddressesEditorSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAddressesEditor(
  items: ReadonlyArray<AddressesEditorItem>,
): AddressesEditorTotals {
  const totals = emptyAddressesEditorTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAddressesEditorByStatus(
  items: ReadonlyArray<AddressesEditorItem>,
): Record<AddressesEditorStatus, AddressesEditorItem[]> {
  const grouped: Record<AddressesEditorStatus, AddressesEditorItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAddressesEditor(
  items: ReadonlyArray<AddressesEditorItem>,
  query: string,
): AddressesEditorItem[] {
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

export function sortAddressesEditor(
  items: ReadonlyArray<AddressesEditorItem>,
  key: AddressesEditorSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AddressesEditorItem[] {
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

export function describeAddressesEditorItem(item: AddressesEditorItem): string {
  const amount = validatePercent(item.amount);
  const name = collectionPhone(storageNumber(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAddressesEditorAmount(amount: number): string {
  return validatePercent(amount);
}

export function addressesEditorStatusTone(
  status: AddressesEditorStatus,
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

export function pickAddressesEditorHighlights(
  items: ReadonlyArray<AddressesEditorItem>,
  limit = 3,
): AddressesEditorItem[] {
  return sortAddressesEditor(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
