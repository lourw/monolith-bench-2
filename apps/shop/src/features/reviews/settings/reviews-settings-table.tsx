import { NavigationPanel } from '../../../components/navigation/panel/navigation-panel';
import type { ReviewsSettingsItem } from './reviews-settings.model';
import { REVIEWS_SETTINGS_FEATURE } from './reviews-settings.routes';
import {
  formatReviewsSettingsAmount,
  reviewsSettingsStatusTone,
} from './reviews-settings.utils';

export interface ReviewsSettingsTableProps {
  items: ReadonlyArray<ReviewsSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReviewsSettingsTable({
  items,
  selectedId,
  onSelect,
}: ReviewsSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-empty`}
      >
        No reviews settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReviewsSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationPanel
                label={item.status}
                tone={reviewsSettingsStatusTone(item.status)}
                size="sm"
                testId={`${REVIEWS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
