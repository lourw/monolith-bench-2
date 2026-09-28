import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { CheckoutSummaryItem } from './checkout-summary.model';
import { CHECKOUT_SUMMARY_FEATURE } from './checkout-summary.routes';
import {
  formatCheckoutSummaryAmount,
  checkoutSummaryStatusTone,
} from './checkout-summary.utils';

export interface CheckoutSummaryTableProps {
  items: ReadonlyArray<CheckoutSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutSummaryTable({
  items,
  selectedId,
  onSelect,
}: CheckoutSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_SUMMARY_FEATURE.testId}-empty`}
      >
        No checkout summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={checkoutSummaryStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
