import type { ChangeEvent } from 'react';
import { ORDERS_SETTINGS_FEATURE } from './orders-settings.routes';
import type { OrdersSettingsSortKey } from './orders-settings.utils';

export interface OrdersSettingsFiltersProps {
  query: string;
  sortKey: OrdersSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: OrdersSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: OrdersSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function OrdersSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: OrdersSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as OrdersSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter orders settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-sort`}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
