import { OverlayListGroup } from '../../../components/overlay/list/overlay-list-group';
import type { RecommendationsDetailsItem } from './recommendations-details.model';
import { RECOMMENDATIONS_DETAILS_FEATURE } from './recommendations-details.routes';
import { describeRecommendationsDetailsItem } from './recommendations-details.utils';

export interface RecommendationsDetailsPanelProps {
  selected: RecommendationsDetailsItem | null;
  onClear: () => void;
}

export function RecommendationsDetailsPanel({
  selected,
  onClear,
}: RecommendationsDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeRecommendationsDetailsItem(selected)}
      </p>
      <OverlayListGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
