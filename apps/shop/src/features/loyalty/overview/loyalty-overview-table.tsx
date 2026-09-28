import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { LoyaltyOverviewItem } from './loyalty-overview.model';
import { LOYALTY_OVERVIEW_FEATURE } from './loyalty-overview.routes';
import {
  formatLoyaltyOverviewAmount,
  loyaltyOverviewStatusTone,
} from './loyalty-overview.utils';

export interface LoyaltyOverviewTableProps {
  items: ReadonlyArray<LoyaltyOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltyOverviewTable({
  items,
  selectedId,
  onSelect,
}: LoyaltyOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-empty`}
      >
        No loyalty overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltyOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={loyaltyOverviewStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
