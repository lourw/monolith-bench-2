import { ChartsStat } from '../../../components/charts/stat/charts-stat';
import type { NotificationsSettingsItem } from './notifications-settings.model';
import { NOTIFICATIONS_SETTINGS_FEATURE } from './notifications-settings.routes';
import {
  formatNotificationsSettingsAmount,
  notificationsSettingsStatusTone,
} from './notifications-settings.utils';

export interface NotificationsSettingsTableProps {
  items: ReadonlyArray<NotificationsSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsSettingsTable({
  items,
  selectedId,
  onSelect,
}: NotificationsSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-empty`}
      >
        No notifications settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-table`}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={
              item.id === selectedId ? 'feature-row selected' : 'feature-row'
            }
            data-testid={`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsStat
                label={item.status}
                tone={notificationsSettingsStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
