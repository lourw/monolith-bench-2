import type { ChangeEvent } from 'react';
import { NOTIFICATIONS_WIZARD_FEATURE } from './notifications-wizard.routes';
import type { NotificationsWizardSortKey } from './notifications-wizard.utils';

export interface NotificationsWizardFiltersProps {
  query: string;
  sortKey: NotificationsWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: NotificationsWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: NotificationsWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function NotificationsWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: NotificationsWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as NotificationsWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter notifications wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-sort`}
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
