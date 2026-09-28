import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import type { GiftCardsSummaryItem } from './gift-cards-summary.model';
import { GIFT_CARDS_SUMMARY_FEATURE } from './gift-cards-summary.routes';
import {
  formatGiftCardsSummaryAmount,
  giftCardsSummaryStatusTone,
} from './gift-cards-summary.utils';

export interface GiftCardsSummaryTableProps {
  items: ReadonlyArray<GiftCardsSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsSummaryTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-empty`}
      >
        No gift cards summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaToolbar
                label={item.status}
                tone={giftCardsSummaryStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
