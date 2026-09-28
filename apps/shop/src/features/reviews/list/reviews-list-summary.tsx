import { MediaTileGroup } from '../../../components/media/tile/media-tile-group';
import { buildReviewsListItems } from './reviews-list.model';
import { REVIEWS_LIST_FEATURE } from './reviews-list.routes';
import {
  pickReviewsListHighlights,
  totalReviewsList,
} from './reviews-list.utils';

export interface ReviewsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsListSummary({
  compact = false,
  limit = 3,
}: ReviewsListSummaryProps) {
  const items = buildReviewsListItems();
  const totals = totalReviewsList(items);
  const highlights = pickReviewsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{REVIEWS_LIST_FEATURE.title}</h3>
      <MediaTileGroup
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
