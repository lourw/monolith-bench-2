import { CoreTile } from '../../../components/core/tile/core-tile';
import type { CheckoutOverviewItem } from './checkout-overview.model';
import { CHECKOUT_OVERVIEW_FEATURE } from './checkout-overview.routes';
import {
  formatCheckoutOverviewAmount,
  checkoutOverviewStatusTone,
} from './checkout-overview.utils';

export interface CheckoutOverviewTableProps {
  items: ReadonlyArray<CheckoutOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutOverviewTable({
  items,
  selectedId,
  onSelect,
}: CheckoutOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_OVERVIEW_FEATURE.testId}-empty`}
      >
        No checkout overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreTile
                label={item.status}
                tone={checkoutOverviewStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
