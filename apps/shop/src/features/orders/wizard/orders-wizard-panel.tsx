import { NavigationCardGroup } from '../../../components/navigation/card/navigation-card-group';
import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import { FormsList } from '../../../components/forms/list/forms-list';
import type { OrdersWizardItem } from './orders-wizard.model';
import { ORDERS_WIZARD_FEATURE } from './orders-wizard.routes';
import { describeOrdersWizardItem } from './orders-wizard.utils';

export interface OrdersWizardPanelProps {
  selected: OrdersWizardItem | null;
  onClear: () => void;
}

export function OrdersWizardPanel({
  selected,
  onClear,
}: OrdersWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ORDERS_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${ORDERS_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ORDERS_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeOrdersWizardItem(selected)}
      </p>
      <NavigationCardGroup
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
        <FeedbackTile
          label="Feedback Tile"
          value={selected.product.rating}
          size="sm"
        />
        <FormsList
          label="Forms List"
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
        data-testid={`${ORDERS_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
