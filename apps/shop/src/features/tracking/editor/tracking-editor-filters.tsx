import type { ChangeEvent } from 'react';
import { TRACKING_EDITOR_FEATURE } from './tracking-editor.routes';
import type { TrackingEditorSortKey } from './tracking-editor.utils';

export interface TrackingEditorFiltersProps {
  query: string;
  sortKey: TrackingEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: TrackingEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: TrackingEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function TrackingEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: TrackingEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as TrackingEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter tracking editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${TRACKING_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${TRACKING_EDITOR_FEATURE.testId}-sort`}
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
