import { FeedbackToolbarGroup } from '../../../components/feedback/toolbar/feedback-toolbar-group';
import { MarketingStat } from '../../../components/marketing/stat/marketing-stat';
import type { InventoryWizardItem } from './inventory-wizard.model';
import { INVENTORY_WIZARD_FEATURE } from './inventory-wizard.routes';
import { describeInventoryWizardItem } from './inventory-wizard.utils';

export interface InventoryWizardPanelProps {
  selected: InventoryWizardItem | null;
  onClear: () => void;
}

export function InventoryWizardPanel({
  selected,
  onClear,
}: InventoryWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeInventoryWizardItem(selected)}
      </p>
      <FeedbackToolbarGroup
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
        <MarketingStat
          label="Marketing Stat"
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
        data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
