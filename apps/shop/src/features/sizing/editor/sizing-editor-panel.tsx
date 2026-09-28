import { MarketingToolbarGroup } from '../../../components/marketing/toolbar/marketing-toolbar-group';
import { MarketingCard } from '../../../components/marketing/card/marketing-card';
import { TypographyList } from '../../../components/typography/list/typography-list';
import type { SizingEditorItem } from './sizing-editor.model';
import { SIZING_EDITOR_FEATURE } from './sizing-editor.routes';
import { describeSizingEditorItem } from './sizing-editor.utils';

export interface SizingEditorPanelProps {
  selected: SizingEditorItem | null;
  onClear: () => void;
}

export function SizingEditorPanel({
  selected,
  onClear,
}: SizingEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SIZING_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${SIZING_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SIZING_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSizingEditorItem(selected)}
      </p>
      <MarketingToolbarGroup
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
        <MarketingCard
          label="Marketing Card"
          value={selected.product.rating}
          size="sm"
        />
        <TypographyList
          label="Typography List"
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
        data-testid={`${SIZING_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
