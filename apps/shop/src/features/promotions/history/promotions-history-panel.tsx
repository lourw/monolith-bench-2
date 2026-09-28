import { FormsToolbarGroup } from '../../../components/forms/toolbar/forms-toolbar-group';
import { DataCard } from '../../../components/data/card/data-card';
import type { PromotionsHistoryItem } from './promotions-history.model';
import { PROMOTIONS_HISTORY_FEATURE } from './promotions-history.routes';
import { describePromotionsHistoryItem } from './promotions-history.utils';

export interface PromotionsHistoryPanelProps {
  selected: PromotionsHistoryItem | null;
  onClear: () => void;
}

export function PromotionsHistoryPanel({
  selected,
  onClear,
}: PromotionsHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePromotionsHistoryItem(selected)}
      </p>
      <FormsToolbarGroup
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
        <DataCard label="Data Card" value={selected.product.rating} size="sm" />
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
        data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
