import type { ChangeEvent } from 'react';
import { RETURNS_HISTORY_FEATURE } from './returns-history.routes';
import type { ReturnsHistorySortKey } from './returns-history.utils';

export interface ReturnsHistoryFiltersProps {
  query: string;
  sortKey: ReturnsHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_HISTORY_FEATURE.testId}-sort`}
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
