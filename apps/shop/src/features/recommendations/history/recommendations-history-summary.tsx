import { ChartsHeaderGroup } from '../../../components/charts/header/charts-header-group';
import { buildRecommendationsHistoryItems } from './recommendations-history.model';
import { RECOMMENDATIONS_HISTORY_FEATURE } from './recommendations-history.routes';
import {
  pickRecommendationsHistoryHighlights,
  totalRecommendationsHistory,
} from './recommendations-history.utils';

export interface RecommendationsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsHistorySummary({
  compact = false,
  limit = 3,
}: RecommendationsHistorySummaryProps) {
  const items = buildRecommendationsHistoryItems();
  const totals = totalRecommendationsHistory(items);
  const highlights = pickRecommendationsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_HISTORY_FEATURE.title}
      </h3>
      <ChartsHeaderGroup
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
