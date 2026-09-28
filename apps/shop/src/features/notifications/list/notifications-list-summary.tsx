import { NavigationBadgeGroup } from '../../../components/navigation/badge/navigation-badge-group';
import { buildNotificationsListItems } from './notifications-list.model';
import { NOTIFICATIONS_LIST_FEATURE } from './notifications-list.routes';
import {
  pickNotificationsListHighlights,
  totalNotificationsList,
} from './notifications-list.utils';

export interface NotificationsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsListSummary({
  compact = false,
  limit = 3,
}: NotificationsListSummaryProps) {
  const items = buildNotificationsListItems();
  const totals = totalNotificationsList(items);
  const highlights = pickNotificationsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_LIST_FEATURE.title}
      </h3>
      <NavigationBadgeGroup
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
