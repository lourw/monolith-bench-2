import type { ChangeEvent } from 'react';
import { SUBSCRIPTIONS_SETTINGS_FEATURE } from './subscriptions-settings.routes';
import type { SubscriptionsSettingsSortKey } from './subscriptions-settings.utils';

export interface SubscriptionsSettingsFiltersProps {
  query: string;
  sortKey: SubscriptionsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SubscriptionsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SubscriptionsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SubscriptionsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SubscriptionsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SubscriptionsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter subscriptions settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-sort`}
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
