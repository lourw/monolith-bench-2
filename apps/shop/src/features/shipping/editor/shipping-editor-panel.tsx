import { InputsCardGroup } from '../../../components/inputs/card/inputs-card-group';
import { NavigationToolbar } from '../../../components/navigation/toolbar/navigation-toolbar';
import type { ShippingEditorItem } from './shipping-editor.model';
import { SHIPPING_EDITOR_FEATURE } from './shipping-editor.routes';
import { describeShippingEditorItem } from './shipping-editor.utils';

export interface ShippingEditorPanelProps {
  selected: ShippingEditorItem | null;
  onClear: () => void;
}

export function ShippingEditorPanel({
  selected,
  onClear,
}: ShippingEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeShippingEditorItem(selected)}
      </p>
      <InputsCardGroup
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
        <NavigationToolbar
          label="Navigation Toolbar"
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
        data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
