import type { ChangeEvent } from 'react';
import { SUPPORT_SETTINGS_FEATURE } from './support-settings.routes';
import type { SupportSettingsSortKey } from './support-settings.utils';

export interface SupportSettingsFiltersProps {
  query: string;
  sortKey: SupportSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_SETTINGS_FEATURE.testId}-sort`}
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
