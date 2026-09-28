import { mathPercent } from '../../../utils/math/math-percent';
import { validateDate } from '../../../utils/validate/validate-date';
import { validatePhone } from '../../../utils/validate/validate-phone';
import {
  emptyAccountSettingsTotals,
  type AccountSettingsItem,
  type AccountSettingsStatus,
  type AccountSettingsTotals,
} from './account-settings.model';

export type AccountSettingsSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAccountSettings(
  items: ReadonlyArray<AccountSettingsItem>,
): AccountSettingsTotals {
  const totals = emptyAccountSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAccountSettingsByStatus(
  items: ReadonlyArray<AccountSettingsItem>,
): Record<AccountSettingsStatus, AccountSettingsItem[]> {
  const grouped: Record<AccountSettingsStatus, AccountSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAccountSettings(
  items: ReadonlyArray<AccountSettingsItem>,
  query: string,
): AccountSettingsItem[] {
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

export function sortAccountSettings(
  items: ReadonlyArray<AccountSettingsItem>,
  key: AccountSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AccountSettingsItem[] {
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

export function describeAccountSettingsItem(item: AccountSettingsItem): string {
  const amount = mathPercent(item.amount);
  const name = validatePhone(validateDate(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAccountSettingsAmount(amount: number): string {
  return mathPercent(amount);
}

export function accountSettingsStatusTone(
  status: AccountSettingsStatus,
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

export function pickAccountSettingsHighlights(
  items: ReadonlyArray<AccountSettingsItem>,
  limit = 3,
): AccountSettingsItem[] {
  return sortAccountSettings(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
