import type { ChangeEvent } from 'react';
import { PROFILE_DETAILS_FEATURE } from './profile-details.routes';
import type { ProfileDetailsSortKey } from './profile-details.utils';

export interface ProfileDetailsFiltersProps {
  query: string;
  sortKey: ProfileDetailsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileDetailsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileDetailsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileDetailsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileDetailsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileDetailsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile details…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_DETAILS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_DETAILS_FEATURE.testId}-sort`}
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
