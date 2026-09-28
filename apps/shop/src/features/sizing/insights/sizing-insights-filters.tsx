import type { ChangeEvent } from 'react';
import { SIZING_INSIGHTS_FEATURE } from './sizing-insights.routes';
import type { SizingInsightsSortKey } from './sizing-insights.utils';

export interface SizingInsightsFiltersProps {
  query: string;
  sortKey: SizingInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-sort`}
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
