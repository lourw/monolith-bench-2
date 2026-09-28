import type { ChangeEvent } from 'react';
import { ANALYTICS_SUMMARY_FEATURE } from './analytics-summary.routes';
import type { AnalyticsSummarySortKey } from './analytics-summary.utils';

export interface AnalyticsSummaryFiltersProps {
  query: string;
  sortKey: AnalyticsSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-sort`}
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
