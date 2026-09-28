import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_EDITOR_FEATURE } from './notifications-editor.routes';
import type { NotificationsEditorSortKey } from './notifications-editor.utils';

export interface NotificationsEditorFiltersProps {
  query: string;
  sortKey: NotificationsEditorSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsEditorSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsEditorSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsEditorFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsEditorFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsEditorSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications editor…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-sort`}
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
