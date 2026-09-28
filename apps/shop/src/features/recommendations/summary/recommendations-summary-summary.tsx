import { MediaBadgeGroup } from '../../../components/media/badge/media-badge-group';
import { buildRecommendationsSummaryItems } from './recommendations-summary.model';
import { RECOMMENDATIONS_SUMMARY_FEATURE } from './recommendations-summary.routes';
import {
  pickRecommendationsSummaryHighlights,
  totalRecommendationsSummary,
} from './recommendations-summary.utils';

export interface RecommendationsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsSummarySummary({
  compact = false,
  limit = 3,
}: RecommendationsSummarySummaryProps) {
  const items = buildRecommendationsSummaryItems();
  const totals = totalRecommendationsSummary(items);
  const highlights = pickRecommendationsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_SUMMARY_FEATURE.title}
      </h3>
      <MediaBadgeGroup
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
