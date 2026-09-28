import type { ChangeEvent } from 'react';
import { PROFILE_EDITOR_FEATURE } from './profile-editor.routes';
import type { ProfileEditorSortKey } from './profile-editor.utils';

export interface ProfileEditorFiltersProps {
  query: string;
  sortKey: ProfileEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ProfileEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ProfileEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ProfileEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ProfileEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProfileEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter profile editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PROFILE_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PROFILE_EDITOR_FEATURE.testId}-sort`}
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
