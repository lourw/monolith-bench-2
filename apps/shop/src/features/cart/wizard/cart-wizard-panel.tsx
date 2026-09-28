import { ChartsTileGroup } from '../../../components/charts/tile/charts-tile-group';
import type { CartWizardItem } from './cart-wizard.model';
import { CART_WIZARD_FEATURE } from './cart-wizard.routes';
import { describeCartWizardItem } from './cart-wizard.utils';

export interface CartWizardPanelProps {
  selected: CartWizardItem | null;
  onClear: () => void;
}

export function CartWizardPanel({ selected, onClear }: CartWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CART_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${CART_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CART_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCartWizardItem(selected)}
      </p>
      <ChartsTileGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
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
        data-testid={`${CART_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
