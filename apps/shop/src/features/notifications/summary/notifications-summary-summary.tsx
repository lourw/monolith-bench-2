import { OverlayPanelGroup } from '../../../components/overlay/panel/overlay-panel-group';
import { buildNotificationsSummaryItems } from './notifications-summary.model';
import { NOTIFICATIONS_SUMMARY_FEATURE } from './notifications-summary.routes';
import {
  pickNotificationsSummaryHighlights,
  totalNotificationsSummary,
} from './notifications-summary.utils';

export interface NotificationsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsSummarySummary({
  compact = false,
  limit = 3,
}: NotificationsSummarySummaryProps) {
  const items = buildNotificationsSummaryItems();
  const totals = totalNotificationsSummary(items);
  const highlights = pickNotificationsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_SUMMARY_FEATURE.title}
      </h3>
      <OverlayPanelGroup
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
