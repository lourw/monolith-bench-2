import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_DETAILS_FEATURE } from './recommendations-details.routes';
import type { RecommendationsDetailsSortKey } from './recommendations-details.utils';

export interface RecommendationsDetailsFiltersProps {
  query: string;
  sortKey: RecommendationsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-sort`}
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
