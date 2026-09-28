import type { ChangeEvent } from 'react';
import { SIZING_SETTINGS_FEATURE } from './sizing-settings.routes';
import type { SizingSettingsSortKey } from './sizing-settings.utils';

export interface SizingSettingsFiltersProps {
  query: string;
  sortKey: SizingSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_SETTINGS_FEATURE.testId}-sort`}
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
