import { validateSlug } from '../../../utils/validate/validate-slug';
import { i18nName } from '../../../utils/i18n/i18n-name';
import {
  emptyPaymentsSettingsTotals,
  type PaymentsSettingsItem,
  type PaymentsSettingsStatus,
  type PaymentsSettingsTotals,
} from './payments-settings.model';

export type PaymentsSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalPaymentsSettings(
  items: ReadonlyArray<PaymentsSettingsItem>,
): PaymentsSettingsTotals {
  const totals = emptyPaymentsSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupPaymentsSettingsByStatus(
  items: ReadonlyArray<PaymentsSettingsItem>,
): Record<PaymentsSettingsStatus, PaymentsSettingsItem[]> {
  const grouped: Record<PaymentsSettingsStatus, PaymentsSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterPaymentsSettings(
  items: ReadonlyArray<PaymentsSettingsItem>,
  query: string,
): PaymentsSettingsItem[] {
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

export function sortPaymentsSettings(
  items: ReadonlyArray<PaymentsSettingsItem>,
  key: PaymentsSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): PaymentsSettingsItem[] {
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

export function describePaymentsSettingsItem(
  item: PaymentsSettingsItem,
): string {
  const amount = validateSlug(item.amount);
  const name = i18nName(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatPaymentsSettingsAmount(amount: number): string {
  return validateSlug(amount);
}

export function paymentsSettingsStatusTone(
  status: PaymentsSettingsStatus,
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

export function pickPaymentsSettingsHighlights(
  items: ReadonlyArray<PaymentsSettingsItem>,
  limit = 3,
): PaymentsSettingsItem[] {
  return sortPaymentsSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
