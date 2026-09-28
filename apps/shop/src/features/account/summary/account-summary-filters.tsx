import type { ChangeEvent } from 'react';
import { ACCOUNT_SUMMARY_FEATURE } from './account-summary.routes';
import type { AccountSummarySortKey } from './account-summary.utils';

export interface AccountSummaryFiltersProps {
  query: string;
  sortKey: AccountSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_SUMMARY_FEATURE.testId}-sort`}
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
