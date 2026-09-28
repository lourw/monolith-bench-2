import type { ChangeEvent } from 'react';
import { SEARCH_HISTORY_FEATURE } from './search-history.routes';
import type { SearchHistorySortKey } from './search-history.utils';

export interface SearchHistoryFiltersProps {
  query: string;
  sortKey: SearchHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_HISTORY_FEATURE.testId}-sort`}
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
