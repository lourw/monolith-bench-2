import { MediaStatGroup } from '../../../components/media/stat/media-stat-group';
import { buildNotificationsOverviewItems } from './notifications-overview.model';
import { NOTIFICATIONS_OVERVIEW_FEATURE } from './notifications-overview.routes';
import {
  pickNotificationsOverviewHighlights,
  totalNotificationsOverview,
} from './notifications-overview.utils';

export interface NotificationsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsOverviewSummary({
  compact = false,
  limit = 3,
}: NotificationsOverviewSummaryProps) {
  const items = buildNotificationsOverviewItems();
  const totals = totalNotificationsOverview(items);
  const highlights = pickNotificationsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_OVERVIEW_FEATURE.title}
      </h3>
      <MediaStatGroup
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
