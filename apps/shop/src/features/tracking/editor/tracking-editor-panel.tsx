import { LayoutPanelGroup } from '../../../components/layout/panel/layout-panel-group';
import { LayoutCard } from '../../../components/layout/card/layout-card';
import { DataBadge } from '../../../components/data/badge/data-badge';
import type { TrackingEditorItem } from './tracking-editor.model';
import { TRACKING_EDITOR_FEATURE } from './tracking-editor.routes';
import { describeTrackingEditorItem } from './tracking-editor.utils';

export interface TrackingEditorPanelProps {
  selected: TrackingEditorItem | null;
  onClear: () => void;
}

export function TrackingEditorPanel({
  selected,
  onClear,
}: TrackingEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${TRACKING_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${TRACKING_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${TRACKING_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeTrackingEditorItem(selected)}
      </p>
      <LayoutPanelGroup
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
        <LayoutCard
          label="Layout Card"
          value={selected.product.rating}
          size="sm"
        />
        <DataBadge
          label="Data Badge"
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
        data-testid={`${TRACKING_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
