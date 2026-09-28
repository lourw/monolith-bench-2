import { ChartsBadge } from '../../../components/charts/badge/charts-badge';
import type { LoyaltyHistoryItem } from './loyalty-history.model';
import { LOYALTY_HISTORY_FEATURE } from './loyalty-history.routes';
import {
  formatLoyaltyHistoryAmount,
  loyaltyHistoryStatusTone,
} from './loyalty-history.utils';

export interface LoyaltyHistoryTableProps {
  items: ReadonlyArray<LoyaltyHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltyHistoryTable({
  items,
  selectedId,
  onSelect,
}: LoyaltyHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-empty`}
      >
        No loyalty history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltyHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsBadge
                label={item.status}
                tone={loyaltyHistoryStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
