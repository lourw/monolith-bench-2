import { OverlayStat } from '../../../components/overlay/stat/overlay-stat';
import type { ShippingListItem } from './shipping-list.model';
import { SHIPPING_LIST_FEATURE } from './shipping-list.routes';
import {
  formatShippingListAmount,
  shippingListStatusTone,
} from './shipping-list.utils';

export interface ShippingListTableProps {
  items: ReadonlyArray<ShippingListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingListTable({
  items,
  selectedId,
  onSelect,
}: ShippingListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_LIST_FEATURE.testId}-empty`}
      >
        No shipping list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_LIST_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayStat
                label={item.status}
                tone={shippingListStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
