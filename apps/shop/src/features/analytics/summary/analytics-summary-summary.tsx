import { CoreCardGroup } from '../../../components/core/card/core-card-group';
import { buildAnalyticsSummaryItems } from './analytics-summary.model';
import { ANALYTICS_SUMMARY_FEATURE } from './analytics-summary.routes';
import {
  pickAnalyticsSummaryHighlights,
  totalAnalyticsSummary,
} from './analytics-summary.utils';

export interface AnalyticsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsSummarySummary({
  compact = false,
  limit = 3,
}: AnalyticsSummarySummaryProps) {
  const items = buildAnalyticsSummaryItems();
  const totals = totalAnalyticsSummary(items);
  const highlights = pickAnalyticsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_SUMMARY_FEATURE.title}
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
