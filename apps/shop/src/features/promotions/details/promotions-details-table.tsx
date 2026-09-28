import { OverlayList } from '../../../components/overlay/list/overlay-list';
import type { PromotionsDetailsItem } from './promotions-details.model';
import { PROMOTIONS_DETAILS_FEATURE } from './promotions-details.routes';
import {
  formatPromotionsDetailsAmount,
  promotionsDetailsStatusTone,
} from './promotions-details.utils';

export interface PromotionsDetailsTableProps {
  items: ReadonlyArray<PromotionsDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsDetailsTable({
  items,
  selectedId,
  onSelect,
}: PromotionsDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-empty`}
      >
        No promotions details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayList
                label={item.status}
                tone={promotionsDetailsStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
