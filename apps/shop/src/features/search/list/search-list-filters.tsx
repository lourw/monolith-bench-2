import type { ChangeEvent } from 'react';
import { SEARCH_LIST_FEATURE } from './search-list.routes';
import type { SearchListSortKey } from './search-list.utils';

export interface SearchListFiltersProps {
  query: string;
  sortKey: SearchListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: SearchListSortKey; label: string }> =
  [
    { value: 'name', label: 'Name' },
    { value: 'amount', label: 'Amount' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'createdAt', label: 'Created' },
  ];

export function SearchListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_LIST_FEATURE.testId}-sort`}
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
