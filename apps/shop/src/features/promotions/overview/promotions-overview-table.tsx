import { MediaStat } from '../../../components/media/stat/media-stat';
import type { PromotionsOverviewItem } from './promotions-overview.model';
import { PROMOTIONS_OVERVIEW_FEATURE } from './promotions-overview.routes';
import {
  formatPromotionsOverviewAmount,
  promotionsOverviewStatusTone,
} from './promotions-overview.utils';

export interface PromotionsOverviewTableProps {
  items: ReadonlyArray<PromotionsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsOverviewTable({
  items,
  selectedId,
  onSelect,
}: PromotionsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No promotions overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaStat
                label={item.status}
                tone={promotionsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
