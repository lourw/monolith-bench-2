import type { ChangeEvent } from 'react';
import { ACCOUNT_OVERVIEW_FEATURE } from './account-overview.routes';
import type { AccountOverviewSortKey } from './account-overview.utils';

export interface AccountOverviewFiltersProps {
  query: string;
  sortKey: AccountOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-sort`}
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
