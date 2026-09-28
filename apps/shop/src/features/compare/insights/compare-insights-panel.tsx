import { MediaBannerGroup } from '../../../components/media/banner/media-banner-group';
import { MediaPanel } from '../../../components/media/panel/media-panel';
import type { CompareInsightsItem } from './compare-insights.model';
import { COMPARE_INSIGHTS_FEATURE } from './compare-insights.routes';
import { describeCompareInsightsItem } from './compare-insights.utils';

export interface CompareInsightsPanelProps {
  selected: CompareInsightsItem | null;
  onClear: () => void;
}

export function CompareInsightsPanel({
  selected,
  onClear,
}: CompareInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCompareInsightsItem(selected)}
      </p>
      <MediaBannerGroup
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
        <MediaPanel
          label="Media Panel"
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
        data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
