import type { ChangeEvent } from 'react';
import { RETURNS_EDITOR_FEATURE } from './returns-editor.routes';
import type { ReturnsEditorSortKey } from './returns-editor.utils';

export interface ReturnsEditorFiltersProps {
  query: string;
  sortKey: ReturnsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ReturnsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: ReturnsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ReturnsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ReturnsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ReturnsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter returns editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${RETURNS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${RETURNS_EDITOR_FEATURE.testId}-sort`}
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
