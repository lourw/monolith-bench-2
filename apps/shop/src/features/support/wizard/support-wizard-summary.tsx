import { LayoutBadgeGroup } from '../../../components/layout/badge/layout-badge-group';
import { buildSupportWizardItems } from './support-wizard.model';
import { SUPPORT_WIZARD_FEATURE } from './support-wizard.routes';
import {
  pickSupportWizardHighlights,
  totalSupportWizard,
} from './support-wizard.utils';

export interface SupportWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportWizardSummary({
  compact = false,
  limit = 3,
}: SupportWizardSummaryProps) {
  const items = buildSupportWizardItems();
  const totals = totalSupportWizard(items);
  const highlights = pickSupportWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SUPPORT_WIZARD_FEATURE.title}</h3>
      <LayoutBadgeGroup
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
