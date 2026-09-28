import type { ChangeEvent } from 'react';
import { ACCOUNT_DETAILS_FEATURE } from './account-details.routes';
import type { AccountDetailsSortKey } from './account-details.utils';

export interface AccountDetailsFiltersProps {
  query: string;
  sortKey: AccountDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_DETAILS_FEATURE.testId}-sort`}
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
