import { DataTile } from '../../../components/data/tile/data-tile';
import type { PromotionsInsightsItem } from './promotions-insights.model';
import { PROMOTIONS_INSIGHTS_FEATURE } from './promotions-insights.routes';
import {
  formatPromotionsInsightsAmount,
  promotionsInsightsStatusTone,
} from './promotions-insights.utils';

export interface PromotionsInsightsTableProps {
  items: ReadonlyArray<PromotionsInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsInsightsTable({
  items,
  selectedId,
  onSelect,
}: PromotionsInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-empty`}
      >
        No promotions insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataTile
                label={item.status}
                tone={promotionsInsightsStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
