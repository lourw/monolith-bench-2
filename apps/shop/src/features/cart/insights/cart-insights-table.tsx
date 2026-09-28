import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import type { CartInsightsItem } from './cart-insights.model';
import { CART_INSIGHTS_FEATURE } from './cart-insights.routes';
import {
  formatCartInsightsAmount,
  cartInsightsStatusTone,
} from './cart-insights.utils';

export interface CartInsightsTableProps {
  items: ReadonlyArray<CartInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartInsightsTable({
  items,
  selectedId,
  onSelect,
}: CartInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_INSIGHTS_FEATURE.testId}-empty`}
      >
        No cart insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${CART_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceToolbar
                label={item.status}
                tone={cartInsightsStatusTone(item.status)}
                size="sm"
                testId={`${CART_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
