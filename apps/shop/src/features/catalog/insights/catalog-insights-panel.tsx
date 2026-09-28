import { FeedbackHeaderGroup } from '../../../components/feedback/header/feedback-header-group';
import { InputsCard } from '../../../components/inputs/card/inputs-card';
import type { CatalogInsightsItem } from './catalog-insights.model';
import { CATALOG_INSIGHTS_FEATURE } from './catalog-insights.routes';
import { describeCatalogInsightsItem } from './catalog-insights.utils';

export interface CatalogInsightsPanelProps {
  selected: CatalogInsightsItem | null;
  onClear: () => void;
}

export function CatalogInsightsPanel({
  selected,
  onClear,
}: CatalogInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCatalogInsightsItem(selected)}
      </p>
      <FeedbackHeaderGroup
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
        <InputsCard
          label="Inputs Card"
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
        data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
