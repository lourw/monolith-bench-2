import type { ChangeEvent } from 'react';
import { AUTH_SUMMARY_FEATURE } from './auth-summary.routes';
import type { AuthSummarySortKey } from './auth-summary.utils';

export interface AuthSummaryFiltersProps {
  query: string;
  sortKey: AuthSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AuthSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AuthSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_SUMMARY_FEATURE.testId}-sort`}
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
