import type { ChangeEvent } from 'react';
import { BUNDLES_SETTINGS_FEATURE } from './bundles-settings.routes';
import type { BundlesSettingsSortKey } from './bundles-settings.utils';

export interface BundlesSettingsFiltersProps {
  query: string;
  sortKey: BundlesSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: BundlesSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: BundlesSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function BundlesSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: BundlesSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as BundlesSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter bundles settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${BUNDLES_SETTINGS_FEATURE.testId}-sort`}
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
