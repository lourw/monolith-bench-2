import { TypographyListGroup } from '../../../components/typography/list/typography-list-group';
import { ChartsChip } from '../../../components/charts/chip/charts-chip';
import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import type { SubscriptionsWizardItem } from './subscriptions-wizard.model';
import { SUBSCRIPTIONS_WIZARD_FEATURE } from './subscriptions-wizard.routes';
import { describeSubscriptionsWizardItem } from './subscriptions-wizard.utils';

export interface SubscriptionsWizardPanelProps {
  selected: SubscriptionsWizardItem | null;
  onClear: () => void;
}

export function SubscriptionsWizardPanel({
  selected,
  onClear,
}: SubscriptionsWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSubscriptionsWizardItem(selected)}
      </p>
      <TypographyListGroup
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
        <ChartsChip
          label="Charts Chip"
          value={selected.product.rating}
          size="sm"
        />
        <LayoutChip
          label="Layout Chip"
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
        data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
