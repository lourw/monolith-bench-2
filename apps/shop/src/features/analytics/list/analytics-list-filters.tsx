import type { ChangeEvent } from 'react';
import { ANALYTICS_LIST_FEATURE } from './analytics-list.routes';
import type { AnalyticsListSortKey } from './analytics-list.utils';

export interface AnalyticsListFiltersProps {
  query: string;
  sortKey: AnalyticsListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_LIST_FEATURE.testId}-sort`}
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
