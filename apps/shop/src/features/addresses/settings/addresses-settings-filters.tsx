import type { ChangeEvent } from 'react';
import { ADDRESSES_SETTINGS_FEATURE } from './addresses-settings.routes';
import type { AddressesSettingsSortKey } from './addresses-settings.utils';

export interface AddressesSettingsFiltersProps {
  query: string;
  sortKey: AddressesSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_SETTINGS_FEATURE.testId}-sort`}
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
