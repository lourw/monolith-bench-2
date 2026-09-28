import type { ChangeEvent } from 'react';
import { SUPPORT_INSIGHTS_FEATURE } from './support-insights.routes';
import type { SupportInsightsSortKey } from './support-insights.utils';

export interface SupportInsightsFiltersProps {
  query: string;
  sortKey: SupportInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-sort`}
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
