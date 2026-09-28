import { TypographyTileGroup } from '../../../components/typography/tile/typography-tile-group';
import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import { DataPanel } from '../../../components/data/panel/data-panel';
import type { SubscriptionsDashboardItem } from './subscriptions-dashboard.model';
import { SUBSCRIPTIONS_DASHBOARD_FEATURE } from './subscriptions-dashboard.routes';
import { describeSubscriptionsDashboardItem } from './subscriptions-dashboard.utils';

export interface SubscriptionsDashboardPanelProps {
  selected: SubscriptionsDashboardItem | null;
  onClear: () => void;
}

export function SubscriptionsDashboardPanel({
  selected,
  onClear,
}: SubscriptionsDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSubscriptionsDashboardItem(selected)}
      </p>
      <TypographyTileGroup
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
        <DataPanel
          label="Data Panel"
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
        data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
