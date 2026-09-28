import { CommerceTile } from '../../../components/commerce/tile/commerce-tile';
import type { LoyaltyInsightsItem } from './loyalty-insights.model';
import { LOYALTY_INSIGHTS_FEATURE } from './loyalty-insights.routes';
import {
  formatLoyaltyInsightsAmount,
  loyaltyInsightsStatusTone,
} from './loyalty-insights.utils';

export interface LoyaltyInsightsTableProps {
  items: ReadonlyArray<LoyaltyInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltyInsightsTable({
  items,
  selectedId,
  onSelect,
}: LoyaltyInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_INSIGHTS_FEATURE.testId}-empty`}
      >
        No loyalty insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltyInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceTile
                label={item.status}
                tone={loyaltyInsightsStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
