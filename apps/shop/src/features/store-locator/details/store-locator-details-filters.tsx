import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_DETAILS_FEATURE } from './store-locator-details.routes';
import type { StoreLocatorDetailsSortKey } from './store-locator-details.utils';

export interface StoreLocatorDetailsFiltersProps {
  query: string;
  sortKey: StoreLocatorDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_DETAILS_FEATURE.testId}-sort`}
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
