import { ChartsPanelGroup } from '../../../components/charts/panel/charts-panel-group';
import { buildPaymentsWizardItems } from './payments-wizard.model';
import { PAYMENTS_WIZARD_FEATURE } from './payments-wizard.routes';
import {
  pickPaymentsWizardHighlights,
  totalPaymentsWizard,
} from './payments-wizard.utils';

export interface PaymentsWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsWizardSummary({
  compact = false,
  limit = 3,
}: PaymentsWizardSummaryProps) {
  const items = buildPaymentsWizardItems();
  const totals = totalPaymentsWizard(items);
  const highlights = pickPaymentsWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PAYMENTS_WIZARD_FEATURE.title}</h3>
      <ChartsPanelGroup
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
