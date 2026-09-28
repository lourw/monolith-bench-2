import type { ChangeEvent } from 'react';
import { SEARCH_DETAILS_FEATURE } from './search-details.routes';
import type { SearchDetailsSortKey } from './search-details.utils';

export interface SearchDetailsFiltersProps {
  query: string;
  sortKey: SearchDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_DETAILS_FEATURE.testId}-sort`}
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
