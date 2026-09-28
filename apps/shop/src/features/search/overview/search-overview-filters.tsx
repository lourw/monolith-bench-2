import type { ChangeEvent } from 'react';
import { SEARCH_OVERVIEW_FEATURE } from './search-overview.routes';
import type { SearchOverviewSortKey } from './search-overview.utils';

export interface SearchOverviewFiltersProps {
  query: string;
  sortKey: SearchOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_OVERVIEW_FEATURE.testId}-sort`}
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
