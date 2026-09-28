import { LayoutPanelGroup } from '../../../components/layout/panel/layout-panel-group';
import { buildNotificationsDetailsItems } from './notifications-details.model';
import { NOTIFICATIONS_DETAILS_FEATURE } from './notifications-details.routes';
import {
  pickNotificationsDetailsHighlights,
  totalNotificationsDetails,
} from './notifications-details.utils';

export interface NotificationsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsDetailsSummary({
  compact = false,
  limit = 3,
}: NotificationsDetailsSummaryProps) {
  const items = buildNotificationsDetailsItems();
  const totals = totalNotificationsDetails(items);
  const highlights = pickNotificationsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_DETAILS_FEATURE.title}
      </h3>
      <LayoutPanelGroup
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
