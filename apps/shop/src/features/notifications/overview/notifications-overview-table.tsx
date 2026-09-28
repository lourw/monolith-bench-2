import { InputsBanner } from '../../../components/inputs/banner/inputs-banner';
import type { NotificationsOverviewItem } from './notifications-overview.model';
import { NOTIFICATIONS_OVERVIEW_FEATURE } from './notifications-overview.routes';
import {
  formatNotificationsOverviewAmount,
  notificationsOverviewStatusTone,
} from './notifications-overview.utils';

export interface NotificationsOverviewTableProps {
  items: ReadonlyArray<NotificationsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsOverviewTable({
  items,
  selectedId,
  onSelect,
}: NotificationsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No notifications overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsBanner
                label={item.status}
                tone={notificationsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
