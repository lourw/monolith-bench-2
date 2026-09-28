import type { ChangeEvent } from 'react';
import { SUBSCRIPTIONS_INSIGHTS_FEATURE } from './subscriptions-insights.routes';
import type { SubscriptionsInsightsSortKey } from './subscriptions-insights.utils';

export interface SubscriptionsInsightsFiltersProps {
  query: string;
  sortKey: SubscriptionsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SubscriptionsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SubscriptionsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SubscriptionsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SubscriptionsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SubscriptionsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter subscriptions insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-sort`}
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
