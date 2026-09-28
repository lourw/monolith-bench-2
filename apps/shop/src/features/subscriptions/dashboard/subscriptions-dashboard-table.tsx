import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import type { SubscriptionsDashboardItem } from './subscriptions-dashboard.model';
import { SUBSCRIPTIONS_DASHBOARD_FEATURE } from './subscriptions-dashboard.routes';
import {
  formatSubscriptionsDashboardAmount,
  subscriptionsDashboardStatusTone,
} from './subscriptions-dashboard.utils';

export interface SubscriptionsDashboardTableProps {
  items: ReadonlyArray<SubscriptionsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SubscriptionsDashboardTable({
  items,
  selectedId,
  onSelect,
}: SubscriptionsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No subscriptions dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSubscriptionsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaToolbar
                label={item.status}
                tone={subscriptionsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
