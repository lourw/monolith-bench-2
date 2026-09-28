import { CommercePanelGroup } from '../../../components/commerce/panel/commerce-panel-group';
import { OverlayCard } from '../../../components/overlay/card/overlay-card';
import type { AnalyticsDetailsItem } from './analytics-details.model';
import { ANALYTICS_DETAILS_FEATURE } from './analytics-details.routes';
import { describeAnalyticsDetailsItem } from './analytics-details.utils';

export interface AnalyticsDetailsPanelProps {
  selected: AnalyticsDetailsItem | null;
  onClear: () => void;
}

export function AnalyticsDetailsPanel({
  selected,
  onClear,
}: AnalyticsDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAnalyticsDetailsItem(selected)}
      </p>
      <CommercePanelGroup
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
        <OverlayCard
          label="Overlay Card"
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
        data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
