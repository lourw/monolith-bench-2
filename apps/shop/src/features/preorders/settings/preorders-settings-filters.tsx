import type { ChangeEvent } from 'react';
import { PREORDERS_SETTINGS_FEATURE } from './preorders-settings.routes';
import type { PreordersSettingsSortKey } from './preorders-settings.utils';

export interface PreordersSettingsFiltersProps {
  query: string;
  sortKey: PreordersSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_SETTINGS_FEATURE.testId}-sort`}
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
