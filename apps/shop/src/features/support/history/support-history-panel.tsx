import { FormsBadgeGroup } from '../../../components/forms/badge/forms-badge-group';
import { FeedbackPanel } from '../../../components/feedback/panel/feedback-panel';
import { TypographyBadge } from '../../../components/typography/badge/typography-badge';
import type { SupportHistoryItem } from './support-history.model';
import { SUPPORT_HISTORY_FEATURE } from './support-history.routes';
import { describeSupportHistoryItem } from './support-history.utils';

export interface SupportHistoryPanelProps {
  selected: SupportHistoryItem | null;
  onClear: () => void;
}

export function SupportHistoryPanel({
  selected,
  onClear,
}: SupportHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSupportHistoryItem(selected)}
      </p>
      <FormsBadgeGroup
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
        <FeedbackPanel
          label="Feedback Panel"
          value={selected.product.rating}
          size="sm"
        />
        <TypographyBadge
          label="Typography Badge"
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
        data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
