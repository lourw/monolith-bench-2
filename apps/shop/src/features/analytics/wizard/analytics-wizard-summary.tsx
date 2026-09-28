import { InputsStatGroup } from '../../../components/inputs/stat/inputs-stat-group';
import { buildAnalyticsWizardItems } from './analytics-wizard.model';
import { ANALYTICS_WIZARD_FEATURE } from './analytics-wizard.routes';
import {
  pickAnalyticsWizardHighlights,
  totalAnalyticsWizard,
} from './analytics-wizard.utils';

export interface AnalyticsWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsWizardSummary({
  compact = false,
  limit = 3,
}: AnalyticsWizardSummaryProps) {
  const items = buildAnalyticsWizardItems();
  const totals = totalAnalyticsWizard(items);
  const highlights = pickAnalyticsWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_WIZARD_FEATURE.title}
      </h3>
      <InputsStatGroup
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
