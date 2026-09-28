import type { ChangeEvent } from 'react';
import { SEARCH_SUMMARY_FEATURE } from './search-summary.routes';
import type { SearchSummarySortKey } from './search-summary.utils';

export interface SearchSummaryFiltersProps {
  query: string;
  sortKey: SearchSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-sort`}
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
