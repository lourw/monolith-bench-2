import type { ChangeEvent } from 'react';
import { PAYMENTS_OVERVIEW_FEATURE } from './payments-overview.routes';
import type { PaymentsOverviewSortKey } from './payments-overview.utils';

export interface PaymentsOverviewFiltersProps {
  query: string;
  sortKey: PaymentsOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_OVERVIEW_FEATURE.testId}-sort`}
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
