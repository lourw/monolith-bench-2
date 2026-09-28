import { DataHeaderGroup } from '../../../components/data/header/data-header-group';
import { CoreBadge } from '../../../components/core/badge/core-badge';
import type { AnalyticsInsightsItem } from './analytics-insights.model';
import { ANALYTICS_INSIGHTS_FEATURE } from './analytics-insights.routes';
import { describeAnalyticsInsightsItem } from './analytics-insights.utils';

export interface AnalyticsInsightsPanelProps {
  selected: AnalyticsInsightsItem | null;
  onClear: () => void;
}

export function AnalyticsInsightsPanel({
  selected,
  onClear,
}: AnalyticsInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAnalyticsInsightsItem(selected)}
      </p>
      <DataHeaderGroup
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
        <CoreBadge
          label="Core Badge"
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
        data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
