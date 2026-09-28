import { FeedbackToolbarGroup } from '../../../components/feedback/toolbar/feedback-toolbar-group';
import { MarketingChip } from '../../../components/marketing/chip/marketing-chip';
import { FeedbackHeader } from '../../../components/feedback/header/feedback-header';
import type { AnalyticsHistoryItem } from './analytics-history.model';
import { ANALYTICS_HISTORY_FEATURE } from './analytics-history.routes';
import { describeAnalyticsHistoryItem } from './analytics-history.utils';

export interface AnalyticsHistoryPanelProps {
  selected: AnalyticsHistoryItem | null;
  onClear: () => void;
}

export function AnalyticsHistoryPanel({
  selected,
  onClear,
}: AnalyticsHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAnalyticsHistoryItem(selected)}
      </p>
      <FeedbackToolbarGroup
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
        <MarketingChip
          label="Marketing Chip"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackHeader
          label="Feedback Header"
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
        data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
