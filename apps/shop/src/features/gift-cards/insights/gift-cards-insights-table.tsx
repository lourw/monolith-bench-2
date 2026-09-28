import { MediaStat } from '../../../components/media/stat/media-stat';
import type { GiftCardsInsightsItem } from './gift-cards-insights.model';
import { GIFT_CARDS_INSIGHTS_FEATURE } from './gift-cards-insights.routes';
import {
  formatGiftCardsInsightsAmount,
  giftCardsInsightsStatusTone,
} from './gift-cards-insights.utils';

export interface GiftCardsInsightsTableProps {
  items: ReadonlyArray<GiftCardsInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsInsightsTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No gift cards insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaStat
                label={item.status}
                tone={giftCardsInsightsStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
