import { FormsBannerGroup } from '../../../components/forms/banner/forms-banner-group';
import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import type { CheckoutWizardItem } from './checkout-wizard.model';
import { CHECKOUT_WIZARD_FEATURE } from './checkout-wizard.routes';
import { describeCheckoutWizardItem } from './checkout-wizard.utils';

export interface CheckoutWizardPanelProps {
  selected: CheckoutWizardItem | null;
  onClear: () => void;
}

export function CheckoutWizardPanel({
  selected,
  onClear,
}: CheckoutWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCheckoutWizardItem(selected)}
      </p>
      <FormsBannerGroup
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
        <TypographyPanel
          label="Typography Panel"
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
        data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
