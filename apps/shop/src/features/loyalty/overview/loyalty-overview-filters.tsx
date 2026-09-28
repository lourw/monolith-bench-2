import type { ChangeEvent } from 'react';
import { LOYALTY_OVERVIEW_FEATURE } from './loyalty-overview.routes';
import type { LoyaltyOverviewSortKey } from './loyalty-overview.utils';

export interface LoyaltyOverviewFiltersProps {
  query: string;
  sortKey: LoyaltyOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: LoyaltyOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: LoyaltyOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function LoyaltyOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: LoyaltyOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as LoyaltyOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter loyalty overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-sort`}
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
