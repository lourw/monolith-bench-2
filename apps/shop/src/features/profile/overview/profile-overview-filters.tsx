import type { ChangeEvent } from 'react';
import { PROFILE_OVERVIEW_FEATURE } from './profile-overview.routes';
import type { ProfileOverviewSortKey } from './profile-overview.utils';

export interface ProfileOverviewFiltersProps {
  query: string;
  sortKey: ProfileOverviewSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileOverviewSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileOverviewSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileOverviewFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileOverviewFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileOverviewSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile overview…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_OVERVIEW_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_OVERVIEW_FEATURE.testId}-sort`}
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
