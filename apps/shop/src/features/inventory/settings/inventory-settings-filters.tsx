import type { ChangeEvent } from 'react';
import { INVENTORY_SETTINGS_FEATURE } from './inventory-settings.routes';
import type { InventorySettingsSortKey } from './inventory-settings.utils';

export interface InventorySettingsFiltersProps {
  query: string;
  sortKey: InventorySettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: InventorySettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: InventorySettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function InventorySettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: InventorySettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as InventorySettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter inventory settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${INVENTORY_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${INVENTORY_SETTINGS_FEATURE.testId}-sort`}
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
