import { CommerceHeaderGroup } from '../../../components/commerce/header/commerce-header-group';
import { NavigationHeader } from '../../../components/navigation/header/navigation-header';
import { ChartsStat } from '../../../components/charts/stat/charts-stat';
import type { OrdersEditorItem } from './orders-editor.model';
import { ORDERS_EDITOR_FEATURE } from './orders-editor.routes';
import { describeOrdersEditorItem } from './orders-editor.utils';

export interface OrdersEditorPanelProps {
  selected: OrdersEditorItem | null;
  onClear: () => void;
}

export function OrdersEditorPanel({
  selected,
  onClear,
}: OrdersEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ORDERS_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${ORDERS_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ORDERS_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeOrdersEditorItem(selected)}
      </p>
      <CommerceHeaderGroup
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
        <NavigationHeader
          label="Navigation Header"
          value={selected.product.rating}
          size="sm"
        />
        <ChartsStat
          label="Charts Stat"
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
        data-testid={`${ORDERS_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
