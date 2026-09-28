import type { ChangeEvent } from 'react';
import { AUTH_HISTORY_FEATURE } from './auth-history.routes';
import type { AuthHistorySortKey } from './auth-history.utils';

export interface AuthHistoryFiltersProps {
  query: string;
  sortKey: AuthHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AuthHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AuthHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_HISTORY_FEATURE.testId}-sort`}
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
