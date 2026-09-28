import { CommerceStatGroup } from '../../../components/commerce/stat/commerce-stat-group';
import { buildTrackingDetailsItems } from './tracking-details.model';
import { TRACKING_DETAILS_FEATURE } from './tracking-details.routes';
import {
  pickTrackingDetailsHighlights,
  totalTrackingDetails,
} from './tracking-details.utils';

export interface TrackingDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingDetailsSummary({
  compact = false,
  limit = 3,
}: TrackingDetailsSummaryProps) {
  const items = buildTrackingDetailsItems();
  const totals = totalTrackingDetails(items);
  const highlights = pickTrackingDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {TRACKING_DETAILS_FEATURE.title}
      </h3>
      <CommerceStatGroup
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
