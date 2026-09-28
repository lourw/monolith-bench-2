import type { ChangeEvent } from 'react';
import { COMPARE_EDITOR_FEATURE } from './compare-editor.routes';
import type { CompareEditorSortKey } from './compare-editor.utils';

export interface CompareEditorFiltersProps {
  query: string;
  sortKey: CompareEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: CompareEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: CompareEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function CompareEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: CompareEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as CompareEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter compare editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${COMPARE_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${COMPARE_EDITOR_FEATURE.testId}-sort`}
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
