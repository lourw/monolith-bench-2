import type { ChangeEvent } from 'react';
import { ACCOUNT_INSIGHTS_FEATURE } from './account-insights.routes';
import type { AccountInsightsSortKey } from './account-insights.utils';

export interface AccountInsightsFiltersProps {
  query: string;
  sortKey: AccountInsightsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AccountInsightsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AccountInsightsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AccountInsightsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AccountInsightsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AccountInsightsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter account insights…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ACCOUNT_INSIGHTS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ACCOUNT_INSIGHTS_FEATURE.testId}-sort`}
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
