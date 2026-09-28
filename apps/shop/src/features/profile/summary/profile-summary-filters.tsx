import type { ChangeEvent } from 'react';
import { PROFILE_SUMMARY_FEATURE } from './profile-summary.routes';
import type { ProfileSummarySortKey } from './profile-summary.utils';

export interface ProfileSummaryFiltersProps {
  query: string;
  sortKey: ProfileSummarySortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileSummarySortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileSummarySortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileSummaryFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileSummaryFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileSummarySortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile summary…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_SUMMARY_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_SUMMARY_FEATURE.testId}-sort`}
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
