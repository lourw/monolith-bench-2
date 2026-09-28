import type { ChangeEvent } from 'react';
import { PAYMENTS_SETTINGS_FEATURE } from './payments-settings.routes';
import type { PaymentsSettingsSortKey } from './payments-settings.utils';

export interface PaymentsSettingsFiltersProps {
  query: string;
  sortKey: PaymentsSettingsSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: PaymentsSettingsSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: PaymentsSettingsSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function PaymentsSettingsFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: PaymentsSettingsFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PaymentsSettingsSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter payments settings…"
        value={query}
        onChange={handleQuery}
        data-testid={`${PAYMENTS_SETTINGS_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${PAYMENTS_SETTINGS_FEATURE.testId}-sort`}
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
