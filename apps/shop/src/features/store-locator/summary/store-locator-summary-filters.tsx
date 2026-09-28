import type { ChangeEvent } from 'react';
import { STORE_LOCATOR_SUMMARY_FEATURE } from './store-locator-summary.routes';
import type { StoreLocatorSummarySortKey } from './store-locator-summary.utils';

export interface StoreLocatorSummaryFiltersProps {
  query: string;
  sortKey: StoreLocatorSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: StoreLocatorSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: StoreLocatorSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function StoreLocatorSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: StoreLocatorSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as StoreLocatorSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter store locator summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-sort`}
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
