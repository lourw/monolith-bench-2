import { InputsToolbarGroup } from '../../../components/inputs/toolbar/inputs-toolbar-group';
import { ChartsPanel } from '../../../components/charts/panel/charts-panel';
import type { PromotionsInsightsItem } from './promotions-insights.model';
import { PROMOTIONS_INSIGHTS_FEATURE } from './promotions-insights.routes';
import { describePromotionsInsightsItem } from './promotions-insights.utils';

export interface PromotionsInsightsPanelProps {
  selected: PromotionsInsightsItem | null;
  onClear: () => void;
}

export function PromotionsInsightsPanel({
  selected,
  onClear,
}: PromotionsInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePromotionsInsightsItem(selected)}
      </p>
      <InputsToolbarGroup
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
        <ChartsPanel
          label="Charts Panel"
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
        data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
