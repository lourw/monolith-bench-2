import type { ChangeEvent } from 'react';
import { SEARCH_EDITOR_FEATURE } from './search-editor.routes';
import type { SearchEditorSortKey } from './search-editor.utils';

export interface SearchEditorFiltersProps {
  query: string;
  sortKey: SearchEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SearchEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SearchEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SearchEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SearchEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SearchEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter search editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SEARCH_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SEARCH_EDITOR_FEATURE.testId}-sort`}
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
