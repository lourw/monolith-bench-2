import { FeedbackCardGroup } from '../../../components/feedback/card/feedback-card-group';
import { buildReviewsWizardItems } from './reviews-wizard.model';
import { REVIEWS_WIZARD_FEATURE } from './reviews-wizard.routes';
import {
  pickReviewsWizardHighlights,
  totalReviewsWizard,
} from './reviews-wizard.utils';

export interface ReviewsWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsWizardSummary({
  compact = false,
  limit = 3,
}: ReviewsWizardSummaryProps) {
  const items = buildReviewsWizardItems();
  const totals = totalReviewsWizard(items);
  const highlights = pickReviewsWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{REVIEWS_WIZARD_FEATURE.title}</h3>
      <FeedbackCardGroup
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
