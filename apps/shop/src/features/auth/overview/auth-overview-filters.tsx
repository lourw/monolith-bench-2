import type { ChangeEvent } from 'react';
import { AUTH_OVERVIEW_FEATURE } from './auth-overview.routes';
import type { AuthOverviewSortKey } from './auth-overview.utils';

export interface AuthOverviewFiltersProps {
  query: string;
  sortKey: AuthOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AuthOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AuthOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_OVERVIEW_FEATURE.testId}-sort`}
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
