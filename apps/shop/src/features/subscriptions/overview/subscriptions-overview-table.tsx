import { MediaHeader } from '../../../components/media/header/media-header';
import type { SubscriptionsOverviewItem } from './subscriptions-overview.model';
import { SUBSCRIPTIONS_OVERVIEW_FEATURE } from './subscriptions-overview.routes';
import {
  formatSubscriptionsOverviewAmount,
  subscriptionsOverviewStatusTone,
} from './subscriptions-overview.utils';

export interface SubscriptionsOverviewTableProps {
  items: ReadonlyArray<SubscriptionsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SubscriptionsOverviewTable({
  items,
  selectedId,
  onSelect,
}: SubscriptionsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No subscriptions overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSubscriptionsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaHeader
                label={item.status}
                tone={subscriptionsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
