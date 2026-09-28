import { ChartsHeader } from '../../../components/charts/header/charts-header';
import type { PaymentsOverviewItem } from './payments-overview.model';
import { PAYMENTS_OVERVIEW_FEATURE } from './payments-overview.routes';
import {
  formatPaymentsOverviewAmount,
  paymentsOverviewStatusTone,
} from './payments-overview.utils';

export interface PaymentsOverviewTableProps {
  items: ReadonlyArray<PaymentsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsOverviewTable({
  items,
  selectedId,
  onSelect,
}: PaymentsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No payments overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsHeader
                label={item.status}
                tone={paymentsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
