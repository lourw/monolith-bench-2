import { FeedbackListGroup } from '../../../components/feedback/list/feedback-list-group';
import { FormsHeader } from '../../../components/forms/header/forms-header';
import type { LoyaltyWizardItem } from './loyalty-wizard.model';
import { LOYALTY_WIZARD_FEATURE } from './loyalty-wizard.routes';
import { describeLoyaltyWizardItem } from './loyalty-wizard.utils';

export interface LoyaltyWizardPanelProps {
  selected: LoyaltyWizardItem | null;
  onClear: () => void;
}

export function LoyaltyWizardPanel({
  selected,
  onClear,
}: LoyaltyWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeLoyaltyWizardItem(selected)}
      </p>
      <FeedbackListGroup
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
        data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
