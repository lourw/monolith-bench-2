import { MediaHeader } from '../../../components/media/header/media-header';
import type { GiftCardsDetailsItem } from './gift-cards-details.model';
import { GIFT_CARDS_DETAILS_FEATURE } from './gift-cards-details.routes';
import {
  formatGiftCardsDetailsAmount,
  giftCardsDetailsStatusTone,
} from './gift-cards-details.utils';

export interface GiftCardsDetailsTableProps {
  items: ReadonlyArray<GiftCardsDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsDetailsTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_DETAILS_FEATURE.testId}-empty`}
      >
        No gift cards details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaHeader
                label={item.status}
                tone={giftCardsDetailsStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
