import type { ChangeEvent } from 'react';
import { AUTH_DETAILS_FEATURE } from './auth-details.routes';
import type { AuthDetailsSortKey } from './auth-details.utils';

export interface AuthDetailsFiltersProps {
  query: string;
  sortKey: AuthDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AuthDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AuthDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_DETAILS_FEATURE.testId}-sort`}
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
