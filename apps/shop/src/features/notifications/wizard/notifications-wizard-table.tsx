import { MediaStat } from '../../../components/media/stat/media-stat';
import type { NotificationsWizardItem } from './notifications-wizard.model';
import { NOTIFICATIONS_WIZARD_FEATURE } from './notifications-wizard.routes';
import {
  formatNotificationsWizardAmount,
  notificationsWizardStatusTone,
} from './notifications-wizard.utils';

export interface NotificationsWizardTableProps {
  items: ReadonlyArray<NotificationsWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function NotificationsWizardTable({
  items,
  selectedId,
  onSelect,
}: NotificationsWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-empty`}
      >
        No notifications wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatNotificationsWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaStat
                label={item.status}
                tone={notificationsWizardStatusTone(item.status)}
                size="sm"
                testId={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
