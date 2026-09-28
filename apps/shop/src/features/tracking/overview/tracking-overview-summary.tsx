import { FormsListGroup } from '../../../components/forms/list/forms-list-group';
import { buildTrackingOverviewItems } from './tracking-overview.model';
import { TRACKING_OVERVIEW_FEATURE } from './tracking-overview.routes';
import {
  pickTrackingOverviewHighlights,
  totalTrackingOverview,
} from './tracking-overview.utils';

export interface TrackingOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingOverviewSummary({
  compact = false,
  limit = 3,
}: TrackingOverviewSummaryProps) {
  const items = buildTrackingOverviewItems();
  const totals = totalTrackingOverview(items);
  const highlights = pickTrackingOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {TRACKING_OVERVIEW_FEATURE.title}
      </h3>
      <FormsListGroup
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
