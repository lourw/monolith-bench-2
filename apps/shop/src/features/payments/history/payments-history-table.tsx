import { MarketingCard } from '../../../components/marketing/card/marketing-card';
import type { PaymentsHistoryItem } from './payments-history.model';
import { PAYMENTS_HISTORY_FEATURE } from './payments-history.routes';
import {
  formatPaymentsHistoryAmount,
  paymentsHistoryStatusTone,
} from './payments-history.utils';

export interface PaymentsHistoryTableProps {
  items: ReadonlyArray<PaymentsHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsHistoryTable({
  items,
  selectedId,
  onSelect,
}: PaymentsHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-empty`}
      >
        No payments history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingCard
                label={item.status}
                tone={paymentsHistoryStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
