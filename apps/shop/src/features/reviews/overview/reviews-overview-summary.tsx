import { CommerceBadgeGroup } from '../../../components/commerce/badge/commerce-badge-group';
import { buildReviewsOverviewItems } from './reviews-overview.model';
import { REVIEWS_OVERVIEW_FEATURE } from './reviews-overview.routes';
import {
  pickReviewsOverviewHighlights,
  totalReviewsOverview,
} from './reviews-overview.utils';

export interface ReviewsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsOverviewSummary({
  compact = false,
  limit = 3,
}: ReviewsOverviewSummaryProps) {
  const items = buildReviewsOverviewItems();
  const totals = totalReviewsOverview(items);
  const highlights = pickReviewsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {REVIEWS_OVERVIEW_FEATURE.title}
      </h3>
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
