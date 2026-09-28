import { InputsToolbarGroup } from '../../../components/inputs/toolbar/inputs-toolbar-group';
import type { WishlistEditorItem } from './wishlist-editor.model';
import { WISHLIST_EDITOR_FEATURE } from './wishlist-editor.routes';
import { describeWishlistEditorItem } from './wishlist-editor.utils';

export interface WishlistEditorPanelProps {
  selected: WishlistEditorItem | null;
  onClear: () => void;
}

export function WishlistEditorPanel({
  selected,
  onClear,
}: WishlistEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeWishlistEditorItem(selected)}
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
        data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
