import { MediaBadge } from '../../../components/media/badge/media-badge';
import type { LoyaltyListItem } from './loyalty-list.model';
import { LOYALTY_LIST_FEATURE } from './loyalty-list.routes';
import {
  formatLoyaltyListAmount,
  loyaltyListStatusTone,
} from './loyalty-list.utils';

export interface LoyaltyListTableProps {
  items: ReadonlyArray<LoyaltyListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltyListTable({
  items,
  selectedId,
  onSelect,
}: LoyaltyListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_LIST_FEATURE.testId}-empty`}
      >
        No loyalty list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_LIST_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltyListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBadge
                label={item.status}
                tone={loyaltyListStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
