import { TypographyHeaderGroup } from '../../../components/typography/header/typography-header-group';
import { CommerceCard } from '../../../components/commerce/card/commerce-card';
import { FeedbackPanel } from '../../../components/feedback/panel/feedback-panel';
import type { CompareHistoryItem } from './compare-history.model';
import { COMPARE_HISTORY_FEATURE } from './compare-history.routes';
import { describeCompareHistoryItem } from './compare-history.utils';

export interface CompareHistoryPanelProps {
  selected: CompareHistoryItem | null;
  onClear: () => void;
}

export function CompareHistoryPanel({
  selected,
  onClear,
}: CompareHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${COMPARE_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${COMPARE_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${COMPARE_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCompareHistoryItem(selected)}
      </p>
      <TypographyHeaderGroup
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
        <CommerceCard
          label="Commerce Card"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackPanel
          label="Feedback Panel"
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
        data-testid={`${COMPARE_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
