import { CommerceBadgeGroup } from '../../../components/commerce/badge/commerce-badge-group';
import { buildTrackingHistoryItems } from './tracking-history.model';
import { TRACKING_HISTORY_FEATURE } from './tracking-history.routes';
import {
  pickTrackingHistoryHighlights,
  totalTrackingHistory,
} from './tracking-history.utils';

export interface TrackingHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingHistorySummary({
  compact = false,
  limit = 3,
}: TrackingHistorySummaryProps) {
  const items = buildTrackingHistoryItems();
  const totals = totalTrackingHistory(items);
  const highlights = pickTrackingHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {TRACKING_HISTORY_FEATURE.title}
      </h3>
      <CommerceBadgeGroup
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
