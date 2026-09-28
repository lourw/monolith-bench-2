import { CoreChipGroup } from '../../../components/core/chip/core-chip-group';
import { NavigationList } from '../../../components/navigation/list/navigation-list';
import { FormsHeader } from '../../../components/forms/header/forms-header';
import type { LoyaltyHistoryItem } from './loyalty-history.model';
import { LOYALTY_HISTORY_FEATURE } from './loyalty-history.routes';
import { describeLoyaltyHistoryItem } from './loyalty-history.utils';

export interface LoyaltyHistoryPanelProps {
  selected: LoyaltyHistoryItem | null;
  onClear: () => void;
}

export function LoyaltyHistoryPanel({
  selected,
  onClear,
}: LoyaltyHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeLoyaltyHistoryItem(selected)}
      </p>
      <CoreChipGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <NavigationList
          label="Navigation List"
          value={selected.product.rating}
          size="sm"
        />
        <FormsHeader
          label="Forms Header"
          value={selected.product.rating}
          size="sm"
        />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
