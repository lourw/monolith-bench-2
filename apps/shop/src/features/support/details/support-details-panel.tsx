import { LayoutListGroup } from '../../../components/layout/list/layout-list-group';
import { InputsToolbar } from '../../../components/inputs/toolbar/inputs-toolbar';
import type { SupportDetailsItem } from './support-details.model';
import { SUPPORT_DETAILS_FEATURE } from './support-details.routes';
import { describeSupportDetailsItem } from './support-details.utils';

export interface SupportDetailsPanelProps {
  selected: SupportDetailsItem | null;
  onClear: () => void;
}

export function SupportDetailsPanel({
  selected,
  onClear,
}: SupportDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSupportDetailsItem(selected)}
      </p>
      <LayoutListGroup
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
        <InputsToolbar
          label="Inputs Toolbar"
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
        data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
