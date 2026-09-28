import type { ChangeEvent } from 'react';
import { PROMOTIONS_INSIGHTS_FEATURE } from './promotions-insights.routes';
import type { PromotionsInsightsSortKey } from './promotions-insights.utils';

export interface PromotionsInsightsFiltersProps {
  query: string;
  sortKey: PromotionsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PromotionsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PromotionsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PromotionsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PromotionsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PromotionsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter promotions insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-sort`}
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
