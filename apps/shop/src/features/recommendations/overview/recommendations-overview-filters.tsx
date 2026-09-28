import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_OVERVIEW_FEATURE } from './recommendations-overview.routes';
import type { RecommendationsOverviewSortKey } from './recommendations-overview.utils';

export interface RecommendationsOverviewFiltersProps {
  query: string;
  sortKey: RecommendationsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-sort`}
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
