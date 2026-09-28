import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_HISTORY_FEATURE } from './recommendations-history.routes';
import type { RecommendationsHistorySortKey } from './recommendations-history.utils';

export interface RecommendationsHistoryFiltersProps {
  query: string;
  sortKey: RecommendationsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-sort`}
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
