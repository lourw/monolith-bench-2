import type { ChangeEvent } from 'react';
import { COMPARE_SUMMARY_FEATURE } from './compare-summary.routes';
import type { CompareSummarySortKey } from './compare-summary.utils';

export interface CompareSummaryFiltersProps {
  query: string;
  sortKey: CompareSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_SUMMARY_FEATURE.testId}-sort`}
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
