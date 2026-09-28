import { OverlayBanner } from '../../../components/overlay/banner/overlay-banner';
import type { RecommendationsDetailsItem } from './recommendations-details.model';
import { RECOMMENDATIONS_DETAILS_FEATURE } from './recommendations-details.routes';
import {
  formatRecommendationsDetailsAmount,
  recommendationsDetailsStatusTone,
} from './recommendations-details.utils';

export interface RecommendationsDetailsTableProps {
  items: ReadonlyArray<RecommendationsDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsDetailsTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-empty`}
      >
        No recommendations details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayBanner
                label={item.status}
                tone={recommendationsDetailsStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
