import type { ChangeEvent } from 'react';
import { RECOMMENDATIONS_LIST_FEATURE } from './recommendations-list.routes';
import type { RecommendationsListSortKey } from './recommendations-list.utils';

export interface RecommendationsListFiltersProps {
  query: string;
  sortKey: RecommendationsListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: RecommendationsListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: RecommendationsListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function RecommendationsListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: RecommendationsListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as RecommendationsListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter recommendations list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RECOMMENDATIONS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RECOMMENDATIONS_LIST_FEATURE.testId}-sort`}
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
