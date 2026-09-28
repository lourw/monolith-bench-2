import { NavigationToolbarGroup } from '../../../components/navigation/toolbar/navigation-toolbar-group';
import { buildReviewsHistoryItems } from './reviews-history.model';
import { REVIEWS_HISTORY_FEATURE } from './reviews-history.routes';
import {
  pickReviewsHistoryHighlights,
  totalReviewsHistory,
} from './reviews-history.utils';

export interface ReviewsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsHistorySummary({
  compact = false,
  limit = 3,
}: ReviewsHistorySummaryProps) {
  const items = buildReviewsHistoryItems();
  const totals = totalReviewsHistory(items);
  const highlights = pickReviewsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{REVIEWS_HISTORY_FEATURE.title}</h3>
      <NavigationToolbarGroup
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
