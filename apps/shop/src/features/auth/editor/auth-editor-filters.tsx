import type { ChangeEvent } from 'react';
import { AUTH_EDITOR_FEATURE } from './auth-editor.routes';
import type { AuthEditorSortKey } from './auth-editor.utils';

export interface AuthEditorFiltersProps {
  query: string;
  sortKey: AuthEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AuthEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: AuthEditorSortKey; label: string }> =
  [
    { value: 'name', label: 'Name' },
    { value: 'amount', label: 'Amount' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'createdAt', label: 'Created' },
  ];

export function AuthEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AuthEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AuthEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter auth editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${AUTH_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${AUTH_EDITOR_FEATURE.testId}-sort`}
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
