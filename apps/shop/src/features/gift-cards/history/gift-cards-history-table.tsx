import { DataBadge } from '../../../components/data/badge/data-badge';
import type { GiftCardsHistoryItem } from './gift-cards-history.model';
import { GIFT_CARDS_HISTORY_FEATURE } from './gift-cards-history.routes';
import {
  formatGiftCardsHistoryAmount,
  giftCardsHistoryStatusTone,
} from './gift-cards-history.utils';

export interface GiftCardsHistoryTableProps {
  items: ReadonlyArray<GiftCardsHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsHistoryTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-empty`}
      >
        No gift cards history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataBadge
                label={item.status}
                tone={giftCardsHistoryStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
