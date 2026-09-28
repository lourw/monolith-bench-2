import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import type { GiftCardsEditorItem } from './gift-cards-editor.model';
import { GIFT_CARDS_EDITOR_FEATURE } from './gift-cards-editor.routes';
import {
  formatGiftCardsEditorAmount,
  giftCardsEditorStatusTone,
} from './gift-cards-editor.utils';

export interface GiftCardsEditorTableProps {
  items: ReadonlyArray<GiftCardsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsEditorTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_EDITOR_FEATURE.testId}-empty`}
      >
        No gift cards editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyPanel
                label={item.status}
                tone={giftCardsEditorStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
