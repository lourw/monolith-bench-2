import type { ChangeEvent } from 'react';
import { PREORDERS_EDITOR_FEATURE } from './preorders-editor.routes';
import type { PreordersEditorSortKey } from './preorders-editor.utils';

export interface PreordersEditorFiltersProps {
  query: string;
  sortKey: PreordersEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PreordersEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PreordersEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PreordersEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PreordersEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PreordersEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter preorders editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-sort`}
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
