import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { GiftCardsOverviewItem } from './gift-cards-overview.model';
import { GIFT_CARDS_OVERVIEW_FEATURE } from './gift-cards-overview.routes';
import {
  formatGiftCardsOverviewAmount,
  giftCardsOverviewStatusTone,
} from './gift-cards-overview.utils';

export interface GiftCardsOverviewTableProps {
  items: ReadonlyArray<GiftCardsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsOverviewTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No gift cards overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={giftCardsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
