import { InputsChip } from '../../../components/inputs/chip/inputs-chip';
import type { ShippingOverviewItem } from './shipping-overview.model';
import { SHIPPING_OVERVIEW_FEATURE } from './shipping-overview.routes';
import {
  formatShippingOverviewAmount,
  shippingOverviewStatusTone,
} from './shipping-overview.utils';

export interface ShippingOverviewTableProps {
  items: ReadonlyArray<ShippingOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingOverviewTable({
  items,
  selectedId,
  onSelect,
}: ShippingOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-empty`}
      >
        No shipping overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsChip
                label={item.status}
                tone={shippingOverviewStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
