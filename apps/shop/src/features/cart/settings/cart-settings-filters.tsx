import type { ChangeEvent } from 'react';
import { CART_SETTINGS_FEATURE } from './cart-settings.routes';
import type { CartSettingsSortKey } from './cart-settings.utils';

export interface CartSettingsFiltersProps {
  query: string;
  sortKey: CartSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CartSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CartSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CartSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CartSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CartSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter cart settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CART_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CART_SETTINGS_FEATURE.testId}-sort`}
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
