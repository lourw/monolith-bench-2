import { i18nPercent } from '../../../utils/i18n/i18n-percent';
import { validateDate } from '../../../utils/validate/validate-date';
import {
  emptyCheckoutSettingsTotals,
  type CheckoutSettingsItem,
  type CheckoutSettingsStatus,
  type CheckoutSettingsTotals,
} from './checkout-settings.model';

export type CheckoutSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalCheckoutSettings(
  items: ReadonlyArray<CheckoutSettingsItem>,
): CheckoutSettingsTotals {
  const totals = emptyCheckoutSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupCheckoutSettingsByStatus(
  items: ReadonlyArray<CheckoutSettingsItem>,
): Record<CheckoutSettingsStatus, CheckoutSettingsItem[]> {
  const grouped: Record<CheckoutSettingsStatus, CheckoutSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterCheckoutSettings(
  items: ReadonlyArray<CheckoutSettingsItem>,
  query: string,
): CheckoutSettingsItem[] {
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

export function sortCheckoutSettings(
  items: ReadonlyArray<CheckoutSettingsItem>,
  key: CheckoutSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): CheckoutSettingsItem[] {
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

export function describeCheckoutSettingsItem(
  item: CheckoutSettingsItem,
): string {
  const amount = i18nPercent(item.amount);
  const name = validateDate(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatCheckoutSettingsAmount(amount: number): string {
  return i18nPercent(amount);
}

export function checkoutSettingsStatusTone(
  status: CheckoutSettingsStatus,
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

export function pickCheckoutSettingsHighlights(
  items: ReadonlyArray<CheckoutSettingsItem>,
  limit = 3,
): CheckoutSettingsItem[] {
  return sortCheckoutSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
