import { ChartsChip } from '../../../components/charts/chip/charts-chip';
import type { AddressesDashboardItem } from './addresses-dashboard.model';
import { ADDRESSES_DASHBOARD_FEATURE } from './addresses-dashboard.routes';
import {
  formatAddressesDashboardAmount,
  addressesDashboardStatusTone,
} from './addresses-dashboard.utils';

export interface AddressesDashboardTableProps {
  items: ReadonlyArray<AddressesDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesDashboardTable({
  items,
  selectedId,
  onSelect,
}: AddressesDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_DASHBOARD_FEATURE.testId}-empty`}
      >
        No addresses dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsChip
                label={item.status}
                tone={addressesDashboardStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
