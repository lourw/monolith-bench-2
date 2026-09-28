import { DataChipGroup } from '../../../components/data/chip/data-chip-group';
import { buildReviewsInsightsItems } from './reviews-insights.model';
import { REVIEWS_INSIGHTS_FEATURE } from './reviews-insights.routes';
import {
  pickReviewsInsightsHighlights,
  totalReviewsInsights,
} from './reviews-insights.utils';

export interface ReviewsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsInsightsSummary({
  compact = false,
  limit = 3,
}: ReviewsInsightsSummaryProps) {
  const items = buildReviewsInsightsItems();
  const totals = totalReviewsInsights(items);
  const highlights = pickReviewsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {REVIEWS_INSIGHTS_FEATURE.title}
      </h3>
      <DataChipGroup
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
