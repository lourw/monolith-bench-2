import { MarketingBannerGroup } from '../../../components/marketing/banner/marketing-banner-group';
import { buildNotificationsHistoryItems } from './notifications-history.model';
import { NOTIFICATIONS_HISTORY_FEATURE } from './notifications-history.routes';
import {
  pickNotificationsHistoryHighlights,
  totalNotificationsHistory,
} from './notifications-history.utils';

export interface NotificationsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsHistorySummary({
  compact = false,
  limit = 3,
}: NotificationsHistorySummaryProps) {
  const items = buildNotificationsHistoryItems();
  const totals = totalNotificationsHistory(items);
  const highlights = pickNotificationsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_HISTORY_FEATURE.title}
      </h3>
      <MarketingBannerGroup
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
