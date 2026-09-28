import type { ChangeEvent } from 'react';
import { PROFILE_HISTORY_FEATURE } from './profile-history.routes';
import type { ProfileHistorySortKey } from './profile-history.utils';

export interface ProfileHistoryFiltersProps {
  query: string;
  sortKey: ProfileHistorySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileHistorySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileHistorySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileHistoryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileHistoryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileHistorySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile history…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_HISTORY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_HISTORY_FEATURE.testId}-sort`}
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
