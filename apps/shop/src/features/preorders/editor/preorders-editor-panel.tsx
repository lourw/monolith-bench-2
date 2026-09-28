import { CoreCardGroup } from '../../../components/core/card/core-card-group';
import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import { InputsCard } from '../../../components/inputs/card/inputs-card';
import type { PreordersEditorItem } from './preorders-editor.model';
import { PREORDERS_EDITOR_FEATURE } from './preorders-editor.routes';
import { describePreordersEditorItem } from './preorders-editor.utils';

export interface PreordersEditorPanelProps {
  selected: PreordersEditorItem | null;
  onClear: () => void;
}

export function PreordersEditorPanel({
  selected,
  onClear,
}: PreordersEditorPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-panel`}
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
      data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePreordersEditorItem(selected)}
      </p>
      <CoreCardGroup
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
        <FeedbackChip
          label="Feedback Chip"
          value={selected.product.rating}
          size="sm"
        />
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
        data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
