import { ChartsHeaderGroup } from '../../../components/charts/header/charts-header-group';
import { buildLoyaltyWizardItems } from './loyalty-wizard.model';
import { LOYALTY_WIZARD_FEATURE } from './loyalty-wizard.routes';
import {
  pickLoyaltyWizardHighlights,
  totalLoyaltyWizard,
} from './loyalty-wizard.utils';

export interface LoyaltyWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltyWizardSummary({
  compact = false,
  limit = 3,
}: LoyaltyWizardSummaryProps) {
  const items = buildLoyaltyWizardItems();
  const totals = totalLoyaltyWizard(items);
  const highlights = pickLoyaltyWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{LOYALTY_WIZARD_FEATURE.title}</h3>
      <ChartsHeaderGroup
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
