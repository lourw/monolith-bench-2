import type { ChangeEvent } from 'react';
import { TRACKING_SETTINGS_FEATURE } from './tracking-settings.routes';
import type { TrackingSettingsSortKey } from './tracking-settings.utils';

export interface TrackingSettingsFiltersProps {
  query: string;
  sortKey: TrackingSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_SETTINGS_FEATURE.testId}-sort`}
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
