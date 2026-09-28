import { OverlayToolbarGroup } from '../../../components/overlay/toolbar/overlay-toolbar-group';
import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import { TypographyCard } from '../../../components/typography/card/typography-card';
import type { NotificationsDashboardItem } from './notifications-dashboard.model';
import { NOTIFICATIONS_DASHBOARD_FEATURE } from './notifications-dashboard.routes';
import { describeNotificationsDashboardItem } from './notifications-dashboard.utils';

export interface NotificationsDashboardPanelProps {
  selected: NotificationsDashboardItem | null;
  onClear: () => void;
}

export function NotificationsDashboardPanel({
  selected,
  onClear,
}: NotificationsDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-panel`}
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
      data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeNotificationsDashboardItem(selected)}
      </p>
      <OverlayToolbarGroup
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
        <CommerceBadge
          label="Commerce Badge"
          value={selected.product.rating}
          size="sm"
        />
        <TypographyCard
          label="Typography Card"
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
        data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
