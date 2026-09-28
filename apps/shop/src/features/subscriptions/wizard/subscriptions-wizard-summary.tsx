import { FormsBadgeGroup } from '../../../components/forms/badge/forms-badge-group';
import { buildSubscriptionsWizardItems } from './subscriptions-wizard.model';
import { SUBSCRIPTIONS_WIZARD_FEATURE } from './subscriptions-wizard.routes';
import {
  pickSubscriptionsWizardHighlights,
  totalSubscriptionsWizard,
} from './subscriptions-wizard.utils';

export interface SubscriptionsWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsWizardSummary({
  compact = false,
  limit = 3,
}: SubscriptionsWizardSummaryProps) {
  const items = buildSubscriptionsWizardItems();
  const totals = totalSubscriptionsWizard(items);
  const highlights = pickSubscriptionsWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_WIZARD_FEATURE.title}
      </h3>
      <FormsBadgeGroup
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
