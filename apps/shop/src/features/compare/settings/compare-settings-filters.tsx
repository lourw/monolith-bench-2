import type { ChangeEvent } from 'react';
import { COMPARE_SETTINGS_FEATURE } from './compare-settings.routes';
import type { CompareSettingsSortKey } from './compare-settings.utils';

export interface CompareSettingsFiltersProps {
  query: string;
  sortKey: CompareSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_SETTINGS_FEATURE.testId}-sort`}
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
