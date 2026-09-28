import type { ChangeEvent } from 'react';
import { PAYMENTS_LIST_FEATURE } from './payments-list.routes';
import type { PaymentsListSortKey } from './payments-list.utils';

export interface PaymentsListFiltersProps {
  query: string;
  sortKey: PaymentsListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_LIST_FEATURE.testId}-sort`}
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
