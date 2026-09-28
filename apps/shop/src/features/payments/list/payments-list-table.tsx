import { LayoutToolbar } from '../../../components/layout/toolbar/layout-toolbar';
import type { PaymentsListItem } from './payments-list.model';
import { PAYMENTS_LIST_FEATURE } from './payments-list.routes';
import {
  formatPaymentsListAmount,
  paymentsListStatusTone,
} from './payments-list.utils';

export interface PaymentsListTableProps {
  items: ReadonlyArray<PaymentsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsListTable({
  items,
  selectedId,
  onSelect,
}: PaymentsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_LIST_FEATURE.testId}-empty`}
      >
        No payments list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutToolbar
                label={item.status}
                tone={paymentsListStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
