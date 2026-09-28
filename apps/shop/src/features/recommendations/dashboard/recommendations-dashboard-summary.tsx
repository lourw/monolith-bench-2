import { MarketingPanelGroup } from '../../../components/marketing/panel/marketing-panel-group';
import { buildRecommendationsDashboardItems } from './recommendations-dashboard.model';
import { RECOMMENDATIONS_DASHBOARD_FEATURE } from './recommendations-dashboard.routes';
import {
  pickRecommendationsDashboardHighlights,
  totalRecommendationsDashboard,
} from './recommendations-dashboard.utils';

export interface RecommendationsDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsDashboardSummary({
  compact = false,
  limit = 3,
}: RecommendationsDashboardSummaryProps) {
  const items = buildRecommendationsDashboardItems();
  const totals = totalRecommendationsDashboard(items);
  const highlights = pickRecommendationsDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_DASHBOARD_FEATURE.title}
      </h3>
      <MarketingPanelGroup
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
