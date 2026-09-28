import type { ChangeEvent } from 'react';
import { ANALYTICS_EDITOR_FEATURE } from './analytics-editor.routes';
import type { AnalyticsEditorSortKey } from './analytics-editor.utils';

export interface AnalyticsEditorFiltersProps {
  query: string;
  sortKey: AnalyticsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: AnalyticsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: AnalyticsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function AnalyticsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: AnalyticsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as AnalyticsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter analytics editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${ANALYTICS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${ANALYTICS_EDITOR_FEATURE.testId}-sort`}
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
