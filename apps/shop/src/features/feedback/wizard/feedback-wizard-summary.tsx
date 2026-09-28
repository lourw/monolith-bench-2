import { OverlayToolbarGroup } from '../../../components/overlay/toolbar/overlay-toolbar-group';
import { buildFeedbackWizardItems } from './feedback-wizard.model';
import { FEEDBACK_WIZARD_FEATURE } from './feedback-wizard.routes';
import {
  pickFeedbackWizardHighlights,
  totalFeedbackWizard,
} from './feedback-wizard.utils';

export interface FeedbackWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackWizardSummary({
  compact = false,
  limit = 3,
}: FeedbackWizardSummaryProps) {
  const items = buildFeedbackWizardItems();
  const totals = totalFeedbackWizard(items);
  const highlights = pickFeedbackWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{FEEDBACK_WIZARD_FEATURE.title}</h3>
      <OverlayToolbarGroup
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
