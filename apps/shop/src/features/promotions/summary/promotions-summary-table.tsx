import { NavigationToolbar } from '../../../components/navigation/toolbar/navigation-toolbar';
import type { PromotionsSummaryItem } from './promotions-summary.model';
import { PROMOTIONS_SUMMARY_FEATURE } from './promotions-summary.routes';
import {
  formatPromotionsSummaryAmount,
  promotionsSummaryStatusTone,
} from './promotions-summary.utils';

export interface PromotionsSummaryTableProps {
  items: ReadonlyArray<PromotionsSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsSummaryTable({
  items,
  selectedId,
  onSelect,
}: PromotionsSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_SUMMARY_FEATURE.testId}-empty`}
      >
        No promotions summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${PROMOTIONS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationToolbar
                label={item.status}
                tone={promotionsSummaryStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
