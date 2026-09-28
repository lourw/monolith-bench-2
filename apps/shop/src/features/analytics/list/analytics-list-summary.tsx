import { CoreChipGroup } from '../../../components/core/chip/core-chip-group';
import { buildAnalyticsListItems } from './analytics-list.model';
import { ANALYTICS_LIST_FEATURE } from './analytics-list.routes';
import {
  pickAnalyticsListHighlights,
  totalAnalyticsList,
} from './analytics-list.utils';

export interface AnalyticsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsListSummary({
  compact = false,
  limit = 3,
}: AnalyticsListSummaryProps) {
  const items = buildAnalyticsListItems();
  const totals = totalAnalyticsList(items);
  const highlights = pickAnalyticsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ANALYTICS_LIST_FEATURE.title}</h3>
      <CoreChipGroup
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
