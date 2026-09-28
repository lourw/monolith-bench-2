import { CommerceListGroup } from '../../../components/commerce/list/commerce-list-group';
import { buildAnalyticsOverviewItems } from './analytics-overview.model';
import { ANALYTICS_OVERVIEW_FEATURE } from './analytics-overview.routes';
import {
  pickAnalyticsOverviewHighlights,
  totalAnalyticsOverview,
} from './analytics-overview.utils';

export interface AnalyticsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsOverviewSummary({
  compact = false,
  limit = 3,
}: AnalyticsOverviewSummaryProps) {
  const items = buildAnalyticsOverviewItems();
  const totals = totalAnalyticsOverview(items);
  const highlights = pickAnalyticsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_OVERVIEW_FEATURE.title}
      </h3>
      <CommerceListGroup
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
