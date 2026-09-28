import { NavigationToolbarGroup } from '../../../components/navigation/toolbar/navigation-toolbar-group';
import { FormsBanner } from '../../../components/forms/banner/forms-banner';
import { MarketingToolbar } from '../../../components/marketing/toolbar/marketing-toolbar';
import type { RecommendationsSummaryItem } from './recommendations-summary.model';
import { RECOMMENDATIONS_SUMMARY_FEATURE } from './recommendations-summary.routes';
import { describeRecommendationsSummaryItem } from './recommendations-summary.utils';

export interface RecommendationsSummaryPanelProps {
  selected: RecommendationsSummaryItem | null;
  onClear: () => void;
}

export function RecommendationsSummaryPanel({
  selected,
  onClear,
}: RecommendationsSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeRecommendationsSummaryItem(selected)}
      </p>
      <NavigationToolbarGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <FormsBanner
          label="Forms Banner"
          value={selected.product.rating}
          size="sm"
        />
        <MarketingToolbar
          label="Marketing Toolbar"
          value={selected.product.rating}
          size="sm"
        />
      </div>
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
        data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
