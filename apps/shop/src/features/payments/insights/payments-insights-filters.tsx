import type { ChangeEvent } from 'react';
import { PAYMENTS_INSIGHTS_FEATURE } from './payments-insights.routes';
import type { PaymentsInsightsSortKey } from './payments-insights.utils';

export interface PaymentsInsightsFiltersProps {
  query: string;
  sortKey: PaymentsInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_INSIGHTS_FEATURE.testId}-sort`}
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
