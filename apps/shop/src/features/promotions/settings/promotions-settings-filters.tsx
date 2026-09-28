import type { ChangeEvent } from 'react';
import { PROMOTIONS_SETTINGS_FEATURE } from './promotions-settings.routes';
import type { PromotionsSettingsSortKey } from './promotions-settings.utils';

export interface PromotionsSettingsFiltersProps {
  query: string;
  sortKey: PromotionsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-sort`}
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
