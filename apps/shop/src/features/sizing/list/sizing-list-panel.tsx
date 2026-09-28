import { LayoutToolbarGroup } from '../../../components/layout/toolbar/layout-toolbar-group';
import { InputsCard } from '../../../components/inputs/card/inputs-card';
import type { SizingListItem } from './sizing-list.model';
import { SIZING_LIST_FEATURE } from './sizing-list.routes';
import { describeSizingListItem } from './sizing-list.utils';

export interface SizingListPanelProps {
  selected: SizingListItem | null;
  onClear: () => void;
}

export function SizingListPanel({ selected, onClear }: SizingListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SIZING_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${SIZING_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SIZING_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSizingListItem(selected)}
      </p>
      <LayoutToolbarGroup
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
        data-testid={`${SIZING_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
