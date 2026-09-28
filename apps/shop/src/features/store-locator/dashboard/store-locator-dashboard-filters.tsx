import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_DASHBOARD_FEATURE } from './store-locator-dashboard.routes';
import type { StoreLocatorDashboardSortKey } from './store-locator-dashboard.utils';

export interface StoreLocatorDashboardFiltersProps {
  query: string;
  sortKey: StoreLocatorDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-sort`}
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
