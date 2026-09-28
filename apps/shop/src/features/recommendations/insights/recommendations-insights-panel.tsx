import { CoreTileGroup } from '../../../components/core/tile/core-tile-group';
import type { RecommendationsInsightsItem } from './recommendations-insights.model';
import { RECOMMENDATIONS_INSIGHTS_FEATURE } from './recommendations-insights.routes';
import { describeRecommendationsInsightsItem } from './recommendations-insights.utils';

export interface RecommendationsInsightsPanelProps {
  selected: RecommendationsInsightsItem | null;
  onClear: () => void;
}

export function RecommendationsInsightsPanel({
  selected,
  onClear,
}: RecommendationsInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeRecommendationsInsightsItem(selected)}
      </p>
      <CoreTileGroup
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
        data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
