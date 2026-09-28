import type { ChangeEvent } from 'react';
import { PROFILE_LIST_FEATURE } from './profile-list.routes';
import type { ProfileListSortKey } from './profile-list.utils';

export interface ProfileListFiltersProps {
  query: string;
  sortKey: ProfileListSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileListSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileListSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileListFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileListFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileListSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile list…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_LIST_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_LIST_FEATURE.testId}-sort`}
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
