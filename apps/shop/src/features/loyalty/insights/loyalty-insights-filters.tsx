import type { ChangeEvent } from 'react';
import { LOYALTY_INSIGHTS_FEATURE } from './loyalty-insights.routes';
import type { LoyaltyInsightsSortKey } from './loyalty-insights.utils';

export interface LoyaltyInsightsFiltersProps {
  query: string;
  sortKey: LoyaltyInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltyInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltyInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltyInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltyInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltyInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_INSIGHTS_FEATURE.testId}-sort`}
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
