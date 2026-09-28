import { LayoutTileGroup } from '../../../components/layout/tile/layout-tile-group';
import { FeedbackToolbar } from '../../../components/feedback/toolbar/feedback-toolbar';
import { InputsCard } from '../../../components/inputs/card/inputs-card';
import type { ReturnsSummaryItem } from './returns-summary.model';
import { RETURNS_SUMMARY_FEATURE } from './returns-summary.routes';
import { describeReturnsSummaryItem } from './returns-summary.utils';

export interface ReturnsSummaryPanelProps {
  selected: ReturnsSummaryItem | null;
  onClear: () => void;
}

export function ReturnsSummaryPanel({
  selected,
  onClear,
}: ReturnsSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeReturnsSummaryItem(selected)}
      </p>
      <LayoutTileGroup
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
        <FeedbackToolbar
          label="Feedback Toolbar"
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
        data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
