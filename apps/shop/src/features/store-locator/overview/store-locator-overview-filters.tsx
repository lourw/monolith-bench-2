import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_OVERVIEW_FEATURE } from './store-locator-overview.routes';
import type { StoreLocatorOverviewSortKey } from './store-locator-overview.utils';

export interface StoreLocatorOverviewFiltersProps {
  query: string;
  sortKey: StoreLocatorOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-sort`}
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
