import { CommerceCard } from '../../../components/commerce/card/commerce-card';
import type { GiftCardsSettingsItem } from './gift-cards-settings.model';
import { GIFT_CARDS_SETTINGS_FEATURE } from './gift-cards-settings.routes';
import {
  formatGiftCardsSettingsAmount,
  giftCardsSettingsStatusTone,
} from './gift-cards-settings.utils';

export interface GiftCardsSettingsTableProps {
  items: ReadonlyArray<GiftCardsSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsSettingsTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-empty`}
      >
        No gift cards settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceCard
                label={item.status}
                tone={giftCardsSettingsStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
