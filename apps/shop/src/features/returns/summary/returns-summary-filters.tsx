import type { ChangeEvent } from 'react';
import { RETURNS_SUMMARY_FEATURE } from './returns-summary.routes';
import type { ReturnsSummarySortKey } from './returns-summary.utils';

export interface ReturnsSummaryFiltersProps {
  query: string;
  sortKey: ReturnsSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-sort`}
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
