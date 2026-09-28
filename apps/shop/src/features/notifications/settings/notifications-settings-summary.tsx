import { NavigationTileGroup } from '../../../components/navigation/tile/navigation-tile-group';
import { buildNotificationsSettingsItems } from './notifications-settings.model';
import { NOTIFICATIONS_SETTINGS_FEATURE } from './notifications-settings.routes';
import {
  pickNotificationsSettingsHighlights,
  totalNotificationsSettings,
} from './notifications-settings.utils';

export interface NotificationsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsSettingsSummary({
  compact = false,
  limit = 3,
}: NotificationsSettingsSummaryProps) {
  const items = buildNotificationsSettingsItems();
  const totals = totalNotificationsSettings(items);
  const highlights = pickNotificationsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_SETTINGS_FEATURE.title}
      </h3>
      <NavigationTileGroup
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
