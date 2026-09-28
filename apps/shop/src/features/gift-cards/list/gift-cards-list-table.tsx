import { MarketingTile } from '../../../components/marketing/tile/marketing-tile';
import type { GiftCardsListItem } from './gift-cards-list.model';
import { GIFT_CARDS_LIST_FEATURE } from './gift-cards-list.routes';
import {
  formatGiftCardsListAmount,
  giftCardsListStatusTone,
} from './gift-cards-list.utils';

export interface GiftCardsListTableProps {
  items: ReadonlyArray<GiftCardsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsListTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_LIST_FEATURE.testId}-empty`}
      >
        No gift cards list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingTile
                label={item.status}
                tone={giftCardsListStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
