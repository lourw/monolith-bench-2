import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { SubscriptionsDetailsItem } from './subscriptions-details.model';
import { SUBSCRIPTIONS_DETAILS_FEATURE } from './subscriptions-details.routes';
import {
  formatSubscriptionsDetailsAmount,
  subscriptionsDetailsStatusTone,
} from './subscriptions-details.utils';

export interface SubscriptionsDetailsTableProps {
  items: ReadonlyArray<SubscriptionsDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SubscriptionsDetailsTable({
  items,
  selectedId,
  onSelect,
}: SubscriptionsDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-empty`}
      >
        No subscriptions details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSubscriptionsDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={subscriptionsDetailsStatusTone(item.status)}
                size="sm"
                testId={`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
