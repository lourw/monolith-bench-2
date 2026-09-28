import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_HISTORY_FEATURE } from './store-locator-history.routes';
import type { StoreLocatorHistorySortKey } from './store-locator-history.utils';

export interface StoreLocatorHistoryFiltersProps {
  query: string;
  sortKey: StoreLocatorHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-sort`}
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
