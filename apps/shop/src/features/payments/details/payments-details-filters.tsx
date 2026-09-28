import type { ChangeEvent } from 'react';
import { PAYMENTS_DETAILS_FEATURE } from './payments-details.routes';
import type { PaymentsDetailsSortKey } from './payments-details.utils';

export interface PaymentsDetailsFiltersProps {
  query: string;
  sortKey: PaymentsDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_DETAILS_FEATURE.testId}-sort`}
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
