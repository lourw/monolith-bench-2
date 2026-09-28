import type { ChangeEvent } from 'react';
import { ADDRESSES_INSIGHTS_FEATURE } from './addresses-insights.routes';
import type { AddressesInsightsSortKey } from './addresses-insights.utils';

export interface AddressesInsightsFiltersProps {
  query: string;
  sortKey: AddressesInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AddressesInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AddressesInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AddressesInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AddressesInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AddressesInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter addresses insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-sort`}
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
