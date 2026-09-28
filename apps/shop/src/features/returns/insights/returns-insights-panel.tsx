import { CoreListGroup } from '../../../components/core/list/core-list-group';
import { InputsPanel } from '../../../components/inputs/panel/inputs-panel';
import type { ReturnsInsightsItem } from './returns-insights.model';
import { RETURNS_INSIGHTS_FEATURE } from './returns-insights.routes';
import { describeReturnsInsightsItem } from './returns-insights.utils';

export interface ReturnsInsightsPanelProps {
  selected: ReturnsInsightsItem | null;
  onClear: () => void;
}

export function ReturnsInsightsPanel({
  selected,
  onClear,
}: ReturnsInsightsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-panel`}
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
      data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeReturnsInsightsItem(selected)}
      </p>
      <CoreListGroup
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
        <InputsPanel
          label="Inputs Panel"
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
        data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
