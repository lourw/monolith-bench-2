import type { ChangeEvent } from 'react';
import { PAYMENTS_HISTORY_FEATURE } from './payments-history.routes';
import type { PaymentsHistorySortKey } from './payments-history.utils';

export interface PaymentsHistoryFiltersProps {
  query: string;
  sortKey: PaymentsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-sort`}
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
