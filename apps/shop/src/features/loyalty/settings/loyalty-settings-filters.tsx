import type { ChangeEvent } from 'react';
import { LOYALTY_SETTINGS_FEATURE } from './loyalty-settings.routes';
import type { LoyaltySettingsSortKey } from './loyalty-settings.utils';

export interface LoyaltySettingsFiltersProps {
  query: string;
  sortKey: LoyaltySettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltySettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltySettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltySettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltySettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltySettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-sort`}
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
