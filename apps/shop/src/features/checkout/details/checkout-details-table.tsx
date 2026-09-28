import { NavigationCard } from '../../../components/navigation/card/navigation-card';
import type { CheckoutDetailsItem } from './checkout-details.model';
import { CHECKOUT_DETAILS_FEATURE } from './checkout-details.routes';
import {
  formatCheckoutDetailsAmount,
  checkoutDetailsStatusTone,
} from './checkout-details.utils';

export interface CheckoutDetailsTableProps {
  items: ReadonlyArray<CheckoutDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutDetailsTable({
  items,
  selectedId,
  onSelect,
}: CheckoutDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-empty`}
      >
        No checkout details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationCard
                label={item.status}
                tone={checkoutDetailsStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
