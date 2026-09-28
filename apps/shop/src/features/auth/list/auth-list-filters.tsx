import type { ChangeEvent } from 'react';
import { AUTH_LIST_FEATURE } from './auth-list.routes';
import type { AuthListSortKey } from './auth-list.utils';

export interface AuthListFiltersProps {
  query: string;
  sortKey: AuthListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: AuthListSortKey; label: string }> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AuthListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_LIST_FEATURE.testId}-sort`}
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
