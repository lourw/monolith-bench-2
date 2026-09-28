import { CoreBadge } from '../../../components/core/badge/core-badge';
import type { PromotionsListItem } from './promotions-list.model';
import { PROMOTIONS_LIST_FEATURE } from './promotions-list.routes';
import {
  formatPromotionsListAmount,
  promotionsListStatusTone,
} from './promotions-list.utils';

export interface PromotionsListTableProps {
  items: ReadonlyArray<PromotionsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsListTable({
  items,
  selectedId,
  onSelect,
}: PromotionsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_LIST_FEATURE.testId}-empty`}
      >
        No promotions list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${PROMOTIONS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreBadge
                label={item.status}
                tone={promotionsListStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
