import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import type { LoyaltyDetailsItem } from './loyalty-details.model';
import { LOYALTY_DETAILS_FEATURE } from './loyalty-details.routes';
import {
  formatLoyaltyDetailsAmount,
  loyaltyDetailsStatusTone,
} from './loyalty-details.utils';

export interface LoyaltyDetailsTableProps {
  items: ReadonlyArray<LoyaltyDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltyDetailsTable({
  items,
  selectedId,
  onSelect,
}: LoyaltyDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_DETAILS_FEATURE.testId}-empty`}
      >
        No loyalty details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltyDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaToolbar
                label={item.status}
                tone={loyaltyDetailsStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
