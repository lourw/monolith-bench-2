import { DataBadgeGroup } from '../../../components/data/badge/data-badge-group';
import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { CatalogEditorItem } from './catalog-editor.model';
import { CATALOG_EDITOR_FEATURE } from './catalog-editor.routes';
import { describeCatalogEditorItem } from './catalog-editor.utils';

export interface CatalogEditorPanelProps {
  selected: CatalogEditorItem | null;
  onClear: () => void;
}

export function CatalogEditorPanel({
  selected,
  onClear,
}: CatalogEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CATALOG_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${CATALOG_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CATALOG_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCatalogEditorItem(selected)}
      </p>
      <DataBadgeGroup
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
        <FormsBadge
          label="Forms Badge"
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
        data-testid={`${CATALOG_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
