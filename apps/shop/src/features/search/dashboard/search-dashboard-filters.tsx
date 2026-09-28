import type { ChangeEvent } from 'react';
import { SEARCH_DASHBOARD_FEATURE } from './search-dashboard.routes';
import type { SearchDashboardSortKey } from './search-dashboard.utils';

export interface SearchDashboardFiltersProps {
  query: string;
  sortKey: SearchDashboardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchDashboardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchDashboardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchDashboardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchDashboardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchDashboardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search dashboard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_DASHBOARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_DASHBOARD_FEATURE.testId}-sort`}
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
