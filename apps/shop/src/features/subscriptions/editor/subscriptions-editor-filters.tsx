import type { ChangeEvent } from 'react';
import { SUBSCRIPTIONS_EDITOR_FEATURE } from './subscriptions-editor.routes';
import type { SubscriptionsEditorSortKey } from './subscriptions-editor.utils';

export interface SubscriptionsEditorFiltersProps {
  query: string;
  sortKey: SubscriptionsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: SubscriptionsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: SubscriptionsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function SubscriptionsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: SubscriptionsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SubscriptionsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter subscriptions editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-sort`}
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
