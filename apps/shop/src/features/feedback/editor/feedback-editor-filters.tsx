import type { ChangeEvent } from 'react';
import { FEEDBACK_EDITOR_FEATURE } from './feedback-editor.routes';
import type { FeedbackEditorSortKey } from './feedback-editor.utils';

export interface FeedbackEditorFiltersProps {
  query: string;
  sortKey: FeedbackEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: FeedbackEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: FeedbackEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function FeedbackEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: FeedbackEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as FeedbackEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter feedback editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${FEEDBACK_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${FEEDBACK_EDITOR_FEATURE.testId}-sort`}
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
