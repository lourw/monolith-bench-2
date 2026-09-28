import { ChartsChipGroup } from '../../../components/charts/chip/charts-chip-group';
import { buildAnalyticsHistoryItems } from './analytics-history.model';
import { ANALYTICS_HISTORY_FEATURE } from './analytics-history.routes';
import {
  pickAnalyticsHistoryHighlights,
  totalAnalyticsHistory,
} from './analytics-history.utils';

export interface AnalyticsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsHistorySummary({
  compact = false,
  limit = 3,
}: AnalyticsHistorySummaryProps) {
  const items = buildAnalyticsHistoryItems();
  const totals = totalAnalyticsHistory(items);
  const highlights = pickAnalyticsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_HISTORY_FEATURE.title}
      </h3>
      <ChartsChipGroup
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
