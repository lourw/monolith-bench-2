import type { ChangeEvent } from 'react';
import { ANALYTICS_HISTORY_FEATURE } from './analytics-history.routes';
import type { AnalyticsHistorySortKey } from './analytics-history.utils';

export interface AnalyticsHistoryFiltersProps {
  query: string;
  sortKey: AnalyticsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-sort`}
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
