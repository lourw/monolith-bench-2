import { CoreHeader } from '../../../components/core/header/core-header';
import type { GiftCardsDashboardItem } from './gift-cards-dashboard.model';
import { GIFT_CARDS_DASHBOARD_FEATURE } from './gift-cards-dashboard.routes';
import {
  formatGiftCardsDashboardAmount,
  giftCardsDashboardStatusTone,
} from './gift-cards-dashboard.utils';

export interface GiftCardsDashboardTableProps {
  items: ReadonlyArray<GiftCardsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsDashboardTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No gift cards dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreHeader
                label={item.status}
                tone={giftCardsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
