import { CoreBadgeGroup } from '../../../components/core/badge/core-badge-group';
import { buildAnalyticsDetailsItems } from './analytics-details.model';
import { ANALYTICS_DETAILS_FEATURE } from './analytics-details.routes';
import {
  pickAnalyticsDetailsHighlights,
  totalAnalyticsDetails,
} from './analytics-details.utils';

export interface AnalyticsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsDetailsSummary({
  compact = false,
  limit = 3,
}: AnalyticsDetailsSummaryProps) {
  const items = buildAnalyticsDetailsItems();
  const totals = totalAnalyticsDetails(items);
  const highlights = pickAnalyticsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_DETAILS_FEATURE.title}
      </h3>
      <CoreBadgeGroup
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
