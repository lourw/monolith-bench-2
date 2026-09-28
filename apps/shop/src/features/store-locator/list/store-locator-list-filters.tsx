import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_LIST_FEATURE } from './store-locator-list.routes';
import type { StoreLocatorListSortKey } from './store-locator-list.utils';

export interface StoreLocatorListFiltersProps {
  query: string;
  sortKey: StoreLocatorListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-sort`}
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
