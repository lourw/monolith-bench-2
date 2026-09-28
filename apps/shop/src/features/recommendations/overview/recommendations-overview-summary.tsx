import { CoreCardGroup } from '../../../components/core/card/core-card-group';
import { buildRecommendationsOverviewItems } from './recommendations-overview.model';
import { RECOMMENDATIONS_OVERVIEW_FEATURE } from './recommendations-overview.routes';
import {
  pickRecommendationsOverviewHighlights,
  totalRecommendationsOverview,
} from './recommendations-overview.utils';

export interface RecommendationsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsOverviewSummary({
  compact = false,
  limit = 3,
}: RecommendationsOverviewSummaryProps) {
  const items = buildRecommendationsOverviewItems();
  const totals = totalRecommendationsOverview(items);
  const highlights = pickRecommendationsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_OVERVIEW_FEATURE.title}
      </h3>
      <CoreCardGroup
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
