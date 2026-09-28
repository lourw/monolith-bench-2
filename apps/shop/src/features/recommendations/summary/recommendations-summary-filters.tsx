import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_SUMMARY_FEATURE } from './recommendations-summary.routes';
import type { RecommendationsSummarySortKey } from './recommendations-summary.utils';

export interface RecommendationsSummaryFiltersProps {
  query: string;
  sortKey: RecommendationsSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-sort`}
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
