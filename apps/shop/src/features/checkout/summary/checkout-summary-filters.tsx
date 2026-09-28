import type { ChangeEvent } from 'react';
import { CHECKOUT_SUMMARY_FEATURE } from './checkout-summary.routes';
import type { CheckoutSummarySortKey } from './checkout-summary.utils';

export interface CheckoutSummaryFiltersProps {
  query: string;
  sortKey: CheckoutSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CheckoutSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CheckoutSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CheckoutSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CheckoutSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CheckoutSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter checkout summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${CHECKOUT_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${CHECKOUT_SUMMARY_FEATURE.testId}-sort`}
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
