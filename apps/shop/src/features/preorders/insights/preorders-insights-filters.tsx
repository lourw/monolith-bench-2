import type { ChangeEvent } from 'react';
import { PREORDERS_INSIGHTS_FEATURE } from './preorders-insights.routes';
import type { PreordersInsightsSortKey } from './preorders-insights.utils';

export interface PreordersInsightsFiltersProps {
  query: string;
  sortKey: PreordersInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-sort`}
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
