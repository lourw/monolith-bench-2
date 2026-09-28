import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import type { PromotionsDashboardItem } from './promotions-dashboard.model';
import { PROMOTIONS_DASHBOARD_FEATURE } from './promotions-dashboard.routes';
import {
  formatPromotionsDashboardAmount,
  promotionsDashboardStatusTone,
} from './promotions-dashboard.utils';

export interface PromotionsDashboardTableProps {
  items: ReadonlyArray<PromotionsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsDashboardTable({
  items,
  selectedId,
  onSelect,
}: PromotionsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No promotions dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingBanner
                label={item.status}
                tone={promotionsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
