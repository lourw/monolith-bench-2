import { DataHeaderGroup } from '../../../components/data/header/data-header-group';
import { buildReviewsSummaryItems } from './reviews-summary.model';
import { REVIEWS_SUMMARY_FEATURE } from './reviews-summary.routes';
import {
  pickReviewsSummaryHighlights,
  totalReviewsSummary,
} from './reviews-summary.utils';

export interface ReviewsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReviewsSummarySummary({
  compact = false,
  limit = 3,
}: ReviewsSummarySummaryProps) {
  const items = buildReviewsSummaryItems();
  const totals = totalReviewsSummary(items);
  const highlights = pickReviewsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${REVIEWS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{REVIEWS_SUMMARY_FEATURE.title}</h3>
      <DataHeaderGroup
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
