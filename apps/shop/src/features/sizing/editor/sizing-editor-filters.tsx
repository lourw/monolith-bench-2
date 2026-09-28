import type { ChangeEvent } from 'react';
import { SIZING_EDITOR_FEATURE } from './sizing-editor.routes';
import type { SizingEditorSortKey } from './sizing-editor.utils';

export interface SizingEditorFiltersProps {
  query: string;
  sortKey: SizingEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SizingEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SizingEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SizingEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SizingEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SizingEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter sizing editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SIZING_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SIZING_EDITOR_FEATURE.testId}-sort`}
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
