import { ChartsStat } from '../../../components/charts/stat/charts-stat';
import type { GiftCardsWizardItem } from './gift-cards-wizard.model';
import { GIFT_CARDS_WIZARD_FEATURE } from './gift-cards-wizard.routes';
import {
  formatGiftCardsWizardAmount,
  giftCardsWizardStatusTone,
} from './gift-cards-wizard.utils';

export interface GiftCardsWizardTableProps {
  items: ReadonlyArray<GiftCardsWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function GiftCardsWizardTable({
  items,
  selectedId,
  onSelect,
}: GiftCardsWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${GIFT_CARDS_WIZARD_FEATURE.testId}-empty`}
      >
        No gift cards wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${GIFT_CARDS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${GIFT_CARDS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatGiftCardsWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsStat
                label={item.status}
                tone={giftCardsWizardStatusTone(item.status)}
                size="sm"
                testId={`${GIFT_CARDS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
