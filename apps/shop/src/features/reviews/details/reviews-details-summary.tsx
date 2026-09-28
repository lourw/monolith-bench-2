import { CoreBadgeGroup } from '../../../components/core/badge/core-badge-group';
import { buildReviewsDetailsItems } from './reviews-details.model';
import { REVIEWS_DETAILS_FEATURE } from './reviews-details.routes';
import {
  pickReviewsDetailsHighlights,
  totalReviewsDetails,
} from './reviews-details.utils';

export interface ReviewsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsDetailsSummary({
  compact = false,
  limit = 3,
}: ReviewsDetailsSummaryProps) {
  const items = buildReviewsDetailsItems();
  const totals = totalReviewsDetails(items);
  const highlights = pickReviewsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{REVIEWS_DETAILS_FEATURE.title}</h3>
      <CoreBadgeGroup
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
