import type { ChangeEvent } from 'react';
import { SUPPORT_EDITOR_FEATURE } from './support-editor.routes';
import type { SupportEditorSortKey } from './support-editor.utils';

export interface SupportEditorFiltersProps {
  query: string;
  sortKey: SupportEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SupportEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SupportEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SupportEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SupportEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SupportEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter support editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUPPORT_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUPPORT_EDITOR_FEATURE.testId}-sort`}
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
