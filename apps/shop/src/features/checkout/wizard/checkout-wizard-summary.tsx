import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import { buildCheckoutWizardItems } from './checkout-wizard.model';
import { CHECKOUT_WIZARD_FEATURE } from './checkout-wizard.routes';
import {
  pickCheckoutWizardHighlights,
  totalCheckoutWizard,
} from './checkout-wizard.utils';

export interface CheckoutWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutWizardSummary({
  compact = false,
  limit = 3,
}: CheckoutWizardSummaryProps) {
  const items = buildCheckoutWizardItems();
  const totals = totalCheckoutWizard(items);
  const highlights = pickCheckoutWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CHECKOUT_WIZARD_FEATURE.title}</h3>
      <CommerceToolbarGroup
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
