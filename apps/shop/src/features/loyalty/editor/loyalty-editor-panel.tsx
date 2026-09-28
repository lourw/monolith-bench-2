import { LayoutCardGroup } from '../../../components/layout/card/layout-card-group';
import type { LoyaltyEditorItem } from './loyalty-editor.model';
import { LOYALTY_EDITOR_FEATURE } from './loyalty-editor.routes';
import { describeLoyaltyEditorItem } from './loyalty-editor.utils';

export interface LoyaltyEditorPanelProps {
  selected: LoyaltyEditorItem | null;
  onClear: () => void;
}

export function LoyaltyEditorPanel({
  selected,
  onClear,
}: LoyaltyEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeLoyaltyEditorItem(selected)}
      </p>
      <LayoutCardGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
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
        data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
