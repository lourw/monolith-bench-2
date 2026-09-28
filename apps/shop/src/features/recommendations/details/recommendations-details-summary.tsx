import { LayoutTileGroup } from '../../../components/layout/tile/layout-tile-group';
import { buildRecommendationsDetailsItems } from './recommendations-details.model';
import { RECOMMENDATIONS_DETAILS_FEATURE } from './recommendations-details.routes';
import {
  pickRecommendationsDetailsHighlights,
  totalRecommendationsDetails,
} from './recommendations-details.utils';

export interface RecommendationsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsDetailsSummary({
  compact = false,
  limit = 3,
}: RecommendationsDetailsSummaryProps) {
  const items = buildRecommendationsDetailsItems();
  const totals = totalRecommendationsDetails(items);
  const highlights = pickRecommendationsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_DETAILS_FEATURE.title}
      </h3>
      <LayoutTileGroup
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
