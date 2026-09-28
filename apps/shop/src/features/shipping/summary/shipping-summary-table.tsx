import { CoreBadge } from '../../../components/core/badge/core-badge';
import type { ShippingSummaryItem } from './shipping-summary.model';
import { SHIPPING_SUMMARY_FEATURE } from './shipping-summary.routes';
import {
  formatShippingSummaryAmount,
  shippingSummaryStatusTone,
} from './shipping-summary.utils';

export interface ShippingSummaryTableProps {
  items: ReadonlyArray<ShippingSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingSummaryTable({
  items,
  selectedId,
  onSelect,
}: ShippingSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_SUMMARY_FEATURE.testId}-empty`}
      >
        No shipping summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreBadge
                label={item.status}
                tone={shippingSummaryStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
