import { CommerceBadgeGroup } from '../../../components/commerce/badge/commerce-badge-group';
import { buildOrdersWizardItems } from './orders-wizard.model';
import { ORDERS_WIZARD_FEATURE } from './orders-wizard.routes';
import {
  pickOrdersWizardHighlights,
  totalOrdersWizard,
} from './orders-wizard.utils';

export interface OrdersWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersWizardSummary({
  compact = false,
  limit = 3,
}: OrdersWizardSummaryProps) {
  const items = buildOrdersWizardItems();
  const totals = totalOrdersWizard(items);
  const highlights = pickOrdersWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_WIZARD_FEATURE.title}</h3>
      <CommerceBadgeGroup
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
