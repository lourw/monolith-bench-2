import { mathPhone } from '../../../utils/math/math-phone';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import {
  emptyAuthSettingsTotals,
  type AuthSettingsItem,
  type AuthSettingsStatus,
  type AuthSettingsTotals,
} from './auth-settings.model';

export type AuthSettingsSortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function totalAuthSettings(
  items: ReadonlyArray<AuthSettingsItem>,
): AuthSettingsTotals {
  const totals = emptyAuthSettingsTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupAuthSettingsByStatus(
  items: ReadonlyArray<AuthSettingsItem>,
): Record<AuthSettingsStatus, AuthSettingsItem[]> {
  const grouped: Record<AuthSettingsStatus, AuthSettingsItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterAuthSettings(
  items: ReadonlyArray<AuthSettingsItem>,
  query: string,
): AuthSettingsItem[] {
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

export function sortAuthSettings(
  items: ReadonlyArray<AuthSettingsItem>,
  key: AuthSettingsSortKey,
  direction: 'asc' | 'desc' = 'asc',
): AuthSettingsItem[] {
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

export function describeAuthSettingsItem(item: AuthSettingsItem): string {
  const amount = mathPhone(item.amount);
  const name = i18nSlug(item.name);
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatAuthSettingsAmount(amount: number): string {
  return mathPhone(amount);
}

export function authSettingsStatusTone(
  status: AuthSettingsStatus,
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

export function pickAuthSettingsHighlights(
  items: ReadonlyArray<AuthSettingsItem>,
  limit = 3,
): AuthSettingsItem[] {
  return sortAuthSettings(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
