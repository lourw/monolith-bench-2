import { DataListGroup } from '../../../components/data/list/data-list-group';
import { buildTrackingListItems } from './tracking-list.model';
import { TRACKING_LIST_FEATURE } from './tracking-list.routes';
import {
  pickTrackingListHighlights,
  totalTrackingList,
} from './tracking-list.utils';

export interface TrackingListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingListSummary({
  compact = false,
  limit = 3,
}: TrackingListSummaryProps) {
  const items = buildTrackingListItems();
  const totals = totalTrackingList(items);
  const highlights = pickTrackingListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{TRACKING_LIST_FEATURE.title}</h3>
      <DataListGroup
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
