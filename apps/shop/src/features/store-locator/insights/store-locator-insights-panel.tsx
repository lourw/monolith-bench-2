import { ChartsListGroup } from '../../../components/charts/list/charts-list-group';
import { InputsBadge } from '../../../components/inputs/badge/inputs-badge';
import { CommerceCard } from '../../../components/commerce/card/commerce-card';
import type { StoreLocatorInsightsItem } from './store-locator-insights.model';
import { STORE_LOCATOR_INSIGHTS_FEATURE } from './store-locator-insights.routes';
import { describeStoreLocatorInsightsItem } from './store-locator-insights.utils';

export interface StoreLocatorInsightsPanelProps {
  selected: StoreLocatorInsightsItem | null;
  onClear: () => void;
}

export function StoreLocatorInsightsPanel({
  selected,
  onClear,
}: StoreLocatorInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeStoreLocatorInsightsItem(selected)}
      </p>
      <ChartsListGroup
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
        <InputsBadge
          label="Inputs Badge"
          value={selected.product.rating}
          size="sm"
        />
        <CommerceCard
          label="Commerce Card"
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
        data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
