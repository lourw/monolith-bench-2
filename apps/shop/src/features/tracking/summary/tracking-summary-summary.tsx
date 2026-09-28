import { DataCardGroup } from '../../../components/data/card/data-card-group';
import { buildTrackingSummaryItems } from './tracking-summary.model';
import { TRACKING_SUMMARY_FEATURE } from './tracking-summary.routes';
import {
  pickTrackingSummaryHighlights,
  totalTrackingSummary,
} from './tracking-summary.utils';

export interface TrackingSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingSummarySummary({
  compact = false,
  limit = 3,
}: TrackingSummarySummaryProps) {
  const items = buildTrackingSummaryItems();
  const totals = totalTrackingSummary(items);
  const highlights = pickTrackingSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {TRACKING_SUMMARY_FEATURE.title}
      </h3>
      <DataCardGroup
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
