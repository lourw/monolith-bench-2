import type { ChangeEvent } from 'react';
import { PAYMENTS_SUMMARY_FEATURE } from './payments-summary.routes';
import type { PaymentsSummarySortKey } from './payments-summary.utils';

export interface PaymentsSummaryFiltersProps {
  query: string;
  sortKey: PaymentsSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_SUMMARY_FEATURE.testId}-sort`}
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
