import { DataHeaderGroup } from '../../../components/data/header/data-header-group';
import { NavigationPanel } from '../../../components/navigation/panel/navigation-panel';
import type { SupportInsightsItem } from './support-insights.model';
import { SUPPORT_INSIGHTS_FEATURE } from './support-insights.routes';
import { describeSupportInsightsItem } from './support-insights.utils';

export interface SupportInsightsPanelProps {
  selected: SupportInsightsItem | null;
  onClear: () => void;
}

export function SupportInsightsPanel({
  selected,
  onClear,
}: SupportInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSupportInsightsItem(selected)}
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
        <NavigationPanel
          label="Navigation Panel"
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
        data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
