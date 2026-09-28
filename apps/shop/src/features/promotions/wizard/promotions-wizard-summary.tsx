import { CoreStatGroup } from '../../../components/core/stat/core-stat-group';
import { buildPromotionsWizardItems } from './promotions-wizard.model';
import { PROMOTIONS_WIZARD_FEATURE } from './promotions-wizard.routes';
import {
  pickPromotionsWizardHighlights,
  totalPromotionsWizard,
} from './promotions-wizard.utils';

export interface PromotionsWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsWizardSummary({
  compact = false,
  limit = 3,
}: PromotionsWizardSummaryProps) {
  const items = buildPromotionsWizardItems();
  const totals = totalPromotionsWizard(items);
  const highlights = pickPromotionsWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_WIZARD_FEATURE.title}
      </h3>
      <CoreStatGroup
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
