import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import { InputsChip } from '../../../components/inputs/chip/inputs-chip';
import type { PaymentsWizardItem } from './payments-wizard.model';
import { PAYMENTS_WIZARD_FEATURE } from './payments-wizard.routes';
import { describePaymentsWizardItem } from './payments-wizard.utils';

export interface PaymentsWizardPanelProps {
  selected: PaymentsWizardItem | null;
  onClear: () => void;
}

export function PaymentsWizardPanel({
  selected,
  onClear,
}: PaymentsWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePaymentsWizardItem(selected)}
      </p>
      <CommerceToolbarGroup
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
        <InputsChip
          label="Inputs Chip"
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
        data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
