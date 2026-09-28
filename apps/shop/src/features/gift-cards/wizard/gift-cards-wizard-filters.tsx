import type { ChangeEvent } from 'react';
import { GIFT_CARDS_WIZARD_FEATURE } from './gift-cards-wizard.routes';
import type { GiftCardsWizardSortKey } from './gift-cards-wizard.utils';

export interface GiftCardsWizardFiltersProps {
  query: string;
  sortKey: GiftCardsWizardSortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: GiftCardsWizardSortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{
  value: GiftCardsWizardSortKey;
  label: string;
}> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function GiftCardsWizardFilters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: GiftCardsWizardFiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as GiftCardsWizardSortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter gift cards wizard…"
        value={query}
        onChange={handleQuery}
        data-testid={`${GIFT_CARDS_WIZARD_FEATURE.testId}-filter`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={`${GIFT_CARDS_WIZARD_FEATURE.testId}-sort`}
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
